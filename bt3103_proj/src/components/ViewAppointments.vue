<template>
  <div id="rectangle">
      <div id="apptTitle">All Appointments</div>
      <div id="count">Showing {{this.count}} appointments</div><br>
       <!-- <div id = "button">
          <button id = "cancelButton" type = "button" @click="$router.go(-1)">Back to All Patients</button>
      </div> -->
      <table id="table">
              <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Patient Name</th>
                  <th>Patient ID</th>
                  <th>Doctor Name</th>
                  <th>Actions</th>
              </tr>
      </table><br>
      
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      count: 0,
      useremail: '',
      user: false
    };
  },

  // methods: {},

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

    // function refresh() {
    //   window.location.reload()
    // }

    async function display(email) {
      const clinicDocRef = doc(db, String(email), "doctors");
      const clinicPatientRef = doc(db, String(email), "patients");
      const allDoc = await getDoc(clinicPatientRef);
      const docDoc = await getDoc(clinicDocRef);
      let index = 1;
      let noOfAppointments = 0;
      const allDocuments = allDoc.data();
      const docDocuments = docDoc.data();
      // Appointment records from Patient, get doctor id by searching patient in doctors
      // Date, Time Patient Name, Pat ID, Doct ID Edit, Remove
      Object.keys(docDocuments).forEach((docs) => {
        // Doctor Datas
        const doctorName = docs
        const docData = docDocuments[doctorName];
        docData.forEach((doc) => {
          let idid = doc
          const patientId = String(idid)
          const data = allDocuments[doc]
          // let upcoming_appoint = data.upcoming_appoint
          console.log(data)
          // let upcoming_appoint = data.upcoming_appoint
          // console.log(upcoming_appoint)
          if (data != null) {
          if (data.upcoming_appoint == true) {
            let appointDate = data.appoint_date;
            let appointTime = new Date(appointDate).toLocaleTimeString();
            appointDate = new Date(appointDate).toLocaleDateString();
            let patientName = data.name;

            let table = document.getElementById("table");
            let row = table.insertRow(index);

                let infoArray = [
                  appointDate,
                  appointTime,
                  patientName,
                  patientId,
                  doctorName,
                ];

              for (let cellIndex = 0; cellIndex < 5; cellIndex++) {
                let currCell = row.insertCell(cellIndex);
                currCell.innerHTML = infoArray[cellIndex];
                currCell.style.padding = "15px"
              }
              // Edit and Delete Buttons
              let editButton = document.createElement("Button");
              //editButton.id = String(patientID);
              editButton.className = "btn btn-primary";
              editButton.innerHTML = "Edit Appointment";

              editButton.style.borderRadius = '6px'
              editButton.style.border = "none"
              editButton.style.backgroundColor = "#d7e7d9"
              editButton.style.fontWeight = "bold"
              editButton.style.width = "165px"
              editButton.style.height = "50px"
              editButton.style.fontSize = "14px"
              editButton.style.margin = "10px"

              let cell7 = row.insertCell();
              cell7.appendChild(editButton);
              editButton.onclick = function () {
                self.$router.push({name: 'editApptPage', params: {doctorName: doctorName, patientId: patientId}})
                // this.$router.push("/editAppointment")
                // redirect to editing appointments
              };

              let deleteButton = document.createElement("button")
              deleteButton.id = String(self.patientId)
              deleteButton.className = "bwt"
              deleteButton.innerHTML = "Cancel Appointment"
              
              deleteButton.style.borderRadius = '6px'
              deleteButton.style.border = "none"
              deleteButton.style.backgroundColor = "#d7e7d9"
              deleteButton.style.fontWeight = "bold"
              deleteButton.style.width = "165px"
              deleteButton.style.height = "50px"
              deleteButton.style.fontSize = "14px"
              deleteButton.style.margin = "10px"
              
              cell7.appendChild(deleteButton)
              deleteButton.onclick = function() {
                  deleteEntry(doctorName, patientId)
              }

              index += 1;
              noOfAppointments += 1;
        }}})
        
        self.count = noOfAppointments
      });
      // document.getElementById("appointNumber").innerHTML =
      //     noOfAppointments + " Appointments";
      //this.appointCount = noOfAppointments;
    };

    // refresh();
    // display();

    async function deleteEntry(doctorName, patientId) {
            if (confirm("Cancelling doctor " + doctorName + "'s Appointment with patient " + patientId)) {
            const doctorRef = doc(db, String(self.useremail), 'doctors')
            const doctorSnapshot = await getDoc(doctorRef)
            const doctorData = doctorSnapshot.data()
            let updatedDoctorData = doctorData[doctorName].filter(function(e) { return e != patientId })
            console.log(updatedDoctorData)
            await updateDoc(doctorRef, {
                [doctorName]: updatedDoctorData,
            });

            const patientRef = doc(db, String(self.useremail), 'patients')
            const patientSnapshot = await getDoc(patientId)
            const patientData = patientSnapshot.data()
            let updatedPatientData = {
                [patientId] : {
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

            console.log("Succesfully cancelled appointment with doctor ", doctorName, " and patient ", patientId)
            let tb = document.getElementById("table")
            while (tb.rows.length >= 1) {
                tb.deleteRow(1)
            }
            display(self.useremail)
        }
      }
    }}
</script>

<style scoped>
  /* @import "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"; */

#rectangle {
    background: #ECFFD6; 
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.50);
    border-radius: 25px;
    align-content: center;
    padding: 30px; 
}

#apptTitle {
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

tr {
    background: #d7e7d9;
}

th {
    font-weight: bold;
}
</style>
