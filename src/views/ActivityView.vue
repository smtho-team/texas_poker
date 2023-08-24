<template>
  <div style="perspective: 1000px" v-if="step == 0" class="start">
    <bullet></bullet>
    <img class="icon" src="../assets/images/may_icon.png" alt="" />
    <img class="door" src="../assets/images/door.png" alt="" />
    <div class="glow"></div>
    <img class="avatar" src="../assets/images/avater.png" alt="" />
    <img class="bg" src="../assets/images/bg2.png" alt="" />
    <div class="content">
      <img class="text2" src="../assets/images/text2.png" alt="" />
      <img class="text1" src="../assets/images/text1.png" alt="" />
      <img class="line" src="../assets/images/line2.png" alt="" />
      <div class="number">
        <div>There are already</div>
        <scroll-number></scroll-number>
        <div>diamond-hands participating in the event!</div>
      </div>
    </div>
    <img
      @click="inputWallet"
      class="btn"
      src="../assets/images/start.png"
      alt=""
    />
  </div>
  <div v-show="step == 1" class="wallet">
    <img class="bg" src="../assets/images/bg4.png" alt="" />
    <div class="wallet_box">
      <img class="address" src="../assets/images/Please.png" alt="" />
      <div class="input">
        <input
          placeholder="Ethereum address or ENS domain (0x ... /xxx.eth)"
          v-model="address"
          type="text"
        />
        <img
          v-show="showAddress"
          class="wrong"
          src="../assets/images/wrong.png"
          alt=""
        />
        <img
          v-show="showTimeout"
          class="wrong"
          src="../assets/images/timeout.png"
          alt=""
        />
      </div>

      <div @click="load" class="ok">
        <tip v-if="loading" class="load"></tip>
        <div v-else>OK</div>
      </div>
      <img class="partner" src="../assets/images/partners.png" alt="" />
      <div class="icons">
        <img
          v-for="(item, index) in 5"
          :key="index"
          :src="
            require('../assets/images/icon' +
              Number(Number(index) + 1) +
              '.png')
          "
          alt=""
        />
      </div>
      <div class="icons">
        <img
          v-for="(item, index) in 5"
          :key="index"
          :src="
            require('../assets/images/icon' +
              Number(Number(index) + 5) +
              '.png')
          "
          alt=""
        />
      </div>
    </div>
  </div>
  <test-view v-if="step == 2"></test-view>
</template>
<script>
import TestView from "@/components/TestView.vue";
import BulletView from "@/components/BulletView.vue";
import ScrollNumber from "@/components/ScrollNumber.vue";
import TipView from "@/components/TipView.vue";
import {
  getNumber,
  addPeople,
} from "@/services/index";
import Web3 from "web3";
import { getCurrentInstance } from "vue";
import { ethers } from "ethers";
import { getPersonalOverview } from "@/services/index";

