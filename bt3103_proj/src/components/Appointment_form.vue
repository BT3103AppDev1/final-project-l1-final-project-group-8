<template>
<div id = "createAppointment">
    <div id = "formWrapper">
        <div id = "header">Create an Appointment</div>

        <form action="" id = "Appform">
            <div id = "firstInput">
                <label for="chooseDoc">Select Doctor</label><br>
                <select id="chooseDoc" name="chooseDoc" v-model="selectedDoctor" required>
                    <!-- <option value ="default">----</option> -->
                    <option v-for="doctor in doctors" :key="doctor.value" :value="doctor.value">{{ doctor.label }}</option>
                </select>
                <div class = "subtext">Select a doctor for the appointment</div>
            </div>

            <div id="secondInput">
                <label for="choosePat">Enter Patient</label><br>
                <!-- <input type="text" name="choosePat" id="choosePat" required> -->
                <select id="choosePat" name="choosePat" v-model="selectedPatient" required>
                    <option v-for="patient in patients" :key="patient.value" :value="patient.value">{{ patient.label }}</option>
                </select>
                <div class = "subtext">Enter a registered patient for the appointment</div>
            </div>

            <div id = "thirdInput">
            <label for="AppDT">Select Appointment Date & Time</label><br>
                <input type="datetime-local" step="900" id="AppDT" name="AppDT" style = "font-family:Arial, Helvetica, sans-serif" v-model="selectedDate" required>
                <div class = "subtext">Set appointment date for the patient and the doctor. 
                    Please select a date and time slot where the doctor is free
                </div>
            </div>
        </form>

        <div id="buttonWrapper">
            <button id = "saveButton" type="button" @click="handleSubmit">Submit</button>
            <button id = "cancelButton" type="button" @click="refreshPage">Clear</button>
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
            selectedDoctor: 'default',
            doctors: [],
            patients: [],

            selectedDoctor: null,
            selectedPatient: null,
            selectedDate: null,
        };
    },

    async created() {
        try {
            // DOCTOR RETRIEVAL
            const clinicDocRef = doc(db, 'clinic1', 'doctors'); // clinic1 hard coded for now
            const clinicDocSnapshot = await getDoc(clinicDocRef);
            
            if (clinicDocSnapshot.exists()) {
                const clinicData = clinicDocSnapshot.data();
                for (const doctorName in clinicData) {
                    if (Array.isArray(clinicData[doctorName])) {
                        this.doctors.push({
                            value: doctorName,
                            label: doctorName, // can use diff field if have
                        });
                    }
                }
            }

            // PATIENT RETRIEVAL
            const clinicPatientRef = doc(db, 'clinic1', 'patients'); // clinic1 hard coded for now
            const clinicPatientSnapshot = await getDoc(clinicPatientRef);
            
            if (clinicPatientSnapshot.exists()) {
                const clinicData = clinicPatientSnapshot.data();
                for (const patientName in clinicData) {
                    if (!clinicData[patientName].upcoming_appoint) {
                        this.patients.push({
                            value: patientName,
                            label: patientName, // can use diff field if have
                        });
                    }
                }
            }
        }
        
        catch (error) {
            console.error('Error fetching data from Firestore: ', error);
        }
    },

    methods : {
        async newDoc() {
            let doctName = document.getElementById("docName").value;
            let docRef = doc(db,"clinic1","doctors") //clinic1 is hardcoded for now. will be email later
            console.log(doctName)
            const newData = {
                [doctName] : []
            }
            await setDoc(docRef, newData, {merge : true})

            alert("Added " + doctName + " as a doctor")
            window.location.reload()
        },

        async handleSubmit() {
            try {
                const doctorRef = doc(db, 'clinic1', 'doctors');
                const doctorSnapshot = await getDoc(doctorRef);
                const doctorData = doctorSnapshot.data()

                // Update the patient's document
                const patientDocRef = doc(db, 'clinic1', 'patients');
                const patientSnapshot = await getDoc(patientDocRef);
                const patientData = patientSnapshot.data()

                if (this.selectedDoctor != null && this.selectedPatient != null && this.selectedDate != null) {
                    // doctorData["Mike"].push("testPatient") //hardcoded to test
                    doctorData[this.selectedDoctor].push(this.selectedPatient)

                    patientData[this.selectedPatient]["appoint_date"] = this.selectedDate
                    patientData[this.selectedPatient]["upcoming_appoint"] = true

                    await updateDoc(doctorRef, {
                        [this.selectedDoctor]: doctorData[this.selectedDoctor],
                    });
                    
                    await updateDoc(patientDocRef, {
                        [this.selectedPatient]: patientData[this.selectedPatient]
                    });

                    alert("Successfully updated appointment!")
                    this.refreshPage();

                } else {
                    alert("Error: did you select all fields?")
                }

            } catch (error) {
                alert('Error updating Firestore data: did you select all required fields?');
            }
        },

        refreshPage() {
            window.location.reload();
        }
    }
}
</script>

