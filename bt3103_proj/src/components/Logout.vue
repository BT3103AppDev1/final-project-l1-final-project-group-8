<template>
    <button id = "saveButton" @click="signOut()" v-if="user"> Logout </button>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

export default {
    name: "Logout",
    
    data() {
        return {
            user: false,
        }
    },

    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => { 
        if (user) {
            this.user = user;
        }
        })
    },

    methods: {
        signOut() {
            const auth = getAuth();
            const user = auth.currentUser;
            signOut(auth, user)
            this.$router.push({name:'Login'})
        }
    }
}

</script>

<style scoped>
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