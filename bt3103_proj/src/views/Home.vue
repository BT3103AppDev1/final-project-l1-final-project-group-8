<template>

</template>

<script>
import NavBar from '@/components/NavBar.vue'
import WelcomeCPP from '@/components/WelcomeCPP.vue'
import AddCoin from '@/components/AddCoin.vue'
import ProfitDisplay from '@/components/ProfitDisplay.vue'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import LogOut from '@/components/LogOut.vue'

export default {
    name: "App",
    components: {
        NavBar,
        WelcomeCPP,
        AddCoin,
        ProfitDisplay,
        LogOut
    },

    data() {
        return {
            refreshComp: 0,
            user: false
        }
    },

    methods: {
        change() {
            this.refreshComp += 1
        }
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

<style scoped>
#app {
    display: block;
    font-family: Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    margin-top: 30px;
}

#coinsPic {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 20%;
}

h1{
    font-weight: bold;
}
</style>