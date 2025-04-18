import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Browse from '@/views/Browse.vue';

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/browse',
    name: 'browse',
    component: Browse,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
