<template>
    <div>
      <div id="app-container">
        <div class="sidebar-container"><InternalSidebar v-if="isMounted" :tabName="name"/></div>
        <div class="main-page-elements">
          <DoctorAppointment :info="{doctorName: this.doctorName}"/>
        </div>  
  
      </div>
    </div>
  </template>
  
  <script>
  import InternalSidebar from '@/components/InternalSidebar.vue'
  import DoctorAppointment from '@/components/DoctorAppointment.vue'
  
  export default {
    components: {
      InternalSidebar,
      DoctorAppointment
    }, 
    props: {
      doctorName: {
        type:String,
        required:true
    }
  },

    data() {
        return {
            isMounted: false,
            name: "viewDoctorApptBlock",
          }
    },

    mounted() {
      console.log(this.doctorName)
      this.$emit(this.doctorName)
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