export default {
  data() {
    return {
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 0,
      six: 0,
      container: null,
      step: 0,
      web3: null,
      address: null,
      showAddress: false,
      showTimeout: false,
      data: 0,
      loading: false,
    };
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    bullet: BulletView,
    ScrollNumber,
    Tip: TipView,
    TestView,
  },
  async mounted() {
    console.log(
      document.body.clientWidth,
      document.body.clientHeight,
      document.body.scrollWidth,
      document.body.scrollHeight,
      window.screen.availHeight,
      window.screen.availWidth,
      window.screen.width,
      window.screen.height,
      "尺寸"
    );
    var dom = document.querySelector("input");
    dom.onblur = () => {
      document.body.removeEventListener("touchmove", this.stop, {
        passive: false,
      });
      this.$nextTick(() => {
        document.querySelector(".wallet").style.height = "100%";
        document.querySelector(".bg").style.height = "100% !important";
        document.querySelector(".wallet").style.backgroundSize = "100% 100%";
      });
    };
    dom.onfocus = () => {
      document.body.addEventListener("touchmove", this.stop, {
        passive: false,
      }); // passive 参数不能省略，用来兼容ios和android
    };
    const instance = getCurrentInstance();
    if(instance) {
      instance.appContext.config.globalProperties.$amplitude
      .getInstance()
      .logEvent("H5_2-22_HOME_PAGE");
    }
    this.web3 = new Web3(Web3.givenProvider);
  },
  methods: {
    stop(e) {
      e.preventDefault(); // 阻止默认的处理方式(阻止下拉滑动的效果)
    },
    inputWallet() {
      this.step = 1;
      window.addEventListener("resize", () => {
        if (window.orientation === 180 || window.orientation === 0) {
          document.querySelector(".mask").style.display = "none";
        }
      });
    },
    async load() {
      this.loading = true;
      console.log(this.address)
      if(!this.address) {
        this.loading = false;
        this.showAddress = true;
       return
      } 
      if (window.ethereum) {
        var provider = new ethers.providers.Web3Provider(window.ethereum);
        var address = await provider.resolveName(this.address);
        this.add(address);
      } else {
        getPersonalOverview({ wallet: this.address })
          .then((res) => {
            if (res.code == 200) {
              var address = true;
              this.add(address);
            } else {
              var address = false;
              this.add(address);
            }
          })
          .catch((err) => {
            var address = false;
            this.add(address);
          });
      }
    },
    add(address) {
      this.loading = false;
      var address1 = this.web3.utils.isAddress(this.address);
      var isAddress = address || address1;
      // this.$amplitude
      //   .getInstance()
      //   .logEvent("H5_2022_WALLET_ENTER", { address: this.address });
      if (isAddress) {
        localStorage.setItem("wallet", this.address);
        console.log(this.address, "address1");
        addPeople()
          .then((res) => {})
          .catch(() => {
            this.showTimeout = true;
          });
        this.showAddress = false;
        this.step = 2;
      } else {
        this.showAddress = true;
      }
    },
  },
};
</script>
<style scoped lang="scss">
@media (min-aspect-ratio: 375/710) {
  .content {
    transform: scale(0.8);
    top: 32% !important;
  }
  .wallet_box {
    top: 15% !important;
  }
  .door,
  .glow {
    top: 50px !important;
  }
  .avatar {
    top: 110px !important;
  }
}
@keyframes glows {
  0% {
    opacity: 0.5;
  }
  50% {
    // background-position: 100% 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes wrapper-gradient {
  0% {
    transform: translateY(-50%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate3d(0, 0, -100px);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
#canvas_container {
  position: relative;
  div {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    /* identical to box height */

    text-align: center;

    color: #ffffff;
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 100px;
    left: 0px;
  }
}
.start {
  width: 100%;
  height: 100%;
  background: url("../assets/images/bg1.jpg");
  background-position: left top;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
  .icon {
    position: absolute;
    top: 17px;
    left: 21px;
    width: 120px;
  }
  .avatar {
    width: 100%;
    position: absolute;
    top: 130px;
    left: 0;
    animation: fadeIn 2s linear;
  }
  .music {
    width: 34px;
    height: 34px;
    line-height: 36px;
    text-align: center;
    background: url("../assets/images/music_bg.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 33px;
    right: 22px;
  }
  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 295px;
    .text1 {
      width: 362px;
      height: 177px;
      animation: wrapper-gradient 1s linear;
    }
    .text2 {
      width: 303px;
      height: 34px;
      animation: wrapper-gradient 1s linear;
    }
    .line {
      width: 338px;
      height: 8px;
      margin-top: 10px;
    }
    .number {
      width: 100%;
      height: 105px;
      font-family: "Lato";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 30px;
      /* or 214% */

      text-align: center;
      letter-spacing: 0.1em;

      color: #ffffff;
      div:nth-child(2) {
        display: flex;
        justify-content: center;
        span {
          display: block;
          width: 28px;
          height: 31px;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.044) 0%,
            rgba(240, 240, 240, 0.096) 50%,
            rgba(255, 255, 255, 0.04375) 100%
          );
          backdrop-filter: blur(15px);
          // filter: blur(2px);
          border-right: 1px solid rgba($color: #fff, $alpha: 0.2);
          &:nth-child(4) {
            background: none;
            backdrop-filter: none;
          }
          &:nth-child(3),
          &:nth-child(7),
          &:nth-child(4) {
            border-right: none;
          }
        }
      }
    }
  }
  .btn {
    width: 115px;
    height: 92px;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -57.5px;
  }
  .door {
    width: 260.87px;
    height: 531.56px;
    position: absolute;
    top: 70px;
    left: 50%;
    transform: translateX(-50%);
  }
  .glow {
    width: 261.87px;
    height: 531.56px;
    position: absolute;
    top: 70px;
    left: 50%;
    transform: translateX(-50%);
    background: url("../assets/images/glow.png") no-repeat;
    background-size: 100% 100%;
    animation: glows 1s ease-out infinite;
  }
}
.wallet {
  width: 100%;
  height: 100%;
  background: url("../assets/images/bg3.jpg") no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  .bg {
    height: 100%;
  }
  .wallet_box {
    width: 100%;
    position: absolute;
    top: 25%;
    // left: 50%;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .address {
    width: 249px;
    height: 58px;
  }
  .input {
    width: 335px;
    margin-top: 35px;
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
      width: 100%;
      height: 40px;
      background: url("../assets/images/input.png") no-repeat;
      background-size: 100% 100%;
      font-family: "Lato";
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 17px;
      text-align: center;
      color: #ffffff;
      border: none;
      outline: none;
      padding: 0;
      margin: 0;
      &::-webkit-input-placeholder {
        //兼容WebKit browsers（Chrome的内核）
        color: #fff;
        opacity: 0.4;
      }
      &::-moz-placeholder {
        //Mozilla Firefox 19+
        color: #fff;
        opacity: 0.4;
      }
      &::-ms-input-placeholder {
        //Internet Explorer 10+
        color: #fff;
        opacity: 0.4;
      }
    }
    .wrong {
      width: 115px;
      margin-top: 11px;
    }
  }
  .ok {
    width: 116px;
    height: 44px;
    text-align: center;
    margin-top: 43px;
    background: linear-gradient(
      92.34deg,
      #ba4c52 25.16%,
      #7f427c 61.63%,
      #544f96 98.88%
    );
    backdrop-filter: blur(15px);
    /* Note: backdrop-filter has minimal browser support */

    border-radius: 500px;
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 44px;
    /* identical to box height */

    text-align: center;

    color: #ffffff;
  }
  .load {
    width: 100%;
    height: 100%;
    line-height: 44px;
  }
  .partner {
    width: 335px;
    margin-top: 50px;
  }
  .icons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-left: 36px;
    padding-right: 36px;
    box-sizing: border-box;
    img {
      width: 45px;
      height: 45px;
      margin-top: 20px;
    }
  }
}
.loading {
  width: 100%;
  height: 100vh;
  background: url("../assets/images/bg3.jpg") no-repeat;
  background-size: 100% 100%;
}
</style>
