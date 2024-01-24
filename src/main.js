import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker'

import 'bulma/css/bulma.min.css';

// 创建Vue应用程序实例
const app = createApp(App);

// 在应用程序实例上使用路由器
app.use(router);

// 挂载应用程序实例到DOM元素
app.mount('#app');
