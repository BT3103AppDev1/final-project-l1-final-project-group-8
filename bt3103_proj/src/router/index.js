// import Vue from 'vue';
import {createRouter, createWebHistory} from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import LoginPage from '@/views/LoginPage.vue';
import CreateAppointPage from '@/views/CreateAppointPage.vue';
import EditAppointPage from '@/views/EditAppointPage.vue';
import AllAppointPage from '@/views/AllAppointPage.vue';
import AddPeoplePage from '@/views/AddPeoplePage.vue';
import ViewPatientAppointPage from '@/views/ViewPatientAppointPage.vue';
import ViewDoctorAppointPage from '@/views/ViewDoctorAppointPage.vue';
import AssignPatDocPage from '@/views/AssignPatDocPage.vue';
import IndivUserDetPage from '@/views/IndivUserDetPage.vue';
import AllPatientsPage from '@/views/AllPatientsPage.vue';
import AllDoctorsPage from '@/views/AllDoctorsPage.vue';
import SignUpPage from '@/views/SignupPage.vue';


import { extractIdentifiers } from 'vue/compiler-sfc';

// Vue.use(Router);

const router = createRouter({
  routes: [
      {
        path: '/',
        name: "Login",
        component: LoginPage,
        meta: { requiresAuth: false },
      },

      {
        path: '/signup',
        name: "signup",
        component: SignUpPage,
        meta: { requiresAuth: false },
      },

      {
        path: '/all_appoint_page',
        name: "AllAppointPage",
        component: AllAppointPage,
        meta: { requiresAuth: true },
      },
      
      {
        path: '/create_appoint_page',
        name: "CreateAppointPage",
        component: CreateAppointPage,
        meta: { requiresAuth: true },
      },

      {
        path: '/edit_appoint_page/:doctorName/:patientId',
        // params: {
        //   doctorName: 'Adam',
        //   patientId: 'pat1'
        // },
        props: true,
        name: 'editApptPage',
        component: EditAppointPage,
        meta: { requiresAuth: true },
      },

      {
        path: '/view_doctor_appt_page/:doctorName',
        props: true,
        name: 'doctorApptPage',
        component: ViewDoctorAppointPage,
        meta: { requiresAuth: true },
      },

      {
        path: '/add_people_page',
        name: "AddPeoplePage",
        component: AddPeoplePage,
        meta: { requiresAuth: true },
      },

      {
        path: '/view_patient_appt_page/:patientId',
        props: true,
        name: 'patientApptPage',
        component: ViewPatientAppointPage,
        meta: { requiresAuth: true },
      },

      {
        path: '/assign_pat_doc_page',
        name: "AssignPatDocPage",
        component: AssignPatDocPage,
        meta: { requiresAuth: true },
      },

      {
        path: '/indiv_user_det_page/:patientId',
        props: true,
        name: 'indivDetails',
        component: IndivUserDetPage,
        meta: { requiresAuth: true },
      },

      { 
        path: '/all_patients',
        name: "AllPatientsPage",
        component: AllPatientsPage,
        meta: { requiresAuth: true },
      },
      { 
        path: '/all_doctors',
        name: "AllDoctorsPage",
        component: AllDoctorsPage,
        meta: { requiresAuth: true },
      },
      
  ],
  history: createWebHistory(),
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const auth = getAuth();

  const user = await new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user);
    });
  });

  if (requiresAuth && !user) {
    // Redirect to login if authentication is required and user is not logged in
    next('/');
  } else {
    // Proceed to the route if no authentication is required or user is logged in
    next();
  }
});


export default router;
