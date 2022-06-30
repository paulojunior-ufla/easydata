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
            <b-link @click="baixarPdf()" v-if="this.inventario" class="nav-link"><b-icon style="height: 18px" icon="download"/> Baixar</b-link>
            <b-link @click="baixarPdf2()" class="nav-link"><b-icon style="height: 18px" icon="file-pdf"/> Gerar PDF</b-link>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto" v-else>
            <b-link to="/cadastrarInventario" class="nav-link"><b-icon style="height: 18px" icon="plus-circle"/> Novo</b-link>
            <b-nav-item href="#"><b-icon style="height: 18px" icon="cloud-download"/> Importar</b-nav-item>
          </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <PdfInventario ref="teste"></PdfInventario>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import download from 'downloadjs'
import PdfInventario from './PdfInventario.vue'
export default {
  name: 'NavbarGeral',
  props: {
    msg: String
  },
  data () {
    return {
      id: this.$route.params.id
    }
  },
  computed: {
    ...mapGetters({ getInventarioByIndex: 'inventarios/getInventarioByIndex' }),
    inventario () {
      return this.getInventarioByIndex(this.id)
    }
  },
  methods: {
    baixarPdf () {
      download(JSON.stringify(this.inventario), 'inventario_' + this.id + '.json', 'text/plain')
    },
    baixarPdf2 () {
      console.log('this.$refs.teste', this.$refs.teste.generateReport())
      // PdfInventario.generateReport()
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
