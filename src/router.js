import { createRouter, createWebHistory } from 'vue-router';
import TeacherList from '@/routes/teachers/TeacherList';
import ContactTeacher from '@/routes/applications/ContactTeacher';
import TeacherRegistration from '@/routes/teachers/TeacherRegistration';
import ApplicationsReceived from '@/routes/applications/ApplicationsReceived';
import TeacherDetail from '@/routes/teachers/TeacherDetail';
import PageNotFound from '@/routes/PageNotFound';
import UserLogin from '@/routes/auth/UserLogin';
import store from '@/store';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teachers' },
    { path: '/teachers', component: TeacherList },
    {
      path: '/teachers/:id',
      component: TeacherDetail,
      props: true,
      children: [
        { path: 'contact', component: ContactTeacher }                                  //     /teachers/t1/contact
      ]
    },
    {
      path: '/register',
      component: TeacherRegistration,
      meta: { needsAuth: true }
    },
    {
      path: '/applications',
      component: ApplicationsReceived,
      meta: { needsAuth: true }
    },
    { path: '/auth',
      component: UserLogin,
      meta: { shouldBeLoggedOut: true },
    },
    { path: '/:catchAll(.*)', component: PageNotFound }
  ]
});

router.beforeEach((to, _, next) => {
  if (to.meta.needsAuth && !store.getters.userIsLoggedIn) next('/auth')
  else if (to.meta.shouldBeLoggedOut && store.getters.userIsLoggedIn) next('/teachers')
  else next()
});

export default router;