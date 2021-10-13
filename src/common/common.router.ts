import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import DemoApp from '@/common/views/DemoApp.vue';
import Home from '@/common/views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/app',
    name: 'App',
    component: DemoApp,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
