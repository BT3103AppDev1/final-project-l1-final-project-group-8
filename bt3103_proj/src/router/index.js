// import Vue from 'vue';
import {createRouter, createWebHistory} from 'vue-router'
// import store from './store'; // Vuex store instance

import LoginPage from '@/views/LoginPage.vue';
import CreateAppointPage from '@/views/CreateAppointPage.vue';
import AllAppointPage from '@/views/AllAppointPage.vue';
import AddPeoplePage from '@/views/AddPeoplePage.vue';
import ViewPatientAppointPage from '@/views/ViewPatientAppointPage.vue';

// Vue.use(Router);

const router = createRouter({
  routes: [
      {
        path: '/',
        component: LoginPage
      },

      {
        path: '/all_appoint_page',
        component: AllAppointPage
      },
      
      {
        path: '/create_appoint_page',
        component: CreateAppointPage
      },

      {
        path: '/add_people_page',
        component: AddPeoplePage
      },

      {
        path: '/view_patient_appt_page',
        component: ViewPatientAppointPage
      }
      // other routes...
  ],
  history: createWebHistory(),
});

// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   const isAuthenticated = store.state.user.isAuthenticated;

//   if (requiresAuth && !isAuthenticated) {
//     // User is not authenticated, redirect to login page
//     next('/login');
//   } else {
//     // User is authenticated or view does not require authentication, proceed
//     next();
//   }
// });

export default router;
