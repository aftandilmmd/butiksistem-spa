import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/IndexPage.vue') }],
  },

  {
    path: '/terminal',
    component: () => import('src/layouts/TerminalLayout.vue'),
    children: [
      {
        path: 'menu',
        component: () => import('src/pages/terminal/MenuPage.vue'),
      },
      {
        path: 'sale',
        component: () => import('src/pages/terminal/SalePage.vue'),
      },
      {
        path: 'park',
        component: () => import('src/pages/terminal/ParkPage.vue'),
      },
      {
        name: 'terminal_history',
        path: 'history',
        component: () => import('src/pages/terminal/HistoryPage.vue'),
      },

      {
        path: 'return',
        component: () => import('src/pages/terminal/ReturnPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/ErrorNotFound.vue'),
  },
];

export default routes;
