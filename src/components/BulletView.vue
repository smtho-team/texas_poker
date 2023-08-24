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
          random: 0,
          line: 2,
        },
        {
          id: getUUID(),
          name: "0x2887128f344cde685662a705b88316d46b4c2f7c",
          isLoginUser: true,
          isImportant: true,
          color: 1,
          random: 1,
          line: 3,
        },
      ], // 普通的弹幕队列
      clist: [], // c位的弹幕队列
      bulletlist: [], // 当前正在执行的
      values: "",
      myList: [
        {
          id: getUUID(),
          name: "0xbdef962d21c9355de0daba1c8f06573ef983c6bb",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 0,
          line: 1,
        },
        {
          id: getUUID(),
          name: "0x619b8453ca589bea1f86e02732ff262d6a53ffbb",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 1,
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
          random: 3,
          line: 2,
        },
        {
          id: getUUID(),
          name: "0x908efc9e46bc4c034d90fc54c8a8f405398a725a",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 1,
          line: 1,
        },
        {
          id: getUUID(),
          name: "0x6180099fe2ca0d1d22bca26809fa4deaadb6444a",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 2,
          line: 3,
        },
        {
          id: getUUID(),
          name: "0xce2c24e9ddc34f765b2db075040dc76fd1c56789",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 3,
          line: 3,
        },
        {
          id: getUUID(),
          name: "0x7f07b4676910899faf80fa9868b01e7eaf2cd6cb",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 1,
          line: 1,
        },
        {
          id: getUUID(),
          name: "0xd8fcca3a890d286240e4f94fb5e4669365efc086",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 3,
          line: 2,
        },
        {
          id: getUUID(),
          name: "0xfd4c8901498752e0765d1d09dce9acd4ccad3689",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 1,
          line: 3, //
        },
        {
          id: getUUID(),
          name: "0xb68356ee7bba1b278764b1c19a60614781417450",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 0,
          line: 1,
        },
        {
          id: getUUID(),
          name: "0x41c9a2ded029b2cd778d8a0ff3fdc0f20dc49b5e",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 2,
          line: 2,
        },
        {
          id: getUUID(),
          name: "0xd54a20613edf2be85bc5149fd51dc681038d4156",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 3,
          line: 3,
        },
        {
          id: getUUID(),
          name: "0x933b352d16d3cc6f135c6cf1acbeeb0343b146a1",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 2,
          line: 1,
        },
        {
          id: getUUID(),
          name: "0x747baf04e958c27b97bf012d1577b6a5aec847a9",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 3,
          line: 2,
        },
        {
          id: getUUID(),
          name: "0x3d860f8839324eda27de47b8f0b2e1e4c110dbb3",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 3,
          line: 3,
        },
        {
          id: getUUID(),
          name: "0xa58c2b2325c8390a480464a2ddd10614f3db0599",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 3,
          line: 1,
        },
        {
          id: getUUID(),
          name: "0x8412033f81cdf1a6f98a7524da7270fd54040997",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 3,
          line: 2,
        },
        {
          id: getUUID(),
          name: "0xee2343f8c3efd59ea73b909809d8fa300b133dec",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 1,
          line: 3,
        },
        {
          id: getUUID(),
          name: "0x10e7b9e2cd1dbfd4b9d2ffbab83e53b47701e8bf",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 2,
          line: 1, //
        },
        {
          id: getUUID(),
          name: "0xafae644874bd67619af25d5daa24badacb9e48d0",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 1,
          line: 2,
        },
        {
          id: getUUID(),
          name: "0xd862f4e9c4f9d232893d86381533aaa7c5f26fde",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 3,
          line: 3,
        },
        {
          id: getUUID(),
          name: "0xeab804590011d0650fcb6c4da1870c6e9ca062d1",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 1,
          line: 1,
        },
        {
          id: getUUID(),
          name: "0x6a9b86e5a09eb214557825c89cd2aabdd832b830",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 2,
          line: 2,
        },
        {
          id: getUUID(),
          name: "0xcb4f3802bbb67d6987b9f0acf19eac5e081d29ac",
          isLoginUser: true,
          isImportant: false,
          color: 1,
          random: 3,
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
      var timer = setInterval(() => {
        var item = null;
        // if (!item) {
        //   item = state.list.shift();
        // }
        item = state.myList.shift();
        if (item) {
          state.bulletlist.push(item);
        } else {
          clearInterval(timer);
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
  top: 100px;
}
.bullet-item[data-line="3"] {
  top: 130px;
}
.bullet-animation-0 {
  animation: right2left 4s linear both;
}
.bullet-animation-1 {
  animation: right2left 4s 2s linear both;
}
.bullet-animation-2 {
  animation: right2left 4s 4s linear both;
}
.bullet-animation-3 {
  animation: right2left 4s 6s linear both;
}

@keyframes right2left {
  0% {
    transform: translate(100vw);
  }
  100% {
    transform: translate(-100vw);
  }
}
@media only screen and (min-width: 750px) {
  @keyframes right2left {
  0% {
    transform: translate(500px);
  }
  100% {
    transform: translate(-500px);
  }
}
}
</style>
  
  