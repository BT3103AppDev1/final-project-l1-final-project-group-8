<template>
<div id = "mega">
    <div id = "rectangle">
        <div id = "Content">
            <div id = "title">Add Doctor</div><br>
            
            <div id = "DocInfo">
                <form action="">
                    <input type="text" name="docName" id="docName" placeholder="Enter Name">
                </form>
            </div><br>

            <div id = "buttonWrapper">
                <button id = "submitButt" type = "button" @click="newDoc">Submit</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { getApps } from 'firebase/app';
import firebaseApp from '../firebase.js';
import {getFirestore, setDoc} from "firebase/firestore"
import {collection, getDocs,doc, updateDoc,getDoc} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
    data() {
        return {
            close : true,
            user :false,
            useremail: " "
        }
    },
    methods : {
        async newDoc() {
            let doctName = document.getElementById("docName").value;
            let docRef = doc(db,String(this.useremail),"doctors") //clinic1 is hardcoded for now. will be email later
            console.log(this.useremail)
            const newData = {
                [doctName] : []
            }
            await setDoc(docRef, newData, {merge : true})

            alert("Added " + doctName + " as a doctor")
            window.location.reload()
        },

        cancelAdd() {
            this.close = false
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
    /* height: 150px; */
    width: 650px;
    background: #F7F7F7; 
    border-radius: 20px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.50); 
    padding: 20px;
    position: relative;
    left: 1rem;
    top: 1rem
}

#title {
    color: black;
    font-size: 20px;
    font-family: Inter-Regular, Arial, Helvetica, sans-serif;
    font-weight: 700;
    word-wrap: break-word;
}

#docName {
    margin: 10px 0 10px 0;
    width: 300px;
    height: 30px;
}

#submitButt{
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
    font-weight: 600;
}

#submitButt:hover {
    background: #d7e7d9; 
    font-weight: 600;
    
}


</style>

