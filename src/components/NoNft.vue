<template>
  <div class="nonft">
    <img class="bg" src="../assets/images/bg25.png" alt="" />
    <div class="text">
      <div>You’ve diamond handed a total of <span>Ξ0</span> in 2022</div>
      <div>The current value is <span>Ξ0</span></div>
    </div>
    <div class="box">
        <img src="../assets/images/gift2.png" alt="">
        <img src="../assets/images/gift3.png" alt="">
    </div>
    <img class="touch" src="../assets/images/swipeUp.png" alt="" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@keyframes bounce-down {
        25% {
             transform: translateY(-10px);
        }
        50%, 100% {
             transform: translateY(0);
        }
        75% {
             transform: translateY(10px);
        }
}
.nonft {
  width: 100%;
  min-height: 100vh;
  height: 812px;
  background: url("../assets/images/bg24.png") no-repeat;
  background-size: 100% 100%;
  padding: 119px 0 60px 30px;
    box-sizing: border-box;
  .touch {
    width: 117px;
    position: absolute;
    z-index: 2;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
  }
  .bg {
    width: 100%;
    position: absolute;
    top: 325px;
    left: 0;
  }
  .text {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    text-transform: capitalize;
    color: #140e2d;
    div:first-child {
        margin-bottom: 30px;
    }
    span {
        color: #F86FA0;
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
}
</style>