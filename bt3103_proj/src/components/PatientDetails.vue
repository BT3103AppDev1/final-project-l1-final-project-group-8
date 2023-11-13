<template>
    <div id="rectangle">
        <div id="header">All Patients</div>
        <div id = 'count'> Showing {{ this.count }} patients</div>
        <div id="button">
            <button id="addPatient" to="/add-patient">Add Patient</button>
        </div>
        <table id="table">
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Patient ID</th>
                <th>D.O.B.</th>
                <th>Contact Num.</th>
                <th>Actions</th>
            </tr>
        </table><br>
    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import {deleteDoc, deleteField, getFirestore, setDoc, Timestamp} from "firebase/firestore"
import {collection, query, getDocs, doc, updateDoc,getDoc} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
    data() {
        return {
            count: 0,
            user: false,
            useremail: ''
        };
    },

    // methods: {
    //     async fetchAndUpdateData(useremail) {
    //         let allDocuments = await getDocs(collection(db, String(this.useremail)));
    //     }
    // },

    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('User is logged in:', user);
                this.user = user;
                this.useremail = auth.currentUser.email;
                display(this.useremail)
            } else {
                // User is not logged in
                console.log('User is not logged in');
                this.user = null;
            }
        })
    
        const self = this;
        async function display(email) {
            let allDocuments = await getDoc(doc(db, String(email), "patients"))
            let index = 1
            let total = 0
            allDocuments = allDocuments.data()

            Object.keys(allDocuments).forEach((doc) => {
                total += 1
                let data = allDocuments[doc]
                let id = doc
                let name = data.name
                let gender = data.gender
                let patient_id = data.id
                let dob = new Date(data.dob).toLocaleDateString()
                let contactNum = data.contact_num
                
                let table = document.getElementById("table")
                let row = table.insertRow(index)

                let infoArray = [
                    id,
                    name,
                    gender,
                    patient_id,
                    dob,
                    contactNum
                ]

                for (let cellIndex = 0; cellIndex < 6; cellIndex++) {
                    let currCell = row.insertCell(cellIndex);
                    currCell.innerHTML = infoArray[cellIndex];
                    currCell.style.padding = "15px"
                }

                let healthRecordsButton = document.createElement("Button");
                healthRecordsButton.id = String(id)
                healthRecordsButton.className = "healthButton"
                healthRecordsButton.innerHTML = "Health Records"
                
                healthRecordsButton.style.borderRadius = '6px'
                healthRecordsButton.style.border = "none"
                healthRecordsButton.style.backgroundColor = "#d7e7d9"
                healthRecordsButton.style.fontWeight = "bold"
                healthRecordsButton.style.width = "165px"
                healthRecordsButton.style.height = "50px"
                healthRecordsButton.style.fontSize = "14px"
                healthRecordsButton.style.margin = "10px"

                let cell6 = row.insertCell();
                cell6.appendChild(healthRecordsButton)
                healthRecordsButton.onclick = function() {
                    self.$router.push({name: 'indivDetails', params: {patientId: id}})
                }

                let upcomingApptButton = document.createElement("Button");
                upcomingApptButton.id = String(id)
                upcomingApptButton.className = "upcomingApptButton"
                upcomingApptButton.innerHTML = "Upcoming Appointments"
                
                upcomingApptButton.style.borderRadius = '6px'
                upcomingApptButton.style.border = "none"
                upcomingApptButton.style.backgroundColor = "#d7e7d9"
                upcomingApptButton.style.fontWeight = "bold"
                upcomingApptButton.style.width = "200px"
                upcomingApptButton.style.height = "50px"
                upcomingApptButton.style.fontSize = "14px"
                upcomingApptButton.style.margin = "10px"
                
                cell6.appendChild(upcomingApptButton)
                upcomingApptButton.onclick = function() {
                    self.$router.push({name: 'patientApptPage', params: {patientId: id}})
                }

                index += 1;
            })   
            self.count = total;     
        }

        // display()

        // async function deletePatient(patientId) {
        //     alert("Deleting patient " + patientId)
        //     const docRef = getDoc(doc(db, "clinic1", "patients", "patientId"))
    
        //     // Object.keys(docs).forEach(function(key) {
        //     //     if (docs[key] == patientId) {
        //     //         docs[patientId] ;
        //     //     }
        //     // });
        //     console.log("Succesfully deleted patient ", patientId)

        //     let tb = document.getElementById("table")
        //     while (tb.rows.length > 1) {
        //         tb.deleteRow(1)
        //     }
        //     display()
        // }
    }
}
</script>

<style scoped>
#addPatient {
    margin: 10px 0 20px 0;
}

#rectangle {
    background: #ECFFD6; 
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.50);
    border-radius: 25px;
    align-content: center;
    padding: 30px;
}

#header {
    color: black;
    font-size: 32px;
    font-family: Poppins, Inter-Bold,Arial, Helvetica, sans-serif;
    font-weight: 600;
    line-height: 20px;
    word-wrap: break-word;
    margin-bottom: 15px;
}

#count {
    /* position:relative; */
    color: black;
    font-size: 20px;
    font-family: Poppins, Inter-Bold, Arial, Helvetica, sans-serif;   
    top: 6em;
    left: 4.9rem;
}

#table {
    border-collapse: collapse;
    width: 100%;
    height: 10%;
    align-content: center;
    text-align: center;
    line-height: 350%;
    background-color:white;
    color: black;
    /* position: relative; */
    top: 10em;
    left: 0rem;
    /* border-radius: 60px; */

}

/* th, tr {
    border-bottom: 1px solid;
} */

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
    /* position: relative; */
    top: 7em;
    left: 4.9rem;
}

tr {
    background: #d7e7d9;
}

th {
    font-weight: bold;
}
</style>

