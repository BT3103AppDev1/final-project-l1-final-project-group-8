<script setup>
import login_sidebar from './components/login_sidebar.vue'
import Appointment_form from './components/Appointment_form.vue'
import Patient_edit from './components/Patient_edit.vue'
import AssignPatient from './components/AssignPatient.vue'
</script>

<template>
  <login_sidebar/>
  <!--<Appointment_form/>-->
  <AssignPatient/>

</template>

<style>
#patientBlock {
  background-color: white;
  p {
    font-weight: bold;
  }
}
</style>