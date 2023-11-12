<template>
    <div>
      <div id="app-container">
        <div class="sidebar-container"><InternalSidebar v-if="isMounted" :tabName="name"/></div>
        <div class="main-page-elements">
          <PatientAppointment :info="{patientId: this.patientId}"/>
        </div>
  
      </div>
    </div>
  </template>
  
  <script>
  import InternalSidebar from '@/components/InternalSidebar.vue'
  import PatientAppointment from '../components/PatientAppointment.vue'
  
  export default {
    components: {
      InternalSidebar,
      PatientAppointment
    }, 
    props: {
      patientId: {
        type:String,
        required:true
      }
    },
    data() {
        return {
            isMounted: false,
            name: "viewPatientApptBlock"
        }
    },

    mounted() {
      this.$emit(this.patientId)
        this.isMounted = true
    },
  }
  </script>
  
  <style scoped>
  
  #app-container {
      display: flex;
      height: 100vh;
  }
  
  .sidebar-container {
      display: block;
  }
  
  .main-page-elements {
      display: block;
      padding-left: 6em;
      padding-top: 6em;
  }
  </style>