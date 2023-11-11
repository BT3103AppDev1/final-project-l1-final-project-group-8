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
import firebaseApp from '../firebase.js';
import {getFirestore, setDoc} from "firebase/firestore"
import {collection, getDocs,doc, updateDoc,getDoc} from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
    data() {
        return {
            close : true
        }
    },
    methods : {
        async newDoc() {
            let doctName = document.getElementById("docName").value;
            let docRef = doc(db,"clinic1","doctors") //clinic1 is hardcoded for now. will be email later
            console.log(doctName)
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
    }
}
</script>


<style scoped>
#rectangle {
    /* height: 150px; */
    width: 700px;
    background: #F7F7F7; 
    border-radius: 20px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.50); 
    padding: 20px;
    position: relative;
    left: 250px;
    top: 100px
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

