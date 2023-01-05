<template>
  <div>
    <div class="bullet-wrap">
      <div
        class="bullet-item"
        :class="
          item.isImportant
            ? 'bold bullet-item-color-' +
              item.color +
              ' bullet-animation-' +
              item.random
            : 'bullet-item-color-' +
              item.color +
              ' bullet-animation-' +
              item.random
        "
        :data-line="item.line"
        v-for="item in state.bulletlist"
        @animationend="animationend"
        :key="item.id"
      >
        {{ item.name.substr(0, 5) }}......{{ item.name.substr(-6) }} won rewards
      </div>
    </div>
    <!-- <div class="flex">
      <input
        style="flex: 1 1 auto"
        type="text"
        ref="input"
        v-model="state.values"
      />
      <button style="flex: 0 1 3em; text-align: center" @click="sendBullet">
        发送
      </button>
    </div> -->
  </div>
</template>
  <script>
import { reactive, onMounted } from "vue";

export default {
  setup() {
    function getUUID() {
      return Date.now() + Math.random();
    }
    const state = reactive({
      list: [
        {
          id: getUUID(),
          name: "0x8d4a1952a2a06cca5dc0c38be6b0cc7d006bcedd",
          isLoginUser: true,
          isImportant: true,
          color: 0,
          random: 0,
          line: 1,
        },
        {
          id: getUUID(),
          name: "0x0bc1daf0a4cf603a493ada34ea4f2a35034c8256",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 1,
          line: 2,
        },
        {
          id: getUUID(),
          name: "0x2887128f344cde685662a705b88316d46b4c2f7c",
          isLoginUser: true,
          isImportant: true,
          color: 1,
          random: 2,
          line: 3,
        },
      ], // 普通的弹幕队列
      clist: [], // c位的弹幕队列
      bulletlist: [], // 当前正在执行的
      values: "",
      idx: 3,
      myList: [
        {
          id: getUUID(),
          name: "0xbdef962d21c9355de0daba1c8f06573ef983c6bb",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 3,
          line: 1,
        },
        {
          id: getUUID(),
          name: "0x619b8453ca589bea1f86e02732ff262d6a53ffbb",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 0,
          line: 2,
        },
        {
          id: getUUID(),
          name: "0x874188472183c3e8cbe41a6268a9b9d8af14ac12",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 1,
          line: 3,
        },
        {
          id: getUUID(),
          name: "0xe2353b4a1b26020b8410be68e75e9bc3b5d09566",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 2,
          line: 2,
        },
        {
          id: getUUID(),
          name: "0x908efc9e46bc4c034d90fc54c8a8f405398a725a",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 2,
          line: 1,
        },
        {
          id: getUUID(),
          name: "0xbdef962d21c9355de0daba1c8f06573ef983c6bb",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 3,
          line: 2,
        },
        {
          id: getUUID(),
          name: "0x619b8453ca589bea1f86e02732ff262d6a53ffbb",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 1,
          line: 3,
        },
        {
          id: getUUID(),
          name: "0x874188472183c3e8cbe41a6268a9b9d8af14ac12",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 1,
          line: 1,
        },
        {
          id: getUUID(),
          name: "0xe2353b4a1b26020b8410be68e75e9bc3b5d09566",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 0,
          line: 2,
        },
        {
          id: getUUID(),
          name: "0x908efc9e46bc4c034d90fc54c8a8f405398a725a",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 0,
          line: 3,
        },
        {
          id: getUUID(),
          name: "0x874188472183c3e8cbe41a6268a9b9d8af14ac12",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 0,
          line: 1,
        },
        {
          id: getUUID(),
          name: "0xe2353b4a1b26020b8410be68e75e9bc3b5d09566",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 1,
          line: 2,
        },
        {
          id: getUUID(),
          name: "0x908efc9e46bc4c034d90fc54c8a8f405398a725a",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 0,
          line: 3,
        },
        {
          id: getUUID(),
          name: "0x874188472183c3e8cbe41a6268a9b9d8af14ac12",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 3,
          line: 1,
        },
        {
          id: getUUID(),
          name: "0xe2353b4a1b26020b8410be68e75e9bc3b5d09566",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 3,
          line: 2,
        },
        {
          id: getUUID(),
          name: "0x908efc9e46bc4c034d90fc54c8a8f405398a725a",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 0,
          line: 3,
        },
        {
          id: getUUID(),
          name: "0x874188472183c3e8cbe41a6268a9b9d8af14ac12",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 2,
          line: 1,
        },
        {
          id: getUUID(),
          name: "0xe2353b4a1b26020b8410be68e75e9bc3b5d09566",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 2,
          line: 2,
        },
        {
          id: getUUID(),
          name: "0x908efc9e46bc4c034d90fc54c8a8f405398a725a",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 0,
          line: 3,
        },
        {
          id: getUUID(),
          name: "0x874188472183c3e8cbe41a6268a9b9d8af14ac12",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 1,
          line: 1,
        },
        {
          id: getUUID(),
          name: "0xe2353b4a1b26020b8410be68e75e9bc3b5d09566",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 1,
          line: 2,
        },
        {
          id: getUUID(),
          name: "0x908efc9e46bc4c034d90fc54c8a8f405398a725a",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 0,
          line: 3,
        },
        {
          id: getUUID(),
          name: "0x874188472183c3e8cbe41a6268a9b9d8af14ac12",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 0,
          line: 1,
        },
        {
          id: getUUID(),
          name: "0xe2353b4a1b26020b8410be68e75e9bc3b5d09566",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 0,
          line: 2,
        },
        {
          id: getUUID(),
          name: "0x908efc9e46bc4c034d90fc54c8a8f405398a725a",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 0,
          line: 3,
        },
      ],
    });

    function animationend() {
      //   state.list.push(state.bulletlist.shift());
    }

    function sendBullet() {
      if (state.values) {
        // 随机生成重要性和颜色
        state.clist.push({
          id: getUUID(),
          name: state.values,
          isLoginUser: true,
          isImportant: Math.random() >= 0.5,
          color: parseInt(Math.random() * (4 - 0 + 1) + 0, 10),
          random: parseInt(Math.random() * (3 - 0 + 1) + 0, 10),
          line: 0,
        });
        state.values = "";
      }
    }

    onMounted(() => {
      setInterval(() => {
        var item = null;
        if (state.idx == 3) {
          // c 位
          item = state.clist.shift();
        }
        // if (!item) {
        //   item = state.list.shift();
        // }
        if (!item) {
          item = state.myList.shift();
        }
        if (item) {
          item.line = state.idx;
          state.idx = (state.idx % 5) + 1;
          state.bulletlist.push(item);
        } else {
          if (state.clist.length) {
            item = state.clist.shift();
            item.line = 3;
            state.idx = 3;
            state.bulletlist.push(item);
          }
        }
      }, 2000);
    });

    return {
      state,
      sendBullet,
      animationend,
    };
  },
};
</script>
  <style scoped>
