<template>
    <div id="rectangle">
        <div id="header">All Doctors</div>
        <div id = 'count'> Showing {{ this.count }} doctors</div>
        <div id="button">
            <router-link 
            to='/add_people_page'
            custom v-slot="{navigate}">
            <button id="addDoctor" @click="navigate" role="link">
                Add Doctors</button></router-link>
        </div>
        <table id="table">
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Appointments</th>
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
            count: 0
            // doctorName: 'Adam',
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
            } else {
                // User is not logged in
                console.log('User is not logged in');
                this.user = null;
            }
        })
    
        
        const self = this;
        async function display() {
            let allDocuments = await getDoc(doc(db, "clinic1", "doctors"))
            let index = 1
            let total = 0
            allDocuments = allDocuments.data()

            Object.keys(allDocuments).forEach((doc) => {
                total += 1;
                let id = index
                let name = doc
                
                let table = document.getElementById("table")
                let row = table.insertRow(index)

                let infoArray = [
                    id,
                    name,
                ]

                for (let cellIndex = 0; cellIndex < 2; cellIndex++) {
                    let currCell = row.insertCell(cellIndex);
                    currCell.innerHTML = infoArray[cellIndex];
                    currCell.style.padding = "10px 75px 10px 75px"
                }

                let upcomingApptsButton = document.createElement("Button");
                upcomingApptsButton.id = String(id)
                upcomingApptsButton.className = "upcomingAppts"
                upcomingApptsButton.innerHTML = "Upcoming Appts."
                
                upcomingApptsButton.style.borderRadius = '6px'
                upcomingApptsButton.style.border = "none"
                upcomingApptsButton.style.backgroundColor = "#d7e7d9"
                upcomingApptsButton.style.fontWeight = "bold"
                upcomingApptsButton.style.width = "165px"
                upcomingApptsButton.style.height = "50px"
                upcomingApptsButton.style.fontSize = "14px"
                upcomingApptsButton.style.margin = "10px"
                
                let cell6 = row.insertCell();
                cell6.appendChild(upcomingApptsButton)
                upcomingApptsButton.onclick = function() {
                    self.$router.push({name: 'doctorApptPage', params: {doctorName: name}})
                }
                
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
             self.count = total    
        }
        
        display()
    }
}
</script>

<style scoped>
#addDoctor {
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

