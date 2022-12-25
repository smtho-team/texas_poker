<template>
  <div class="scene">
    <van-swipe
      class="my-swipe"
      :autoplay="false"
      indicator-color="white"
      :show-indicators="false"
      vertical
    >
      <van-swipe-item class="one">
        <div class="text">
          <div>You’ve diamond handed a total of <span>Ξ88.6</span> in 2022</div>
          <div>The current value is <span>Ξ98.6</span></div>
          <div>Your biggest investment?></div>
          <div>(NFT project name)</div>
        </div>
        <img class="monkey" src="../assets/images/monkey1.png" alt="" />
        <img class="touch" src="../assets/images/swipeUp.png" alt="" />
      </van-swipe-item>
      <van-swipe-item class="two">
        <img class="bg" src="../assets/images/bg7.png" alt="" />
        <img class="monkey" src="../assets/images/monkey1.png" alt="" />
        <img class="table" src="../assets/images/table.png" alt="" />
        <div class="text">
          <div>You aped in at <span>Ξ88.6</span></div>
          <div>Their floor price right now is <span>Ξ98.6</span></div>
          <div>You’ve been hodling for <span>365 </span></div>
        </div>
        <img class="woman" src="../assets/images/woman.png" alt="" />
        <img class="touch" src="../assets/images/swipeUp.png" alt="" />
      </van-swipe-item>
      <van-swipe-item class="three">
        <div class="text">
          <div>
            Ughhh :( You’ve paperhanded a total of <span>Ξ 86.8</span> in 2022
          </div>
          <div>Your biggest investment?</div>
          <div>NFT project name</div>
        </div>
        <img class="monkey" src="../assets/images/monkey2.png" alt="" />
        <img class="touch" src="../assets/images/swipeUp.png" alt="" />
      </van-swipe-item>
      <van-swipe-item class="four">
        <img class="bg" src="../assets/images/bg9.png" alt="" />
        <img class="monkey" src="../assets/images/monkey2.png" alt="" />
        <div class="text">
          <div>
            You aped in at <span>Ξ56.6</span> , sold at <span>Ξ66.8</span>
          </div>
          <div>Their floor price right now is <span>Ξ66.8</span></div>
        </div>
        <img class="touch" src="../assets/images/swipeUp.png" alt="" />
      </van-swipe-item>
      <van-swipe-item class="five">
        <img class="bg" src="../assets/images/bg12.png" alt="" />
        <img src="../assets/images/face1.png" class="face" alt="" />
        <div class="triangle"></div>
        <div class="text">
          <div>Aweeesome! You’ve made a total of <span>Ξ56.5</span> in 2022!</div>
          <div>Your greatest NFT trade in 2022?<span>(NFT project name)</span></div>
        </div>
        <img src="../assets/images/monkey3.png" class="monkey" alt="">
        <img class="touch" src="../assets/images/swipeUp.png" alt="" />
      </van-swipe-item>
      <van-swipe-item class="six">
        <img class="bg" src="../assets/images/bg12.png" alt="" />
        <div class="triangle">
          <img class="face" src="../assets/images/face1.png" alt="">
        </div>
        <img src="../assets/images/monkey3.png" class="monkey" alt="">
        <div class="text">
          <div>Aweeesome! You’ve made a total of <span>Ξ56.5</span> in 2022!</div>
          <div>Your greatest NFT trade in 2022?<span>(NFT project name)</span></div>
        </div>
        <img class="touch" src="../assets/images/swipeUp.png" alt="" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          content: "<h1>第 0 页</h1>",
        },
        {
          content: "<h1>第 1 页</h1>",
        },
        {
          content: "<h1>第 2 页</h1>",
        },
      ],
    };
  },
  methods: {
    onTouch(e) {
      console.log(e);
    },
  },
};
</script>

