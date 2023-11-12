<template>
  <RouterView/>
</template>

<script>
console.log("in App")

export default {
  name: "App"
}

</script>

<style scoped>

#app-container {
    display: flex;
    height: 100vh;
}

.login-sidebar-container {
    display: block;
}

.main-page-elements {
    display: block;
    padding-left: 6em;
    padding-top: 6em;
}

</style>