.flex {
  display: flex;
}

.van-cell-group--inset {
  margin: auto;
  border-radius: 50px;
  border: 1px solid #d8d7d7;
}
.van-cell {
  /* background: #f8f8f8; */
}
.bold {
  font-weight: bold;
}
.bullet-wrap {
  height: 400px;
  position: relative;
  overflow: hidden;
  /* background: #333; */
  /* background-size: cover; */
  margin-bottom: 40px;
}
.bullet-item {
  width: 200px;
  height: 26px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(15px);
  /* Note: backdrop-filter has minimal browser support */
  border-radius: 500px;
  position: absolute;
  top: 70px;
  left: 0;
  text-align: center;
  line-height: 26px;
}
.bullet-item-color-0 {
  color: rgb(71, 104, 244);
}
.bullet-item-color-1 {
  /* color: rgb(231, 59, 80); */
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  text-align: center;

  color: #ffffff;
}
.bullet-item-color-2 {
  color: rgb(255, 121, 0);
}
.bullet-item-color-3 {
  color: rgb(18, 195, 153);
}
.bullet-item-color-4 {
  color: rgb(100, 104, 102);
}
.bullet-item[data-line="1"] {
  top: 70px;
}
.bullet-item[data-line="2"] {
  top: 110px;
}
.bullet-item[data-line="3"] {
  top: 143px;
}
.bullet-animation-0 {
  animation: right2left 4s linear both;
}
.bullet-animation-1 {
  animation: right2left 4s 4s linear both;
}
.bullet-animation-2 {
  animation: right2left 4s 7s linear both;
}
.bullet-animation-3 {
  animation: right2left 4s 9s linear both;
}

@keyframes right2left {
  0% {
    transform: translate(100vw);
  }
  100% {
    transform: translate(-100%);
  }
}
</style>
  
  