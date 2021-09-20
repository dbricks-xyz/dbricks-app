import { createApp } from 'vue';
import App from './App.vue';
import router from './common/common.router';
import './index.css';

createApp(App).use(router).mount('#app');
