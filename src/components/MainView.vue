<template>
  <div class="scene">
    <loading v-if="!rank"></loading>
    <div v-if="rank" class="swiper-container swiper1">
      <div class="swiper-wrapper">
        <div
          v-if="JSON.stringify(personalOverview) != '{}'"
          class="swiper-slide one"
        >
          <img class="bg" src="../assets/images/newimg1.png" alt="" />
          <div class="safe-content">
            <div class="address-box">
              <img src="../assets/images/quotes1.png" alt="" />
              <div>
                <p>Your address</p>
                <p>{{ $parent.address }}</p>
              </div>
              <img src="../assets/images/quotes2.png" alt="" />
            </div>
            <div class="bottom">
              <p v-if="personalOverview.holdNftCount">
                Currently holds
                <span>
                  <CountTo
                    :start="0"
                    :end="personalOverview.holdNftCount"
                    :autoPlay="true"
                    :duration="3000"
                  />
                </span>
                NFTs
              </p>
              <p v-else>Currently doest hold any NFTs</p>
              <p v-if="personalOverview.holdNftCount">
                These are currently worth
                <span>
                  <CountTo
                    :start="0"
                    :end="personalOverview.holdNftVolume"
                    :decimals="toDecimal(personalOverview.holdNftVolume)"
                    :autoPlay="true"
                    :duration="3000"
                  />
                </span>
                ETH, which is more than the other
                <span>
                  <CountTo
                    :start="0"
                    :end="rank.total_value_rank_percentage"
                    :decimals="toDecimal(rank.total_value_rank_percentage)"
                    :autoPlay="true"
                    :duration="3000"
                  />%</span
                >
                participants
              </p>
              <p v-if="personalOverview.holdNftCount">
                You've done
                <span>
                  <CountTo
                    :start="0"
                    :end="personalOverview.totalTxCount"
                    :decimals="toDecimal(personalOverview.totalTxCount)"
                    :autoPlay="true"
                    :duration="3000"
                  />
                </span>
                transactions on-chain, which is more than
                <span>
                  <CountTo
                    :start="0"
                    :end="rank.trade_count_rank_percentage"
                    :decimals="toDecimal(rank.trade_count_rank_percentage)"
                    :autoPlay="true"
                    :duration="3000"
                  />%</span
                >
              </p>
              <p v-if="!personalOverview.holdNftCount">
                You seem to be particularly quiet this year
              </p>
            </div>
          </div>
          <img class="touch" src="../assets/images/swipeUp.png" alt="" />
        </div>
        <div
          v-if="JSON.stringify(personalDetails) != '{}'"
          class="swiper-slide two"
        >
          <img class="bg" src="../assets/images/newimg2.png" alt="" />
          <div class="safe-content">
            <div class="top">
              <p>In 2022,</p>
              <p>
                you've bought
                <span>
                  <CountTo
                    v-show="getActive('two')"
                    :start="0"
                    :end="personalDetails.receiveNftCount"
                    :decimals="toDecimal(personalDetails.receiveNftCount)"
                    :autoPlay="true"
                    :duration="3000"
                  />
                </span>
                NFTs with a total cost of
                <span>
                  <CountTo
                    v-if="getActive('two')"
                    :start="0"
                    :end="personalDetails.buyNftVolume"
                    :decimals="toDecimal(personalDetails.buyNftVolume)"
                    :autoPlay="true"
                    :duration="3000"
                  />
                </span>
                ETH
              </p>
              <p>
                You've sold
                <span>
                  <CountTo
                    v-if="getActive('two')"
                    :start="0"
                    :end="personalDetails.sellNftCount"
                    :decimals="toDecimal(personalDetails.sellNftCount)"
                    :autoPlay="true"
                    :duration="3000"
                  />
                </span>
                NFTs with a total profit of
                <span>
                  <CountTo
                    v-if="getActive('two')"
                    :start="0"
                    :end="personalDetails.sellNftVolume"
                    :decimals="toDecimal(personalDetails.sellNftVolume)"
                    :autoPlay="true"
                    :duration="3000"
                  />
                </span>
                ETH
              </p>
            </div>
            <div class="bottom">
              <p>
                Out of these transactions,<span>
                  <CountTo
                    v-if="getActive('two')"
                    :start="0"
                    :end="personalDetails.nftIncreaseCount"
                    :decimals="toDecimal(personalDetails.nftIncreaseCount)"
                    :autoPlay="true"
                    :duration="3000"
                  />
                </span>
                were profitable,
                <span>
                  <CountTo
                    v-if="getActive('two')"
                    :start="0"
                    :end="personalDetails.nftDecreaseCount"
                    :decimals="toDecimal(personalDetails.nftDecreaseCount)"
                    :autoPlay="true"
                    :duration="3000"
                  />
                </span>
                resulted in losses
              </p>
              <p>
                Your total
                <span class="bold">{{
                  personalDetails.proft >= 0 ? "gain" : "loss"
                }}</span>
                is
                <span>
                  <CountTo
                    v-if="getActive('two')"
                    :start="0"
                    :end="Math.abs(personalDetails.proft)"
                    :decimals="toDecimal(personalDetails.proft)"
                    :autoPlay="true"
                    :duration="3000"
                  />
                </span>
                ETH
              </p>
            </div>
          </div>
          <img class="touch" src="../assets/images/swipeUp.png" alt="" />
        </div>
        <div
          v-if="JSON.stringify(personalDetails) != '{}'"
          class="swiper-slide three"
        >
          <img class="bg" src="../assets/images/newimg3.png" alt="" />
          <div class="safe-content">
            <div class="top">
              <p>In 2022,</p>
              <p>
                you've spent
                <span>
                  <CountTo
                    v-if="getActive('three')"
                    :start="0"
                    :end="personalDetails.spentGas"
                    :decimals="toDecimal(personalDetails.spentGas)"
                    :autoPlay="true"
                    :duration="3000"
                  />
                </span>
                ETH in gas fee
              </p>
              <p>
                That is more gas spent than
                <span>
                  <CountTo
                    v-if="getActive('three')"
                    :start="0"
                    :end="rank.gas_fee_rank_percentage"
                    :decimals="toDecimal(rank.gas_fee_rank_percentage)"
                    :autoPlay="true"
                    :duration="3000"
                  />%</span
                >
                of the participants
              </p>
            </div>
          </div>
          <img class="touch" src="../assets/images/swipeUp.png" alt="" />
        </div>
        <div
          v-if="JSON.stringify(longestHoldingPeriod) != '{}'"
          class="swiper-slide four"
        >
          <img src="../assets/images/bg9.png" class="bg" alt="" />
          <img class="star1" src="../assets/images/star1.png" alt="" />
          <img class="star2" src="../assets/images/star2.png" alt="" />
          <div class="safe-content">
            <div class="top">
              <p>In 2022,</p>
              <p>you've been hodling</p>
              <p class="bold name">{{ longestHoldingPeriod.nftName }}</p>
              <p>
                for
                <span>
                  <CountTo
                    v-if="getActive('four')"
                    :start="0"
                    :end="longestHoldingPeriod.holdingPeriod"
                    :decimals="toDecimal(longestHoldingPeriod.holdingPeriod)"
                    :autoPlay="true"
                    :duration="3000"
                  />
                </span>
                {{
                  longestHoldingPeriod.holdingPeriod > 1 ? "days！" : "day！"
                }}
              </p>
            </div>
            <div class="bottom">
              <p v-if="!longestHoldingPeriod.sellTime">
                You bought the NFT on
                <span class="bold">{{
                  getTime(longestHoldingPeriod.receiveTime)
                }}</span>
                and you are still hodling!
              </p>
              <p v-else>
                You bought the NFT on
                <span class="bold">{{
                  getTime(longestHoldingPeriod.receiveTime)
                }}</span>
                and sold it on
                <span class="bold">{{
                  getTime(longestHoldingPeriod.sellTime)
                }}</span>
              </p>
              <p>
                This is the NFT that has been in your wallet for the longest
                time. There must have been many stories about it
              </p>
            </div>
            <div class="nftimage">
              <div></div>
              <img :src="longestHoldingPeriod.nftImage" alt="" />
            </div>
          </div>
          <img class="touch" src="../assets/images/swipeUp.png" alt="" />
        </div>
        <div
          v-if="
            JSON.stringify(shortestHoldingPeriod) != '{}' &&
            shortestHoldingPeriod.holdingPeriod < 43200
          "
          class="swiper-slide five"
        >
          <div class="safe-content">
            <div class="nftimage">
              <div></div>
              <img :src="shortestHoldingPeriod.nftImage" alt="" />
            </div>
            <div class="top">
              <p>In 2022,</p>
              <p>you held</p>
              <p>
                <span class="bold name">{{
                  shortestHoldingPeriod.nftName
                }}</span>
                for
              </p>
              <p>
                only
                <span>
                  <CountTo
                    v-if="getActive('five')"
                    :start="0"
                    :end="getDay(shortestHoldingPeriod.holdingPeriod)"
                    :decimals="0"
                    :autoPlay="true"
                    :duration="3000"
                  />
                </span>
                {{ getDayName(shortestHoldingPeriod.holdingPeriod) }}
              </p>
            </div>
            <div class="bottom">
              <p v-if="shortestHoldingPeriod.sellTime">
                you bought it on
                <span class="bold">{{
                  getTime(shortestHoldingPeriod.receiveTime)
                }}</span>
                and sold it on
                <span class="bold">{{
                  getTime(shortestHoldingPeriod.sellTime)
                }}</span>
              </p>
              <p v-else>
                you bought it on
                <span class="bold">{{
                  getTime(shortestHoldingPeriod.receiveTime)
                }}</span>
              </p>
              <p>
                This is the NFT that has been in your wallet for the shortest
                time. Any stories about it?
              </p>
            </div>
          </div>
          <img class="touch" src="../assets/images/swipeUp.png" alt="" />
        </div>
        <div
          v-if="JSON.stringify(holdBlueChip) != '{}'"
          class="swiper-slide six"
        >
          <div class="safe-content">
            <div class="top">
              <p>
                You are currently hodling
                <span>
                  <CountTo
                    v-if="getActive('six')"
                    :start="0"
                    :end="holdBlueChip.blueChipNftCount"
                    :decimals="toDecimal(holdBlueChip.blueChipNftCount)"
                    :autoPlay="true"
                    :duration="3000"
                  />
                </span>
                bluechip NFTs
              </p>
              <div v-if="holdBlueChip.blueChipNftCount">
                <p>Out of these NFTs,</p>
                <p class="bold name">{{ holdBlueChip.mostValuableBlueChip }}</p>
                <p style="margin-bottom: 20px">
                  is the most valuable NFT that you are hodling right now, with
                  a floor price of
                  <span>
                    <CountTo
                      v-if="getActive('six')"
                      :start="0"
                      :end="holdBlueChip.currentFloorPrice"
                      :decimals="toDecimal(holdBlueChip.currentFloorPrice)"
                      :autoPlay="true"
                      :duration="3000"
                    />
                  </span>
                  ETH
                </p>
                <p>
                  Your number of bluechip NFTs exceeds more than
                  <span>
                    <CountTo
                      v-if="getActive('six')"
                      :start="0"
                      :end="99"
                      :decimals="0"
                      :autoPlay="true"
                      :duration="3000"
                    />%</span
                  >
                  of the participants
                </p>
              </div>
            </div>
            <div class="bottom">
              <p>
                These bluechip NFTs are highly sought after, what would be the
                next bluechip?
              </p>
            </div>
            <div class="swiper-container swiper2">
              <div class="swiper-wrapper">
                <div
                  v-for="(item, index) in 17"
                  :key="index"
                  class="swiper-slide"
                >
                  <div>
                    <img
                      :src="
                        require('../assets/images/' +
                          Number(index + 1) +
                          '.gif')
                      "
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img class="touch" src="../assets/images/swipeUp.png" alt="" />
        </div>
        <div
          v-if="JSON.stringify(priceToZero) != '{}'"
          class="swiper-slide seven"
        >
          <div class="safe-content">
            <div class="top">
              <p>In 2022,</p>
              <p>
                you've bought
                <span>
                  <CountTo
                    v-if="getActive('seven')"
                    :start="0"
                    :end="priceToZero.zeroNftCount || 0"
                    :decimals="toDecimal(priceToZero.zeroNftCount || 0)"
                    :autoPlay="true"
                    :duration="3000"
                  />
                </span>
                NFTs that went to zero.
              </p>
              <div v-if="priceToZero.zeroNftCount">
                <p>You aped into</p>
                <p class="bold name">{{ priceToZero.nftName }}</p>
                <p>
                  at a cost of
                  <span>
                    <CountTo
                      v-if="getActive('seven')"
                      :start="0"
                      :end="priceToZero.purchasePrice"
                      :decimals="toDecimal(priceToZero.purchasePrice)"
                      :autoPlay="true"
                      :duration="3000"
                    />
                  </span>
                  ETH per NFT
                </p>
              </div>
            </div>
            <div class="bottom">
              <div v-if="priceToZero.zeroNftCount">
                <p>
                  The current floor price is
                  <span>
                    <CountTo
                      v-if="getActive('seven')"
                      :start="0"
                      :end="priceToZero.currentFloorPrice"
                      :decimals="toDecimal(priceToZero.currentFloorPrice)"
                      :autoPlay="true"
                      :duration="3000"
                    />
                  </span>
                  and that's
                  <span>
                    <CountTo
                      v-if="getActive('seven')"
                      :start="0"
                      :end="
                        priceToZero.proportion.substr(
                          0,
                          priceToZero.proportion.length - 1
                        )
                      "
                      :decimals="
                        toDecimal(
                          priceToZero.proportion.substr(
                            0,
                            priceToZero.proportion.length - 1
                          )
                        )
                      "
                      :autoPlay="true"
                      :duration="3000"
                    />%</span
                  >
                  down
                </p>
                <p>Will you ape or will you hodl for 2023?</p>
              </div>
              <div v-else>
                <p>
                  You have a keen eye! Will you ape or will you hodl for 2023?
                </p>
              </div>
            </div>
          </div>
          <img class="touch" src="../assets/images/swipeUp.png" alt="" />
        </div>
        <div class="swiper-slide nine">
          <img class="bg" src="../assets/images/bg13.png" alt="" />
          <div class="safe-content">
            <img class="key" src="../assets/images/keyword.png" alt="" />
            <img src="../assets/images/rectangle2.png" alt="" />
            <div class="word">
              <img class="person" src="../assets/images/woman1.png" alt="" />
              <div class="p1">{{ userLabel.label }}</div>
              <div class="line">
                <img src="../assets/images/line.png" alt="" />
              </div>
              <div class="p3">participants with this keyword is only</div>
              <div class="p4">{{ rank.key_word_percentage }}%</div>
              <div class="stars">
                <img src="../assets/images/star.png" alt="" />
                <img src="../assets/images/star.png" alt="" />
                <img src="../assets/images/star.png" alt="" />
              </div>
            </div>
          </div>
          <img
            @click="generate"
            class="touch"
            src="../assets/images/generate.png"
            alt=""
          />
        </div>
        <div v-if="showPoster" class="swiper-slide seven">
          <PosterView
            :keyword="userLabel.label"
            :holdCount="personalOverview.holdNftCount"
            :worth="personalOverview.holdNftVolume"
            :tx="personalOverview.totalTxCount"
          ></PosterView>
        </div>
        <div v-if="showPaiticipate" class="swiper-slide eight">
          <participate :keyword="userLabel.label"></participate>
        </div>
        <div v-if="showSeven" class="swiper-slide eight">
          <download></download>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
