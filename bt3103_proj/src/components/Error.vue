<template>
    <div id = "mega">
        <div id = "content">
            <img id="error_icon" src="@/assets/error-icon.png" alt="error_icon">
            <div id = "errorText"><b>Error: Please Log In</b></div>
        </div>
    </div>
</template>

<style scoped>
#mega {
    position: relative;
    left: 30em;
    bottom: 10em;
}

#errorText {
    position: relative;
    left:4rem;
    bottom: 1rem;
    font-size: 20px;
    font-family: Poppins, Arial, Helvetica, sans-serif;

}
</style>