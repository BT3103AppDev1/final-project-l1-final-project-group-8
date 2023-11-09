<template>
  <div>
    <div id="app-container">
      <!--<Appointment_form/>-->
      <div class="login-sidebar-container"><login_sidebar/></div>
      <!---<div class="main-page-elements"><AssignPatient/></div>-->
      <!--<div class="main-page-elements"><AddDoctor/></div>-->
      
      <!-- <div class="main-page-elements"><LoginFields/></div> -->
      <!--<div class="main-page-elements"><Appointment_form/></div>-->
      <!--<div class="main-page-elements"><patient_edit/></div>-->
      <!-- <div class="main-page-elements"><DoctorAppointment/></div> -->
      <!-- <div class="main-page-elements"><EditAppointment/></div> -->
      <!-- <div class="main-page-elements"><PatientDetails/></div> -->
      <div class="main-page-elements"><AddPeople/></div> 


    </div>
  </div>
</template>

<script>
import login_sidebar from './components/login_sidebar.vue'
//import patient_edit from './components/Patient_edit.vue'
import Appointment_form from './components/Appointment_form.vue'
// import Patient_edit from './components/Patient_edit.vue'
import AssignPatient from './components/AssignPatient.vue'
import LoginFields from './components/LoginFields.vue'
// import DoctorAppointment from './components/DoctorAppointment.vue'
// import EditAppointment from './components/EditAppointment.vue'
//import PatientDetails from './components/PatientDetails.vue'
import AddDoctor from './components/AddDoctor.vue'
import AddPatient from './components/AddPatient.vue'
import AddPeople from './views/AddPeople.vue'

export default {
  components: {
    login_sidebar,
    AssignPatient,
    LoginFields,
    Appointment_form,
     AddPeople,
    // DoctorAppointment,
    // EditAppointment,
    //  PatientDetails,
     //patient_edit,
     AddDoctor,
     AddPatient
  }
}
</script>

<style scoped>
/* body {
  
} */

#app-container {
    display: flex;
    height: 100vh;
}

.login-sidebar-container {
    display: block;
}

.main-page-elements {
    display: block;
    padding-left: 6em;
    padding-top: 6em;
}
</style>