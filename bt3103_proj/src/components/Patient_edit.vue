<template>
    <div id = "mega">
        <div id = "rectangle">
            <div id = "patTitle">Patient's Health Records - NAME</div>
            <div id = "patDet">
                <div id = "name">
                    <div class = "title">NAME:</div>
                    <div id = "nameText">test</div> <!--Hard code for now-->
                </div>

                <div id = "dob">
                    <div class = "title">DATE OF BIRTH:</div>
                    <div id = "dobText">test</div> <!--Hard code for now-->
                </div>     
                
                <div id = "contactNum" v-if="edit = edit">
                    <div class = "title">CONTACT NUM:</div>
                    <form action="">
                        <input type="text" name="phoneNum" id="phoneNum">
                    </form>
                </div>

                <div v-else id = "contactNum" >
                    <div class = "title">CONTACT NUM:</div>
                    <div id = "numText">1234</div> <!--Hard code for now-->
                </div>

                <div id = "ic">
                    <div class = "title">PATIENT IC:</div>
                    <div id = "icText">1234</div> <!--Hard code for now-->
                </div>

                <div id = "gender">
                    <div class = "title">GENDER:</div>
                    <div id = "genderText">1234</div> <!--Hard code for now-->
                </div>

                <div id = "blood">
                    <div class = "title">BLOOD TYPE:</div>
                    <div id = "bloodText">1234</div> <!--Hard code for now-->
                </div>
            </div>

            <div  id = "button" v-if="edit = edit">
                <div id = "actionEditBtn">
                    <button id = "submitButton" type="button">Submit</button>
                    <button id = "cancelButton" type = "button" @click="cancelEdit">Cancel</button>
                </div>
            </div>

            <div v-else id="button" >
                <div id = "actionBtn">
                    <button id = "editButton" type="button" v-on:click="allowEdit">Edit Details</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            edit : false,
        }
    },

    methods:{
        allowEdit() {
            this.edit = true
        },

        cancelEdit() {
            this.edit = false
        }
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
    left: 30em;
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
    left: 20em;
    top:2em;
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
    overflow: visible;

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

</style>