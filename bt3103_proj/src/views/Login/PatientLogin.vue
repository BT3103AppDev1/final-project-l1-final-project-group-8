<template>
    <div id="app-container">
        <LoginSidebar v-if="isMounted" :tabName="name"/>
        <div class="router-view-container">
            <LoginFields/>
            <br><br><br>
            <p style="font-style: italic; color: gray;">[note: this text is in the PatientLogin.vue view page;</p>
            <p style="font-style: italic; color: gray;">for the error message above, we will have to add in a v-if conditional or smth to make it conditionally render]</p>
        </div>
    </div>
</template>
    
<script>
import LoginSidebar from '@/components/LoginSidebar.vue'
import LoginFields from '@/components/LoginFields.vue'

export default {
    components: {
        LoginSidebar,
        LoginFields
    },

    data() {
        return {
            isMounted: false,
            name: "patientBlock"
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

.router-view-container {
    display: block;
    padding-left: 10%;
    padding-top: 10%
}
</style>