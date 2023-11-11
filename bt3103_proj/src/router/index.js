// import Vue from 'vue';
import {createRouter, createWebHistory} from 'vue-router'
// import store from './store'; // Vuex store instance

import LoginPage from '@/views/LoginPage.vue';
import CreateAppointPage from '@/views/CreateAppointPage.vue';
import EditAppointPage from '@/views/EditAppointPage.vue';
import AllAppointPage from '@/views/AllAppointPage.vue';
import AddPeoplePage from '@/views/AddPeoplePage.vue';
import ViewPatientAppointPage from '@/views/ViewPatientAppointPage.vue';
import ViewDoctorAppointPage from '@/views/ViewDoctorAppointPage.vue';
import AssignPatDocPage from '@/views/AssignPatDocPage.vue';
import IndivUserDetPage from '@/views/IndivUserDetPage.vue';

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
        path: '/edit_appoint_page',
        component: EditAppointPage
      },

      {
        path: '/add_people_page',
        component: AddPeoplePage
      },

      {
        path: '/view_patient_appt_page',
        component: ViewPatientAppointPage
      },

      {
        path: '/view_doctor_appt_page',
        component: ViewDoctorAppointPage
      },

      {
        path: '/assign_pat_doc_page',
        component: AssignPatDocPage
      },

      {
        path: '/indiv_user_det_page',
        component: IndivUserDetPage
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