<style scoped>

#createAppointment {
    background: #DFFFE3; 
    padding: 20px;
    border-radius: 20px; 
}

form {
    margin-bottom: 20px;
}

#header {
    color: black;
    font-size: 32px;
    font-family: Inter-Regular, Arial, Helvetica, sans-serif;
    font-weight: 700;
    margin-bottom: 20px;
    /* word-wrap: break-word; */
}

.subtext {
    width: 100%; 
    color: #768898; 
    font-size: 14px; 
    font-family: Poppins, Inter-Regular, Arial, Helvetica, sans-serif; 
    font-weight: 400; 
    line-height: 18px; 
    /* word-wrap: break-word; */
}

#secondInput, #thirdInput{
    margin-top: 25px;
}

#chooseDoc{
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    border: 1px solid var(--grey-300, #d8dde3);
    box-shadow: 0px 0px 4px 0px rgba(23, 25, 28, 0.05);
    background-color: var(--text-text-0, #fff);
    align-self: start;
    display: flex;
    margin-top: 8px;
    margin-bottom: 4px;
    width: 100%;
    flex-grow: 1;
    flex-direction: column;
    /* padding: 4px 20px; */
}

select {
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    border: 1px solid var(--grey-300, #d8dde3);
    box-shadow: 0px 0px 4px 0px rgba(23, 25, 28, 0.05);
    background-color: white;
    align-self: start;
    display: flex;
    margin: 8px 0px 8px 0px;
    width: 100%;
    flex-grow: 1;
    flex-direction: column;
    padding: 4px 20px;
}

label {
    color: #262E36;
    font-size: 14px;
    font-family: Poppins, Inter-Regular, Arial, Helvetica, sans-serif;
    font-weight: 400;
    line-height: 14px;
    word-wrap: break-word
}

#AppDT {
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-radius: 8px;
    border: 1px solid var(--grey-300, #d8dde3);
    box-shadow: 0px 0px 4px 0px rgba(23, 25, 28, 0.05);
    background-color: white;
    margin: 8px 0px 8px 0px;
    padding: 4px 2px;    
    align-self: start;
    display: flex;
    margin-top: 8px;
    margin-bottom: 4px;

    flex-grow: 1;
    flex-direction: column;
    padding: 4px 20px;
}

#buttonWrapper {
    text-align: center;
}

button {
    width: 80px; /* Adjust the width as needed */
    height: 40px; /* Adjust the height as needed */
    border-radius: 5px;
    display: inline;
    margin: 0 10px 0 10px;
    color: white;
    font-weight: bold;

    /* overflow: hidden; 
    justify-content: center; 
    align-items: center; 
    border: none;
    padding: 7px;
    font-family: Inter-Regular, Arial, Helvetica, sans-serif; */
}

#saveButton {
    background: #6DA34D;
}

#cancelButton {
    background: #FF0000;
}

#saveButton:hover {
    background: #4B772B;
}

#actionBtn {
    width: 200px;
    margin: 0 auto;
    display: flex;
}




</style>