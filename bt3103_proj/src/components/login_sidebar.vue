<template>
    <div id = "sidebar">
        <img id="clinic_logo" src="@/assets/everhealth_logo.png" alt="clinic_logo">
        <div id="lineDiv"></div>

        <br>

        <div id="patientBlock"><p>For Patients</p></div>
        <div id="doctorBlock"><p>For Doctors</p></div>
        <div id="clinicBlock"><p>For Clinic Staff</p></div>
    </div>
</template>

<script>
export default {
    name: "login_sidebar"
}
</script>

<style scoped>
body {
    height: 100%
}

#clinic_logo {
    width: 100%;
    padding: 10px;
}

#sidebar {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: rgb(140, 195, 140);
    width: 200px;
    height: 100%;
    top: 0;
    left: 0;
}

#lineDiv {
    background-color: white;
    height: 1px;
}

#patientBlock,
#doctorBlock,
#clinicBlock {
    text-align: left;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 20px;
}

p {
    font-weight:600;
}

</style>