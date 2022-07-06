<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary" fixed="top">
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
            <b-link @click="baixarJson()" v-if="this.inventario" class="nav-link"><b-icon style="height: 18px" icon="download"/> Baixar</b-link>
            <b-link @click="baixarPdf()" class="nav-link" v-if="this.inventario"><b-icon style="height: 18px" icon="file-pdf"/> Gerar PDF</b-link>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto" v-else>
            <b-link to="/cadastrarInventario" class="nav-link"><b-icon style="height: 18px" icon="plus-circle"/> Novo</b-link>
            <b-link to="/importarInventario" class="nav-link"><b-icon style="height: 18px" icon="cloud-download"/> Importar</b-link>
          </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <PdfInventario ref="inventPdf" v-if="this.inventario"></PdfInventario>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import download from 'downloadjs'
import PdfInventario from './PdfInventario.vue'
export default {
  name: 'NavbarGeral',
  props: {
    msg: String
  },
  computed: {
    ...mapGetters({ getInventarioByIndex: 'inventarios/getInventarioByIndex' }),
    ...mapState(['inventarios']),
    inventario () {
      return this.getInventarioByIndex(this.$route.params.id)
    }
  },
  methods: {
    baixarJson () {
      download(JSON.stringify(this.inventario), 'inventario_' + this.$route.params.id + '.json', 'text/plain')
    },
    baixarPdf () {
      this.$refs.inventPdf.generateReport()
    }
  },
  components: { PdfInventario }
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
