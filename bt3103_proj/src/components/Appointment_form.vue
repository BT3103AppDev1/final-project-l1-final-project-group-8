<template>
<div id = "mega">
    <div id = "createAppointment">
    <div id = "frame">
        <div id = "formWrapper">
            <div id = "header">Create an Appointment</div><br>

            <form action="" id = "Appform">
                <div id = "formDiv">
                    <div id = "firstInput">
                        <label for="chooseDoc">Select Doctor</label><br>
                        <select id="chooseDoc" name="chooseDoc" required>
                            <option value ="default">----</option>
                            <option value="doc1">doc1</option> <!--hardcoded for now. Will be reactive using vue later-->
                            <option value="doc2">doc2</option>
                        </select>
                        <div class = "subtext">Select a doctor for the appointment</div>
                    </div>

                    <div id="secondInput">
                        <label for="choosePat">Enter Patient</label><br>
                        <input type="text" name="choosePat" id="choosePat" required>
                        <div class = "subtext">Enter a registered patient for the appointment</div>
                    </div>

                    <div id = "thirdInput">
                    <label for="AppDT">Select Appointment Date & Time</label><br>
                        <input type="datetime-local" id="AppDT" name="AppDT" style = "font-family:Inter-Regular, Arial, Helvetica, sans-seri" required>
                        <div class = "subtext">Set appointment date for the patient and the doctor. 
                            Please select a date and time slot where the doctor is free</div>
                    </div>
            </div>
            </form>


        </div>
    </div>
</div>
</div>
<div id="buttonWrapper">
    <div id = "actionBtn">
            <button id = "saveButton" type="button">Submit</button>
            <button id = "cancelButton" type="button">Cancel</button>
        </div>
</div>
</template>

<style scoped>

#mega {
    /**margin: 104px 411px 189px 630px;**/
    /**margin-top: 7px;**/
    margin-right: 20%;
    margin-left: 20%;
    /**bottom: 189px;**/
    left: 450px;
    bottom: 80px;
    position: absolute;
    max-width:50%;

}

#createAppointment {
    width: 100%; 
    height: 100%; 
    padding: 48px 20px 74px; 
    background: #DFFFE3; 
    border-radius: 20px; 
    overflow: hidden;
    border: 2px rgba(235, 235, 245, 0.60) solid; 
    flex-direction: column; 
    justify-content: flex-start;
    align-items: flex-start; 
    gap: 24px; 
    display: inline-flex
}

#frame {
    width: 100%; 
    height: 100%; 
    flex-direction: column; 
    justify-content: flex-start; 
    align-items: flex-start; 
    gap: 41px; 
    display: inline-flex;
}

#header {
    color: black;
    font-size: 32px;
    font-family: Inter-Regular, Arial, Helvetica, sans-serif;
    font-weight: 700;
    word-wrap: break-word;
}

.subtext {
    width: 100%; 
    color: #768898; 
    font-size: 14px; 
    font-family: Poppins, Inter-Regular, Arial, Helvetica, sans-serif; 
    font-weight: 400; 
    line-height: 14px; 
    word-wrap: break-word;
}

#firstInput, #secondInput, #thirdInput{
    margin-top: 40px;
}

#formDiv {
    justify-content: center;
}

#buttonWrapper {
    margin-top: 10px;
    position: absolute;
    right: 13%;
    bottom: 3%;
    /**width: 200px;
    margin: 0 auto;
    display: inline;
    right: 18%;**/
}


#chooseDoc{
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    border: 1px solid var(--grey-300, #d8dde3);
    box-shadow: 0px 0px 4px 0px rgba(23, 25, 28, 0.05);
    background-color: var(--text-text-0, #fff);
    align-self: start;
    display: flex;
    margin-top: 8px;
    margin-bottom: 4px;
    width: 100%;
    flex-grow: 1;
    flex-direction: column;
    padding: 4px 20px;
}

#choosePat {
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    border: 1px solid var(--grey-300, #d8dde3);
    box-shadow: 0px 0px 4px 0px rgba(23, 25, 28, 0.05);
    background-color: var(--text-text-0, #fff);
    align-self: start;
    display: flex;
    margin-top: 8px;
    margin-bottom: 4px;
    width: 100%;
    flex-grow: 1;
    flex-direction: column;
    padding: 4px 2px;
}

label {
    color: #262E36;
    font-size: 14px;
    font-family: Poppins, Inter-Regular, Arial, Helvetica, sans-serif;
    font-weight: 400;
    line-height: 14px;
    word-wrap: break-word
}

#AppDT {
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    border: 1px solid var(--grey-300, #d8dde3);
    box-shadow: 0px 0px 4px 0px rgba(23, 25, 28, 0.05);
    background-color: var(--text-text-0, #fff);
    align-self: start;
    display: flex;
    margin-top: 8px;
    margin-bottom: 4px;
    width: 100%;
    flex-grow: 1;
    flex-direction: column;
    padding: 2px;
}

button {
    width: 60px;
    border-radius: 4px;
    border-radius: 4px;
    overflow: hidden; 
    justify-content: center; 
    align-items: center; 
    display: inline;
    border: none;
    padding: 7px;
    font-family: Inter-Regular, Arial, Helvetica, sans-serif;
}

#saveButton {
    background: #6DA34D;
    margin-right: 0.5em;
}

#cancelButton {
    background: #FF0000;
    margin-left: 0.5em;
}
/**#saveButton {
    width: 50px; 
    /**height: 100%; 
    padding-left: 2px; 
    padding-right: 2px; 
    padding-top: 5px; 
    padding-bottom: 5px; 
    background: #6DA34D; 
    border-radius: 4px; 
    overflow: hidden; 
    justify-content: center; 
    align-items: center; 
    display: inline;

}**/

/**#cancelButton {
    width: 50px; 
    height: 30px; 
    padding-left: 2px; 
    padding-right: 2px; 
    padding-top: 5px; 
    padding-bottom: 5px; 
    background: #FF0000; 
    border-radius: 4px; 
    overflow: hidden; 
    justify-content: center; 
    align-items: center; 
    display: inline;
}**/

#actionBtn {
    width: 200px;
    margin: 0 auto;
    display: flex;
}




</style>