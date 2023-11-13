<template>
    <div>
      <div id="app-container">
        <div class="sidebar-container"><InternalSidebar v-if="isMounted" :tabName="name"/></div>
        <div class="main-page-elements"><AssignPatient/></div>  
  
      </div>
    </div>
</template>

<script scoped>
import InternalSidebar from '@/components/InternalSidebar.vue'
import AssignPatient from '@/components/AssignPatient.vue'

export default {
    components : {
        InternalSidebar,
        AssignPatient,
    },

    data() {
        return {
            isMounted: false,
            name: "assignPatDocBlock"
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
    position: absolute;
    padding-left: 20em;
    padding-top: 6em;
}
</style>