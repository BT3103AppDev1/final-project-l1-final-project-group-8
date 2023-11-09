// import Vue from 'vue';
import {createRouter, createWebHistory} from 'vue-router'
// import Router from 'vue-router';
// import store from './store'; // Vuex store instance

import LoginPage from '@/views/LoginPage.vue';
import CreateAppointPage from '@/views/CreateAppointPage.vue';
import AllAppointPage from '@/views/AllAppointPage.vue'
import AddPeoplePage from '@/views/AddPeoplePage.vue'
// import AddDoctor from './components/AddDoctor.vue';
// import AddPatient from './components/AddPatient.vue';
// import AppointmentForm from './components/AppointmentForm.vue';
// import AssignPatient from './components/AssignPatient.vue';
// import DoctorAppointment from './components/DoctorAppointment.vue';
// import EditAppointment from './components/EditAppointment.vue';
// import ErrorPage from './components/ErrorPage.vue';
// import PatientEdit from './components/PatientEdit.vue';
// import PatientDetails from './components/PatientDetails.vue';
// import CreateAppointment from './views/CreateAppointment.vue';

// Vue.use(Router);

const routes = [
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
    }

    // {
    //   path: '/login',
    //   component: LoginSidebar
    // },
    // {
    //   path: '/add-doctor',
    //   component: AddDoctor,
    //   meta: { requiresAuth: true }
    // },

    // {
    //   path: '/add-patient',
    //   component: AddPatient,
    //   meta: { requiresAuth: true }
    // },
    // {
    //   path: '/appointment-form',
    //   component: AppointmentForm,
    //   meta: { requiresAuth: true }
    // },
    // {
    //   path: '/assign-patient',
    //   component: AssignPatient,
    //   meta: { requiresAuth: true }
    // },
    // {
    //   path: '/doctor-appointment',
    //   component: DoctorAppointment,
    //   meta: { requiresAuth: true }
    // },
    // {
    //   path: '/edit-appointment',
    //   component: EditAppointment,
    //   meta: { requiresAuth: true }
    // },
    // {
    //   path: '/error',
    //   component: ErrorPage
    // },
    // {
    //   path: '/patient-edit',
    //   component: PatientEdit,
    //   meta: { requiresAuth: true }
    // },
    // {
    //   path: '/patient-details',
    //   component: PatientDetails,
    //   meta: { requiresAuth: true }
    // },
    // {
    //   path: '/create-appointment',
    //   component: CreateAppointment,
    //   meta: { requiresAuth: true }
    // },
    // {
    //   path: '/add-people',
    //   component: AddPeople,
    //   meta: { requiresAuth: true }
    // },
    // other routes...
]

const router = createRouter(
  {
    history: createWebHistory(),
    routes
  }
)

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
