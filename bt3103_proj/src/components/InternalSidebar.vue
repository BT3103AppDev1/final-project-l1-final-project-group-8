<template>
    <div id = "sidebar">
        <img id="clinic_logo" src="@/assets/everhealth_logo.png" alt="clinic_logo">
        <div id="lineDiv"></div>

        <br>

        <!-- <div id="patientBlock"><p>VIEW IS: LOGGED IN</p></div>
        <div><p>Option 2</p></div>
        <div><p>Option 3</p></div>
        <div><p>Option 4</p></div> -->

        <router-link class="routerElement" style="text-decoration: none;" to="/all_appoint_page">
            <div id="allApptBlock"><p>All Appoinments</p></div>
        </router-link>

        <router-link class="routerElement" style="text-decoration: none;" to="/all_patients">
            <div id="viewAllPatientsBlock"><p>All Patients</p></div>
        </router-link>
        
        <router-link class="routerElement" style="text-decoration: none;" to="/all_doctors">
            <div id="viewAllDoctorsBlock"><p>All Doctors</p></div>
        </router-link>

        <router-link class="routerElement" style="text-decoration: none;" to="/create_appoint_page">
            <div id="createApptBlock"><p>Create Appointment</p></div>
        </router-link>
        
        <router-link class="routerElement" style="text-decoration: none;" to="/add_people_page">
            <div id="addPeopleBlock"><p>Add Doctors/Patients</p></div>
        </router-link>

        <router-link class="routerElement" style="text-decoration: none;" to="/assign_pat_doc_page">
            <div id="assignPatDocBlock"><p>Assign Patients to Doctors</p></div>
        </router-link>

        <br>
        <button id = "button" @click="signOut" v-if="user"> Logout </button>

    </div>

</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

export default {
    name: "internal_sidebar",

    data() {
        return {
            user: false,
        }
    },

    props: {
        tabName: String
    },

    methods: {
        signOut() {
            const auth = getAuth();
            const user = auth.currentUser;
            if (confirm("Logging out of clinic account")) {
                signOut(auth, user)
                this.$router.push({name:'Login'})
            }
        },

        changeSelection() {
            console.log(this.tabName)
            let tname = this.tabName
            if (this.tabName == 'viewDoctorApptBlock') {
                tname = "viewAllDoctorsBlock"
            }
            if ((this.tabName == 'editApptBlock')) {
                tname = "allApptBlock"
            }
            if (this.tabName == 'indivUserDetBlock' || this.tabName == 'viewPatientApptBlock') {
                tname = "viewAllPatientsBlock"
            }
            const allTabs = document.querySelectorAll('.routerElement')
            allTabs.forEach((tab) => {
                const divs = tab.querySelectorAll('div');

                divs.forEach((div) => {
                    div.style.backgroundColor = "rgb(140, 195, 140)";
                    div.style.color = "black";
                    div.style.textAlign = "left";
                    div.style.padding = "15px 0 15px 20px";
                });
            });

            const currSelected = document.getElementById(tname)
            currSelected.style.backgroundColor = 'white'     
            const paraElem = currSelected.querySelector('p');
            paraElem.style.fontWeight = 'bold'
        }
    },

    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => { 
        if (user) {
            this.user = user;
        }
        })
        this.changeSelection()
    }
}


</script>

<style scoped>

body {
    font-family: "Helvetica";
    height: 100%;
}

#clinic_logo {
    width: 100%;
    padding: 10px;
}

#sidebar {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: rgb(140, 195, 140);
    /* width: 15%;
    height: 100%; */
    width: 220px;
    height: 100%;
    top: 0;
    left: 0;
    /* position:absolute; */

    overflow-y: auto;
}

#lineDiv {
    background-color: #d7e7d9;
    height: 1px;
}

#button {
    background-color: #d7e7d9;
    padding: 10px 15px;
    text-align: center;
    color: black;
    font-weight: bold;
    border: solid 1px grey;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
    left: 10%;
  }
  
  #button:hover {
    background-color: #8FBC94;
    color:white
  }
</style>