<template>
    <div id = "mega">
        <!-- <div id = "searchBar">
            <div id = "smallRec">
                <div id = "searchContent">
                    <label>Enter Patient's IC Number</label>
                    <form action="">
                                <input type="text" name="patID" id="patID" placeholder="Enter Patient IC" size="25">
                    </form>
                    <button id = "submit" type="button">Search</button>
                </div>
            </div>

        </div> -->


        <div id = "rectangle">
            <div id = "patTitle">Patient's Health Records - {{ this.name }}</div><br>
            <div id = "patDet">
                <div id = "name">
                    <div class = "title">NAME:</div>
                    <div id = "nameText">{{ this.name }}</div> <!--Hard code for now-->
                </div>

                <div id = "dob">
                    <div class = "title">DATE OF BIRTH:</div>
                    <div id = "dobText">{{this.dob}}</div> <!--Hard code for now-->
                </div>     
                
                <div id = "contactNum" v-if="edit = edit">
                    <div class = "title">CONTACT NUM:</div>
                    <form action="">
                        <input type="text" name="phoneNum" id="phoneNum">
                    </form>
                </div>

                <div v-else id = "contactNum" >
                    <div class = "title">CONTACT NUM:</div>
                    <div id = "numText">{{this.contact_num}}</div> <!--Hard code for now-->
                </div>

                <div id = "ic">
                    <div class = "title">PATIENT IC:</div>
                    <div id = "icText">{{ info.patientId }}</div> <!--Hard code for now-->
                </div>

                <div id = "gender">
                    <div class = "title">GENDER:</div>
                    <div id = "genderText">{{ this.gender }}</div> <!--Hard code for now-->
                </div>

                <div id = "blood">
                    <div class = "title">BLOOD TYPE:</div>
                    <div id = "bloodText">{{this.blood}}</div> <!--Hard code for now-->
                </div>
            </div>

            <div  id = "button" v-if="edit = edit">
                <div id = "actionEditBtn">
                    <button id = "submitButton" type="button" @click="saveInput">Submit</button>
                    <button id = "cancelButton" type = "button" @click="cancelEdit">Cancel</button>
                </div>
            </div>

            <div v-else id="button" >
                <div id = "actionBtn">
                    <button id = "editButton" type="button" v-on:click="allowEdit">Edit Details</button>
                    <button id = "backButton" type="button" @click="$router.go(-1)">Back to All Patients</button>
                </div>
            </div>
        </div>

        <div id = "rectangle2">
            <div class = "textContent" v-if="edit2 = edit2"> <!--form version to edit-->
                <div class = "DiagTreat">
                    <label id = "diagTreatLabel">Diagnosis & Treatment:</label>
                    <form action="">
                        <textarea name="newDiag" id="newDiag" cols="50" rows="4" placeholder="Enter Diagnosis"></textarea>
                        <textarea name="newTreat" id="newTreat" cols="50" rows="4" placeholder="Enter Treatment"></textarea>
                    </form>
                </div>

                <div class = "logText">
                    <label id = "logLabel">Log</label>
                    <form action="">
                        <textarea name="newLog" id="newLog" cols="30" rows="4" placeholder="Enter Log"></textarea>
                    </form>
                </div>
                
                <div id = "buttonWrapper2Edit">
                    <div id = "actionEditBtn2">
                        <button id = "submitButton2" type="button" @click="saveText">Submit</button>
                        <button id = "cancelButton2" type = "button" @click="cancelEdit2">Cancel</button>
                    </div>
                </div>
            </div>


            <div class = "textContent" v-else> <!--display version (default)-->
                <div class = "DiagTreat">
                    <label id = "diagTreatLabel">Diagnosis & Treatment:</label>
                    <div id = "diagContent">{{this.diagnosis}}</div>
                    <div id = "treatContent">{{this.treatment}}</div>
                </div>

                <div class = "logText">
                    <label id = "logLabel">Log</label>
                    <div id = "logContent">{{this.logs}}</div>
                </div>

                <div id = "buttonWrapper2">
                    <div id = "buttonEdit2">
                        <button id = "editButton2" type="button" @click="allowEdit2">Edit Details</button>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import {getFirestore, setDoc} from "firebase/firestore"
