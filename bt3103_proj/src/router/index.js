import Vue from 'vue';
import Router from 'vue-router';
import store from './store'; // Vuex store instance

import Home from './views/Home.vue';
import LoginSidebar from './components/LoginSidebar.vue';
import AddDoctor from './components/AddDoctor.vue';
import AddPatient from './components/AddPatient.vue';
import AppointmentForm from './components/AppointmentForm.vue';
import AssignPatient from './components/AssignPatient.vue';
import DoctorAppointment from './components/DoctorAppointment.vue';
import EditAppointment from './components/EditAppointment.vue';
import ErrorPage from './components/ErrorPage.vue';
import PatientEdit from './components/PatientEdit.vue';
import PatientDetails from './components/PatientDetails.vue';
import CreateAppointment from './views/CreateAppointment.vue';
import AddPeople from './views/AddPeople.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/login',
      component: LoginSidebar
    },
    {
      path: '/add-doctor',
      component: AddDoctor,
      meta: { requiresAuth: true }
    },
    {
      path: '/add-patient',
      component: AddPatient,
      meta: { requiresAuth: true }
    },
    {
      path: '/appointment-form',
      component: AppointmentForm,
      meta: { requiresAuth: true }
    },
    {
      path: '/assign-patient',
      component: AssignPatient,
      meta: { requiresAuth: true }
    },
    {
      path: '/doctor-appointment',
      component: DoctorAppointment,
      meta: { requiresAuth: true }
    },
    {
      path: '/edit-appointment',
      component: EditAppointment,
      meta: { requiresAuth: true }
    },
    {
      path: '/error',
      component: ErrorPage
    },
    {
      path: '/patient-edit',
      component: PatientEdit,
      meta: { requiresAuth: true }
    },
    {
      path: '/patient-details',
      component: PatientDetails,
      meta: { requiresAuth: true }
    },
    {
      path: '/create-appointment',
      component: CreateAppointment,
      meta: { requiresAuth: true }
    },
    {
      path: '/add-people',
      component: AddPeople,
      meta: { requiresAuth: true }
    },
    // other routes...
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = store.state.user.isAuthenticated;

  if (requiresAuth && !isAuthenticated) {
    // User is not authenticated, redirect to login page
    next('/login');
  } else {
    // User is authenticated or view does not require authentication, proceed
    next();
  }
});

export default router;
