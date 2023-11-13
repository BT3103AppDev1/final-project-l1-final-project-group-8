<!-- <template>
    <div id = "sidebar">
        <img id="clinic_logo" src="@/assets/everhealth_logo.png" alt="clinic_logo">
        <div id="lineDiv"></div>

        <br>

        <div id="patientBlock"><p>Staff Login</p></div>
    </div>
</template>

<script>
export default {
    name: "login_sidebar"
}
</script>

<style scoped>
#patientBlock {
  background-color: white;
  p {
    font-weight: bold;
  }
}

body {
    font-family: "Helvetica";
    height: 100%;
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

    overflow-y: auto;
}

#lineDiv {
    background-color: white;
    height: 1px;
}

#patientBlock {
    text-align: left;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 20px;
}

p {
    font-weight:600;
}

</style> -->

<!-- ---------------------------------- -->

<template>
    <div id = "sidebar">
        <img id="clinic_logo" src="@/assets/everhealth_logo.png" alt="clinic_logo">
        <div id="lineDiv"></div>

        <br>

        <router-link class="routerElement" style="text-decoration: none;" to="/">
            <div id="loginBlock"><p>Staff Login</p></div>
        </router-link>

        <router-link class="routerElement" style="text-decoration: none;" to="/signup">
            <div id="signupBlock"><p>Clinic Signup</p></div>
        </router-link>

        <br>
        <button id = "button" @click="signOut" v-if="user"> Logout </button>

    </div>

</template>

<script>

export default {
    name: "internal_sidebar",

    data() {
        return {
            user: false,
        }
    },

    props: {
        tabName: String
    },

    methods: {
        changeSelection() {
            const allTabs = document.querySelectorAll('.routerElement')
            allTabs.forEach((tab) => {
                const divs = tab.querySelectorAll('div');

                divs.forEach((div) => {
                    div.style.backgroundColor = "rgb(140, 195, 140)";
                    div.style.color = "black";
                    div.style.textAlign = "left";
                    div.style.padding = "15px 0 15px 20px";
                });
            });

            const currSelected = document.getElementById(this.tabName)
            currSelected.style.backgroundColor = 'white'     
            const paraElem = currSelected.querySelector('p');
            paraElem.style.fontWeight = 'bold'
        }
    },

    mounted() {
        this.changeSelection()
    }
}


</script>

<style scoped>

body {
    font-family: "Helvetica";
    height: 100%;
}

#clinic_logo {
    width: 100%;
    padding: 10px;
}

#sidebar {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: rgb(140, 195, 140);
    /* width: 15%;
    height: 100%; */
    width: 220px;
    height: 100%;
    top: 0;
    left: 0;
    /* position:absolute; */

    overflow-y: auto;
}

#lineDiv {
    background-color: #d7e7d9;
    height: 1px;
}

#button {
    background-color: #d7e7d9;
    padding: 10px 15px;
    text-align: center;
    color: black;
    font-weight: bold;
    border: solid 1px grey;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
    left: 10%;
  }
  
  #button:hover {
    background-color: #8FBC94;
    color:white
  }
</style>