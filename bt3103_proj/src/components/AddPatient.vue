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

                <div id = "Patdob">
                    <div class = "title">Enter Date of Birth: </div>
                    <form action="">
                        <input type="text" name="dob" id="dob">
                    </form>
                </div>   
                
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

                <div id = "patGender" >
                    <label for="chooseDoc" class = "title">Select Gender: </label><br>
                        <select id="gender" name="gender" required>
                            <option value ="male">Male</option>
                            <option value="female">Female</option> 
                        </select>
                </div>

                <div id = "patBlood" >
                    <div class = "title">Enter Blood Type</div>
                    <form action="">
                        <input type="text" name="blood" id="blood">
                    </form>
                </div>
                <div id = "buttonWrapper">
                    <button id = "submitButt" type = "button" @click="">Submit</button>
                </div>
            </div>

            
        </div>
    </div>
</template>

<script>

</script>

<style scoped>
#rectangle {
    width: 951px;
    height: 344px;
    background: #ECFFD6; 
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.50); 
    border-radius: 67px;
}

#patDet {
    position: absolute;
    left: 5em;
    top: 3.5em;
}

#mega {
    position: absolute;
    left: 20em;
    top:5em;
}

#patTitle {
    position: relative;
    top: 1em;
    left:4.9rem;
    color: black;
    font-size: 20px;
    font-family: Inter-Regular, Arial, Helvetica, sans-serif;
    font-weight: 700;
    word-wrap: break-word;
}
</style>