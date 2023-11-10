<template>
    <div id="rectangle">
        <div id="apptTitle">Doctor's Appointment - DOCTORNAME</div>
        <div id="apptDetail">Showing N appointment</div><br>
        <div id="content">
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
            </table>
        </div><br>

        <div id="button">
            <button id="backButton" type="button">Back to All Doctors</button>
        </div>
    </div>
</template>

<script>
// import { getAuth,onAuthStateChanged } from 'firebase/auth';
// import firebaseApp from 'D:\\hạnh\\NUS\\BT3103\\final_project\\firebase.js';
// import {getFirestore} from 'firebase/firestore'
// import {collection, getDocs, doc, deleteDoc} from 'firebase/firestore'

// const db = getFirestore(firebaseApp);

export default {
    // data() {
    //     return {
    //         useremail: '',
    //     };
    // },

    // methods: {
    //     async fetchAndUpdateData(useremail) {
    //         let allDocuments = await getDocs(collection(db, String(this.useremail)));
    //     }
    // },

    mounted() {
//         // const auth = getAuth();
//         // onAuthStateChanged(auth, (user) => {
//         //     if (user) {
//         //         this.user = user;
//         //         this.useremail = auth.currentUser.email;
//         //         display(this.useremail)
//         //     }
//         // })

        async function display() {
            let allDocuments = await getDocs(collection(db, 'Appointment'))
            let index = 1
            // this.patientName = data.patientName
            // this.count = allDocuments.size

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
                
                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2);
                let cell4 = row.insertCell(3);     
                let cell5 = row.insertCell(4);
                let cell6 = row.insertCell(5);
                let cell7 = row.insertCell(6);
                let cell8 = row.insertCell(7);
                let cell9 = row.insertCell(8);

                cell1.innerHTML = apptId;
                cell2.innerHTML = date;
                cell3.innerHTML = time;
                cell4.innerHTML = patientName;
                cell5.innerHTML = patientId;
                cell6.innerHTML = doctorName;
                cell7.innerHTML = doctorId;
                cell8.innerHTML = status;

                // let cell10 = row.insertCell();
                
                let deleteButton = document.createElement("button")
                deleteButton.id = String(apptId)
                deleteButton.className = "bwt"
                deleteButton.innerHTML = "Delete Appointment"

                let editButton = document.createElement("button")
                editButton.id = String(apptId)
                editButton.className = "bwt"
                editButton.innerHTML = "Edit Appointment"

                cell9.appendChild(editButton)
                cell9.appendChild(deleteButton)
                editButton.onclick = function() {
                    this.$router.push("/editAppointment")
                }
                deleteButton.onclick = function() {
                    deleteEntry(apptId)
                }

                index += 1
            })            
        }

        display()

        async function deleteEntry(apptId) {
            alert("Deleting appointment " + apptId)
            await deleteDoc(doc(db, 'Appointment', apptId))
            console.log("Succesfully deleted appointment ", apptId)
            let tb = document.getElementById("table")
            while (tb.rows.length > 1) {
                tb.deleteRow(1)
            }
            display()
        }
    }
}
</script>

<style scoped>
#rectangle {
    width: 1200px;
    height: 700px;
    background: #ECFFD6; 
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.50);
    border-radius: 67px;
    align-content: center;
    left: 20em;
    top:2em;
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

#apptDetail {
    position:relative;
    color: black;
    font-size: 20px;
    font-family: Poppins, Inter-Bold,Arial, Helvetica, sans-serif;   
    top: 4.5em;
    left: 4.9rem;
}

#table {
    font-family: Poppins, Arial, Helvetica, sans-serif;
    border-spacing: 2px;
    width: 1200px;
    height: 30%;
    align-content: center;
    background-color: white;
    color: black;
    position: relative;
    top: 6em;
    left: 0rem;
}

button {
    width:137px;
    height: 29px;
    background: #8FBC94; 
    border: none;
    border-radius: 6px;
    font-weight:600;
}

#button {
    position: relative;
    top: 6em;
    left: 4.9rem;
}

button:hover {
    background: #d7e7d9;
    font-weight: 600; 
}
</style>
