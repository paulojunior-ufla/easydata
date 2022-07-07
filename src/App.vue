<template>
  <div id="app">
    <div id="container">
      <navbar-geral/>
      <div style="margin-top: 60px;">
        <b-toast id="example-toast" title="BootstrapVue" static no-auto-hide></b-toast>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarGeral from './components/NavbarGeral.vue'

export default {
  name: 'app',
  components: {
    NavbarGeral
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#container {
  min-height: calc(100vh - 150px);
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
