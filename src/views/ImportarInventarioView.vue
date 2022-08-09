<template>
  <div>
    <b-row class="justify-content-md-center">
      <div class="col-6">
        <h4 block class="mt-3 mb-3">Importar Inventário</h4>
        <form @submit.prevent="salvar">
          <b-form-file
            v-model="inventario"
            :state="Boolean(inventario)"
            placeholder="Selecione ou arraste um inventário de dados pessoais aqui..."
            drop-placeholder="Arraste o arquivo..."
            name="json_inventario"
            accept="application/json"
            browse-text="Selecione"
          ></b-form-file>
          <b-button type="submit" squared variant="primary" class="mt-2">Importar</b-button>
        </form>
      </div>
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'ImportarInventarioView',
  components: {
  },
  data () {
    return {
      inventario: null
    }
  },
  methods: {
    salvar () {
      try {
        this.readFile(this.inventario)
        this.inventario = null
        this.chamarToast('success')
      } catch (error) {
        this.chamarToast('danger')
      }
    },
    readFile (file) {
      let json = null
      const reader = new FileReader()
      reader.onload = e => {
        json = JSON.parse(e.target.result)
        this.salvarInventario(json)
      }
      reader.readAsText(file, 'ISO-8859-1')
    },
    chamarToast (variant = null) {
      let titulo = ''
      let mensagem = ''
      switch (variant) {
        case 'success':
          titulo = 'Sucesso'
          mensagem = 'Operação realizada com sucesso.'
          break
        default:
          titulo = 'Erro'
          mensagem = 'Houve um erro ao realizar a operação.'
          break
      }
      this.$bvToast.toast(mensagem, {
        title: titulo,
        variant: variant,
        solid: true,
        autoHideDelay: 1000
      })
    },
    salvarInventario (objInventario) {
      this.$store.dispatch('inventarios/addInventario', objInventario)
    }
  }
}
</script>
