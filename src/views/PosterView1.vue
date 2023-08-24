<template>
  <div :style="{ opacity: hasOpacity }" class="poster">
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
    <div class="text">
      <!-- <img src="../assets/images/left.png" alt="" /> -->
      <!-- <img src="../assets/images/bottom.png" alt="" /> -->
      <div>Annual Keyword</div>
      <div>{{ keyword }}</div>
    </div>
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
            Currently hold <span>{{ holdCount }}</span> NFTs
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
            Worth <span>{{ worth }}</span> ETH
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
            Do <span>{{ tx }}</span> transactions on-chain in 2022
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
    <img v-show="isQq" class="press" src="../assets/images/press.png" alt="" />
    <div @click="savePic" class="touch1">
      <img src="../assets/images/save1.png" alt="" />
      {{ isQq?'Share the poster and win prizes':'Save the poster and win prizes' }}
    </div>
    <img
      style="display: none"
      class="partners"
      src="../assets/images/partner.png"
      alt=""
    />
    <img class="real_poster" v-if="baseData" alt="" />
  </div>
</template>
  
  <script>
import html2canvas from "html2canvas";
// import domtoimage from "dom-to-image";
import { getCurrentInstance } from "vue";
import { useSwiper } from "swiper/vue";
import tip from "@/components/TipView.vue";

export default {
  data() {
    return {
      address: null,
      imgurl: null,
      isQq: false,
    };
  },
  components: {},
  props: [
    "bag",
    "win",
    "paper",
    "name1",
    "name2",
    "name3",
    "holdCount",
    "worth",
    "tx",
    "keyword",
    "baseData",
    "hasOpacity",
  ],
  methods: {
    toCanvas() {
      const instance = getCurrentInstance();
      console.log(instance,'instance')
      if(instance) {
         instance.appContext.config.globalProperties.$amplitude
        .getInstance()
        .logEvent("H5_2022_DOWNLOAD_POSTER_CLICK");
      }
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
          clonedDoc.getElementsByClassName("press")[0].style.display = "none";
          clonedDoc.getElementsByClassName("scan")[0].style.display = "block";
          clonedDoc.getElementsByClassName("poster")[0].style.opacity = "1";
          clonedDoc.getElementsByClassName("partners")[0].style.display =
            "block";
          // clonedDoc.getElementsByClassName("bg")[0].style.height = "690px";
          // clonedDoc.getElementsByClassName("bg")[1].style.height = "690px";
        },
        // width: shellContainerRef.clientWidth, //dom 原始宽度
        // height: shellContainerRef.clientHeight,
        scrollY: 0, // html2canvas默认绘制视图内的页面，需要把scrollY，scrollX设置为0
        scrollX: 0,
      })
        .then((canvas) => {
          // 生成的ba64图片
          const base64Data = canvas.toDataURL("image/jpeg", 1);
          console.log("生成图片");
          this.$parent.loadingImg = false;
          this.$parent.baseData = base64Data;
          //进入下一页
          this.$parent.showPoster = true;
          setTimeout(() => {
            this.$parent.swipers.value.update();
            this.$parent.swipers.value.slideNext();
          }, 0);
        })
        .catch((err) => {
          console.log("生成失败", err);
        });
    },
    // 保存图片方法
    savePic() {
      var base64 = this.baseData;
      var arr = base64.split(",");
      var bytes = atob(arr[1]);
      let ab = new ArrayBuffer(bytes.length);
      let ia = new Uint8Array(ab);
      for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      var blob = new Blob([ab], { type: "application/octet-stream" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = new Date().valueOf() + ".png";
      document.body.appendChild(a);
      console.log(a.download, "download");
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
      if(!this.isQq) {
        a.dispatchEvent(e);
      }
      this.$parent.showPaiticipate = true;
      setTimeout(() => {
        URL.revokeObjectURL(url);
        this.$parent.swipers.value.update();
        this.$parent.swipers.value.slideNext();
      }, 0);
    },
  },
  mounted() {
    this.address = localStorage.getItem("wallet");
    if (this.baseData) {
      document.querySelector(".real_poster").src = this.baseData;
    }
    //判断什么类型手机打开的网页
    let flag = navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );
    if (flag == "Android,Android") {
      //如果是安卓手机打开判断是否是QQ或者微信浏览器打卡，并做出提示，QQ微信浏览器兼容性差
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/QQ/i) == "qq") {
        this.isQq = true;
        console.log("qq浏览器");
      }
    }
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
@media only screen and (min-width: 750px) and (max-height: 700px) {
      .qrcode {
        left: 17% !important;
      }
      .scan {
        right: 10% !important;
      }

      /* .icons img {
        margin-right: 40px !important;
      } */
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
    top: 20px;
    left: 20px;
  }
  .review {
    width: 164.5px;
    height: 65px;
    background: url("../assets/images/img1.png") no-repeat;
    background-size: 100% 100%;
    padding: 12px 10px 0 0;
    box-sizing: border-box;
    position: absolute;
    top: 0;
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
    top: 80px;
    left: 50%;
    transform: translateX(-50%);
    width: 338px;
    height: 78px;
    background: url("../assets/images/keybox.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // img:first-child {
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   width: 11.5px;
    //   height: 11px;
    // }
    // img:nth-child(2) {
    //   position: absolute;
    //   top: 72px;
    //   left: 58px;
    //   width: 11.5px;
    //   height: 11px;
    // }
    div:first-child {
      font-family: "Avenir";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 19px;
      text-align: center;
      text-transform: capitalize;
      color: #ffffff;
    }
    div:last-child {
      display: block;
      margin-left: 8px;
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
    // position: absolute;
    // top: 118px;
    // left: 0;
    width: 100%;
    transform: scale(0.75);
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
        span {
          color: #f86fa0;
          font-weight: 800;
        }
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
      width: 183px;
      height: 296px;
      background: url("../assets/images/zhu1.png") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      top: 250px;
      left: 20px;
      perspective: 500px;
      .content {
        margin-top: -20px;
      }
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
        top: -30px;
        left: 34px;
        width: 124px;
        height: 152.5px;
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
      height: 319px;
      background: url("../assets/images/column2.png") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      top: 387px;
      right: 20px;
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
        left: 38px;
        width: 135px;
        height: 124px;
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
      height: 221.5px;
      background: url("../assets/images/column3.png") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      top: 512px;
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
          // display: block;
          // content: "";
          // width: 100%;
          // height: 100%;
          // position: absolute;
          // top: 0;
          // left: 0;
          // background: linear-gradient(
          //   180deg,
          //   #6d2ba6 4.03%,
          //   rgba(96, 10, 10, 0) 100%
          // );
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
        left: 12px;
        width: 137.5px;
        height: 124px;
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
    position: absolute;
    bottom: 88px;
    left: 44px;
    border-radius: 10px;
    img {
      width: 100%;
      height: 100%;
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
    bottom: 116px;
    right: 10px;
    text-align: left;
    color: #ffffff;
  }
  .press {
    width: 230px;
    height: 19px;
    position: absolute;
    bottom: 110px;
    left: 50%;
    transform: translateX(-50%);
  }
  .touch1 {
    width: 255px;
    height: 46px;
    position: absolute;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Avenir";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    text-align: center;
    color: #ffffff;
    background: url("../assets/images/save2.png") no-repeat;
    background-size: contain;
    img {
      width: 16px;
      height: 16px;
      margin-right: 10px;
    }
  }
  .partners {
    width: 316px;
    position: absolute;
    bottom: 35px;
    left: 50%;
    margin-left: -158px;
  }
}
.real_poster {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
</style>