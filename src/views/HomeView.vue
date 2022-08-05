<template>
  <div class="home-page">
    <div class="back">
      <img @click="goBack" src="../assets/images/back.png" alt="" />
    </div>
    <div class="title">
      <span></span>
      <img src="../assets/images/title.png" alt="" />
      <span></span>
    </div>
    <div class="coins">You will obtain 10000 coins for this payment</div>
    <div class="content">
      <p>Warm reminder:</p>
      <p>
        1. During the payment process, please do not close the page or switch
        the page, otherwise the payment will fail. 2. Due to network issues, the
        payment might be delayed or failed, please wait patiently.
      </p>
    </div>
    <div class="amount">
      <span>Payment amount : </span>
      <span>USDT {{ reqParams.amount }}</span>
    </div>
    <div @click="onWalletConnect" class="button">Pay Using BEP20 USDT</div>
  </div>
</template>

<script setup lang="ts">
import type { routeType } from "../../types";
import { ref } from "vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
const reqParams = ref<routeType>({
  id: "",
  amount: "",
});
onMounted(() => {
  const Route = useRoute();
  reqParams.value.id = Route.query.id;
  reqParams.value.amount = Route.query.amount;
  console.log(reqParams.value);
});
const TexasPokerPayment = require("../assets/json/TexasPokerPayment.json");
const UsdtJson = require("../assets/json/MockUsdt.json");
class mywalletConnect {
  connected: boolean;
  chainId: string;
  account: string;
  constructor(connected: boolean, chainId: string, account: string) {
    this.connected = connected;
    this.chainId = chainId;
    this.account = account;
  }
}
const walletConnect = new mywalletConnect(false, "", "");
const walletConnector = new WalletConnectProvider({
  networkId: 97,
  rpc: {
    97: "https://data-seed-prebsc-1-s1.binance.org:8545",
  },
  chainId: 97,
  qrcode: true,
});
const web3 = new Web3(walletConnector);
const goBack = () => {
  if (window.unityContext) {
    window.unityContext.SendMessage("GameInitate", "goback");
  }
};
const pay = async () => {
  var paymentContract = new web3.eth.Contract(
    TexasPokerPayment.abi,
    process.env.VUE_APP_PAYMENT
  );
  var usdtContract = new web3.eth.Contract(
    UsdtJson.abi,
    process.env.VUE_APP_USDT
  );
  usdtContract.methods
    .approve(process.env.VUE_APP_PAYMENT, reqParams.value.amount)
    .send({ from: walletConnect.account })
    .then((res: any) => {
      console.log(res, "approve");
      paymentContract.methods
        .topUp(
          reqParams.value.id,
          process.env.VUE_APP_USDT,
          reqParams.value.amount
        )
        .send({ from: walletConnect.account })
        .then((res: any) => {
          console.log(res, "topup");
          if(window.unityContext) {
            window.unityContext.SendMessage("GameInitate", "gohome");
          }
        })
        .catch((err: any) => {
          console.log(err, "err");
        });
    })
    .catch((err: any) => {
      console.log(err, "err1");
    });
};
const connectTool = async () => {
  //  Get Chain Id
  // walletConnector
  //   .enable()
  //   .then((res: any) => {
  //     walletConnect.account = res[0];
  //     walletConnect.connected = true;
  //     pay();
  //   })
  //   .catch((err) => {
  //     console.log(err, "链接出错");
  //     walletConnect.connected = false;
  //   });
  const chainId = await web3.eth.getChainId();
  let isProd = process.env.NODE_ENV == "production" ? true : false;
  console.log(chainId, isProd);
  if ((isProd && chainId == 1) || (!isProd && chainId == 97)) {
    walletConnector
      .enable()
      .then((res: any) => {
        walletConnect.account = res[0];
        walletConnect.connected = true;
        pay();
      })
      .catch((err) => {
        console.log(err, "链接出错");
        walletConnect.connected = false;
      });
  } else {
    walletConnector
      .request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: isProd ? "1" : "97",
          },
        ],
      })
      .then(() => {
        walletConnector
          .enable()
          .then((res: any) => {
            walletConnect.account = res[0];
            walletConnect.connected = true;
            pay();
          })
          .catch((err) => {
            console.log(err, "链接出错");
            walletConnect.connected = false;
          });
      })
      .catch((error) => {
        if (error.code == "4902" && !isProd) {
          walletConnector
            .request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "97",
                  chainName: "Binance Smart Chain Testnet",
                  rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
                  blockExplorerUrls: ["https://testnet.bscscan.com"],
                },
              ],
            })
            .then((res) => {
              connectTool();
            });
        }
      });
  }
};
const onWalletConnect = () => {
  // Create a connector
  // // 检查是否已建立连接
  if (walletConnector.connected) {
    walletConnect.account = walletConnector.accounts[0];
    console.log("已经链接");
    pay();
  } else {
    console.log("建立连接");
    connectTool();
  }
  //监听账户变更
  walletConnector.on("chainChanged", (error: any, payload: any) => {
    console.log("账户变更");
    if (error) {
      throw error;
    }
    const { accounts, chainId } = payload.params[0];
    walletConnect.account = accounts[0];
    walletConnect.chainId = chainId;
    console.log(walletConnect);
  });
  walletConnector?.on("disconnect", (error: any) => {
    if (error) {
      throw error;
    }
    walletConnect.connected = false;
    walletConnect.account = "";
    walletConnect.chainId = "";
    console.log("失去连接");
  });
};
// @Options({
//   components: {
//   },
// })
// export default class HomeView extends Vue {}
</script>
<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.home-page {
  width: 100%;
  min-height: 100vh;
  background: #250b3d;
  .back {
    width: 35px;
    height: 44px;
    img {
      width: 100%;
      height: 100%;
      margin-left: 15px;
    }
  }
  .title {
    width: 100%;
    height: 16px;
    margin: 11px auto 21px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 205px;
      height: 16px;
    }
    span {
      width: 38px;
      height: 1px;
      background: #ffffff;
      opacity: 0.15;
      margin: 0 5px;
    }
  }
  .coins {
    width: 319px;
    height: 165px;
    background: url("../assets/images/border.png") no-repeat;
    background-size: 100% 100%;
    margin: 21px auto 7px;
    padding: 60px 53px 0 45px;
    font-size: 18px;
    font-family: SF Pro;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
    line-height: 35px;
  }
  .content {
    width: 285px;
    margin: 0 auto;
    padding-bottom: 25px;
    border-bottom: 1px solid #452f5a;
    p:first-child {
      font-size: 12px;
      font-family: SF Pro;
      font-weight: 400;
      color: #ecd7ef;
      margin-bottom: 10px;
    }
    p:last-child {
      font-size: 12px;
      font-family: SF Pro;
      font-weight: 400;
      color: #ecd7ef;
      opacity: 0.4;
    }
  }
  .amount {
    display: flex;
    width: 284px;
    margin: 24px auto 70px;
    justify-content: space-between;
    span:first-child {
      font-size: 14px;
      font-family: SF Pro;
      font-weight: 500;
      color: #ffffff;
    }
    span:last-child {
      font-size: 14px;
      font-family: SF Pro;
      font-weight: 600;
      color: #ffca10;
    }
  }
  .button {
    width: 315px;
    height: 53px;
    line-height: 48px;
    margin: 0 auto;
    background: url("../assets/images/button.png") no-repeat;
    background-size: 100% 100%;
    font-size: 16px;
    font-family: SF Pro;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
  }
}
</style>
