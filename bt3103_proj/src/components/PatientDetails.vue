<template>
    <div id="rectangle">
        <div id="header">All Patients</div>
        <div id="count">Showing N patients</div>
        <div id="button">
            <button id="addPatient" to="/addPatient">Add Patient</button>
        </div>
        <div id="content">
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
            </table>
        </div><br>
    </div>
</template>

<script>
// import { getAuth,onAuthStateChanged } from 'firebase/auth';
// import firebaseApp from 'D:\\hạnh\\NUS\\BT3103\\final_project\\firebase.js'
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
        // const auth = getAuth();
        // onAuthStateChanged(auth, (user) => {
        //     if (user) {
        //         this.user = user;
        //         this.useremail = auth.currentUser.email;
        //         display(this.useremail)
        //     }
        // })

        async function display() {
            let allDocuments = await getDocs(collection(db, 'Patients'))
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

        display()

        async function deletePatient(patientId) {
            alert("Deleting patient " + patientId)
            await deleteDoc(doc(db, 'Patients', patientId))
            console.log("Succesfully deleted patient ", patientId)

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

#header {
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
    border-spacing: 2px;
    width: 1200px;
    height: 30%;
    align-content: center;
    background-color: white;
    color: black;
    position: relative;
    top: 9em;
    left: 0rem;
}

button {
    width:145px;
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
</style>

