<template>
    <div id="rectangle">
        <div id="header">All Patients</div>
        <div id="button">
            <button id="addPatient" to="/add-patient">Add Patient</button>
        </div>
        <table id="table">
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>GENDER</th>
                <th>PATIENT ID</th>
                <th>D.O.B.</th>
                <th>CONTACT NUM.</th>
                <th>HEALTH RECORD</th>
                <!-- <th>ACTIONS</th> -->
            </tr>
        </table><br>
    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import {deleteDoc, deleteField, getFirestore, setDoc, Timestamp} from "firebase/firestore"
import {collection, query, getDocs, doc, updateDoc,getDoc} from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
    // data() {
    //     return {
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
            let allDocuments = await getDoc(doc(db, "clinic1", "patients"))
            let index = 1
            allDocuments = allDocuments.data()

            Object.keys(allDocuments).forEach((doc) => {
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
                }

                let healthRecordsButton = document.createElement("Button");
                healthRecordsButton.id = String(id)
                healthRecordsButton.className = "healthButton"
                healthRecordsButton.innerHTML = "Health Records"
                healthRecordsButton.style.cssText = 'width:145px;height: 35px;background: #d7e7d9;border: none;border-radius: 6px;font-weight:600;font-size: 16px;'
                let cell6 = row.insertCell();
                cell6.appendChild(healthRecordsButton)
                // healthRecords.onclick = function() {
                //     this.$router.push("/patient-edit")
                // }
                
                // let deleteButton = document.createElement("Button");
                // deleteButton.id = String(id)
                // deleteButton.className = "deleteBtn"
                // deleteButton.innerHTML = "Delete Patient"
                // deleteButton.style.cssText = 'width:145px;height: 35px;background: #d7e7d9;border: none;border-radius: 6px;font-weight:600;font-size: 16px;'


                // let cell7 = row.insertCell();
                // cell7.appendChild(deleteButton)
                // deleteButton.onclick = function() {
                //     deletePatient(id)
                // }

                index += 1;
            })        
        }

        display()

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

/* #count {
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
    position: relative;
    top: 7em;
    left: 4.9rem;
}

tr {
    background: #d7e7d9;
    font-weight: 600; 
}
</style>

