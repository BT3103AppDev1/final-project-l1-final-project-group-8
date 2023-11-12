<template>
<div class="landing-page">
      <div class="div">
        <div class="overlap">
          <div class="overlap-group">
            <div class="showing">
              <p class="text">
                <span class="text-wrapper">Showing</span>
                <span class="span">&nbsp;</span>
                <span class="text-wrapper-2" id = "appointNumber">13 Appointments</span>
              </p>
            </div>
          </div>
          <div class="overlap">
            <div class="overlap-2">
              <div class="line">
                <table class="table-bordered" id="appointTable"> <!--Date, Time Patient Name, Pat ID, Doct ID Edit, Remove-->
                  <tr id="headerTable">
                    <th>
                      Date Time
                    </th>
                    <th>
                      Patient Name
                    </th>
                    <th>
                      Patient ID
                    </th>
                    <th>
                      Doctor ID
                    </th>
                    <th>
                    </th>
                    <th>
                    </th>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div class="header-table">
            <div class="text-wrapper-4">Upcoming Appointments</div>
          </div>
          <div class="overlap-16">
            <div class="right">
              <div class="new-appointment">
                <img class="icon-plus" src="../assets/icon-plus.svg" />
                <div class="text-4">New Appointment</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDoc, doc, deleteDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
    };
  },

  methods: {
  },

  mounted() {
    async function display() {
      const clinicDocRef = doc(db, 'clinic1', 'doctors');
      const clinicPatientRef = doc(db, 'clinic1', 'patients');
      let allDocuments = await getDoc(clinicPatientRef);
      let docDocuments = await getDoc(clinicDocRef);
      let index = 1;
      let noOfAppointments = 0;

        // Appointment records from Patient, get doctor id by searching patient in doctors
        // Date, Time Patient Name, Pat ID, Doct ID Edit, Remove
      let patientData = allDocuments.data();
      for (const patientId in patientData) {
        let data = patientData[patientId];
        if(data.upcoming_appoint == true) {
          let appointDate = data.appoint_date;
          // appointDate = appointDate.toDate().toDateString()
          let patientName = data.name;
          let patientID = data.id;
          let doctorNameF = null;
          
          // Get Doctor
          const doctorData = docDocuments.data();
              
          for (const doctorName in doctorData) {
                if (Array.isArray(doctorData[doctorName])) {
                    const individualDoc = doctorData[doctorName];
                    for(let i = 0; i < individualDoc.length; i++) {
                        if(individualDoc[i] == patientID) {
                            doctorNameF = Object.keys(doctorName);
                        }
                    }
                }
            }
          
              let table = document.getElementById("appointTable");
          let row = table.insertRow(index);

          let infoArray = [appointDate, patientName, patientID, doctorNameF];

          for (let cellIndex = 0; cellIndex < 4; cellIndex++) {
            let currCell = row.insertCell(cellIndex);
            currCell.innerHTML = infoArray[cellIndex];
          }
          // Edit and Delete Buttons
          let editButton = document.createElement("Button");
          //editButton.id = String(patientID);
          editButton.className = "btn btn-primary";
          editButtonButton.innerHTML = "Edit";

          let cell7 = row.insertCell();
          cell8.appendChild(editButton);
          editButton.onclick = function () {
              // this.$router.push("/editAppointment")
            // redirect to editing appointments
          };

          let deleteButton = document.createElement("Button");
          // deleteButton.id = String(patientID);
          deleteButton.className = "btn btn-danger";
          deleteButton.innerHTML = "Remove";

          let cell8 = row.insertCell();

          cell8.appendChild(deleteButton);
          deleteButton.onclick = function () {
            // delete appointment
          };
          index += 1;
          noOfAppointments += 1;
        }
        
        document.getElementById("appointNumber").innerHTML= noOfAppointments + " Appointments"  

      };
    }

    display(this.useremail);
  },
};
</script>
<style scoped>
</style>
