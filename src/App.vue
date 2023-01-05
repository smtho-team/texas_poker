<template>
  <router-view />
</template>
<script>
export default {
  methods: {
    // isPc() {
    //   var userAgentInfo = navigator.userAgent;

    //   var Agents = [
    //     "Android",
    //     "iPhone",

    //     "SymbianOS",
    //     "Windows Phone",

    //     "iPad",
    //     "iPod",
    //   ];

    //   var flagPc = true;

    //   for (var v = 0; v < Agents.length; v++) {
    //     if (userAgentInfo.indexOf(Agents[v]) > 0) {
    //       flagPc = false;

    //       break;
    //     }
    //   }

    //   return flagPc;
    // },
  },
  mounted() {
    // var flagZt = this.isPc();
    // console.log(flagZt, "ispc");
    // if(flagZt) {
    //   document.querySelector('.mask').style.display = 'none'
    // }
  },
};
</script>
<style lang="scss">
@font-face {
  font-family: Lato;
  src: url("./assets/fonts/Lato.zip/Lato-Regular-15.ttf");
  font-weight: 400;
}
@font-face {
  font-family: Lato;
  src: url("./assets/fonts/Lato.zip/Lato-Semibold-16.ttf");
  font-weight: 600;
}
@font-face {
  font-family: Lato;
  src: url("./assets/fonts/Lato.zip/Lato-Bold-4.ttf");
  font-weight: 700;
}
@font-face {
  font-family: Lato;
  src: url("./assets/fonts/Lato.zip/Lato-Medium-13.ttf");
  font-weight: 500;
}
@font-face {
  font-family: Lato;
  src: url("./assets/fonts/Lato.zip/Lato-Heavy-8.ttf");
  font-weight: 800;
}
@font-face {
  font-family: Lato;
  src: url("./assets/fonts/Lato.zip/Lato-Black-2.ttf");
  font-weight: 900;
}
</style>
