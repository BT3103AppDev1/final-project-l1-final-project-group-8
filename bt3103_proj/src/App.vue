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
.routerElement:hover {
  text-decoration: underline;
}

.routerElement {
  color: gray;
  font-weight: bold;
}

#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}

#nav{
  padding : 30px
}

#nav a {
  font-weight : bold;
  color: black;
}

#nav a.router-link-exact-active{
  color: #42b983
}
</style>