<style lang="scss" scoped>
:deep(.van-swipe-item) {
  text-align: left;
}
.scene {
  width: 100%;
  .one {
    height: max-content !important;
    min-height: 100vh;
    background: url("../assets/images/bg5.png") no-repeat;
    background-size: 100% 100%;
    padding: 20% 0 60px 32px;
    box-sizing: border-box;
  }
  .two {
    height: max-content !important;
    min-height: 100vh;
    background: url("../assets/images/bg6.png") no-repeat;
    background-size: 100% 100%;
    padding: 20% 0 0px 32px;
    box-sizing: border-box;
    .bg {
      width: 100%;
      position: absolute;
      top: 140px;
      left: 0;
    }
    .woman {
      margin-top: 10px;
      margin-left: -32px;
      width: 170px;
      position: relative;
    }
    .table {
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
    }
    .text {
      div {
        &:first-child {
          margin-bottom: 25px;
        }
        &:nth-child(2) {
          margin-bottom: 27px;
        }
        &:nth-child(3) {
          margin-bottom: 0;
        }
      }
    }
    .touch {
      position: absolute;
      bottom: 60px;
      left: 50%;
      margin-left: -50px;
      z-index: 2;
    }
  }
  .three {
    height: max-content !important;
    min-height: 100vh;
    background: url("../assets/images/bg8.png") no-repeat;
    background-size: 100% 100%;
    padding: 98px 18px 50px;
    box-sizing: border-box;
    .text {
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
          margin-bottom: 106.53px;
          color: #f86fa0;
        }
      }
    }
    .monkey {
      margin-left: 44px;
    }
  }
  .four {
    height: max-content !important;
    min-height: 100vh;
    background: url("../assets/images/bg8.png") no-repeat;
    background-size: 100% 100%;
    padding: 149px 0 50px 0px;
    box-sizing: border-box;
    .bg {
      width: 216px;
      position: absolute;
      right: 0;
      top: 0;
    }
    .monkey {
      margin-right: 50.6px;
    }
    .text {
      div {
        text-align: right;
        &:first-child {
          width: 263px;
          margin-bottom: 30px;
          margin-top: 54.5px;
          margin-left: 85px;
        }
        &:last-child {
          margin-bottom: 0;
          margin-left: 19px;
        }
      }
    }
    .touch {
      margin-top: 138px;
      margin-left: 129px;
    }
  }
  .five {
    height: max-content !important;
    min-height: 100vh;
    background: url("../assets/images/bg11.png") no-repeat;
    background-size: 100% 100%;
    padding-top: 211px;
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
      left: 13.5px;
      top: 78px;
      background: url('../assets/images/Rectangle.png') no-repeat;
      background-size: 100% 100%;
    }
    .text {
      position: relative;
      width: 90%;
      margin: 0 auto;
      text-align: center;
      margin-bottom: 52px;
    }
    .touch {
      display: block;
      width: 117px;
      margin: 60px auto 0;
      position: relative;
    }
  }
  .six {
    height: max-content !important;
    min-height: 100vh;
    background: url("../assets/images/bg11.png") no-repeat;
    background-size: 100% 100%;
    padding-top: 50px;
    .bg {
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
    }
    .triangle {
      width: 333px;
      height: 509px;
      position: absolute;
      left: 13.5px;
      top: 78px;
      background: url('../assets/images/Rectangle.png') no-repeat;
      background-size: 100% 100%;
      .face {
        
      }
    }
    .text {
      position: relative;
      position: relative;
      width: 90%;
      margin: 0 auto;
      text-align: center;
      margin-bottom: 52px;
      margin-top: 10%;
    }
  }
  .text {
    div {
      font-family: "Lato";
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 24px;
      text-transform: capitalize;
      color: #140e2d;
      text-align: left;
      &:first-child {
        margin-bottom: 30px;
      }
      &:nth-child(2) {
        margin-bottom: 30px;
      }
      &:last-child {
        margin-bottom: 47px;
      }
      span {
        color: #f86fa0;
      }
    }
  }
  .monkey {
    width: 258.46px;
    margin-left: 54px;
    position: relative;
  }
  .touch {
    margin-top: 81px;
    width: 117px;
    margin-left: 94px;
  }
}
</style>