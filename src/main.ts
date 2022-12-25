import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vconsole from 'vconsole';
import VTouch from 'vue3-touch';
const vConsole = new Vconsole();
import { Swipe, SwipeItem } from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';

createApp(App).use(VTouch).use(Swipe).use(SwipeItem).use(store).use(router).mount('#app')