// import { getCurrentInstance, reactive, onMounted, ref, computed } from "vue";
import PosterView from "../views/PosterView1.vue";
import ParticipateView from "../views/ParticipateView.vue";
import DownloadView from "@/components/DownloadView.vue";
import Loading from "@/components/LoadingView.vue";
// import { useRouter } from "vue-router";
// import { nextTick } from "process";
import {
  getPersonalOverview,
  getPersonalDetails,
  getLongestHoldingPeriodNft,
  getShortestHoldingPeriodNft,
  getUserHoldBlueChipNft,
  getUserNftPriceToZeroNft,
  getUserLabel,
  updateStatisticData,
} from "@/services/index";

export default {
  components: {
    PosterView,
    participate: ParticipateView,
    download: DownloadView,
    Loading,
  },
  data() {
    return {
      showPaiticipate: false,
      showPoster: false,
      swipeIndex: 0,
      showSeven: false,
      swipers: {},
      personalOverview: {},
      personalDetails: {},
      longestHoldingPeriod: {},
      shortestHoldingPeriod: {},
      holdBlueChip: {},
      priceToZero: {},
      userLabel: {},
      rank: {},
    };
  },
  computed: {
    getTime() {
      return function (time) {
        console.log(time, "time");
        //获取当地时间，Fri Apr 01 2022 21:36:14 GMT+0800
        // var time = dateBJtoLocal(time).toLocaleString();
        var year = dateBJtoLocal(time).getFullYear();
        var month = dateBJtoLocal(time).getMonth() + 1;
        var dates = dateBJtoLocal(time).getDate();
        var hour = dateBJtoLocal(time).getHours();
        var minutes = dateBJtoLocal(time).getMinutes();
        var second = dateBJtoLocal(time).getSeconds();
        var time =
          year +
          "/" +
          month +
          "/" +
          dates +
          " " +
          hour +
          ":" +
          minutes +
          ":" +
          second;
        console.log(time, "time1");
        var en_mon_arr = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Spt",
          "Oct",
          "Nov",
          "Dec",
        ]; //英文月份
        var d = new Array("st", "nd", "rd", "th"); //英文日期
        if (time) {
          var value = time.split(" ")[0];
          var month = value.split("/")[1];
          var index;
          index = Number(month);
          var dns;
          var dn = Number(value.split("/")[2]);
          var year = value.split("/")[0];
          if (
            year == new Date().getFullYear() &&
            month == new Date.getMonth() + 1 &&
            dn == new Date().getDate()
          ) {
            return time.split(" ")[1];
          }
          if (dn % 10 < 1 || dn % 10 > 3) {
            dns = d[3];
          } else {
            dns = d[(dn % 10) - 1];
            if (dn == 11 || dn == 12) {
              dns = d[3];
            }
          }
          console.log(index);
          return en_mon_arr[index - 1] + " " + dn + dns + "," + year;
        }
      };
    },
    getDay() {
      return function (time) {
        var minutes = 24 * 60;
        var day = time / minutes;
        return day < 1 ? time : day;
      };
    },
    getDayName() {
      return function (time) {
        var minutes = 24 * 60;
        var day = time / minutes;
        return day < 1 ? "minutes" : day == 1 ? "day" : "days";
      };
    },
    toDecimal(num) {
      return function () {
        if (num) {
          var res = num.toString().split(".");
          if (res[1]) {
            var len = res[1].toString().split("").length;
            return len;
          }
          return 0;
        }
      };
    },
    getActive() {
      return function (activeClass) {
        return this.swipeIndex == activeClass;
      };
    },
  },
  methods: {
    generate() {
      const instance = getCurrentInstance();
      instance?.appContext.config.globalProperties.$amplitude
        .getInstance()
        .logEvent("H5_2022_GENERAL_POSTER_CLICK");
      this.showPoster = true;
      setTimeout(() => {
        this.swipers.update();
        this.swipers.slideNext();
      }, 0);
    },
    dateBJtoLocal() {
      // 当前时区与标准地区的差值(分钟)
      const offset = new Date().getTimezoneOffset();
      // 北京时间戳
      const bjDate = new Date(time).getTime();
      // 当地时间戳
      const ddDate = (-offset / 60 - 8) * 60 * 60 * 1000 + bjDate;
      const date = new Date(ddDate);
      return date;
    },
  },
  async mounted() {
    var that = this;
    var address = localStorage.getItem("wallet");
    console.log(address, "address");
    this.personalOverview =
      (await getPersonalOverview({ wallet: address })).data || {};
    this.personalDetails =
      (await getPersonalDetails({ wallet: address })).data || {};
    this.longestHoldingPeriod =
      (await getLongestHoldingPeriodNft({ wallet: address })).data || {};
    this.shortestHoldingPeriod =
      (await getShortestHoldingPeriodNft({ wallet: address })).data || {};
    this.holdBlueChip =
      (await getUserHoldBlueChipNft({ wallet: address })).data || {};
    this.priceToZero =
      (await getUserNftPriceToZeroNft({ wallet: address })).data || {};
    this.userLabel = (await getUserLabel({ wallet: address })).data || {};
    updateStatisticData({
      address: address,
      gas_fee: this.personalDetails.spentGas||0,
      total_value: this.personalOverview.holdNftVolume||0,
      trade_count: this.personalOverview.totalTxCount||0,
      key_word: this.userLabel.label,
    }).then((res) => {
      that.rank = res.data;
      that.$nextTick(() => {
        that.swipers = new Swiper(".swiper1", {
          autoplay: false,
          observeParents: true, // 修改swiper的父元素时，自动初始化swiper
          on: {
            slideChange: function () {
              console.log(this.slides, this.activeIndex, "this.activeIndex");
              that.$nextTick(() => {
                for (var i = 0; i < this.slides.length; i++) {
                  if (
                    this.slides[i].className.search("swiper-slide-active") != -1
                  ) {
                    //返回当前active swiper的类名
                    that.swipeIndex = this.slides[i].className.split(" ")[1];
                  }
                }
              });
            },
          },
          direction: "vertical",
        });
        new Swiper(".swiper2", {
          autoplay: {
            delay: 1000,
          },
          slidesPerView: 3,
          slidesPerGroup: 1,
          loop: true,
          spaceBetween: 20,
        });
      });
    });
  },
};
</script>
    
  <style lang="scss" scoped>
