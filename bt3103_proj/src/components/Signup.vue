<template>
    <div id="formWrapper">
      <form id="form" @submit.prevent="signup">
        <div class="inputWrapper">
          <input class="textBox" type="email" v-model="email" placeholder="Email" required />
        </div>
        <div class="inputWrapper">
          <input class="textBox" type="password" v-model="password" placeholder="Password" required />
        </div>
        <br />
        <button id="saveButton" type="submit">Sign Up</button>
      </form>
    </div>
  </template>
  
  <script>
  import { registerUser } from '@/uifirebase';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      async signup() {
        try {
          await registerUser(this.email, this.password);
          // Redirect the user to the desired page after successful signup
          this.$router.push('/login'); // Redirect to the login page after signup
        } catch (error) {
          console.error('Signup error:', error.message);
          // Handle signup errors, e.g., show an error message to the user
        }
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
  
  #form {
    display: block;
    text-align: left;
    padding: 5px;
    /* border: 1px solid red; */
  }
  
  .inputWrapper {
    text-align: left;
    padding: 10px 10px 10px 0;
    /* border: 1px solid blue; */
  }
  
  .textBox {
    padding: 10px;
    width: 100%; /* Make the text input take full width of its container */
    border: 1px solid gray;
    border-radius: 5px;
    margin-bottom: 10px; /* Add margin to separate inputs */
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
  