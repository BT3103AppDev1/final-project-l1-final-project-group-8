<script setup>
import login_sidebar from './components/login_sidebar.vue'
import Appointment_form from './components/Appointment_form.vue'
import Patient_edit from './components/Patient_edit.vue'
</script>

<template>
  <login_sidebar/>
  <Appointment_form/>

</template>

<style>
#patientBlock {
  background-color: white;
  p {
    font-weight: bold;
  }
}
</style>