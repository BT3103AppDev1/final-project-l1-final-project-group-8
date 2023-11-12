<template>
    <div id="formWrapper">
      <p id="errorMsg" v-if="errorMsg">{{ errorMsg }}</p>
  
      <form id="form" @submit.prevent="login">
        <div class="inputWrapper">
          <input v-model="email" class="textBox" type="text" size="50" placeholder="Email Address">
        </div>
        <div class="inputWrapper">
          <input v-model="password" class="textBox" type="password" size="50" placeholder="Password">
        </div>
        <br>
        <button id="saveButton" type="submit">Log in</button>
      </form>
    </div>
  
    <br>
  
    <div style="height:1px; background-color: lightgray;"></div>
  
    <br>
  
    <p id="forgotPW" style="color: blue; text-decoration: underline;">Forgot your password?</p>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { loginUser } from '@/uifirebase'; // Import the loginUser function
  
  export default {
    name: "LoginFields",
  
    data() {
      return {
        email: "",
        password: "",
        errorMsg: null,
      };
    },
  
    methods: {
      login() {
        // Call the loginUser function from uifirebase.js
        loginUser(this.email, this.password)
          .then((user) => {
            // Redirect to the all appointments page on successful login
            this.$router.push('/all_appoint_page');
          })
          .catch((error) => {
            // Handle login errors
            console.error('Login error:', error);
  
            if (error.code && error.message) {
              this.errorMsg = `Error: ${error.code} - ${error.message}`;
            } else {
              this.errorMsg = 'An unexpected error occurred during login.';
            }
          });
      },
    },
  };
  </script>
  
  <style scoped>
  #errorMsg {
      color: red;
  }
  
  #formWrapper {
      display: block;
  }
  
  #form{
      display: block;
      text-align: left;
      padding: 5px;
      /* border: 1px solid red; */
  }
  
  .inputWrapper{
      /* display: block; */
      /* width: 45%; */
      text-align: left;
      padding: 10px 10px 10px 0;
      /* border: 1px solid blue; */
  }
  
  .textBox {
      padding: 10px;
      border: 1px solid gray;
      border-radius: 5px;
  }
  
  #saveButton {
      background-color: rgb(140, 195, 140);
      padding: 10px 15px 10px 15px;
      text-align: center;
      color: white;
      font-weight: bold;
      border-radius: 5px;
  }
  </style>
  