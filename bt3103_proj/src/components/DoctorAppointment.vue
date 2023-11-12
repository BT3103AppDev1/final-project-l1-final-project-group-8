<template>
    <div id="rectangle">
        <div id="apptTitle">Doctor's Appointment - {{info.doctorName}}</div>
        <div id="count">Showing {{this.count}} appointments</div><br>     
        <div id = "button">
            <button id = "cancelButton" type = "button" @click="$router.go(-1)">Back to All Doctors</button>
        </div>   
        <table id="table">
                <tr>
                    <th>DATE</th>
                    <th>TIME</th>
                    <th>PATIENT NAME</th>
                    <th>PATIENT ID</th>
                    <th>ACTIONS</th>
                </tr>
        </table><br>
        
    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import {getFirestore, setDoc, Timestamp, deleteField, deleteDoc} from "firebase/firestore"
import {collection, getDocs,doc, updateDoc,getDoc} from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
    props: ['info'],

    data() {
        return {
            doctorName: this.info.doctorName,
            count: 0,
        };
    },

    // methods: {
    //     async fetchAndUpdateData(useremail) {
    //         let allDocuments = await getDocs(collection(db, String(this.useremail)));
    //     }
    // },

    mounted() {
        // const auth = getAuth();
        // onAuthStateChanged(auth, (user) => {
        //     if (user) {
        //         this.user = user;
        //         this.useremail = auth.currentUser.email;
        //         display(this.useremail)
        //     }
        // })

        const self = this;

        async function display() {
            let allDoctorDocuments = await getDoc(doc(db, "clinic1", "doctors")) // hardcoded for now
            allDoctorDocuments = allDoctorDocuments.data()
            let doctorDocuments = allDoctorDocuments[self.doctorName] 

            let allPatientDocuments = await getDoc(doc(db, "clinic1", "patients")) // hardcoded for now
            allPatientDocuments = allPatientDocuments.data()
            
            let index = 1
            let total = 0
        
            doctorDocuments.forEach((docs) => {
                total += 1;
                let patientId = docs
                let patientData = allPatientDocuments[patientId]
                let patientName = patientData.name

                if (patientData.upcoming_appoint = true) {
                    const apptDateTime = patientData.appoint_date
                    console.log(apptDateTime)
                    let apptDate = apptDateTime.slice(0, 10)
                    let apptTime = apptDateTime.slice(11, )

                    let table = document.getElementById("table")
                    let row = table.insertRow(index)
                    
                    let info = [
                        apptDate,
                        apptTime,
                        patientName,
                        patientId,
                    ]

                    for (let cellIndex = 0; cellIndex < 4; cellIndex++) {
                        let currCell = row.insertCell(cellIndex);
                        currCell.innerHTML = info[cellIndex];
                    }

                    let cell9 = row.insertCell();
                    
                    let deleteButton = document.createElement("button")
                    deleteButton.id = String(patientId)
                    deleteButton.className = "bwt"
                    deleteButton.innerHTML = "Cancel Appointment"
                    deleteButton.style.cssText = 'width:190px;height: 50px;background: #d7e7d9;border: none;border-radius: 6px;font-weight:600;font-size: 16px;position:relative; left: 20px;top: 2px'

                    let editButton = document.createElement("button")
                    editButton.id = String(patientId)
                    editButton.className = "bwt"
                    editButton.innerHTML = "Edit Appointment"
                    editButton.style.cssText = 'width:145px;height: 50px;background: #d7e7d9;border: none;border-radius: 6px;font-weight:600;font-size: 16px;position:relative; top: 2px'

                    cell9.appendChild(editButton)
                    editButton.onclick = function() {
                        self.selectedPatient = String(patientId)
                        // self.$router.push("/edit_appoint_page")
                        self.$router.push({name: 'editApptPage', params: {doctorName: self.doctorName, patientId: self.selectedPatient}})
                    }
                    cell9.appendChild(deleteButton)
                    deleteButton.onclick = function() {
                        deleteEntry(patientId)
                    }

                    index += 1
                }
            })
            self.count = total           
        }

        display()

        async function deleteEntry(patientId) {
            if (confirm("Cancelling appointment with patient " + patientId)) {
            const doctorRef = doc(db, 'clinic1', 'doctors')
            const doctorSnapshot = await getDoc(doctorRef)
            const doctorData = doctorSnapshot.data()
            let updatedDoctorData = doctorData[self.doctorName].filter(function(e) { return e != patientId })
            console.log(updatedDoctorData)
            await updateDoc(doctorRef, {
                [self.doctorName]: updatedDoctorData,
            });

            const patientRef = doc(db, 'clinic1', 'patients')
            const patientSnapshot = await getDoc(patientId)
            const patientData = patientSnapshot.data()
            let updatedPatientData = {
                [patientID] : {
                    "appoint_date" : null,
                    "blood" : patientData[patientId].blood,
                    "diagnosis" : patientData[patientId].diagnosis,
                    "dob" : patientData[patientId].dob,
                    "gender" : patientData[patientId].gender,
                    "id" : patientId,
                    "logs" : patientData[patientId].logs,
                    "name" : patientData[patientId].name,
                    "treatment" : patientData[patientId].treatment,
                    "upcoming_appoint" : false,
                    "contact_num" : patientData[patientId].contact_num
                }
            }
            console.log(updatedPatientData)
            await updateDoc(patientRef, {
                [patientId]: updatedPatientData,
            });

            console.log("Succesfully cancelled appointment with patient ", patientId)
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
