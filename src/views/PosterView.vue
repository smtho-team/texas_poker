<template>
  <div class="poster">
    <img class="bg" src="../assets/images/bg29.png" alt="" />
    <img class="bg" src="../assets/images/bg28.png" alt="" />
    <img class="icon" src="../assets/images/may_icon.png" alt="" />
    <div class="review">
      <div>2022 NFT review</div>
      <div class="line"></div>
      <div v-if="address">
        ID:{{ address.substr(0, 6) }}...{{ address.substr(-6) }}
      </div>
    </div>
    <!-- <div class="text">
      <img src="../assets/images/left.png" alt="" />
      <img src="../assets/images/bottom.png" alt="" />
      <span> Earn money even while lying down </span>
    </div> -->
    <div class="column">
      <div>
        <div class="monkey">
          <!-- <div :style="{'background': 'url('+img1+') no-repeat',backgroundSize: '200% 200%',backgroundPosition: '50% 55%'}" class="monkey"> -->
          <!-- <img :src="img1" alt="" /> -->
          <div>{{ name1 }}</div>
        </div>
        <div class="ball">
          <img src="../assets/images/ball1.png" alt="" />
          <div class="content">
            My largest bag
            <div>
              Ξ{{ bag ? (bag < 1 ? bag.toFixed(4) : bag.toFixed(2)) : 0 }}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="monkey">
          <!-- <div :style="{'background': 'url('+img2+') no-repeat',backgroundSize: '200% 200%',backgroundPosition: '50% 55%'}" class="monkey"> -->
          <!-- <img :src="img2" alt="" /> -->
          <div>{{ name3 }}</div>
        </div>
        <div class="ball">
          <img src="../assets/images/ball2.png" alt="" />
          <div class="content">
            My biggest win
            <div>
              <img src="../assets/images/up.png" alt="" />
              <span
                >{{
                  win ? (win < 1 ? win.toFixed(4) : win.toFixed(2)) : 0
                }}%</span
              >
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="monkey">
          <!-- <div :style="{'background': 'url('+img3+') no-repeat',backgroundSize: '200% 200%',backgroundPosition: '50% 55%'}" class="monkey"> -->
          <!-- <img :src="img3" alt="" /> -->
          <div>{{ name2 }}</div>
        </div>
        <div class="ball">
          <img src="../assets/images/ball3.png" alt="" />
          <div class="content">
            My worst paperhand
            <div>
              <img src="../assets/images/down.png" alt="" />
              <span
                >{{
                  paper ? (paper < 1 ? paper.toFixed(4) : paper.toFixed(2)) : 0
                }}%</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="display: none" class="qrcode">
      <img src="../assets/images/qr.png" alt="" />
    </div>
    <div style="display: none" class="scan">
      Scan the QR code to review your 2022
    </div>
    <img
      @click="toCanvas"
      class="touch1"
      src="../assets/images/btn3.png"
      alt=""
    />
    <img
      style="display: none"
      class="partners"
      src="../assets/images/partner.png"
      alt=""
    />
  </div>
</template>

<script>
import html2canvas from "html2canvas";
// import domtoimage from "dom-to-image";
import { getCurrentInstance } from "vue";
import { useSwiper } from "swiper/vue";

