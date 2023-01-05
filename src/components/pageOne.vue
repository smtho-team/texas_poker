<template>
  <div class="scene">
    <div class="swiper-container swiper1">
      <div class="swiper-wrapper">
        <div class="swiper-slide one">
          <img class="bg" src="../assets/images/bg25.png" alt="" />
          <div class="safe-content">
            <div class="text">
              <div>
                You’ve diamond-handed a total of
                <span
                  >Ξ<CountTo
                    :start="0"
                    :end="diamondHanded.boughtNftVolume"
                    :decimals="diamondHanded.boughtNftVolume < 1 ? 4 : 2"
                    :autoPlay="true"
                    :duration="3000"
                /></span>
                in 2022
              </div>
              <div>
                The current value is
                <span
                  >Ξ<CountTo
                    :start="0"
                    :end="diamondHanded.holdNftVolume"
                    :decimals="diamondHanded.holdNftVolume < 1 ? 4 : 2"
                    :autoPlay="true"
                    :duration="3000"
                /></span>
              </div>
              <div v-if="nft1 != 0">Your biggest investment?</div>
              <div v-if="nft1 != 0">{{ diamondHanded.maxBoughtNftName }}</div>
            </div>
            <div v-if="nft1 != 0" class="monkey">
              <div></div>
              <div>
                {{ diamondHanded.maxBoughtNftName }}
              </div>
            </div>
            <div v-if="nft1 == 0" class="box">
              <img src="../assets/images/gift2.png" alt="" />
              <img src="../assets/images/gift3.png" alt="" />
            </div>
          </div>
          <img class="touch" src="../assets/images/swipeUp.png" alt="" />
        </div>
        <div class="swiper-slide two" v-show="nft1 != 0">
          <img class="bg" src="../assets/images/bg7.png" alt="" />
          <img class="table" src="../assets/images/table.png" alt="" />
          <img class="woman" src="../assets/images/woman.png" alt="" />
          <div class="safe-content">
            <div class="monkey">
              <div></div>
              <div>
                {{ diamondHanded.maxBoughtNftName }}
              </div>
            </div>
            <div class="text">
              <div>
                You aped in at
                <span
                  >Ξ<CountTo
                    v-if="swipeIndex == 1"
                    :start="0"
                    :end="diamondHanded.maxBoughtNftPrice"
                    :decimals="diamondHanded.maxBoughtNftPrice < 1 ? 4 : 2"
                    :autoPlay="true"
                    :duration="3000"
                /></span>
              </div>
              <div>
                The floor price right now is
                <span
                  >Ξ<CountTo
                    v-if="swipeIndex == 1"
                    :start="0"
                    :end="diamondHanded.maxBoughtNftFloorPrice"
                    :decimals="diamondHanded.maxBoughtNftFloorPrice < 1 ? 4 : 2"
                    :autoPlay="true"
                    :duration="3000"
                /></span>
              </div>
              <div>
                You’ve been hodling for
                <span
                  ><CountTo
                    v-if="swipeIndex == 1"
                    :start="0"
                    :end="diamondHanded.maxBoughtNftHoldTime"
                    :decimals="0"
                    :autoPlay="true"
                    :duration="3000"
                /></span>
                {{ diamondHanded.maxBoughtNftHoldTime <= 1 ? "day" : "days" }}
              </div>
            </div>
          </div>
          <img class="touch" src="../assets/images/swipeUp.png" alt="" />
        </div>
        <div class="swiper-slide three">
          <div class="safe-content">
            <div class="text">
              <div>
                Ughhh :( You’ve paperhanded a total of
                <span
                  >Ξ
                  <CountTo
                    v-if="
                      (nft1 != 0 && swipeIndex == 2) ||
                      (nft1 == 0 && swipeIndex == 1)
                    "
                    :start="0"
                    :end="paperhands.priceDifferenceTotal"
                    :decimals="paperhands.priceDifferenceTotal < 1 ? 4 : 2"
                    :autoPlay="true"
                    :duration="3000"
                /></span>
                in 2022
              </div>
              <div v-if="nft2 != 0">Your biggest investment?</div>
              <div v-if="nft2 != 0">{{ paperhands.maxDifferenceNftName }}</div>
            </div>
            <div v-if="nft2 == 0" class="box">
              <img src="../assets/images/gift2.png" alt="" />
              <img src="../assets/images/gift3.png" alt="" />
            </div>
            <div v-if="nft2 != 0" class="monkey">
              <div></div>
              <div>
                {{ paperhands.maxDifferenceNftName }}
              </div>
            </div>
          </div>
          <img class="touch" src="../assets/images/swipeUp.png" alt="" />
        </div>
        <div class="swiper-slide four" v-show="nft2 != 0">
          <img class="bg" src="../assets/images/bg9.png" alt="" />
          <div class="safe-content">
            <div class="monkey">
              <div></div>
              <div>
                {{ paperhands.maxDifferenceNftName }}
              </div>
            </div>
            <div class="text">
              <div>
                You aped in at
                <span
                  >Ξ<CountTo
                    v-if="
                      (nft1 != 0 && swipeIndex == 3) ||
                      (nft1 == 0 && swipeIndex == 2)
                    "
                    :start="0"
                    :end="paperhands.maxDifferenceNftBoughtPrice"
                    :decimals="
                      paperhands.maxDifferenceNftBoughtPrice < 1 ? 4 : 2
                    "
                    :autoPlay="true"
                    :duration="3000" /></span
                >,
              </div>
              <div>
                sold at
                <span
                  >Ξ<CountTo
                    v-if="
                      (nft1 != 0 && swipeIndex == 3) ||
                      (nft1 == 0 && swipeIndex == 2)
                    "
                    :start="0"
                    :end="paperhands.maxDifferenceNftSellPrice"
                    :decimals="paperhands.maxDifferenceNftSellPrice < 1 ? 4 : 2"
                    :autoPlay="true"
                    :duration="3000"
                /></span>
              </div>
              <div>
                The floor price right now is
                <span
                  >Ξ<CountTo
                    v-if="
                      (nft1 != 0 && swipeIndex == 3) ||
                      (nft1 == 0 && swipeIndex == 2)
                    "
                    :start="0"
                    :end="paperhands.maxDifferenceNftFloorPrice"
                    :decimals="
                      paperhands.maxDifferenceNftFloorPrice < 1 ? 4 : 2
                    "
                    :autoPlay="true"
                    :duration="3000"
                /></span>
              </div>
            </div>
          </div>
          <img class="touch" src="../assets/images/swipeUp.png" alt="" />
        </div>
        <div class="swiper-slide five">
          <img class="bg" src="../assets/images/bg12.png" alt="" />
          <img src="../assets/images/face2.png" class="face" alt="" />
          <div class="safe-content">
            <div class="triangle"></div>
            <div class="text">
              <div>
                Aweeesome! You’ve made a total of
                <span
                  >Ξ<CountTo
                    v-if="
                      (nft1 != 0 && nft2 != 0 && swipeIndex == 4) ||
                      (nft1 == 0 && nft2 != 0 && swipeIndex == 3) ||
                      (nft1 != 0 && nft2 == 0 && swipeIndex == 3) ||
                      (nft1 == 0 && nft2 == 0 && swipeIndex == 2)
                    "
                    :start="0"
                    :end="gainss.priceDifferenceTotal"
                    :decimals="gainss.priceDifferenceTotal < 1 ? 4 : 2"
                    :autoPlay="true"
                    :duration="3000"
                /></span>
                in 2022!
              </div>
              <div v-if="nft3 != 0">
                Apeing success rate
                <span
                  ><CountTo
                    v-if="
                      (nft1 != 0 && nft2 != 0 && swipeIndex == 4) ||
                      (nft1 == 0 && nft2 != 0 && swipeIndex == 3) ||
                      (nft1 != 0 && nft2 == 0 && swipeIndex == 3) ||
                      (nft1 == 0 && nft2 == 0 && swipeIndex == 2)
                    "
                    :start="0"
                    :end="
                      gainss.maxDifferenceGrowthRate
                        ? Number(
                            gainss.maxDifferenceGrowthRate.substr(
                              0,
                              gainss.maxDifferenceGrowthRate.length - 2
                            )
                          )
                        : 0
                    "
                    suffix="%"
                    :decimals="
                      gainss.maxDifferenceGrowthRate
                        ? Number(
                            gainss.maxDifferenceGrowthRate.substr(
                              0,
                              gainss.maxDifferenceGrowthRate.length - 2
                            )
                          ) < 1
                          ? 4
                          : 2
                        : 0
                    "
                    :autoPlay="true"
                    :duration="3000"
                /></span>
              </div>
              <div v-if="nft3 != 0">
                Your greatest NFT trade in 2022?<span>{{
                  gainss.maxDifferenceNftName
                }}</span>
              </div>
            </div>
            <div v-if="nft3 == 0" class="box">
              <img src="../assets/images/gift2.png" alt="" />
              <img src="../assets/images/gift3.png" alt="" />
            </div>
            <div v-if="nft3 != 0" class="monkey">
              <div></div>
              <div>
                {{ gainss.maxDifferenceNftName }}
              </div>
            </div>
          </div>
          <img class="touch" src="../assets/images/swipeUp.png" alt="" />
        </div>
        <div class="swiper-slide six" v-show="nft3 != 0">
          <img class="bg" src="../assets/images/bg12.png" alt="" />
          <div class="safe-content">
            <div class="triangle">
              <img class="face" src="../assets/images/face1.png" alt="" />
            </div>
            <div class="monkey">
              <div></div>
              <div>
                {{ gainss.maxDifferenceNftName }}
              </div>
            </div>
            <div class="text">
              <div>
                You aped in at
                <span
                  >Ξ<CountTo
                    v-if="
                      (nft1 != 0 && nft2 != 0 && swipeIndex == 5) ||
                      (nft1 == 0 && nft2 != 0 && swipeIndex == 4) ||
                      (nft1 != 0 && nft2 == 0 && swipeIndex == 4) ||
                      (nft1 == 0 && nft2 == 0 && swipeIndex == 3)
                    "
                    :start="0"
                    :end="
                      gainss.differenceCount && gainss.allSellCount
                        ? Number(gainss.differenceCount / gainss.allSellCount)
                        : 0
                    "
                    :decimals="
                      Number(gainss.differenceCount / gainss.allSellCount) < 1
                        ? 4
                        : 2
                    "
                    :autoPlay="true"
                    :duration="3000"
                /></span>
                sold at
                <span>
                  Ξ<CountTo
                    v-if="
                      (nft1 != 0 && nft2 != 0 && swipeIndex == 5) ||
                      (nft1 == 0 && nft2 != 0 && swipeIndex == 4) ||
                      (nft1 != 0 && nft2 == 0 && swipeIndex == 4) ||
                      (nft1 == 0 && nft2 == 0 && swipeIndex == 3)
                    "
                    :start="0"
                    :end="gainss.maxDifferenceNftSellPrice"
                    :decimals="gainss.maxDifferenceNftSellPrice < 1 ? 4 : 2"
                    :autoPlay="true"
                    :duration="3000"
                /></span>
              </div>
              <div>
                Your total investment gain is
                <span
                  ><CountTo
                    v-if="
                      (nft1 != 0 && nft2 != 0 && swipeIndex == 5) ||
                      (nft1 == 0 && nft2 != 0 && swipeIndex == 4) ||
                      (nft1 != 0 && nft2 == 0 && swipeIndex == 4) ||
                      (nft1 == 0 && nft2 == 0 && swipeIndex == 3)
                    "
                    :start="0"
                    :end="
                      gainss.maxDifferenceGrowthRate
                        ? Number(
                            gainss.maxDifferenceGrowthRate.substr(
                              0,
                              gainss.maxDifferenceGrowthRate.length - 2
                            )
                          )
                        : 0
                    "
                    :decimals="
                      gainss.maxDifferenceGrowthRate
                        ? Number(
                            gainss.maxDifferenceGrowthRate.substr(
                              0,
                              gainss.maxDifferenceGrowthRate.length - 2
                            )
                          ) < 1
                          ? 4
                          : 2
                        : 0
                    "
                    :autoPlay="true"
                    :duration="3000"
                  />%</span
                >，or
                <span
                  >Ξ<CountTo
                    v-if="
                      (nft1 != 0 && nft2 != 0 && swipeIndex == 5) ||
                      (nft1 == 0 && nft2 != 0 && swipeIndex == 4) ||
                      (nft1 != 0 && nft2 == 0 && swipeIndex == 4) ||
                      (nft1 == 0 && nft2 == 0 && swipeIndex == 3)
                    "
                    :start="0"
                    :end="gainss.maxDifference"
                    :decimals="gainss.maxDifference < 1 ? 4 : 2"
                    :autoPlay="true"
                    :duration="3000"
                /></span>
              </div>
            </div>
          </div>
          <img class="touch" src="../assets/images/swipeUp.png" alt="" />
        </div>
        <div class="swiper-slide seven">
          <PosterView
            :name1="diamondHanded.maxBoughtNftName"
            :name2="paperhands.maxDifferenceNftName"
            :name3="gainss.maxDifferenceNftName"
            :paper="
              (paperhands.maxDifferenceNftFloorPrice -
                paperhands.maxDifferenceNftSellPrice) /
              paperhands.maxDifferenceNftBoughtPrice
            "
            :win="
              (gainss.maxBoughtNftPrice -
                gainss.differenceCount / gainss.allSellCount) /
              (gainss.differenceCount / gainss.allSellCount)
            "
            :bag="diamondHanded.maxBoughtNftPrice"
          ></PosterView>
        </div>
        <div v-if="showPaiticipate" class="swiper-slide eight">
          <participate></participate>
        </div>
        <div v-if="showSeven" class="swiper-slide eight">
          <download></download>
        </div>
        <!-- <div class="swiper-slide nine">
          <img class="bg" src="../assets/images/bg13.png" alt="" />
          <div class="safe-content">
            <img class="key" src="../assets/images/keyword.png" alt="" />
            <img src="../assets/images/rectangle2.png" alt="" />
            <div class="word">
              <img class="person" src="../assets/images/woman1.png" alt="" />
                <div class="p1">earn money</div>
                <div class="p2">even while lying down</div>
                <div class="line">
                  <img src="../assets/images/line.png" alt="" />
                </div>
                <div class="p3">participants with this keyword is only</div>
                <div class="p4">5%</div>
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
        </div> -->
      </div>
    </div>
  </div>
</template>
  
  <script>
import { getCurrentInstance, reactive, onMounted, ref } from "vue";
import PosterView from "../views/PosterView.vue";
import ParticipateView from "../views/ParticipateView.vue";
import DownloadView from "@/components/DownloadView.vue";
import { useRouter } from "vue-router";
import { nextTick } from "process";

export default {
  components: {
    PosterView,
    participate: ParticipateView,
    download: DownloadView
  },
  props: ["gainss1", "diamondHanded1", "paperhands1"],
  setup(props) {
    const showPaiticipate = ref(false);
    const gainss = reactive(props.gainss1);
    const diamondHanded = reactive(props.diamondHanded1);
    const paperhands = reactive(props.paperhands1);
    const swipeIndex = ref(0);
    const touchable = ref(true);
    const nft1 = ref(0);
    const nft2 = ref(0);
    const nft3 = ref(0);
    const startY = ref(0);
    const showSeven = ref(false);
    const router = useRouter();
    const swipers = reactive({});
    const generate = () => {
      const instance = getCurrentInstance();
      instance?.appContext.config.globalProperties.$amplitude
        .getInstance()
        .logEvent("H5_2022_GENERAL_POSTER_CLICK");
      router.push("/poster");
    };
    const onChange = (index) => {
      swipeIndex.value = index;
    };
    onMounted(() => {
      nft1.value = diamondHanded.boughtNftVolume || 0;
      nft2.value = paperhands.priceDifferenceTotal || 0;
      nft3.value = gainss.priceDifferenceTotal || 0;
      nextTick(() => {
        swipers.value = new Swiper(".swiper1", {
          autoplay: false,
          observeParents: true, // 修改swiper的父元素时，自动初始化swiper
          on: {
            slideChange: function () {
              swipeIndex.value = this.activeIndex;
            },
          },
          direction: "vertical",
        });
      });
    });
    return {
      gainss,
      diamondHanded,
      paperhands,
      nft1,
      nft2,
      nft3,
      swipeIndex,
      touchable,
      onChange,
      generate,
      startY,
      showSeven,
      swipers,
      showPaiticipate,
    };
  },
  computed: {},
};
</script>
  
<style lang="scss" scoped>
// img {
//   pointer-events: none;
// }
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
@media screen and (max-width: 750px) and (min-aspect-ratio: 375/603) {
  .scene {
    .safe-content {
      transform: translateY(-10%) scale(0.9);
    }
    .two {
      .woman {
        transform: translate(-15%, 15%) scale(0.7);
      }
      .monkey {
        margin-bottom: 15px !important;
      }
      .text {
        div {
          &:first-child {
            margin-bottom: 16px !important;
          }

          &:nth-child(2) {
            margin-bottom: 16px !important;
          }
        }
      }
    }
    .five {
      .face {
        transform: translateX(0.8) scale(0.85);
      }
    }
    // .one {
    //   padding-top: 100px !important;
    // }
    // .three {
    //   padding-top: 80px !important;
    //   .text {
    //     div {
    //       &:first-child {
    //         margin-bottom: 40px !important;
    //       }
    //     }
    //   }
    // }
    // .four {
    //   .text {
    //     div:first-child {
    //       margin-top: 40px !important;
    //     }
    //   }
    // }
    // .five {
    //   padding-top: 180px !important;
    //   .text {
    //     div {
    //       margin-bottom: 40px !important;
    //       &:first-child {
    //         margin-bottom: 20px !important;
    //       }
    //     }
    //   }
    // }
    // .seven {
    //   .word {
    //     transform: scale(0.88) !important;
    //     top: 110px !important;
    //   }
    // }
  }
}
@media (min-aspect-ratio: 375/800) {
  .two {
    .text {
      div {
        &:first-child {
          margin-bottom: 10px !important;
        }
        &:nth-child(2) {
          margin-bottom: 10px !important;
        }
      }
    }
    .woman {
      transform: translate(-10%, 13%) scale(0.8);
    }
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
    background: url("../assets/images/bg5.png") no-repeat;
    background-size: 100% 100%;
    padding-top: 69px;
    box-sizing: border-box;
    .bg {
      width: 100%;
      position: absolute;
      top: 325px;
      left: 0;
    }
    .text {
      margin-left: 30px;
      div {
        &:first-child {
          margin-bottom: 30px;
          line-height: 24px;
        }

        &:nth-child(2) {
          margin-bottom: 30px;
        }

        &:last-child {
          margin-bottom: 50px;
          color: #f86fa0;
          font-weight: 700;
          width: 200px;
          line-height: 24px;
          font-size: 26px;
        }
      }
    }
  }

  .two {
    background: url("../assets/images/bg6.png") no-repeat;
    background-size: 100% 100%;
    padding-top: 30px;
    box-sizing: border-box;

    .bg {
      width: 100%;
      position: absolute;
      top: 140px;
      left: 0;
    }
    .monkey {
      margin-bottom: 27px;
    }

    .woman {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 152px;
    }

    .table {
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
    }

    .text {
      margin-left: 26px;
      div {
        &:first-child {
          margin-bottom: 20px;
        }

        &:nth-child(2) {
          margin-bottom: 20px;
        }

        &:nth-child(3) {
          margin-bottom: 0;
        }
      }
    }
  }

  .three {
    background: url("../assets/images/bg8.png") no-repeat;
    background-size: 100% 100%;
    padding: 98px 0 50px;
    box-sizing: border-box;

    .text {
      margin-right: 18px;
      div {
        text-align: right;

        &:first-child {
          text-align: right;
          margin-bottom: 55px;
        }

        &:nth-child(2) {
          margin-bottom: 0;
        }

        &:nth-child(3) {
          margin-bottom: 75px;
          color: #f86fa0;
          font-weight: 700;
          width: 100%;
          text-align: right;
        }
      }
    }
  }

  .four {
    background: url("../assets/images/bg8.png") no-repeat;
    background-size: 100% 100%;
    padding: 141.53px 0 50px 0px;
    box-sizing: border-box;

    .bg {
      width: 216px;
      position: absolute;
      right: 0;
      top: 0;
    }
    .text {
      div {
        text-align: right;
        margin-right: 27px;
        &:first-child {
          margin-top: 60.6px;
          margin-left: 85px;
        }
        &:nth-child(2) {
          margin-bottom: 30px;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  .five {
    background: url("../assets/images/bg11.png") no-repeat;
    background-size: 100% 100%;
    // padding-top: 211px;
    box-sizing: border-box;

    .bg {
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
    }

    .face {
      width: 161px;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
    }

    .triangle {
      width: 333px;
      height: 509px;
      position: absolute;
      left: 21px;
      top: 50px;
      background: url("../assets/images/Rectangle.png") no-repeat;
      background-size: 100% 100%;
    }

    .text {
      position: relative;
      width: 90%;
      margin: 0 auto;
      margin-bottom: 20px;
      padding-top: 160px;
      div {
        width: 306px;
        margin: 0 auto;
        text-align: left;
        &:first-child {
          margin-bottom: 18px;
        }
        &:nth-child(2) {
          margin-bottom: 18px;
        }
        &:nth-child(3) {
          span {
            font-weight: 700;
            display: block;
            width: 200px;
          }
        }
      }
    }
    .monkey {
      margin-left: 58px;
      width: 258.42px;
    }
  }

  .six {
    background: url("../assets/images/bg11.png") no-repeat;
    background-size: 100% 100%;
    padding-top: 42.53px;
    box-sizing: border-box;

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

    .text {
      position: relative;
      position: relative;
      width: 306px;
      text-align: center;
      margin: 58.6px auto 0;
      div {
        &:first-child {
          margin-bottom: 30px;
        }
      }
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
      left: 34px;
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