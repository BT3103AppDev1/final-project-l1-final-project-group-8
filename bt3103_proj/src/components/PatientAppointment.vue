<template>
    <div id="rectangle">
        <div id="apptTitle">Patient's Appointment - {{this.patientName}}</div>
        <div id="count">Showing {{this.count}} appointments</div><br>  
        <div id = "button">
            <button id = "cancelButton" type = "button" @click="$router.go(-1)">Back to All Patients</button>
        </div>   
        <table id="table">
                <tr>
                    <th>DATE</th>
                    <th>TIME</th>
                    <th>DOCTOR NAME</th>
                    <th>ACTIONS</th>
                </tr>
        </table><br>
        
    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import {getFirestore, setDoc, Timestamp, deleteField, deleteDoc} from "firebase/firestore"
import {collection, getDocs,doc, updateDoc,getDoc} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
    props: ['info'],

    data() {
        return {
            patientId: this.info.patientId,
            count: 0,
            patientName: '',
            user: false,
            useremail: false
        };
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

        const self = this;

        async function display() {
            let allPatientDocuments = await getDoc(doc(db, String(self.useremail), "patients")) // hardcoded for now
            allPatientDocuments = allPatientDocuments.data()
            const patientDocuments = allPatientDocuments[self.patientId] 
            self.patientName = patientDocuments.name

            const docRef = await getDoc(doc(db, String(self.useremail), "doctors")) // hardcoded for now
            const allDoctorDocuments = docRef.data()
            
            let index = 1
            let total = 0
        
            Object.keys(allDoctorDocuments).forEach((docs) => {
                console.log(docs)
                const doctorName = docs
                const doctorDocuments = allDoctorDocuments[doctorName]
                doctorDocuments.forEach((doc) => {
                    let patient_id = doc
                    if (patient_id == self.patientId && patientDocuments.upcoming_appoint == true) {
                        total += 1
                        const apptDateTime = patientDocuments.appoint_date
                        console.log(apptDateTime)
                        let apptDate = apptDateTime.slice(0, 10)
                        let apptTime = apptDateTime.slice(11, )

                        let table = document.getElementById("table")
                        let row = table.insertRow(index)
                        
                        let info = [
                            apptDate,
                            apptTime,
                            doctorName,
                        ]

                        for (let cellIndex = 0; cellIndex < 3; cellIndex++) {
                            let currCell = row.insertCell(cellIndex);
                            currCell.innerHTML = info[cellIndex];
                        }

                        let cell9 = row.insertCell();
                    
                        let deleteButton = document.createElement("button")
                        deleteButton.id = String(self.patientId)
                        deleteButton.className = "bwt"
                        deleteButton.innerHTML = "Cancel Appointment"
                        deleteButton.style.cssText = 'width:190px;height: 50px;background: #d7e7d9;border: none;border-radius: 6px;font-weight:600;font-size: 16px;position:relative; left: 20px;top: 2px'

                        let editButton = document.createElement("button")
                        editButton.id = String(self.patientId)
                        editButton.className = "bwt"
                        editButton.innerHTML = "Edit Appointment"
                        editButton.style.cssText = 'width:145px;height: 50px;background: #d7e7d9;border: none;border-radius: 6px;font-weight:600;font-size: 16px;position:relative; top: 2px'

                        cell9.appendChild(editButton)
                        editButton.onclick = function() {
                            // self.$router.push("/edit_appoint_page")
                            self.$router.push({name: 'editApptPage', params: {doctorName: doctorName, patientId: self.patientId}})
                        }
                        cell9.appendChild(deleteButton)
                        deleteButton.onclick = function() {
                            deleteEntry(doctorName)
                        }

                    index += 1
                }})
            })
            self.count = total           
        }

        display()

        async function deleteEntry(doctorName) {
            if (confirm("Cancelling appointment with doctor " + doctorName)) {
                const doctorRef = doc(db, String(self.useremail), 'doctors')
                const doctorSnapshot = await getDoc(doctorRef)
                const doctorData = doctorSnapshot.data()
                let updatedDoctorData = doctorData[doctorName].filter(function(e) { return e != this.patientId })
                console.log(updatedDoctorData)
                await updateDoc(doctorRef, {
                    [doctorName]: updatedDoctorData,
                }
            );

            const patientRef = doc(db, String(self.useremail), 'patients')
            const patientSnapshot = await getDoc(this.patientId)
            const patientData = patientSnapshot.data()
            let updatedPatientData = {
                [self.patientId] : {
                    "appoint_date" : null,
                    "blood" : patientData[self.patientId].blood,
                    "diagnosis" : patientData[self.patientId].diagnosis,
                    "dob" : patientData[self.patientId].dob,
                    "gender" : patientData[self.patientId].gender,
                    "id" : self.patientId,
                    "logs" : patientData[self.patientId].logs,
                    "name" : patientData[self.patientId].name,
                    "treatment" : patientData[self.patientId].treatment,
                    "upcoming_appoint" : false,
                    "contact_num" : patientData[self.patientId].contact_num
                }
            }
            console.log(updatedPatientData)
            await updateDoc(patientRef, {
                [self.patientId]: updatedPatientData,
            });

            alert("Succesfully cancelled appointment with doctor ", doctorName)
            let tb = document.getElementById("table")
            while (tb.rows.length >= 1) {
                tb.deleteRow(1)
            }
            display()
        }
            
        }
    }
}
</script>

<style scoped>
#rectangle {
    width: 83%;
    height: 100%;
    background: #ECFFD6; 
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.50);
    border-radius: 67px;
    align-content: center;
    position: absolute;
    left: 15em;
    top: 0em;
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

#count {
    position:relative;
    color: black;
    font-size: 20px;
    font-family: Poppins, Inter-Bold,Arial, Helvetica, sans-serif;   
    top: 4.5em;
    left: 4.9rem;
}

#table {
    font-family: Poppins, Arial, Helvetica, sans-serif;
    /* border-top: 1px solid;
    border-bottom: 1px solid; */
    border-collapse: collapse;
    width: 100%;
    /* height: 10%; */
    align-content: center;
    text-align: center;
    line-height: 350%;
    padding: 5px;
    background-color:white;
    color: black;
    position: relative;
    top: 10em;
    left: 0rem;
}

button {
    width:200px;
    height: 35px;
    background: #8FBC94; 
    border: none;
    border-radius: 6px;
    font-weight:600;
    font-size: 16px;
}

#button {
    position: relative;
    top: 7em;
    left: 4.9rem;
}

button:hover {
    background: #d7e7d9;
    font-weight: 600; 
}

tr {
    background: #d7e7d9;
    font-weight: 600; 
}
</style>
