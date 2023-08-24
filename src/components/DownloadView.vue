<template>
  <div class="download">
    <img class="bg" src="../assets/images/bg23.png" alt="" />
    <img class="icon" src="../assets/images/may_icon.png" alt="" />
    <div class="download_box">
      <div class="box">
        Download the client to participate to the event!
        <img src="../assets/images/gift1.png" alt="" />
      </div>
      <div class="link">
        <div
          @click="
            openUrl(
              'https://play.google.com/store/apps/details?id=social.may.android'
            )
          "
          class="android"
        >
          <img src="../assets/images/android.png" alt="" />
          <img src="../assets/images/android_btn.png" alt="" />
        </div>
        <div
          style="
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          "
        >
          <div
            @click="
              openUrl('https://data.may.social/download/windows/May_126.exe')
            "
            class="window"
          >
            <img src="../assets/images/win.png" alt="" />
            <img src="../assets/images/windows_btn.png" alt="" />
          </div>
          <div
            @click="
              openUrl(
                'https://apps.apple.com/us/app/may-meet-another-you/id1562831987'
              )
            "
            class="ios"
          >
            <img src="../assets/images/ios.png" alt="" />
            <img src="../assets/images/ios_btn.png" alt="" />
          </div>
        </div>
      </div>
      <img class="bg1" src="../assets/images/bg22.png" alt="" />
    </div>
    <div @click="participate" class="btn">
        <img src="../assets/images/btn2.png" alt="" />
        <div>Win ca$h rewards</div>
        <img src="../assets/images/shadow.png" alt="" />
      </div>
      <div class="link1">
        <a target="_blank" href="https://discord.com/invite/JbqnrYwcmd"
          >Join us</a
        >
        <a target="_blank" href="https://web3.may.social/">Visit MAY web</a>
      </div>
  </div>
</template>

<script>
export default {
  methods: {
    openUrl(url) {
      window.open(url);
    },
    participate() {
      window.open("https://app.quest3.xyz/quest/721964913739629010");
    },
  },
};
</script>

<style lang="scss" scoped>
@media (min-aspect-ratio: 375/758) {
  .download_box {
    transform: scale(0.8) translateY(-100px);
  }
  .icon {
    top: 20px !important;
    left: 5%!important;
  }
}
@keyframes scaleTo {
  from {
    transform: scale(0.9);
  }
  to {
    transform: scale(1);
  }
}
@keyframes slide {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(114px);
  }
}
@keyframes shake {
  0%,
  100% {
    transform: translate(-1px, -2px) rotate(2deg);
  }

  50% {
    transform: translate(1px, 2px) rotate(-2deg);
  }
}
@keyframes float {
  0% {
    transform: translate3d(0, 10px, 0);
  }

  100% {
    transform: translate3d(0, -20px, 0);
  }
}
.download {
  width: 100%;
  height: 100%;
  background: url("../assets/images/bg20.png") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;
  .download_box {
    height: 100%;
  }
  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .bg1 {
    width: 307.5px;
    display: block;
    margin: -140px auto 0;
  }
  .icon {
    width: 120px;
    position: absolute;
    top: 50px;
    left: 40px;
  }
  .box {
    width: 315px;
    height: 120px;
    position: absolute;
    top: 120px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(
      176.29deg,
      rgba(255, 255, 255, 0.22) -16.04%,
      rgba(255, 255, 255, 0) 97.21%
    );
    // opacity: 0.6;
    border: 1px dashed #ffffff;
    border-radius: 20px;
    font-family: "Lato";
    font-style: normal;
    font-weight: 500;
    font-size: 21px;
    text-align: center;
    color: #ffffff;
    padding: 30px 10px 0;
    box-sizing: border-box;
    position: relative;
    img:first-child {
      width: 137px;
      position: absolute;
      top: -93px;
      right: -43px;
    }
    // img:last-child {
    //   width: 165px;
    //   position: absolute;
    //   top: 120px;
    //   left: 72px;
    // }
  }
  .link {
    margin-top: 167px;
    position: relative;
    z-index: 1;
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      img:first-child {
        width: 100%;
      }
      img:last-child {
        width: 95px;
      }
    }
    .android {
      width: 148.59px;
      margin: 0 auto;
      img:first-child {
        animation: float 0.5s alternate infinite;
      }
      img:last-child {
        margin-top: -10px;
      }
    }
    .window {
      width: 101px;
      margin-left: 25px;
      img:first-child {
        animation: float 0.7s 0.5s alternate infinite;
      }
    }
    .ios {
      width: 154px;
      margin-top: -50px;
      img:first-child {
        animation: float 0.5s 0.5s alternate infinite;
      }
      img:last-child {
        margin-top: -10px;
      }
    }
  }
  .btn {
    width: 165px;
    position: absolute;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    div {
      width: 100%;
      font-family: "Lato";
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 50px;
      /* or 15px */
      text-align: center;
      color: #ffffff;
      position: absolute;
      top: 0;
      left: 0;
      animation: shake 1s linear infinite;
    }
    img:first-child {
      width: 100%;
      animation: scaleTo 1s linear infinite alternate;
    }
    img:last-child {
      width: 51px;
      position: absolute;
      left: 0;
      top: 0;
      animation: slide 1s linear infinite;
    }
  }
  .link1 {
    width: 100%;
    padding: 0 40px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 15px;
    left: 0;
    a {
      font-family: "Lato";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      text-align: center;
      text-decoration-line: underline;
      text-transform: capitalize;
      color: #ffffff;
      opacity: 0.5;
      text-decoration: none;
      border-bottom: 1px solid #938a9c;
      padding-bottom: 3px;
    }
  }
}
</style>