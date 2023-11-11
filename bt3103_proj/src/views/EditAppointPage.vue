<template>
    <div>
      <div id="app-container">
        <div class="sidebar-container"><InternalSidebar v-if="isMounted" :tabName="name"/></div>
        <div class="main-page-elements"><EditAppointment/></div>  
  
      </div>
    </div>
</template>
  
<script>
import InternalSidebar from '@/components/InternalSidebar.vue'
import EditAppointment from '@/components/EditAppointment.vue'

export default {
  components: {
    InternalSidebar,
    EditAppointment,
  }, 

  data() {
      return {
          isMounted: false,
          name: "editApptBlock"
      }
  },

  mounted() {
      this.isMounted = true
  }
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