<!-- <template>
  <div class="landing-page">
    <div class="div">
      <div class="overlap">
        <div class="overlap-group">
          <div class="showing">
            <p class="text">
              <span class="text-wrapper">Showing</span>
              <span class="span">&nbsp;</span>
              <span class="text-wrapper-2" id="appointNumber"
                >0 Appointments</span
              >
            </p>
          </div>
        </div>
        <div class="overlap">
          <div class="overlap-2">
            <div class="line">
              <table class="table" id="appointTable">
                //Date, Time Patient Name, Pat ID, Doct ID Edit, Remove
                <tr id="headerTable">
                  <th>Date</th>
                  <th>Time</th>
                  <th>Patient Name</th>
                  <th>Patient ID</th>
                  <th>Doctor ID</th>
                  <th>Edit Appointment</th>
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
              <div class="text-4">
                <a href="/create_appoint_page"> 
                  <div class="text-4">New Appointment</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> -->

<template>
  <div id="rectangle">
      <div id="apptTitle">All Appointments</div>
      <div id="count">Showing {{this.count}} appointments</div><br>
       <!-- <div id = "button">
          <button id = "cancelButton" type = "button" @click="$router.go(-1)">Back to All Patients</button>
      </div> -->
      <table id="table">
              <tr>
                  <th>DATE</th>
                  <th>TIME</th>
                  <th>PATIENT NAME</th>
                  <th>PATIENT ID</th>
                  <th>DOCTOR NAME</th>
                  <th>ACTIONS</th>
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
    return {count: 0};
  },

  // methods: {},

  mounted() {
    //     const auth = getAuth();
    //     onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             this.user = user;
    //             this.useremail = auth.currentUser.email;
    //     }
    // })
    const self = this;

    // function refresh() {
    //   window.location.reload()
    // }

    async function display() {
      const clinicDocRef = doc(db, "clinic1", "doctors");
      const clinicPatientRef = doc(db, "clinic1", "patients");
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
              }
              // Edit and Delete Buttons
              let editButton = document.createElement("Button");
              //editButton.id = String(patientID);
              editButton.className = "btn btn-primary";
              editButton.innerHTML = "Edit Appointment";
              editButton.style.cssText = 'width:165px;height: 50px;background: #d7e7d9;color: black;border: none;border-radius: 6px;font-weight:600;font-size: 16px;';

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
              deleteButton.style.cssText = 'width:170px;height: 50px;background: #d7e7d9;border: none;border-radius: 6px;font-weight:600;font-size: 16px;position:relative; left: 20px;top:4px'
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
    display();

    async function deleteEntry(doctorName, patientId) {
            if (confirm("Cancelling doctor " + doctorName + "'s Appointment with patient " + patientId)) {
            const doctorRef = doc(db, 'clinic1', 'doctors')
            const doctorSnapshot = await getDoc(doctorRef)
            const doctorData = doctorSnapshot.data()
            let updatedDoctorData = doctorData[doctorName].filter(function(e) { return e != patientId })
            console.log(updatedDoctorData)
            await updateDoc(doctorRef, {
                [doctorName]: updatedDoctorData,
            });

            const patientRef = doc(db, 'clinic1', 'patients')
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
            display()
        }
      }
    }}
</script>

/* <style>
@import "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css";
</style>
<style scoped>
#appointTable {
  position: absolute;
  width: 729px;
  top: 0;
  left: 0;
}
#headerTable {
  width: 729px;
  height: 48px;
}
.landing-page {
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  position: static;
}

.landing-page .div {
  background-color: #ffffff;
  overflow: hidden;
  width: 1400px;
  height: 988px;
}

.landing-page .overlap {
  position: relative;
  width: 988px;
  height: 988px;
  top: 0;
  left: 0;
}

.landing-page .overlap-group {
  position: absolute;
  width: 211px;
  height: 36px;
  top: 216px;
  left: 249px;
}

.landing-page .showing {
  position: absolute;
  width: 211px;
  height: 36px;
  top: 0;
  left: 0;
}

.landing-page .text {
  position: absolute;
  width: 205px;
  height: 36px;
  top: -1px;
  left: 14px;
  font-family: "Poppins-Regular", Helvetica;
  font-weight: 400;
  color: transparent;
  font-size: 14px;
  letter-spacing: 0;
  line-height: 19.6px;
}

.landing-page .text-wrapper {
  color: #000000;
}

.landing-page .span {
  color: #abacbe;
}

.landing-page .text-wrapper-2 {
  font-family: "Poppins-Bold", Helvetica;
  font-weight: 700;
  color: #000000;
}

.landing-page .overlap-2 {
  position: relative;
  width: 1458px;
  height: 49px;
  top: 282px;
  left: 228px;
}

.landing-page .item-wrapper {
  position: absolute;
  width: 30px;
  height: 48px;
  top: 0;
  left: 0;
}

.landing-page .ellipse {
  position: absolute;
  width: 61px;
  height: 61px;
  top: 5px;
  left: 6px;
  background-color: #6da34d;
  border-radius: 30.33px;
}

.landing-page .IMG {
  position: absolute;
  width: 70px;
  height: 70px;
  top: 0;
  left: 0;
  object-fit: cover;
}

.landing-page .img {
  position: absolute;
  width: 1430px;
  height: 1px;
  top: 0;
  left: 0;
}

.landing-page .header-table {
  position: absolute;
  width: 417px;
  height: 44px;
  top: 68px;
  left: 266px;
}

.landing-page .text-wrapper-4 {
  position: absolute;
  width: 541px;
  height: 44px;
  top: -1px;
  left: 0;
  font-family: "Poppins-SemiBold", Helvetica;
  font-weight: 600;
  color: #000000;
  font-size: 32px;
  letter-spacing: 0;
  line-height: 20px;
}

.landing-page .overlap-16 {
  position: absolute;
  width: 206px;
  height: 44px;
  top: 138px;
  left: 263px;
}

.landing-page .right {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: 24px;
  position: absolute;
  top: 0;
  left: 0;
}

.landing-page .new-appointment {
  display: inline-flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px 24px;
  position: relative;
  flex: 0 0 auto;
  background-color: #8fbc94;
  border-radius: 4px;
}

.landing-page .icon-plus {
  position: relative;
  width: 20px;
  height: 20px;
}

.landing-page .text-4 {
  position: relative;
  width: fit-content;
  margin-top: -1px;
  font-family: "Poppins-Regular", Helvetica;
  font-weight: 400;
  color: #000000;
  font-size: 14px;
  letter-spacing: 0.28px;
  line-height: 20px;
  white-space: nowrap;
}

.landing-page .div-2 {
  position: absolute;
  width: 1362px;
  height: 27px;
  top: 0;
  left: 0;
}

.landing-page .group {
  position: absolute;
  width: 1362px;
  height: 28px;
  top: 0;
  left: 0;
}

.landing-page .img-wrapper-2 {
  position: relative;
  width: 48px;
  height: 48px;
  background-color: #ffffff;
  overflow: hidden;
}
</style> --> */}

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

#apptTitle {
    position: relative;
    top: 3em;
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
    top: 6em;
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
    line-height: 350%;
    padding: 5px;
    background-color:white;
    color: black;
    position: relative;
    top: 10em;
    left: 0rem;
    border-radius: 60px;

}

button {
    width:200px;
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

tr {
    background: #d7e7d9;
    font-weight: 600; 
}
</style>
