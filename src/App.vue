<template>
  <div id="app">
    <div id="container">
      <navbar-geral/>
      <div style="margin-top: 60px;">
        <router-view/>
      </div>
    </div>
    <footer-geral/>
  </div>
</template>

<script>
import FooterGeral from './components/FooterGeral.vue'
import NavbarGeral from './components/NavbarGeral.vue'

export default {
  name: 'app',
  components: {
    NavbarGeral,
    FooterGeral
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