import {collection, getDocs,doc, updateDoc,getDoc} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
    props: ['info'],
    data() {
        return {
            edit : false,
            pat : false,
            edit2: false,
            blood: '',
            contact_num: 0,
            diagnosis: '',
            treatment: '',
            logs: '',
            gender: '',
            patientId: this.info.patientId,
            name: '',
            dob: '',
            user : false,
            useremail : false
        }
    },

    methods:{
        allowEdit() {
            this.edit = true
        },

        cancelEdit() {
            this.edit = false
        },

        allowEdit2() {
            this.edit2 = true
        },

        cancelEdit2() {
            this.edit2 = false
        },

        async saveInput() {
            let newNum = document.getElementById("phoneNum").value;
            const docRef = doc(db,String(this.useremail),"patients")
            let patID = document.getElementById("icText").innerHTML

            let allDocs = await getDoc(doc(db,String(this.useremail),"patients")) //clinic1 for the time being
            //should be email in actual
            allDocs = allDocs.data()

            let docData = allDocs[patID]
            let name = docData.name
            let dob = docData.dob
            let gender = docData.gender
            let blood = docData.blood
            let diagnosis = docData.diagnosis
            let treatment = docData.treatment
            let logs = docData.logs
            let upcoming_appoint = docData.upcoming_appoint
            let appoint_date = docData.appoint_date 

            let updateData = {
                [patID] : {
                    "appoint_date" : appoint_date,
                    "blood" : blood,
                    "diagnosis" : diagnosis,
                    "dob" : dob,
                    "gender" : gender,
                    "id" : patID,
                    "logs" : logs,
                    "name" : name,
                    "treatment" : treatment,
                    "upcoming_appoint" : upcoming_appoint,
                    "contact_num" : Number(newNum)
                }
            }

            await setDoc(docRef, updateData,{merge : true})

            //await updateDoc(docRef, {
            //    "[patID].contact_num" : Number(newNum) //hardcode id of patient for now
            //})
            window.location.reload()
        },
        
        async saveText() {
            let newDiag = document.getElementById("newDiag").value
            let newTreat = document.getElementById("newTreat").value
            let newLog = document.getElementById("newLog").value

            const docRef = doc(db,String(this.useremail),"patients") //climic1 hardcoded. Will be email
            let patID = document.getElementById("icText").innerHTML

            let allDocs = await getDoc(doc(db,String(this.useremail),"patients")) //clinic1 for the time being
            //should be email in actual
            allDocs = allDocs.data()

            let docData = allDocs[patID]
            let name = docData.name
            let dob = docData.dob
            let gender = docData.gender
            let blood = docData.blood
            let upcoming_appoint = docData.upcoming_appoint
            let appoint_date = docData.appoint_date 
            let contact_num = docData.contact_num

            let updateData = {
                [patID] : {
                    "appoint_date" : appoint_date,
                    "blood" : blood,
                    "diagnosis" : newDiag,
                    "dob" : dob,
                    "gender" : gender,
                    "id" : patID,
                    "logs" : newLog,
                    "name" : name,
                    "treatment" : newTreat,
                    "upcoming_appoint" : upcoming_appoint,
                    "contact_num" : contact_num
                }
            }

            await setDoc(docRef, updateData,{merge : true})
            alert("Update Succesful")
            window.location.reload()
        }
    },
    mounted() {
        const self = this;

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
    
        async function display() {
            let allDocs = await getDoc(doc(db,String(this.useremail),"patients")) //clinic1 for the time being
            //should be email in actual
            allDocs = allDocs.data();
            let docData = allDocs[self.patientId]//hardcode. This part will be the patient id !!CHANGE ONCE LINKED TO OTHER PART
            // let id = docData.id
            let name = docData.name
            let contact_num = docData.contact_num
            let dob = docData.dob
            let Testdob = dob
            Testdob = new Date(Testdob)
            if (Testdob != 'Invalid Date') {
                dob = dob.slice(0,10)
            }
            //dob = dob.toDate().toDateString()
            let gender = docData.gender
            let blood = docData.blood
            let diagnosis = docData.diagnosis
            let treatment = docData.treatment
            let logs = docData.logs
            
            self.name = name,
            self.blood = blood,
            self.contact_num = contact_num,
            self.diagnosis = "Diagnosis: " + diagnosis,
            self.treatment = "Current Treatment: " + treatment,
            self.logs = logs,
            self.gender = gender,
            self.dob = dob
        }
        display()
    }
}
</script>

