<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <span class="icon" role="button" v-if="this.$route.path != '/'" @click="$router.go(-1)">
        <b-icon icon="arrow-left-short"/>
      </span>
      <b-navbar-brand to="/" style="flex-direction: row; display: flex;">
        EasyD@ta
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto" v-if="this.$route.name == 'cadastrarInventario' || this.$route.name == 'editarInventario'">

            <button class="nav-link" form="cadastrar_inventario" type="submit"><b-icon style="height: 18px" icon="save"/> Salvar</button>
            <b-link to="/cadastrarInventario" class="nav-link"><b-icon style="height: 18px" icon="download"/> Baixar</b-link>
            <b-nav-item href="#"><b-icon style="height: 18px" icon="file-pdf"/> Gerar PDF</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto" v-else>
            <b-link to="/cadastrarInventario" class="nav-link"><b-icon style="height: 18px" icon="plus-circle"/> Novo</b-link>
            <b-nav-item href="#"><b-icon style="height: 18px" icon="cloud-download"/> Importar</b-nav-item>
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

<style>
span.icon {
  color: #FFF;
  margin-right: 5px;
  display: flex;
  font-size: 29px;
}
.navbar-dark .navbar-nav .nav-link {
  color: #FFF!important;
}

button.nav-link {
  background: #FFFFFF30;
  margin-right: 10px;
  border: 0;
  font-weight: 700;
}
</style>
