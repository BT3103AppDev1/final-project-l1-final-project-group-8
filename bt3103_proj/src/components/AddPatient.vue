<template>
<div id = "mega">
        <div id = "rectangle">
            <div id = "patTitle">Add Patient </div>
            <div id = "patDet">
                <div id = "Patname">
                    <div class = "title">Enter Name: </div>
                    <form action="">
                        <input type="text" name="name" id="name">
                    </form>
                </div>

                <div class = "padding"></div>

                <div id = "Patdob">
                    <div class = "title">Enter Date of Birth: </div>
                        <input type="datetime-local" step="900" name="dob" id="dob">
                    
                </div>   
                
                <div class = "padding"></div>

                <div id = "contactNum" >
                    <div class = "title">Enter Contact Number:</div>
                    <form action="">
                        <input type="text" name="phoneNum" id="phoneNum">
                    </form>
                </div>

                <div id = "Patic" >
                    <div class = "title">Enter IC Number:</div>
                    <form action="">
                        <input type="text" name="icNum" id="icNum">
                    </form>
                </div>

                <div class = "padding"></div>

                <div id = "patGender" >
                    <label for="gender" class = "title">Select Gender: </label><br>
                        <select id="gender" name="gender" required>
                            <option value ="male">Male</option>
                            <option value="female">Female</option> 
                        </select>
                </div>

                <div class = "padding"></div>

                <div id = "patBlood" >
                    <div class = "title">Enter Blood Type</div>
                    <form action="">
                        <input type="text" name="blood" id="blood">
                    </form>
                </div>

                <div id = "buttonWrapper">
                    <button id = "submitButt" type = "button" @click="newPat"><b>Submit</b></button>
                </div>
            </div>

            
        </div>
    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import {getFirestore, setDoc, Timestamp} from "firebase/firestore"
import {collection, getDocs,doc, updateDoc,getDoc} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
    data() {
        return {
            user : false,
            useremail : false
        }
    },
    methods: {
        async newPat() {
            let name = document.getElementById("name").value;
            let dob = document.getElementById("dob").value;
            //dob = Date(dob)
            //dob = dob.toString().toISOString();
            let phoneNum = document.getElementById("phoneNum").value;
            let icNum = document.getElementById("icNum").value;
            let gender = document.getElementById("gender").value;
            let blood = document.getElementById("blood").value;

            let patRef = doc(db,String(this.useremail),"patients") //clinic1 will be replaced by email 
            const newData = {
                [icNum] : {
                    "appoint_date" : null,
                    "blood" : blood,
                    "diagnosis" : null,
                    "dob" : dob,
                    "gender" : gender,
                    "id" : icNum,
                    "logs" : null,
                    "name" : name,
                    "treatment" : null,
                    "upcoming_appoint" : false,
                    "contact_num" : Number(phoneNum)
                }
            }

            await setDoc(patRef, newData,{merge : true})
            alert("Added new patient")
            window.location.reload()

        }
    },

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
    }
}
</script>

<style scoped>
#rectangle {
    width: 680px;
    height: 344px;
    background: #ECFFD6; 
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.50); 
    border-radius: 67px;
}

#patDet {
    position: absolute;
    left: 5em;
    top: 4em;
}

#mega {
    position: relative;
    left: 1em;
    top:2em;
}

#patTitle {
    position: absolute;
    top: 1em;
    left:4.9rem;
    color: black;
    font-size: 20px;
    font-family: Inter-Regular, Arial, Helvetica, sans-serif;
    font-weight: 700;
    word-wrap: break-word;
}

#Patic, #patGender, #patBlood {
    position: relative;
    left: 20em;
    bottom: 13.5em;
}

.padding {
    height: 2em;
}

#buttonWrapper {
    position: absolute;
    bottom: 10em;
}

#submitButt {
    width: 70px;
    border-radius: 4px;
    border-radius: 4px;
    overflow: hidden; 
    justify-content: center; 
    align-items: center; 
    display: inline;
    border: none;
    padding: 7px;
    font-family: Poppins, Arial, Helvetica, sans-serif;
    background: #8FBC94;
    font-weight: 3600;
}

#submitButt:hover {
    background: #d7e7d9; 
    font-weight: 3600;
}

.title {
    white-space: nowrap;
    color: black;
    font-size: 14px;
    font-family: Poppins, Arial, Helvetica, sans-serif;
    font-weight: 500;
    word-wrap: break-word;
}

</style>