<style scoped>
#rectangle {
    width: 951px;
    height: 344px;
    background: #ECFFD6; 
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.50); 
    border-radius: 67px;
    position: relative;
    top: 0em;
}

/* #smallRec {
    position: absolute;
    bottom: 23em;
    width: 300px;
    height: 100px;
    background: #F7F7F7; 
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.50); 
    border-radius: 40px; */

/* } */

#rectangle2 {
    position: relative;
    top:2em;
    width: 951px;
    height: 300px;
    background: #ECFFD6; 
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.50); 
    border-radius: 67px;
}

/* #searchContent {
    position: absolute;
    left:2em;
    top:1em;
} */

#submit {
    position: relative;
    top:0.5em;
}

label {
    white-space: nowrap;
    color: #464E5F;
    font-size: 16px;
    font-family: Poppins, Arial, Helvetica, sans-serif;
    font-weight: 700;
    word-wrap: break-word;
}

#buttonWrapper2 {
    position: inherit;
    left: 20.3em;
    top: 12.5em;
}

button {
    width:137px;
    height: 29px;
    background: #8FBC94; 
    border: none;
    border-radius: 6px;
    font-weight:600;
}

button:hover {
    background: #d7e7d9;
    font-weight: 600; 
}

#button {
    position: relative;
    top: 16em;
}

#editButton {
    position: relative;
    left: 20em;
}

#backButton {
    position: relative;
    width: 200px;
    left: 25em;
}

#actionEditBtn {
    position: relative;
    left: 20em;
}

#submitButton {
    margin-right: 0.5em;
}

#cancelButton {
    margin-left: 0.5em;
    background: #FF0000;
}

#cancelButton:hover {
    background-color: #ffaeae;
}

#mega {
    position: absolute;
    left: 15em;
    top:0.7em;
}

.title {
    white-space: nowrap;
    color: #464E5F;
    font-size: 14px;
    font-family: Poppins, Arial, Helvetica, sans-serif;
    font-weight: 600;
    word-wrap: break-word;
}
#patDet {
    position: absolute;
    left: 5em;
    top: 5em;
}

#nameText {
    position: absolute;
    left: 10rem;
    top: 0.01em;
    overflow: visible;

}

#contactNum {
    position: absolute;
    top: 7em;
}

#numText {
    position: absolute;
    left: 10rem;
    top: 0.01em;
    overflow: visible;
}

#phoneNum {
    position: absolute;
    left: 10rem;
    top: 0.01em;
}
#dob {
    position: absolute;
    top: 3.5em;

}
#dobText {
    position: absolute;
    left: 10rem;
    top: 0.01em;
    word-wrap: break-word;
    width: 10em;

}

#patTitle {
    position: relative;
    top: 1em;
    left:4.9rem;
    color: black;
    font-size: 32px;
    font-family: Poppins, Inter-Bold,Arial, Helvetica, sans-serif;
    font-weight: 600;
    line-height: 20px;
    word-wrap: break-word
}

#ic, #gender, #blood {
    position: absolute;
    left: 27em;
    top:0.01em;
}

#ic {
    top: 0.01em;
}

#gender {
    position: absolute;
    top: 3.5em;
}

#blood {
    position: absolute;
    top: 7em;
}

#icText, #genderText, #bloodText {
    position: inherit;
    left : 10em;
    bottom: 0.01em;
}

.logText {
    position: absolute;
    top: 8em;
}

.textContent {
    position: absolute;
    top: 2em;
    left:5em;
}

#nameText, #dobText, #numText, #icText, #genderText, #bloodText, #diagContent, #treatContent, #logContent {
    font-family: Arial, Helvetica, sans-serif;
}

#buttonWrapper2Edit {
    position: absolute;
    top: 13em;
    left: 16em;
}

#cancelButton2 {
    position:absolute;
    background: #FF0000;
    left:11em;
}

#cancelButton2:hover {
    background-color: #ffaeae;
}

#newDiag, #newTreat, #newLog {
    font-family: Poppins, Inter-Bold,Arial, Helvetica, sans-serif;
}

#newDiag {
    margin-right: 5px;
}

#newTreat {
    margin-left: 5px;
}

</style>