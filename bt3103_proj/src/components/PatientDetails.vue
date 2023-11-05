<template>
    <div class="horizontal">
        <h1 id="header">All Patients</h1>
        <v-btn id="addPatient" to="/addPatient"></v-btn>
        <h6 id="count">Showing {{ this.count }} appointment</h6>
        <table id="table">
            <tr>
                <th>FIRST NAME</th>
                <th>LAST NAME</th>
                <th>GENDER</th>
                <th>ID NUM.</th>
                <th>D.O.B.</th>
                <th>CONTACT NUM.</th>
                <th>APPOINTMENTS</th>
                <th>HEALTH RECORD</th>
                <th>ACTIONS</th>
            </tr>
        </table><br>
    </div>
</template>

<script>
import { getAuth,onAuthStateChanged } from 'firebase/auth';
import firebaseApp from 'D:\\hạnh\\NUS\\BT3103\\final_project\\firebase.js'
import {getFirestore} from 'firebase/firestore'
import {collection, getDocs, doc, deleteDoc} from 'firebase/firestore'

const db = getFirestore(firebaseApp);

export default {
    data() {
        return {
            useremail: '',
        };
    },

    methods: {
        async fetchAndUpdateData(useremail) {
            let allDocuments = await getDocs(collection(db, String(this.useremail)));
        }
    },

    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
                this.useremail = auth.currentUser.email;
                display(this.useremail)
            }
        })

        async function display(email) {
            let allDocuments = await getDocs(collection(db, String(email)))
            let index = 1
            this.patientName = data.patientName
            this.count = allDocuments.size

            allDocuments.forEach((docs) => {
                let data = docs.data()

                let firstName = data.firstName
                let lastName = data.lastName
                let gender = data.gender
                let idNum = data.idNum
                let dob = data.dob
                let contactNum = data.contactNum
                
                let table = document.getElementById("table")
                let row = table.insertRow(index)

                let infoArray = [
                    firstName,
                    lastName,
                    gender,
                    idNum,
                    dob,
                    contactNum
                ]

                for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
                    let currCell = row.insertCell(cellIndex);
                    currCell.innerHTML = infoArray[cellIndex];
                }

                let cell6 = row.insertCell();
                cell6.appendChild(patientAppointments)
                patientAppointments.onclick = function() {
                    this.$router.push("/patientAppointment")
                }

                let cell7 = row.insertCell();
                cell7.appendChild(healthRecords)
                healthRecords.onclick = function() {
                    this.$router.push("/healthRecord")
                }

                let cell8 = row.insertCell();
                cell8.appendChild(editButton, deleteButton)
                editButton.onclick = function() {
                    this.$router.push("/editAppointment")
                }
                deleteButton.onclick = function() {
                    deleteEntry(apptId)
                }
            })            
        }

        display(this.useremail)

        async function deleteEntry(apptId) {
            alert("Deleting appointment " + apptId)
            await deleteDoc(doc(db, String(this.useremail), apptId))
            console.log("Succesfully deleted appointment ", apptId)

            let tb = document.getElementById("table")
            while (tb.rows.length > 1) {
                tb.deleteRow(1)
            }
            display(this.useremail)
        }
    }
}
</script>
