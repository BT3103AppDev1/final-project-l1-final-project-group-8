<template>
    <div id = "rectangle">
        <div id = "apptTitle">Editing Apointment - APPOINTMENT ID</div>
        <div id = "apptDetail">
            <div id = "doctorName">
                <div class = "title">Doctor Name</div>
                <div id = "doctorName">DOCTORNAME</div> <!--Hard code for now-->
            </div>><br>
            <div id = "patientName">
                <div class = "title">Patient Name</div>
                <div id = "patientName">PATIENTNAME</div> <!--Hard code for now-->
            </div><br>
            <div>
                <div class="title">Select Appointment Date & Time</div>
                <div class="subtitle">Set apppointment date for the patient and the doctor</div>
                <div class="subtitle">Please select a date and time slot where the doctor is free</div> 
                <form action="">
                    <input type="datetime-local" requred placeholder="D/M/YYYY H:MM:SS"/>
                </form> 
            </div>
        </div>

        <div id = "button" v-if="edit = edit">
            <div id = "actionEditBtn">
                <button id = "submitButton" type="button">Submit</button>
                <button id = "cancelButton" type = "button" @click="cancelEdit">Cancel</button>
            </div>
        </div>
            
        <div v-else id="button">
            <div id = "actionBtn">
                <button id = "editButton" type="button" v-on:click="allowEdit">Edit Details</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            edit : false,
        };
    },

    methods: {
        allowEdit() {
            this.edit = true
        },

        cancelEdit() {
            this.edit = false
        },
    },
}
</script>

<style scoped>
#rectangle {
    width: 951px;
    height: 400px;
    background: #ECFFD6; 
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.50); 
    border-radius: 67px;
    align-content: center;
    position: absolute;
    left: 20em;
    top:2em;
    overflow:auto
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

.title {
    white-space: nowrap;
    color: #464E5F;
    font-size: 14px;
    font-family: Poppins, Arial, Helvetica, sans-serif;
    font-weight: 600;
    word-wrap: break-word;
}
#apptDetail {
    position:relative;
    left: 5em;
    top: 5em;
}

#doctorName {
    left: 4.9rem;
    top: 0.01em;
    overflow: visible;
    color:black
}

#patientName {
    left: 4.9rem;
    top: 0.01em;
    overflow: visible;
    color:black
}

.subtitle {
    color:black;
    font-size: 80%;
}

#apptTitle {
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
</style>