<script setup>
import login_sidebar from './components/login_sidebar.vue'
import Appointment_form from './components/Appointment_form.vue'
import Patient_edit from './components/Patient_edit.vue'
import SearchPatient from './components/SearchPatient.vue'
</script>

<template>
  <login_sidebar/>
  <!--<Appointment_form/>-->
  <SearchPatient/>

</template>

<style>
#patientBlock {
  background-color: white;
  p {
    font-weight: bold;
  }
}
</style>