<template>
<div>
    <div id="app-container">
        <div class="sidebar-container"><InternalSidebar v-if="isMounted" :tabName="name"/></div>
        
        <div class="main-page-elements">
            <div id = "options">
                <div id = "buttonWrapper">
                    <div id = "Buttons">
                        <button id = "AddPat" type="button" @click="createPatient"><b>Add New Patient</b></button>
                        <button id = "AddDoc" type="button" @click="createDoctor"><b>Add New Doctor</b></button>
                    </div>
                </div>

                <div id = "output">
                    <div id = "PatientForm" v-if="patient = patient">
                        <AddPatient/>
                    </div>
                    <div id = "DoctorForm" v-if = "doctor = doctor">
                        <AddDoctor/>
                    </div>
                </div>

                -<div id = "toGoBack" v-if="cancel = cancel">
                    <button id = "back" type="button" @click="reloadPage">Cancel</button>
                </div>
            </div>
        </div>
    
    </div>
</div>

</template>

<script>
import InternalSidebar from '@/components/InternalSidebar.vue'
import AddDoctor from '@/components/AddDoctor.vue'
import AddPatient from '@/components/AddPatient.vue'

export default {
    components: {
        InternalSidebar,
        AddDoctor,
        AddPatient
    },

    data() {
        return {
            isMounted: false,
            name: "addPeopleBlock",

            patient : false,
            doctor : false,
            cancel : false
        }
    },

    mounted() {
        this.isMounted = true
    },

    methods:{
        reloadPage() {
            window.location.reload();
        },
        createPatient() {
            this.patient = true
            this.doctor = false
            this.cancel = true
        },

        createDoctor() {
            this.doctor = true
            this.patient = false
            this.cancel = true
        },

        closeAdd() {
            this.cancel = false
        }
    },
}
</script>

<style scoped>
#buttonWrapper {
width: 200px;
margin: 0 auto;
display: inline;
}

button {
    width: 100px;
    border-radius: 4px;
    border-radius: 4px;
    overflow: hidden; 
    justify-content: center; 
    align-items: center; 
    display: inline;
    border: none;
    padding: 7px;
    font-family: Poppins, Inter-Bold,Arial, Helvetica, sans-serif;
    background: #8FBC94;
    font-weight: 400;
}

button:hover {
    background: #d7e7d9; 
}

#AddPat {
    position: relative;
    left: 2rem;
    right:5rem;
    width: 200px;
    top: 10em;
}

#AddDoc {
    position: relative;
    left: 10rem;
    right:5rem;
    width: 200px;
    top: 10em;
}

#back {
    background:white;
    position: relative;
    left: 5rem;
    bottom: 1rem;
    background-color: #FF0000;
}

#back:hover {
    background: #d7e7d9;
}

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

