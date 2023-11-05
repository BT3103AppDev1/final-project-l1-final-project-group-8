<template>
    <div id = "sidebar">
        <img id="clinic_logo" src="@/assets/everhealth_logo.png" alt="clinic_logo">
        <div id="lineDiv"></div>

        <br>

        <router-link class="routerElement" to="/">
            <div id="patientBlock"><p>For Patients</p></div>
        </router-link>

        <router-link class="routerElement" to="/DoctorLogin">
            <div id="doctorBlock"><p>For Doctors</p></div>
        </router-link>

        <router-link class="routerElement" to="/ClinicLogin">
            <div id="clinicBlock"><p>For Clinic Staff</p></div>
        </router-link>
    </div>

</template>

<script>
export default {
    name: "LoginSidebar",

    props: {
        tabName: String
    },

    methods: {
        changeSelection() {
            const allTabs = document.querySelectorAll('.routerElement')
            allTabs.forEach((tab) => {
                const divs = tab.querySelectorAll('div');

                divs.forEach((div) => {
                    div.style.backgroundColor = "rgb(140, 195, 140)"
                });
            });

            const currSelected = document.getElementById(this.tabName)
            currSelected.style.backgroundColor = 'white'     
            currSelected.style.fontWeight = 'bold'    
        }
    },

    mounted() {
        this.changeSelection()
    }
}
</script>

<style scoped>
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

    overflow-y: auto;
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
    color: black;
    font-weight: 500;
}

/* .routerElement{
    p {
        text-decoration: underline;
    }
} */

</style>