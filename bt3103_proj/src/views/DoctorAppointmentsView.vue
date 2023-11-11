<template>
    <div>
      <div id="app-container">
        <!-- <div class="sidebar-container"><InternalSidebar/></div> -->
        <div class="main-page-elements"><DoctorAppointment/></div>  
      </div>
    </div>
</template>
  
<script>
// import InternalSidebar from '@/components/InternalSidebar.vue'
import DoctorAppointment from '@/components/DoctorAppointment.vue'

export default {
    name: 'doctor-appointment-view',
  components: {
    // InternalSidebar,
    DoctorAppointment,
  } ,

  data() {
      return {
        //   isMounted: false,
        //   name: "",
        //   doctorName: 'Adam',
      }
    },

//   mounted() {
        // this.name = 'view-doctor-appointment',
        // this.doctorName = "Adam"
        // this.isMounted = true
    // }
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