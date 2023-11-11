<template>
    <div id="rectangle">
        <div id="apptTitle">Doctor's Appointment - {{doctorName}}</div>
        <!-- <div id="apptDetail">Showing N appointment</div><br> -->
        
        <div id="button">
            <button id="backButton" type="button">Back to All Doctors</button>
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
    data() {
        return {
            doctorName: 'Adam',
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
            let doctorDocuments = allDoctorDocuments['Adam'] // hardcoded for now
            
            let allPatientDocuments = await getDoc(doc(db, "clinic1", "patients")) // hardcoded for now
            allPatientDocuments = allPatientDocuments.data()
            
            let index = 1

            // this.patientName = data.patientName
            // this.count = allDocuments.size
        
            doctorDocuments.forEach((docs) => {
                // let data = docs.data()
                let patientId = docs
                let patientData = allPatientDocuments[patientId]
                let patientName = patientData.name
                const apptDateTime = patientData.appoint_date
                console.log(apptDateTime)
                let apptDate = apptDateTime.slice(0, 10)
                let apptTime = apptDateTime.slice(11, )

                let table = document.getElementById("table")
                let row = table.insertRow(index)
                
                let infoArray = [
                    apptDate,
                    apptTime,
                    patientName,
                    patientId,
                ]

                for (let cellIndex = 0; cellIndex < 4; cellIndex++) {
                    let currCell = row.insertCell(cellIndex);
                    currCell.innerHTML = infoArray[cellIndex];
                }

                let cell9 = row.insertCell();
                
                let deleteButton = document.createElement("button")
                deleteButton.id = String(patientId)
                deleteButton.className = "bwt"
                deleteButton.innerHTML = "Delete Appointment"
                deleteButton.style.cssText = 'width:190px;height: 35px;background: #d7e7d9;border: none;border-radius: 6px;font-weight:600;font-size: 16px;position:relative; left: 50px'

                let editButton = document.createElement("button")
                editButton.id = String(patientId)
                editButton.className = "bwt"
                editButton.innerHTML = "Edit Appointment"
                editButton.style.cssText = 'width:145px;height: 35px;background: #d7e7d9;border: none;border-radius: 6px;font-weight:600;font-size: 16px;'

                cell9.appendChild(editButton)
                editButton.onclick = function() {
                    self.$router.push("/edit_appoint_page")
                }
                cell9.appendChild(deleteButton)
                deleteButton.onclick = function() {
                    self.deleteEntry(patientId)
                }

                index += 1
            })            
        }

        display()

        async function deleteEntry(patientId) {
            alert("Deleting appointment with patient " + patientId)
            const doctorRef = doc(db, 'clinic1', 'doctors')
            const doctorSnapshot = await getDoc(doctorRef)
            const doctorData = doctorSnapshot.data()
            let updatedDoctorData = doctorData['Adam'].filter(function(e) { return e != patientId })
            console.log(updatedDoctorData)
            await updateDoc(doctorRef, {
                ['Adam']: updatedDoctorData,
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

            console.log("Succesfully deleted appointment with patient ", patientId)
            let tb = document.getElementById("table")
            while (tb.rows.length >= 1) {
                tb.deleteRow(1)
            }
            display()
        }
    }
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

/* #apptDetail {
    position:relative;
    color: black;
    font-size: 20px;
    font-family: Poppins, Inter-Bold,Arial, Helvetica, sans-serif;   
    top: 4.5em;
    left: 4.9rem;
} */

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
