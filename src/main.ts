import { createApp } from 'vue';
import { createPinia } from 'pinia';

import router from '@/router/index';

import App from './App.vue';
import drag from './directives/drag';
import '@/style/index.css';
import './assets/index.css';
import 'element-plus/dist/index.css';
const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);
app.directive('drag', drag);
app.mount('#app');