export default {
  data() {
    return {
      address: null,
    };
  },
  props: ["bag", "win", "paper", "name1", "name2", "name3"],
  methods: {
    toCanvas() {
      const instance = getCurrentInstance();
      // instance?.appContext.config.globalProperties.$amplitude
      //   .getInstance()
      //   .logEvent("H5_2022_DOWNLOAD_POSTER_CLICK");
      var shellContainerRef = document.querySelector(".poster");
      // var qrcode = document.getElementsByClassName('qrcode')[0];
      // qrcode.style.display = "block";
      // domtoimage
      //   .toPng(shellContainerRef)
      //   .then((dataUrl) => {
      //     //输出图片的Base64,dataUrl
      //     // 下载到PC
      //     this.savePic(dataUrl);
      //   })
      //   .catch(function (error) {
      //     console.error("oops, something went wrong!", error);
      //   });
      html2canvas(shellContainerRef, {
        allowTaint: true,
        useCORS: true,
        preserveDrawingBuffer: true,
        onclone: function (clonedDoc) {
          clonedDoc.getElementsByClassName("qrcode")[0].style.display = "block";
          clonedDoc.getElementsByClassName("touch1")[0].style.display = "none";
          clonedDoc.getElementsByClassName("scan")[0].style.display = "block";
          clonedDoc.getElementsByClassName("partners")[0].style.display =
            "block";
          clonedDoc.getElementsByClassName("bg")[0].style.height = "690px";
          clonedDoc.getElementsByClassName("bg")[1].style.height = "690px";
        },
        // width: shellContainerRef.clientWidth, //dom 原始宽度
        // height: shellContainerRef.clientHeight,
        scrollY: 0, // html2canvas默认绘制视图内的页面，需要把scrollY，scrollX设置为0
        scrollX: 0,
      }).then((canvas) => {
        // 生成的ba64图片
        const base64Data = canvas.toDataURL("image/jpeg", 1);
        // console.log(base64Data, "图片地址");
        this.savePic(base64Data);
      });
      this.$parent.showPaiticipate = true;
      setTimeout(() => {
        this.$parent.swipers.value.update();
        this.$parent.swipers.value.slideNext();
      }, 0);
    },
    // 保存图片方法
    savePic(base64) {
      var arr = base64.split(",");
      var bytes = atob(arr[1]);
      let ab = new ArrayBuffer(bytes.length);
      let ia = new Uint8Array(ab);
      for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      // var array = new Int8Array([17, -45.3]);

      // try {
      //   var jpeg = new Blob([ab], { type: "image/jpeg" });
      // } catch (e) {
      //   // TypeError old chrome and FF
      //   window.BlobBuilder =
      //     window.BlobBuilder ||
      //     window.WebKitBlobBuilder ||
      //     window.MozBlobBuilder ||
      //     window.MSBlobBuilder;
      //   if (e.name == "TypeError" && window.BlobBuilder) {
      //     var bb = new BlobBuilder();
      //     bb.append([ab]);
      //     var jpeg = bb.getBlob("image/jpeg");
      //   } else if (e.name == "InvalidStateError") {
      //     // InvalidStateError (tested on FF13 WinXP)
      //     var jpeg = new Blob([ab], { type: "image/jpeg" });
      //   } else {
      //     // We're screwed, blob constructor unsupported entirely
      //   }
      // }
      var blob = new Blob([ab], { type: "application/octet-stream" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = new Date().valueOf() + ".png";
      console.log(a.download,'download')
      var e = document.createEvent("MouseEvents");
      e.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      a.dispatchEvent(e);
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 0);
    },
  },
  mounted() {
    this.address = localStorage.getItem("wallet");
  },
};
</script>

<style lang="scss" scoped>
@media (min-aspect-ratio: 375/758) {
  .column {
    transform: scale(0.8) translateY(-30px);
  }
  .touch1 {
    bottom: 50px !important;
  }
}
.poster {
  width: 100%;
  height: 100%;
  // background: url("../assets/images/bg27.jpg"), url("../assets/images/bg26.png");
  // background-size: 100% 100%, 100% 100%;
  background-size: 100% 100%;
  box-sizing: border-box;
  position: relative;
  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .icon {
    width: 120px;
    position: absolute;
    top: 44px;
    left: 31px;
  }
  .review {
    width: 164.5px;
    height: 65px;
    background: url("../assets/images/img1.png") no-repeat;
    background-size: 100% 100%;
    padding: 12px 10px 0 0;
    box-sizing: border-box;
    position: absolute;
    top: 12px;
    right: 0;
    text-align: right;
    div:first-child {
      font-family: "Lato";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      color: #ffffff;
      margin-bottom: 3.5px;
    }
    div:nth-child(2) {
      width: 93px;
      height: 1px;
      background: #ffffff;
      opacity: 0.6;
      margin-left: 60px;
      margin-bottom: 2px;
    }
    div:last-child {
      font-family: "Lato";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      color: #ffffff;
      opacity: 0.5;
    }
  }
  .text {
    position: absolute;
    top: 113.05px;
    left: 190px;

    img:first-child {
      position: absolute;
      top: 0;
      left: 0;
      width: 11.5px;
      height: 11px;
    }
    img:nth-child(2) {
      position: absolute;
      top: 72px;
      left: 58px;
      width: 11.5px;
      height: 11px;
    }
    span {
      display: block;
      width: 150px;
      margin-left: 8px;
      margin-top: 7px;
      font-family: "Lato";
      font-style: normal;
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
      color: #ffffff;
      // -webkit-text-stroke: #2E77BA;
      filter: drop-shadow(-2px 0px 0px #2e77ba) drop-shadow(2px 0px 0px #af4e90);
    }
  }
  .column {
    position: absolute;
    top: 118px;
    left: 0;
    width: 100%;
    > div {
      .content {
        width: 90px;
        text-align: center;
        font-family: "Lato";
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        /* or 18px */
        color: #ffffff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-55%, -40%);
        z-index: 2;
        div {
          display: inline-block;
          vertical-align: middle;
          position: relative;
          img {
            width: 11px;
          }
          &::before {
            display: block;
            content: "";
            width: 100%;
            height: 12px;
            background: #fe737e;
            position: absolute;
            bottom: 0px;
            left: 0;
            z-index: -1;
          }
        }
      }
    }
    > div:first-child {
      width: 142px;
      height: 198px;
      background: url("../assets/images/zhu1.png") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      top: 76px;
      left: 48px;
      perspective: 500px;
      .monkey {
        width: 72px;
        height: 167px;
        position: absolute;
        left: 0;
        top: 55px;
        transform: skew(0deg, 20deg);
        perspective-origin: left;
        img {
          width: 100%;
        }
        div {
          font-family: "Lato";
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 17px;
          text-transform: capitalize;
          color: #ffffff;
          opacity: 0.5;
          width: 50px;
          margin: 36px auto 0;
          // word-break: break-all;
          word-wrap: break-word;
        }
        // clip-path: polygon(0% 0%, 100% 18%, 100% 100%, 0% 100%);
        // background: linear-gradient(
        //   180deg,
        //   #6d2ba6 4.03%,
        //   rgba(96, 10, 10, 0) 100%
        // );
        // img {
        //   width: 100%;
        // }
      }
      .ball {
        position: absolute;
        top: -76px;
        left: 0px;
        width: 143px;
        height: 128px;
        > img {
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    }
    > div:nth-child(2) {
      width: 178px;
      height: 315px;
      background: url("../assets/images/column2.png") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      top: 177px;
      left: 173px;
      perspective: 500px;
      .monkey {
        width: 90px;
        position: absolute;
        left: 0;
        top: 56px;
        background: linear-gradient(
          180deg,
          #6d2ba6 4.03%,
          rgba(96, 10, 10, 0) 100%
        );
        transform: skew(0deg, 22deg);
        perspective-origin: left;
        img {
          width: 100%;
        }
        div {
          font-family: "Lato";
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 17px;
          text-transform: capitalize;
          color: #ffffff;
          opacity: 0.5;
          width: 50px;
          margin: 36px auto 0;
          // word-break: break-all;
          word-wrap: break-word;
        }
      }
      .ball {
        position: absolute;
        top: -76px;
        left: 20px;
        width: 143px;
        height: 128px;
        > img {
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    }
    > div:nth-child(3) {
      width: 141px;
      height: 212px;
      background: url("../assets/images/column3.png") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      top: 324px;
      left: 31px;
      perspective: 500px;
      .monkey {
        width: 72px;
        height: 183px;
        position: absolute;
        left: 0;
        top: 45px;
        transform: skew(0deg, 25deg);
        perspective-origin: left;
        &::after {
          display: block;
          content: "";
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background: linear-gradient(
            180deg,
            #6d2ba6 4.03%,
            rgba(96, 10, 10, 0) 100%
          );
          // z-index: -1;
        }
        img {
          width: 100%;
        }
        div {
          font-family: "Lato";
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 17px;
          text-transform: capitalize;
          color: #ffffff;
          opacity: 0.5;
          width: 50px;
          margin: 36px auto 0;
          // word-break: break-all;
          word-wrap: break-word;
        }
      }
      .ball {
        position: absolute;
        top: -76px;
        left: 0px;
        width: 143px;
        height: 128px;
        > img {
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    }
  }
  .qrcode {
    width: 94px;
    height: 95px;
    background: #1c1c1c;
    position: absolute;
    bottom: 128px;
    left: 44px;
    padding: 8px 7px 0;
    box-sizing: border-box;
    border-radius: 10px;
    img {
      width: 80px;
      height: 80px;
    }
  }
  .scan {
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    opacity: 0.8;
    width: 213px;
    position: absolute;
    bottom: 156px;
    right: 4%;
    text-align: left;
    color: #ffffff;
  }
  .touch1 {
    width: 255px;
    height: 46px;
    position: absolute;
    bottom: 60px;
    left: 60px;
    z-index: 10;
  }
  .partners {
    width: 316px;
    position: absolute;
    bottom: 35px;
    left: 50%;
    margin-left: -158px;
  }
}
</style>