// img {
//   pointer-events: none;
// }
@media (min-aspect-ratio: 375/810) {
  .six {
    p {
      font-size: 15px !important;
    }
    .top {
      margin: 80px 30px 18px 20px !important;
    }
  }
}
p {
  margin: 0;
  padding: 0;
}
.swiper2 {
  width: 100%;
  height: 160px !important;
  position: absolute;
  bottom: 105px;
  left: 0;
  .swiper-slide {
    width: 160px !important;
    height: 160px !important;
    div {
      width: 160px !important;
      height: 160px !important;
      img {
        width: 100%;
        border-radius: 10px;
      }
    }
  }
}
.hidden {
  height: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
  overflow: hidden;
}
@keyframes bounce-down {
  25% {
    transform: translateY(-10px);
  }
  50%,
  100% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(10px);
  }
}
.safe-content {
  height: 100%;
}
// @media screen and (max-width: 750px) and (min-aspect-ratio: 375/700) {
//   .scene {
//     .safe-content {
//       transform: translateY(-8%) scale(0.9);
//     }
//     .two {
//       .woman {
//         transform: translate(-10%, 10%) scale(0.8);
//       }
//       .monkey {
//         margin-bottom: 15px !important;
//       }
//       .text {
//         div {
//           &:first-child {
//             margin-bottom: 16px !important;
//           }

