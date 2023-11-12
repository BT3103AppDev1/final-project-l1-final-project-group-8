<template>
<div id = "mega" >
    <div id = "rectangle">
        <div id = "content">
            <div id = "Title">
                Assign Patient to Doctor
            </div>

            <div id="searchContainer">

                <div id="selDoc">
                    <!--<label for="docID">Select Doctor</label><br>-->
                    <div class = "title" style="font-size: 16px;">Select Doctor:</div>
                    <form action="">
                        <input type="text" name="docID" id="docID">
                    </form>
                </div>

            


                <div id = "selPat">
                    <label for="patID" style="font-size: 16px;">Select Patient</label><br>
                    <!-- <input type="text" name="choosePat" id="choosePat" required> -->
                    <select id="patID" name="patID" v-model="selectedPatient" required>
                        <option v-for="patient in patients" :key="patient.value" :value="patient.value">{{ patient.label }}</option>
                    </select>
                </div>
                
                <div id = "searchButt">
                    <button id = "searchButton" type="button" @click="assignPat">Add</button>
                </div>
            </div>
        
        </div>
    </div>

</div>

</template>

<script>
import firebaseApp from '../firebase.js';
import {arrayUnion, getFirestore, setDoc} from "firebase/firestore"
import {collection, getDocs,doc, updateDoc,getDoc} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
    data() {
        return {
            //selectedDoctor: 'default',
            doctors: [],
            patients: [],

            selectedDoctor: null,
            selectedPatient: null,
            selectedDate: null,

            user: false,
            useremail:false
        }
    },

    async created() {
        try {
            // DOCTOR RETRIEVAL
            const clinicDocRef = doc(db, String(this.useremail), 'doctors'); // clinic1 hard coded for now
            const clinicDocSnapshot = await getDoc(clinicDocRef);
            
            if (clinicDocSnapshot.exists()) {
                const clinicData = clinicDocSnapshot.data();
                for (const doctorName in clinicData) {
                    //if (Array.isArray(clinicData[doctorName])) {
                    //    this.doctors.push({
                    //        value: doctorName,
                    //        label: doctorName, // can use diff field if have
                    //    });
                    //}
                    this.doctors.push({
                        value: doctorName,
                        label: doctorName,
                    });
                }
            }

            // PATIENT RETRIEVAL
            const clinicPatientRef = doc(db, String(this.useremail), 'patients'); // clinic1 hard coded for now
            const clinicPatientSnapshot = await getDoc(clinicPatientRef);
            
            if (clinicPatientSnapshot.exists()) {
                const clinicData = clinicPatientSnapshot.data();
                for (const patientName in clinicData) {
                    //if (!clinicData[patientName].upcoming_appoint) {
                    //    this.patients.push({
                    //        value: patientName,
                    //        label: patientName, // can use diff field if have
                    //    });
                    //}
                    this.patients.push({
                        value:patientName,
                        label:patientName,
                    });
                }
            }
        }
        
        catch (error) {
            console.error('Error fetching data from Firestore: ', error);
        }
    },
    
    methods: {
        async assignPat() {
            let docID = document.getElementById("docID").value
            let patID = document.getElementById("patID").value
            let docRef = doc(db,String(this.useremail),"doctors") //clinic1 hardcoded, will be email

            try {
                const updateData = {
                [docID] : arrayUnion(patID)
            }
                await updateDoc(docRef,updateData, {merge : true})
                alert("Assigned patient " + patID + " to "+ docID)
                window.location.reload()

            } catch (error) {
                alert("ID incorrect. Please try again")
                window.location.reload()
            } //this doesn't work it just creates a new doctor bruh wtv
            

        }
    },

    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('User is logged in:', user);
                this.user = user;
                this.useremail = auth.currentUser.email;
            } else {
                // User is not logged in
                console.log('User is not logged in');
                this.user = null;
            }
        })
    }
}
</script>

<style scoped>
#rectangle {
    /* height: 150px; */
    width: 400px;
    background: #F7F7F7; 
    border-radius: 20px;
    font-family: Poppins, Inter-Bold,Arial, Helvetica, sans-serif;
    font-size: 32px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.50); 
    padding: 20px;
    position: absolute;
    left: 20rem;
}



#Title {
    color: #212121;
    font-size: 18px;
    font-family: Poppins, Arial, Helvetica, sans-serif;
    font-weight: 500;
    line-height: 21px;
    word-wrap: break-word;
    font-weight:600;
    margin-bottom: 15px;
}

#searchBar {
    margin: 10px 0 20px 0
}

#patID {
    background: white; 
    border-radius: 10px; 
    border: 1px #C5C5C5 solid;
    height: 25px;
    /* width: 200px; */
    width: 10em;
    
}

#docID {
    background: white; 
    border-radius: 10px; 
    border: 1px #C5C5C5 solid;
    height: 25px;
    /* width: 200px; */
    margin-bottom: 1em;
    margin-right: 20px;
    width: 10em;
}

#searchButton {
    background: #8FBC94; 
    border-radius: 6px;
    height: 29px;
    width: 86px;
    border: none;
    font-weight: 600;
    margin-top: 1em;
}

#searchButton:hover {
    background: #d7e7d9; 
    border-radius: 6px;
    height: 29px;
    width: 86px;
    border: none;
    font-weight: 600;
    
}

#resultRect {
    position: inherit;
    top: 10rem;
    background: white; 
    box-shadow: 0px 0px 30px rgba(56.09, 71.02, 109.44, 0.09); 
    border-radius: 12px; 
    overflow: hidden;
}

#resultTable {
    font-family: Poppins, Inter-Light, Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

#tableHeadRow {
    background: #B5B5C3; 
}



</style>