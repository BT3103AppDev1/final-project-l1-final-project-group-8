<template>
  <div>
    <div id="app-container">
      <!--<Appointment_form/>-->
      <div class="login-sidebar-container"><login_sidebar/></div>
      <div class="main-page-elements"><AssignPatient/></div>
      <!-- <div class="main-page-elements"><LoginFields/></div> -->
    </div>
  </div>
</template>

<script>
import login_sidebar from './components/login_sidebar.vue'
// import Appointment_form from './components/Appointment_form.vue'
// import Patient_edit from './components/Patient_edit.vue'
import AssignPatient from './components/AssignPatient.vue'
import LoginFields from './components/LoginFields.vue'

export default {
  components: {
    login_sidebar,
    AssignPatient,
    LoginFields
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