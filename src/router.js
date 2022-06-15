import { createRouter, createWebHistory } from 'vue-router';
import TeacherList from '@/routes/teachers/TeacherList';
import ContactTeacher from '@/routes/applications/ContactTeacher';
import TeacherRegistration from '@/routes/teachers/TeacherRegistration';
import ApplicationsReceived from '@/routes/applications/ApplicationsReceived';
import TeacherDetail from '@/routes/teachers/TeacherDetail';
import PageNotFound from '@/routes/PageNotFound';

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
    { path: '/register', component: TeacherRegistration },
    { path: '/applications', component: ApplicationsReceived },
    // { path: '/:catchAll(.*)', component: PageNotFound }
  ]
});

export default router;