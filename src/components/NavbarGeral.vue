<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand href="#">EasyD@ta <b-icon icon="github"/> <b-icon icon="question-circle"/></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ms-auto">
            <b-nav-item href="#">Novo</b-nav-item>
            <b-nav-item href="#">Importar</b-nav-item>
          </b-navbar-nav>

      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'NavbarGeral',
  props: {
    msg: String
  }
}
</script>
