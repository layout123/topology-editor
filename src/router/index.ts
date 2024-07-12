import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from 'vue-router';

import Layout from '@/layout/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: Layout,
    redirect: '/editor',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
      },
      {
        path: '/editor',
        name: 'editor',
        component: () => import('@/views/editor/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any',
    meta: {
      title: '404',
    },
  },
];

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // 检查本地存储中是否存在 csrf-token，表示用户已登录
  const csrfToken = localStorage.getItem('csrf-token');

  // 如果用户已登录且要前往的不是登录页，则允许导航
  if (csrfToken && to.path !== '/login') {
    next();
  } else if (csrfToken && to.path === '/login') {
    next('/home');
  } else if (!csrfToken && to.path !== '/login') {
    next('/login');
  }
  // 其他情况，允许导航
  else {
    next();
  }
});

export default router;
