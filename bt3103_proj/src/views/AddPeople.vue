<template>
<div id = "options">
    <div id = "buttonWrapper">
        <div id = "Buttons">
            <button id = "AddPat" type="button" @click="createPatient"><b>Add New Patient</b></button>
            <button id = "AddDoc" type="button" @click="createDoctor"><b>Add New Doctor</b></button>
        </div>
    </div>

    <div id = "output">
        <div id = "PatientForm" v-if="patient = patient">

        </div>
        <div id = "DoctorForm" v-if = "doctor = doctor">
            <AddDoctor/>
        </div>
    </div>
</div>

</template>

<script>
import AddDoctor from '../components/AddDoctor.vue'

export default {
    data() {
        return {
            patient : false,
            doctor : false
        }
    },

    methods:{
        createPatient() {
            this.patient = true
            this.doctor = false
        },

        createDoctor() {
            this.doctor = true
            this.patient = false
        }
    },

    components: {
        AddDoctor
    }
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
    font-family: Inter-Regular, Arial, Helvetica, sans-serif;
    background: #6DA34D;
    font-weight: 300;
}

button:hover {
    background: #d7e7d9; 
}

#AddPat {
    position: relative;
    right:1rem;
}

</style>

