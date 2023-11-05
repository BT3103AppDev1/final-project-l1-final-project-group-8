<template>
    <div class="horizontal">
        <h1 id="doctor-name">Doctor's Appointment - {{ this.patientName }}</h1>
        <h6 id="count">Showing {{ this.count }} appointment</h6>
        <table id="table">
            <tr>
                <th>APPT.ID</th>
                <th>DATE</th>
                <th>TIME</th>
                <th>PATIENT NAME</th>
                <th>PATIENT ID</th>
                <th>DOCTOR NAME</th>
                <th>DOCTOR ID</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
            </tr>
        </table><br>
        <h5 class="back">Back to All Doctors</h5>
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

                let apptId = data.apptId
                let date = data.date
                let time = data.time
                let patientName = data.patientName
                let patientId = data.patientId
                let doctorName = data.doctorName
                let doctorId = data.doctorId
                let status = data.status

                let table = document.getElementById("table")
                let row = table.insertRow(index)

                let infoArray = [
                    index,
                    apptId,
                    date,
                    time,
                    patientName,
                    patientId,
                    doctorName,
                    doctorId,
                    status
                ]

                for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
                    let currCell = row.insertCell(cellIndex);
                    currCell.innerHTML = infoArray[cellIndex];
                }

                let cell10 = row.insertCell();
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
