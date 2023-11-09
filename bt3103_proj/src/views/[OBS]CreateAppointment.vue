<template>
<div v-if = "user">
    <Appointment_form/>
</div>
</template>

<script>
import Appointment_form from '../components/Appointment_form.vue';
import {getAuth, onAuthStateChanged} from 'firebase/auth'

export default {
    data() {
        return {
            user : false
        }
    },
    components: {
        Appointment_form
    },
    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
            }
        })
    }
}
</script>

<style>

</style>