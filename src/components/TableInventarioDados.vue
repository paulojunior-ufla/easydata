<template>
  <div>
    <b-toast id="example-toast" title="BootstrapVue" static no-auto-hide></b-toast>
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
          <b-dropdown-item @click="duplicarInventario(data.index)"><b-icon style="height:15px" icon="clipboard-check" variant="primary"/> Duplicar</b-dropdown-item>
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
          label: 'Título',
          thStyle: { width: '60%' }
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
    chamarToast (variant = 'success') {
      this.$bvToast.toast(variant === 'success' ? 'Realizado com sucesso.' : 'Erro ao realizar ação.', {
        title: variant === 'success' ? 'Sucesso' : 'Erro',
        variant: variant,
        solid: true
      })
    },
    showConfirmacaoDelete (index) {
      const h = this.$createElement
      const inventario = this.inventarios[index]
      const msg = h('div', { domProps: { innerHTML: `Deseja realmente excluir o inventário <b>${inventario.titulo}</b>?` } })
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
        .then(confirmado => {
          if (confirmado) {
            try {
              this.$store.dispatch('inventarios/deleteInventario', inventario.id)
              this.chamarToast()
            } catch (error) {
              this.chamarToast('danger')
            }
          }
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    duplicarInventario (index) {
      const inventario = this.inventarios[index]
      try {
        this.$store.dispatch('inventarios/copyInventario', inventario.id)
        this.chamarToast()
      } catch (error) {
        this.chamarToast('danger')
      }
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
.dropdown .dropdown-item {
  padding: 0.25rem 0.5rem;
  display: block;
}
.dropdown .dropdown-menu {
  min-width: auto;
}
.dropdown li {
  display: block;
}
.row {
  margin-left: 0!important;
  margin-right: 0!important;
}
</style>
