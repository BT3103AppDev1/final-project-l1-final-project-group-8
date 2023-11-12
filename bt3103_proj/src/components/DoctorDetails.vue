<template>
    <div id="rectangle">
        <div id="header">All Doctors</div>
        <div id = 'count'> Showing {{ this.count }} doctors</div>
        <div id="button">
            <router-link 
            to='/add_people_page'
            custom v-slot="{navigate}">
            <button @click="navigate" role="link">
                Add Doctors</button></router-link>
        </div>
        <table id="table">
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>APPOINTMENTS</th>
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
                }

                let upcomingApptsButton = document.createElement("Button");
                upcomingApptsButton.id = String(id)
                upcomingApptsButton.className = "upcomingAppts"
                upcomingApptsButton.innerHTML = "Upcoming Appointments"
                upcomingApptsButton.style.cssText = 'width:250px;height: 60px;background: #d7e7d9;border: none;border-radius: 6px;font-weight:600;font-size: 16px;'
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
    /* border-top: 1px solid;
    border-bottom: 1px solid; */
    border-collapse: collapse;
    width: 100%;
    /* height: 10%; */
    align-content: center;
    text-align: center;
    line-height: 400%;
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

