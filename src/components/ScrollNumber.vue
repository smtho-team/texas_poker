<template>
  <div class="numbers">
    <div>
      <div v-for="(item, index) in list1" :key="index">
        <span ref="numberItem">0123456789</span>
      </div>
    </div>
    <div class="symbol"><span>,</span></div>
    <div>
      <div v-for="(item, index) in list2" :key="index">
        <span ref="numberItem">0123456789</span>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, reactive, onMounted, watch, onBeforeUnmount } from "vue";
import { addPeople } from "@/services/index";
export default defineComponent({
  setup() {
    const number = ref(1234);
    const numberList = ref([]);
    const list1 = ref([]);
    const list2 = ref([]);
    const numberItem = ref(null);
    const timer = ref(null);
    const animate = () => {
      setTimeout(() => {
        var numberItem1 = numberItem.value;
        for (var i = 0; i < numberItem1.length; i++) {
          numberItem1[i].style.transform = `translate(-50%,-${
            numberList.value[i] * 10
          }%)`;
          numberItem1[i].style.transition = "all 1s linear";
        }
      }, 0);
    };
    const formatNumber = (num) => {
      var num = num.toString();
      if (num.length < 6) {
        num = "0" + num;
        formatNumber(num);
      } else {
        number.value = num;
      }
    };
    onBeforeUnmount(()=> {
      clearInterval(timer.value);
      timer.value = null;
    })
    onMounted(() => {
      document.addEventListener("visibilitychange", function () {
        // 用户离开了当前页面
        if (document.visibilityState === "hidden") {
          // document.title = "页面不可见";
          clearInterval(timer.value);
          timer.value = null;
        }

        // 用户打开或回到页面
        if (document.visibilityState === "visible") {
          // document.title = "页面可见";
          timer.value = setInterval(() => {
            formatNumber(Number(number.value) + 10);
            numberList.value = number.value.split("");
            list1.value = numberList.value.slice(0, 3);
            list2.value = numberList.value.slice(3, 6);
            animate();
          }, 2000);
        }
      });
      addPeople()
        .then((res) => {
          number.value = res.data;
          formatNumber(number.value);
          let list = number.value.split("");
          numberList.value = list;
          list1.value = numberList.value.slice(0, 3);
          list2.value = numberList.value.slice(3, 6);
          animate();
        })
        .catch(() => {
          //   this.showTimeout = true;
        });
      timer.value = setInterval(() => {
        addPeople().then((res) => {
          number.value = res.data;
          formatNumber(number.value);
          numberList.value = number.value.split("");
          list1.value = numberList.value.slice(0, 3);
          list2.value = numberList.value.slice(3, 6);
          animate();
        });
      }, 2000);
    });
    return {
      numberList,
      number,
      numberItem,
      onMounted,
      timer,
      list1,
      list2,
    };
  },
});
</script>
<style lang="scss" scoped>
.numbers {
    .symbol {
        width: 27px;
        height: 30px;
        background: none;
    }
  > div {
    display: flex;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.044) 0%,
      rgba(240, 240, 240, 0.096) 50%,
      rgba(255, 255, 255, 0.04375) 100%
    );
    backdrop-filter: blur(15px);
    div {
      width: 27px;
      height: 30px;
      overflow: hidden;
      border-right: 1px solid rgba($color: #fff, $alpha: 0.2);
      position: relative;
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

span {
  writing-mode: vertical-lr;
  text-orientation: upright;
  -ms-text-orientation: upright;
  -webkit-text-orientation: upright;
  -moz-text-orientation: upright;
  -o-text-orientation: upright;
  letter-spacing: 10px;
  color: #fff;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  text-shadow: 0px 0px 2px #fff;
}
</style>