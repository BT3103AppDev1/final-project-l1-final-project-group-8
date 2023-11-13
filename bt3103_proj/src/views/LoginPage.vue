<template>
    <div>
      <div id="app-container">
        <!--<Appointment_form/>-->
        <div class="login-sidebar-container"><login_sidebar v-if="isMounted" :tabName="name"/></div>
        <div class="main-page-elements">
          <h1 style="font-weight: bold;">Clinic Staff Login</h1>
          <LoginFields/>
        </div>  
      </div>
    </div>
</template>
  
  <script>
  import login_sidebar from '@/components/login_sidebar.vue'
  import LoginFields from '@/components/LoginFields.vue'
  
  export default {
    components: {
      login_sidebar,
      LoginFields,
    },

    data() {
        return {
            isMounted: false,
            name: "loginBlock",
          }
    },

    mounted() {
      this.isMounted = true
    },
  }
  </script>
  
  <style scoped>
  
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