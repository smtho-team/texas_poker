import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vconsole from 'vconsole';
const vConsole = new Vconsole();
import { Swipe, SwipeItem } from 'vant';
import UILib from './components/count.js'
import 'amfe-flexible'
// import './utils/rem'
// 2. 引入组件样式
import 'vant/lib/index.css';
import Amplitute from "amplitude-js";
import "swiper/swiper-bundle.css"
const app = createApp(App);
app.config.globalProperties.$amplitude = Amplitute;
// app.use(Swipe).use(SwipeItem).use(UILib).use(store).use(router).mount('#app')
app.use(Amplitute).use(Swipe).use(SwipeItem).use(UILib).use(store).use(router).mount('#app')
Amplitute.init("def9ead6d386f0873f2c9c3d58a8eddc");
