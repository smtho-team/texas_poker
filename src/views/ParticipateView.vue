<template>
  <div v-if="!isPremium" class="participate">
    <img class="icon" src="../assets/images/may_icon.png" alt="" />
    <div class="participate_box">
      <div class="bg1">
        <img src="../assets/images/bg15.png" alt="" />
        <img src="../assets/images/text3.png" alt="" />
      </div>
      <div class="bg2">
        <img src="../assets/images/bg17.png" alt="" />
        <img src="../assets/images/dot.png" alt="" />
        <img src="../assets/images/gift.png" alt="" />
        <img class="text" src="../assets/images/text4.png" alt="" />
        <img src="../assets/images/dot2.png" alt="" />
        <img src="../assets/images/line1.png" alt="" />
        <img src="../assets/images/dot3.png" alt="" />
      </div>
    </div>
    <div @click="participate" class="btn">
        <img src="../assets/images/btn2.png" alt="" />
        <div>Win ca$h rewards</div>
        <img src="../assets/images/shadow.png" alt="" />
      </div>
  </div>
  <download v-else></download>
</template>

<script>
import { getCurrentInstance } from "vue";
import download from "@/components/DownloadView.vue";
export default {
  data() {
    return {
      isPremium: false,
    };
  },
  components: {
    download,
  },
  methods: {
    participate() {
      const instance = getCurrentInstance();
      instance?.appContext.config.globalProperties.$amplitude
        .getInstance()
        .logEvent("H5_2022_WIN_PRIZES_CLICK");
      this.isPremium = true;
      this.$forceUpdate();
      window.open("https://app.quest3.xyz/quest/721964913739629010");
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
@media (min-aspect-ratio: 375/758) {
  .participate_box {
    transform: scale(0.85);
    .bg1 {
      top: 40px;
    }
    .bg2 {
      top: 245px;
    }
  }
  .btn {
    bottom: 4% !important;
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
.participate {
  width: 100%;
  height: 100%;
  background: url("../assets/images/bg20.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  .participate_box {
    height: 100%;
  }
}
.icon {
  width: 120px;
  position: absolute;
  top: 30px;
  left: 20px;
}
.bg1 {
  width: 341px;
  height: 167px;
  background: url("../assets/images/bg19.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 99px;
  left: 17px;
  img:first-child {
    width: 100%;
  }
  img:last-child {
    width: 261px;
    position: absolute;
    top: 28px;
    left: 24px;
  }
}
.bg2 {
  width: 341px;
  height: 337px;
  background: url("../assets/images/bg21.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 306px;
  left: 17px;
  .text {
    width: 276px;
    position: absolute;
    top: 118px;
    left: 24px;
  }
  img:first-child {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  img:nth-child(2) {
    width: 10px;
    position: absolute;
    top: 15px;
    left: 14px;
  }
  img:nth-child(3) {
    position: absolute;
    width: 180px;
    top: -62px;
    right: -10px;
  }
  img:nth-child(5) {
    position: absolute;
    width: 117.5px;
    left: 24px;
    bottom: 17px;
  }
  img:nth-child(6) {
    position: absolute;
    width: 1px;
    height: 149.5px;
    top: 117.5px;
    right: 16px;
  }
  img:last-child {
    position: absolute;
    width: 10px;
    right: 11px;
    bottom: 17px;
  }
}
.btn {
  width: 165px;
  position: absolute;
  bottom: 72px;
  left: 105px;
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
</style>