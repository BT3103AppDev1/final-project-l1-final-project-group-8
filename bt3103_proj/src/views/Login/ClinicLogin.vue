<template>
    <div id="app-container">
        <LoginSidebar v-if="isMounted" :tabName="name"/>
        <div class="router-view-container">
            <LoginFields/>
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
            name: "clinicBlock",
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