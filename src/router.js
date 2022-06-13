import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teachers'},
    { path: '/teachers', component: null },
    {
      path: '/teachers/:id', component: null, children: [
        { path: 'contact', component: null }                                  //     /teachers/t1/contact
      ]
    },
    { path: '/register', component: null },
    { path: '/requests', component: null },
    { path: '/:catchAll(.*)', component: null}
  ]
});

export default router;