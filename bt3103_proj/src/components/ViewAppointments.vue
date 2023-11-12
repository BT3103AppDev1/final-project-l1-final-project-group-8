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
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
    };
  },

  methods: {
  },

  mounted() {
        //     const auth = getAuth();
        //     onAuthStateChanged(auth, (user) => {
        //         if (user) {
        //             this.user = user;
        //             this.useremail = auth.currentUser.email;
        //     }
        // })

    async function display() {
      const clinicDocRef = doc(db, 'clinic1', 'doctors');
      const clinicPatientRef = doc(db, 'clinic1', 'patients');
      let allDocuments = await getDoc(clinicPatientRef);
      let docDocuments = await getDoc(clinicPatientRef);
      let index = 1;
      let noOfAppointments = 0;
        // Appointment records from Patient, get doctor id by searching patient in doctors
        // Date, Time Patient Name, Pat ID, Doct ID Edit, Remove
      allDocuments.forEach((docs) => {
        let data = docs.data();
        if(data.upcoming_appoint == true) {
        let appointDate = data.appoint_date;
        appointDate = appointDate.toDate().toDateString()
        let patientName = data.name;
        let patientID = data.id;
        let doctorNameF = null;
        // Get Doctor
        const doctorData = docDocuments.data();
            for (const doctorName in doctorData) {
                if (Array.isArray(doctorData[doctorName])) {
                    const individualDoc = doctorData[doctorName];
                    for(let i = 0; i < individualDoc.length(); i++) {
                        if(individualDoc[i] == patientID) {
                            doctorNameF = Object.keys(doctorName);
                        }
                    }
                }
            }
        let table = document.getElementById("appointTable");
        let row = table.insertRow(index);

        let infoArray = [appointDate, patientName, patientID, doctorName];

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

      });
    }

    display(this.useremail);
  },
};
</script>
<style scoped>
@import 'https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css';
:root {
        --primary: rgba(102, 110, 125, 1);
        --purple: rgba(109, 91, 208, 1);
        --textaccent: rgba(255, 205, 96, 1);
        --gray-100: rgba(255, 255, 255, 1);
        --accent-dark: rgba(208, 22, 93, 1);
        --accent: rgba(233, 24, 104, 1);
        --blue-light: rgba(165, 173, 215, 1);
        --textdarkgrey: rgba(88, 94, 106, 1);
        --grey-800: rgba(88, 94, 106, 1);
        --grey-100: rgba(249, 249, 251, 1);
        --grey-400: rgba(220, 223, 227, 1);
      }
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
        justify-content: center;
        width: 100%;
      }

      .landing-page .div {
        background-color: #ffffff;
        overflow: hidden;
        width: 1664px;
        height: 988px;
        position: relative;
      }

      .landing-page .overlap {
        position: absolute;
        width: 1686px;
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
        position: absolute;
        width: 1458px;
        height: 49px;
        top: 282px;
        left: 228px;
      }

      .landing-page .line {
        position: absolute;
        width: 729px;
        height: 48px;
        top: 0;
        left: 0;
        background-color: #f2f2f2;
      }

      .landing-page .headers {
        position: absolute;
        width: 1140px;
        height: 48px;
        top: 0;
        left: 168px;
      }

      .landing-page .status {
        position: absolute;
        width: 116px;
        height: 48px;
        top: 0;
        left: 958px;
      }

      .landing-page .item {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        position: relative;
        top: 14px;
      }

      .landing-page .text-wrapper-3 {
        position: relative;
        width: fit-content;
        margin-top: -1px;
        font-family: "Poppins-SemiBold", Helvetica;
        font-weight: 600;
        color: var(--primary);
        font-size: 12px;
        letter-spacing: 0;
        line-height: 20px;
        white-space: nowrap;
      }

      .landing-page .technician {
        position: absolute;
        width: 53px;
        height: 48px;
        top: 0;
        left: 648px;
      }

      .landing-page .location {
        position: absolute;
        width: 105px;
        height: 48px;
        top: 0;
        left: 807px;
      }

      .landing-page .test {
        position: absolute;
        width: 116px;
        height: 48px;
        top: 0;
        left: 489px;
      }

      .landing-page .patient {
        position: absolute;
        width: 52px;
        height: 48px;
        top: 0;
        left: 293px;
      }

      .landing-page .time {
        position: absolute;
        width: 39px;
        height: 48px;
        top: 0;
        left: 139px;
      }

      .landing-page .item-wrapper {
        position: absolute;
        width: 30px;
        height: 48px;
        top: 0;
        left: 0;
      }

      .landing-page .div-wrapper {
        position: absolute;
        width: 116px;
        height: 48px;
        top: 0;
        left: 1090px;
      }

      .landing-page .checkbox {
        position: absolute;
        width: 48px;
        height: 48px;
        top: 0;
        left: 0;
      }

      .landing-page .time-2 {
        position: relative;
        width: 39px;
        height: 48px;
        left: 48px;
      }

      .landing-page .bottom-line {
        position: absolute;
        width: 1436px;
        height: 1px;
        top: 48px;
        left: 0;
      }

      .landing-page .text-2 {
        position: relative;
        width: fit-content;
        margin-top: -1px;
        font-family: "Poppins-SemiBold", Helvetica;
        font-weight: 600;
        color: #000000;
        font-size: 20px;
        letter-spacing: 0.2px;
        line-height: 20px;
        white-space: nowrap;
      }

      .landing-page .text-3 {
        position: relative;
        width: fit-content;
        margin-top: -1px;
        font-family: "Poppins-Regular", Helvetica;
        font-weight: 400;
        color: #000000de;
        font-size: 20px;
        letter-spacing: 0.2px;
        line-height: 20px;
        white-space: nowrap;
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

      .landing-page .overlap-5 {
        position: absolute;
        width: 1430px;
        height: 1px;
        top: 374px;
        left: 228px;
        background-image: url(./assets/top-line.svg);
        background-size: 100% 100%;
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

      .landing-page .overlap-17 {
        position: absolute;
        width: 1362px;
        height: 27px;
        top: 337px;
        left: 277px;
      }

      .landing-page .div-2 {
        position: absolute;
        width: 1362px;
        height: 27px;
        top: 0;
        left: 0;
      }

      .landing-page .text-wrapper-5 {
        position: absolute;
        width: 93px;
        height: 27px;
        top: 0;
        left: 1075px;
        font-family: "Poppins-Regular", Helvetica;
        font-weight: 400;
        color: #000000;
        font-size: 14px;
        letter-spacing: 0;
        line-height: normal;
      }

      .landing-page .text-wrapper-6 {
        position: absolute;
        width: 93px;
        height: 27px;
        top: 0;
        left: 927px;
        font-family: "Poppins-Regular", Helvetica;
        font-weight: 400;
        color: #000000;
        font-size: 14px;
        letter-spacing: 0;
        line-height: normal;
      }

      .landing-page .text-wrapper-7 {
        position: absolute;
        width: 137px;
        height: 27px;
        top: 0;
        left: 768px;
        font-family: "Poppins-Regular", Helvetica;
        font-weight: 400;
        color: #000000;
        font-size: 14px;
        letter-spacing: 0;
        line-height: normal;
      }

      .landing-page .text-wrapper-8 {
        position: absolute;
        width: 93px;
        height: 27px;
        top: 0;
        left: 610px;
        font-family: "Poppins-Regular", Helvetica;
        font-weight: 400;
        color: #000000;
        font-size: 14px;
        letter-spacing: 0;
        line-height: normal;
      }

      .landing-page .text-wrapper-9 {
        font-family: "Poppins-Regular", Helvetica;
        position: absolute;
        width: 93px;
        height: 27px;
        top: 0;
        left: 411px;
        font-weight: 400;
        color: #000000;
        font-size: 14px;
        letter-spacing: 0;
        line-height: normal;
      }

      .landing-page .text-wrapper-10 {
        position: absolute;
        width: 93px;
        height: 27px;
        top: 0;
        left: 259px;
        font-family: "Poppins-Regular", Helvetica;
        font-weight: 400;
        color: #000000;
        font-size: 14px;
        letter-spacing: 0;
        line-height: normal;
      }

      .landing-page .text-wrapper-11 {
        position: absolute;
        width: 93px;
        height: 27px;
        top: 0;
        left: 117px;
        font-family: "Poppins-Regular", Helvetica;
        font-weight: 400;
        color: #000000;
        font-size: 14px;
        letter-spacing: 0;
        line-height: normal;
      }

      .landing-page .text-wrapper-12 {
        position: absolute;
        width: 93px;
        height: 27px;
        top: 0;
        left: 0;
        font-family: "Poppins-Regular", Helvetica;
        font-weight: 400;
        color: #000000;
        font-size: 14px;
        letter-spacing: 0;
        line-height: normal;
      }

      .landing-page .text-wrapper-13 {
        position: absolute;
        width: 60px;
        height: 13px;
        top: 5px;
        left: 2px;
        font-family: "Poppins-SemiBold", Helvetica;
        font-weight: 600;
        color: #ffffff;
        font-size: 12px;
        text-align: center;
        letter-spacing: 0;
        line-height: 20px;
        white-space: nowrap;
      }

      .landing-page .overlap-group-2 {
        top: 4px;
        left: 1207px;
        background-color: #8fbc94;
        position: absolute;
        width: 64px;
        height: 23px;
        border-radius: 20px;
      }

      .landing-page .text-wrapper-14 {
        width: 93px;
        left: 1075px;
        position: absolute;
        height: 27px;
        top: 0;
        font-family: "Inter-Regular", Helvetica;
        font-weight: 400;
        color: #000000;
        font-size: 14px;
        letter-spacing: 0;
        line-height: normal;
      }

      .landing-page .text-wrapper-15 {
        width: 93px;
        left: 927px;
        position: absolute;
        height: 27px;
        top: 0;
        font-family: "Inter-Regular", Helvetica;
        font-weight: 400;
        color: #000000;
        font-size: 14px;
        letter-spacing: 0;
        line-height: normal;
      }

      .landing-page .text-wrapper-16 {
        width: 137px;
        left: 768px;
        position: absolute;
        height: 27px;
        top: 0;
        font-family: "Inter-Regular", Helvetica;
        font-weight: 400;
        color: #000000;
        font-size: 14px;
        letter-spacing: 0;
        line-height: normal;
      }

      .landing-page .text-wrapper-17 {
        position: absolute;
        width: 93px;
        height: 27px;
        top: 0;
        left: 610px;
        font-family: "Inter-Regular", Helvetica;
        font-weight: 400;
        color: #000000;
        font-size: 14px;
        letter-spacing: 0;
        line-height: normal;
      }

      .landing-page .text-wrapper-18 {
        font-family: "Inter-Regular", Helvetica;
        position: absolute;
        width: 93px;
        height: 27px;
        top: 0;
        left: 411px;
        font-weight: 400;
        color: #000000;
        font-size: 14px;
        letter-spacing: 0;
        line-height: normal;
      }

      .landing-page .text-wrapper-19 {
        width: 93px;
        left: 259px;
        position: absolute;
        height: 27px;
        top: 0;
        font-family: "Inter-Regular", Helvetica;
        font-weight: 400;
        color: #000000;
        font-size: 14px;
        letter-spacing: 0;
        line-height: normal;
      }

      .landing-page .text-wrapper-20 {
        position: absolute;
        width: 93px;
        height: 27px;
        top: 0;
        left: 0;
        font-family: "Inter-Regular", Helvetica;
        font-weight: 400;
        color: #000000;
        font-size: 14px;
        letter-spacing: 0;
        line-height: normal;
      }

      .landing-page .group {
        position: absolute;
        width: 1362px;
        height: 28px;
        top: 0;
        left: 0;
      }

      .landing-page .text-wrapper-21 {
        width: 178px;
        top: 1px;
        position: absolute;
        height: 27px;
        left: 411px;
        font-family: "Poppins-Regular", Helvetica;
        font-weight: 400;
        color: #000000;
        font-size: 14px;
        letter-spacing: 0;
        line-height: normal;
      }

      .landing-page .text-wrapper-22 {
        width: 133px;
        top: 0;
        position: absolute;
        height: 27px;
        left: 411px;
        font-family: "Poppins-Regular", Helvetica;
        font-weight: 400;
        color: #000000;
        font-size: 14px;
        letter-spacing: 0;
        line-height: normal;
      }

      .landing-page .img-wrapper-2 {
        position: relative;
        width: 48px;
        height: 48px;
        background-color: #ffffff;
        overflow: hidden;
      }

      .landing-page .overlap-18 {
        top: 4px;
        left: 1279px;
        background-color: #ff0000;
        position: absolute;
        width: 64px;
        height: 23px;
        border-radius: 20px;
      }
</style>
