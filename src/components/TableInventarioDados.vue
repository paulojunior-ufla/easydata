<template>
  <div>
    <b-table hover :items="items" :fields="fields">
      <template #cell(editar)>
        <a href="cadastrarInventario/"><b-icon icon="pencil" variant="success"/></a>
      </template>
      <template #cell(opcoes)>
        <b-dropdown variant="outline" no-caret title="Opções">
          <template #button-content>
            <b-icon icon="three-dots-vertical" title="Opções" variant="success"/>
          </template>
          <b-dropdown-item @click="showConfirmacaoDelete">Excluir</b-dropdown-item>
        </b-dropdown>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'TableInventarioDados',
  props: {
    msg: String
  },
  data () {
    return {
      fields: [
        {
          key: 'nome_inventario',
          label: 'Inventário'
        },
        {
          key: 'editar',
          label: 'Editar'
        },
        {
          key: 'opcoes',
          label: 'Opções'
        }
      ],
      items: [
        { nome_inventario: 'Cadastramento de usuários externos no SIG', editar: 'Link', opcoes: 'Link' }
      ]
    }
  },
  methods: {
    showConfirmacaoDelete () {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluir?', {
        title: 'Atenção!',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'Sim',
        cancelTitle: 'Não',
        footerClass: 'p-2',
        // hideHeaderClose: false,
        centered: true
      })
        .then(value => {
        })
        .catch(err => {
          console.log('err', err)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
