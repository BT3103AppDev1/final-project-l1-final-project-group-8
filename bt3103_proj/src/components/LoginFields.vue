<template>
    <div id="formWrapper">
        <p id="errorMsg">Credentials cannot be verified. Please try again</p>

        <form id="form">
            <div class="inputWrapper"><input class="textBox" type="text" size="50" placeholder="Placeholder; need to change"></div>
            <div class="inputWrapper"><input class="textBox" type="text" size="50" placeholder="Password"></div>
            <br>
            <button id = "saveButton" type="button" v-on:click="">Log in</button>
        </form>
    </div>

    <br>

    <div style="height:1px; background-color: lightgray;"></div>

    <br>

    <p id="forgotPW" style="color: blue; text-decoration: underline;">Forgot your password?</p>

</template>

<script>
export default {
    name: "LoginFields",

    // props: {
    //     topText: String
    // },    
}

</script>

<style scoped>
#errorMsg {
    color: red;
}

#formWrapper {
    display: block;
}

#form{
    display: block;
    text-align: left;
    padding: 5px;
    /* border: 1px solid red; */
}

.inputWrapper{
    /* display: block; */
    /* width: 45%; */
    text-align: left;
    padding: 10px 10px 10px 0;
    /* border: 1px solid blue; */
}

.textBox {
    padding: 10px;
    border: 1px solid gray;
    border-radius: 5px;
}

#saveButton {
    background-color: rgb(140, 195, 140);
    padding: 10px 15px 10px 15px;
    text-align: center;
    color: white;
    font-weight: bold;
    border-radius: 5px;
}
</style>