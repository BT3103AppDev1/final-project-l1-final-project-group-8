<template>
    <div>
      <div id="app-container">
        <div class="login-sidebar-container"><login_sidebar v-if="isMounted" :tabName="name"/></div>

        <div class="main-page-elements">
          <h1 style="font-weight: bold;">Clinic Signup</h1>
          <div id="formWrapper">
            <form id="form" @submit.prevent="signup">
              <div class="inputWrapper">
                <input class="textBox" type="email" v-model="email" placeholder="Email" required />
              </div>
              <div class="inputWrapper">
                <input class="textBox" type="password" v-model="password" placeholder="Password" required />
                <span v-if="passwordError" class="error">{{ passwordError }}</span>
              </div>
              <br />
              <button id="saveButton" type="submit">Sign Up</button>
            </form>
          </div>
        </div>  

      </div>
    </div>
  </template>
  
  <script>
  import { registerUser } from '@/uifirebase';
  import login_sidebar from '@/components/login_sidebar.vue'
  
  export default {
    components: {
      login_sidebar,
    },

    data() {
      return {
        email: '',
        password: '',
        passwordError: null,
        isMounted: false,
        name: "signupBlock",
      };
    },

    mounted() {
      this.isMounted = true
    },

    methods: {
      async signup() {
        // Validate password length
        if (this.password.length < 6) {
          this.passwordError = 'Password must be at least 6 characters';
          return;
        } else {
          this.passwordError = null;
        }
  
        try {
          await registerUser(this.email, this.password);
          this.$router.push('/');
        } catch (error) {
          console.error('Signup error:', error.message);
        }
      },
    },
  };
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

  #errorMsg {
    color: red;
  }
  
  #formWrapper {
    display: block;
  }
  
  #form {
    display: block;
    text-align: left;
    padding: 5px;
  }
  
  .inputWrapper {
    text-align: left;
    padding: 10px 10px 10px 0;
  }
  
  .textBox {
    padding: 10px;
    width: 100%;
    border: 1px solid gray;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  
  #saveButton {
    background-color: rgb(140, 195, 140);
    padding: 10px 15px;
    text-align: center;
    color: white;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
  }
  
  #saveButton:hover {
    background-color: rgb(120, 175, 120);
  }
  </style>
  