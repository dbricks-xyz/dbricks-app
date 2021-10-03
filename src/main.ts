import { createApp } from 'vue';
import App from './App.vue';
import router from './common/common.router';
import './index.css';
// needed for winston logging to work on from node_modules
// https://github.com/winstonjs/winston/issues/1354#issuecomment-426433071
import 'setimmediate';

createApp(App)
  .use(router)
  .mount('#app');
