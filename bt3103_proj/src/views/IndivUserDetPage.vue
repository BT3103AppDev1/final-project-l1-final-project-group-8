<template>
    <div>
      <div id="app-container">
        <div class="sidebar-container"><InternalSidebar v-if="isMounted" :tabName="name"/></div>
        <div class="main-page-elements"><Patient_edit :info="{patientId: String(this.patientId)}"/></div>  
  
      </div>
    </div>
</template>
    
<script scoped>
import InternalSidebar from '@/components/InternalSidebar.vue'
import Patient_edit from '@/components/Patient_edit.vue'

export default {
    components : {
        InternalSidebar,
        Patient_edit
    },
    props: {
        patientId: {
            type:String,
            required:true
        }
  },
    data() {
        return {
            isMounted: false,
            name: "indivUserDetBlock"
        }
    },

    mounted() {
        this.isMounted = true
        this.$emit(this.patientId)
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
    padding-left: 6em;
    padding-top: 6em;
}
</style>