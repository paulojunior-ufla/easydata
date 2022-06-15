<template>
  <div>
    <b-table hover :items="inventarios" :fields="fields">
      <template #cell(editar)="data">
        <b-link :to="'/editarInventario/' + data.item.id">
          <b-icon icon="pencil" variant="primary"/>
        </b-link>
      </template>
      <template #cell(opcoes)="data">
        <b-dropdown variant="outline" no-caret title="Opções" size="sm" class="dropdown-tabela">
          <template #button-content>
            <b-icon icon="three-dots-vertical" title="Opções" variant="primary"/>
          </template>
          <b-dropdown-item><b-icon style="height:15px" icon="clipboard-check" variant="primary"/> Duplicar</b-dropdown-item>
          <b-dropdown-item @click="showConfirmacaoDelete(data.index)"><b-icon style="height:15px" icon="trash" variant="danger"/> Excluir</b-dropdown-item>
        </b-dropdown>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TableInventarioDados',
  props: {
    msg: String
  },
  data () {
    return {
      fields: [
        {
          key: 'titulo',
          label: 'Título'
        },
        {
          key: 'editar',
          label: 'Editar'
        },
        {
          key: 'opcoes',
          label: 'Outras opções'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('inventarios', {
      inventarios: 'getTitulosInventarios'
    })
  },
  methods: {
    showConfirmacaoDelete (index) {
      const h = this.$createElement
      const msg = h('div', { domProps: { innerHTML: `Deseja realmente excluir o inventário <b>${this.items[index].nome_inventario}</b>?` } })
      this.$bvModal.msgBoxConfirm([msg], {
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
<style>
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
.nav-link {
  padding: 0;
}
.dropdown-tabela {
  display: block;
}
.dropdown-tabela .btn {
  border: 0;
}
</style>