//           &:nth-child(2) {
//             margin-bottom: 16px !important;
//           }
//         }
//       }
//     }
//     .five {
//       .face {
//         transform: translateX(0.8) scale(0.85);
//       }
//       .text {
//         padding-top: 160px !important;
//       }
//     }
//   }
// }
// @media (min-aspect-ratio: 375/800) {
//   .two {
//     .text {
//       div {
//         &:first-child {
//           margin-bottom: 10px !important;
//         }
//         &:nth-child(2) {
//           margin-bottom: 10px !important;
//         }
//       }
//     }
//     .woman {
//       transform: translate(-10%, 13%) scale(0.8);
//     }
//   }
// }
.bold {
  color: #140e2d !important;
  font-weight: 800 !important;
}
p {
  span {
    font-family: "Avenir";
    font-style: normal;
    font-weight: 800;
    font-size: 18px;
    line-height: 25px;
    text-align: right;
    color: #f86fa0;
  }
}
:deep(.van-swipe-item) {
  text-align: left;
}
@keyframes float {
  0% {
    transform: translateY(-10px);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(10px);
  }
}
.box {
  margin-top: 88px;
  img:first-child {
    width: 68px;
    animation: bounce-down 2s linear infinite;
  }
  img:last-child {
    width: 266px;
    animation: bounce-down 2s linear infinite;
  }
}
.scene {
  width: 100%;
  height: 100%;
  .swiper-container {
    height: 100%;
    .swiper-slide {
      height: 100%;
    }
  }

  .one {
    background: url("../assets/images/bg_2.png") no-repeat;
    background-size: 100% 100%;
    padding-top: 69px;
    box-sizing: border-box;
    .bg {
      width: 272px;
      height: 338.5px;
      position: absolute;
      top: 301px;
      right: 0;
      animation: bounce-down 2s linear infinite;
    }
    .address-box {
      width: 307px;
      position: absolute;
      top: 80px;
      left: 50%;
      transform: translateX(-50%);
      img:first-child {
        width: 84px;
        height: 84px;
        position: absolute;
        top: -40px;
        left: 0;
      }
      img:last-child {
        width: 84px;
        height: 84px;
        position: absolute;
        right: -10px;
        bottom: -30px;
      }
      div {
        p:first-child {
          font-family: "Avenir";
          font-style: normal;
          font-weight: 400;
          font-size: 18px;
          line-height: 25px;
          text-align: center;
          color: #545357;
        }
        p:last-child {
          font-family: "Avenir";
          font-style: normal;
          font-weight: 800;
          font-size: 20px;
          line-height: 25px;
          text-align: center;
          color: #f86fa0;
          word-break: break-word;
        }
      }
    }
    .bottom {
      position: absolute;
      top: 250px;
      left: 24px;
      font-family: "Avenir";
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      color: #140e2d;
      p {
        margin-bottom: 10px;
      }
    }
  }

  .two {
    background: url("../assets/images/bg_3.png") no-repeat;
    background-size: 100% 100%;
    padding: 98px 0 50px;
    box-sizing: border-box;
    .bg {
      width: 175px;
      height: 227.5px;
      position: absolute;
      z-index: -1;
      top: 216px;
      right: 0;
      animation: bounce-down 2s linear infinite;
    }
    p {
      margin-bottom: 15px;
    }
    .top {
      font-family: "Avenir";
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 25px;
      text-align: left;
      color: #140e2d;
      margin: 0 16px 0 20px;
    }
    .bottom {
      font-family: "Avenir";
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 25px;
      color: #140e2d;
      margin: 76px 16px 0 20px;
    }
  }

  .three {
    background: url("../assets/images/bg8.png") no-repeat;
    background-size: 100% 100%;
    padding: 141.53px 0 50px 0px;
    box-sizing: border-box;
    .bg {
      width: 305px;
      height: 343px;
      position: absolute;
      right: 0;
      bottom: 0;
      animation: bounce-down 2s linear infinite;
    }
    div {
      &.top {
        margin: 0 16px 0 20px;
      }
      p {
        font-family: "Avenir";
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        color: #140e2d;
        margin-bottom: 15px;
      }
    }
  }
  .four {
    background: url("../assets/images/bg8.png") no-repeat;
    background-size: 100% 100%;
    // padding-top: 211px;
    box-sizing: border-box;
    .name {
      display: table;
      position: relative;
      &::after {
        display: block;
        content: "";
        position: absolute;
        bottom: 0;
        left: -2%;
        width: 104%;
        height: 15px;
        background: #dfa7ee;
        z-index: -1;
      }
    }

    .bg {
      position: absolute;
      width: 216px;
      height: 160px;
      top: 0;
      right: 0;
      z-index: -1;
    }

    .star1 {
      width: 73px;
      height: 90px;
      position: absolute;
      top: 362px;
      right: 29px;
      animation: bounce-down 2s linear infinite;
    }
    .star2 {
      width: 28px;
      height: 64px;
      position: absolute;
      top: 528px;
      left: 0;
      animation: bounce-down 3s linear infinite;
    }
    p {
      font-family: "Avenir";
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 30px;
      /* or 167% */
      color: #140e2d;
    }
    .top {
      font-family: "Avenir";
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 30px;
      /* or 167% */
      color: #140e2d;
      margin: 65px 16px 20px 20px;
    }
    .bottom {
      font-family: "Avenir";
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 25px;
      color: #140e2d;
      margin: 0 16px 0 20px;
      p:first-child {
        margin-bottom: 20px;
      }
    }
    .nftimage {
      position: relative;
      width: 100%;
      margin-top: 53px;
      div {
        width: 160px;
        height: 160px;
        background: #a3e4f5;
        position: absolute;
        left: 130px;
        transform: matrix(0.97, 0.26, 0.26, -0.97, 0, 0);
        border-radius: 10px;
      }
      img {
        width: 160px;
        height: 160px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 10px;
      }
    }
  }
  .five {
    background: url("../assets/images/bg_4.png") no-repeat;
    background-size: 100% 100%;
    // padding-top: 211px;
    box-sizing: border-box;

    .bg {
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
    }
    .name {
      display: table;
      position: relative;
      &::after {
        display: block;
        content: "";
        position: absolute;
        bottom: 0;
        left: -2%;
        width: 104%;
        height: 15px;
        background: #dfa7ee;
        z-index: -1;
      }
    }
    p {
      font-family: "Avenir";
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 30px;
      /* or 167% */
      color: #140e2d;
    }
    .top {
      margin: 263px 30px 40px 30px;
    }
    .bottom {
      margin: 0 30px 0 30px;
    }
    .nftimage {
      width: 100%;
      div {
        width: 160px;
        height: 160px;
        background: #a3e4f5;
        position: absolute;
        top: 60px;
        left: 110px;
        transform: rotate(-15deg);
        border-radius: 10px;
      }
      img {
        width: 160px;
        height: 160px;
        position: absolute;
        top: 60px;
        left: 50%;
        transform: translateX(-37%);
        border-radius: 10px;
      }
    }
  }

  .six {
    background: url("../assets/images/bg_5.png") no-repeat;
    background-size: 100% 100%;
    box-sizing: border-box;
    position: relative;
    .name {
      display: table;
      position: relative;
      &::after {
        display: block;
        content: "";
        position: absolute;
        bottom: 0;
        left: -2%;
        width: 104%;
        height: 15px;
        background: #dfa7ee;
        z-index: -1;
      }
    }

    .bg {
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
    }
    .monkey {
      width: 258.42px;
      margin-left: 58px;
    }

    .triangle {
      width: 333px;
      height: 509px;
      position: absolute;
      left: 21px;
      top: 78px;
      background: url("../assets/images/Rectangle1.png") no-repeat;
      background-size: 100% 100%;

      .face {
        width: 147.5px;
        position: absolute;
        bottom: -50px;
        right: -21px;
      }
    }
    p {
      font-family: "Avenir";
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 30px;
      /* or 167% */
      color: #140e2d;
    }
    .top {
      margin: 122px 30px 30px 20px;
    }
    .bottom {
      margin: 0 30px 0 20px;
    }
  }
  .seven {
    background: url("../assets/images/bg_6.png") no-repeat;
    background-size: 100% 100%;
    .name {
      display: table;
      position: relative;
      &::after {
        display: block;
        content: "";
        position: absolute;
        bottom: 0;
        left: -2%;
        width: 104%;
        height: 15px;
        background: #dfa7ee;
        z-index: -1;
      }
    }
    .bg {
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
    }
    p {
      font-family: "Avenir";
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 30px;
      /* or 167% */
      color: #140e2d;
    }
    .top {
      margin: 43% 20px 40px 35px;
    }
    .bottom {
      margin: 0 20px 0 35px;
    }
  }

  .nine {
    background: url("../assets/images/bg14.png") no-repeat;
    background-size: 100% 100%;
    .safe-content {
      > img:nth-child(2) {
        width: 331px;
        position: absolute;
        top: 148px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .bg {
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
    }

    .key {
      position: absolute;
      width: 307px;
      top: 79px;
      left: 50%;
      transform: translateX(-50%);
    }

    .touch {
      width: 165px;
    }
    .word {
      width: 290px;
      position: absolute;
      top: 152px;
      left: 50%;
      margin-left: -145px;
      position: relative;
      background: url("../assets/images/Rectangle3.png") no-repeat;
      background-size: 100% 100%;
      padding-top: 21px;
      .person {
        position: absolute;
        top: 125px;
        right: -4px;
        width: 112px;
      }

      .p1,
      .p2 {
        position: relative;
        font-family: "Lato";
        font-style: normal;
        font-weight: 700;
        font-size: 25px;
        line-height: 30px;
        text-align: center;
        text-transform: capitalize;
        color: #ffffff;
        text-align: center;
        width: 100%;
        margin: 0 auto;
        filter: drop-shadow(-2px 0px 0px #2e77ba)
          drop-shadow(2px 0px 0px #af4e90);
      }
      .p3 {
        width: 161px;
        margin-top: 51.5px;
        margin-left: 20px;
        font-family: "Lato";
        font-style: normal;
        font-weight: 800;
        font-size: 25px;
        line-height: 30px;
        text-transform: capitalize;

        color: #ffffff;
      }

      .p4 {
        font-family: "Lato";
        font-style: normal;
        font-weight: 700;
        font-size: 50px;
        line-height: 60px;
        /* identical to box height */

        text-transform: capitalize;

        color: #ffffff;
        margin-left: 83px;
      }
      .stars {
        margin-top: 91px;
        margin-left: 6px;
        img {
          width: 12px;
          margin-right: 6px;
        }
      }

      .line {
        width: 260px;
        height: 1px;
        margin-left: 15px;
        font-size: 0;
        padding-top: 25px;
        img {
          width: 100%;
        }
      }
    }
  }

  .text {
    div {
      font-family: "Lato";
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 24px;
      color: #140e2d;
      text-align: left;
      span {
        color: #f86fa0;
        font-weight: 700;
        font-size: 26px;
      }
    }
  }

  .monkey {
    position: relative;
    width: 202px;
    height: 202px;
    margin: auto;
    div {
      width: 202px;
      height: 202px;
      border-radius: 10px;
      position: absolute;
      top: 0;
      left: 50%;
      margin-left: -101px;
      img {
        width: 202px;
        height: 202px;
        border-radius: 10px;
      }
      &:first-child {
        width: 202px;
        height: 202px;
        transform: translate(3%, 3%);
        background: #ffffff;
        opacity: 0.5;
        border-radius: 10px;
      }
      &:last-child {
        width: 202px;
        height: 202px;
        background: url("../assets/images/nftbg.png") no-repeat;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-family: "BM Dohyeon";
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 33px;
        text-transform: capitalize;
        color: #101011;
        text-shadow: 0px 1px 4px rgba(234, 234, 234, 0.25),
          -3px 0px 2px rgba(241, 104, 27, 0.33);
      }
    }
  }

  .touch {
    width: 117px;
    position: absolute;
    z-index: 2;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>