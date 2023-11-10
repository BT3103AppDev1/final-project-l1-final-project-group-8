<template>
    <div id = "rectangle">
        <div id = "apptTitle">Editing Apointment - {{ doctorName }} and {{ patientId }}</div>
        <div id = "apptDetail">
            <div id = "doctorName">
                <div class = "title">Doctor Name</div>
                <div id = "doctorName">{{doctorName}}</div> <!--Hard code for now-->
            </div><br><br>
            <div id = "patientName">
                <div class = "title">Patient Name</div>
                <div id = "patientName">{{patientId}}</div> <!--Hard code for now-->
            </div><br><br><br>
            <div>
                <div class="title">Select Appointment Date & Time</div>
                <div class="subtitle">Set apppointment date for the patient and the doctor</div>
                <div class="subtitle">Please select a date and time slot where the doctor is free</div> 
                <form action="" class="datetime-picker">
                    <input id="newdate" type="datetime-local" requred placeholder="D/M/YYYY H:MM:SS"/>
                </form> 
            </div>
        </div>

        <div id = "button" v-if="edit = edit">
            <div id = "actionEditBtn">
                <button id = "submitButton" type="button" @click="submitEdit">Submit</button>
                <button id = "cancelButton" type = "button" @click="cancelEdit">Cancel</button>
            </div>
        </div>
            
        <div v-else id="button">
            <div id = "actionBtn">
                <button id = "editButton" type="button" v-on:click="allowEdit">Edit Details</button>
            </div>
        </div>
    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import {getFirestore, setDoc} from "firebase/firestore"
import {collection, getDocs,doc, updateDoc,getDoc} from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
    data() {
        return {
            doctorName: 'Adam',
            patientId: 'pat1',
            edit : false,
        };
    },

    methods: {
        allowEdit() {
            this.edit = true
        },

        cancelEdit() {
            this.edit = false
        },
        async submitEdit() {
            const patientDocRef = doc(db, 'clinic1', 'patients')
            const patientSnapshot = await getDoc(patientDocRef)
            const patientData = patientSnapshot.data()
            let newDatetime = document.getElementById("newdate").value
            console.log(newDatetime)
            
            let docData = patientData[this.patientId]
            let name = docData.name
            let dob = docData.dob
            let gender = docData.gender
            let blood = docData.blood
            let diagnosis = docData.diagnosis
            let treatment = docData.treatment
            let logs = docData.logs
            let upcoming_appoint = docData.upcoming_appoint
            let appoint_date = newDatetime
            let contact_num = docData.contact_num
            // let updatedPatientData = {

            //     // [this.patientID] : {
            //         "appoint_date" : newDatetime,
            //         "blood" : patientData[this.patientID].blood,
            //         "diagnosis" : patientData[this.patientID].diagnosis,
            //         "dob" : patientData[this.patientID].dob,
            //         "gender" : patientData[this.patientID].gender,
            //         "id" : this.patientID,
            //         "logs" : patientData[this.patientID].logs,
            //         "name" : patientData[this.patientID].name,
            //         "treatment" : patientData[this.patientID].treatment,
            //         "upcoming_appoint" : patientData[this.patientId].upcoming_appoint,
            //         "contact_num" : patientData[this.patientID].contact_num
            //     // }
            // }
            // console.log(updatedPatientData)
            // await updateDoc(patientRef, {
            //     [this.patientId]: updatedPatientData,
            // });

            let updateData = {
                [this.patientId] : {
                    "appoint_date" : appoint_date,
                    "blood" : blood,
                    "diagnosis" : diagnosis,
                    "dob" : dob,
                    "gender" : gender,
                    "id" : this.patientId,
                    "logs" : logs,
                    "name" : name,
                    "treatment" : treatment,
                    "upcoming_appoint" : upcoming_appoint,
                    "contact_num" : contact_num
                }
            }

            await setDoc(patientDocRef, updateData,{merge : true})

            console.log("Succesfully updated appointment with patient", this.patientId)
        }
    },
}
</script>

<style scoped>
#rectangle {
    width: 80%;
    height: 100%;
    background: #ECFFD6; 
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.50);
    border-radius: 67px;
    align-content: center;
    position: absolute;
    left: 15em;
    top: 0.5em;
    font-family: Poppins, Inter-Regular, Arial, Helvetica, sans-serif;
    /* font-size: ; */
}

button {
    width:137px;
    height: 29px;
    background: #8FBC94; 
    border: none;
    border-radius: 6px;
    font-weight:600;
}

button:hover {
    background: #d7e7d9;
    font-weight: 600; 
}

#button {
    position: relative;
    top: 16em;
}

#editButton {
    position: relative;
    left: 30em;
}

#actionEditBtn {
    position: relative;
    left: 20em;
}

#submitButton {
    margin-right: 0.5em;
}

#cancelButton {
    margin-left: 0.5em;
    background: #FF0000;
}

#cancelButton:hover {
    background-color: #ffaeae;
}

.title {
    white-space: nowrap;
    color: #464E5F;
    font-size: 24px;
    font-family: Poppins, Arial, Helvetica, sans-serif;
    font-weight: 600;
    word-wrap: break-word;
    }

#apptDetail {
    position:relative;
    left: 4em;
    top: 6em;
    font-size: 20px;
}

#doctorName {
    /* left: 4.9rem; */
    top: 0.5em;
    position: relative;
    overflow: visible;
    color:black
}

#patientName {
    /* left: 4.9rem; */
    top: 0.5em;
    overflow: visible;
    position: relative;
    color:black
}

.subtitle {
    color:black;
    font-size: 70%;
    position: relative;
    top: 0.5em;
}

#apptTitle {
    position: relative;
    top: 2em;
    left:4.9rem;
    color: black;
    font-size: 32px;
    font-family: Poppins, Inter-Bold,Arial, Helvetica, sans-serif;
    font-weight: 600;
    line-height: 20px;
    word-wrap: break-word
}

.datetime-picker {
    position: relative;
    top: 0.5em;
}
</style>