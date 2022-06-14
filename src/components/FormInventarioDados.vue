<template>
  <div>
    <form @submit.prevent="salvar" id="cadastrar_inventario">
      <div class="accordion text-start" role="tablist">
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <h5 block class="m-2"><b-icon style="height: 16px" icon="check-lg"/>Título</h5>
          </b-card-header>
            <b-card-body class="titulo">
              <b-input name="titulo" v-model="titulo" placeholder="Ex: Cadastramento de usuários externos no SIG"/>
            </b-card-body>
        </b-card>

        <b-card no-body class="mb-1" v-for="categoria in categorias" :key="categoria.id">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <h5 block v-b-toggle="'accordion-' + categoria.id" class="m-2"><b-icon style="height: 16px" icon="check-lg"/> {{categoria.nome}}</h5>
          </b-card-header>
          <b-collapse :id="'accordion-' + categoria.id" visible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-table-simple>
                <b-thead>
                  <b-tr class="text-center" v-if="!categoria.esconderColunas">
                    <b-th v-if="categoria.linhas"></b-th>
                    <b-th v-for="coluna in categoria.colunas" :key="coluna.id" width="270">{{coluna.nome}}</b-th>
                  </b-tr>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="linha in categoria.linhas" :key="linha.id">
                    <b-td>{{linha.nome}} <b-icon role="button" icon="question-circle" v-b-modal.modal-1/></b-td>
                    <b-td v-for="(coluna, index) in categoria.colunas" :key="coluna.id">
                      <b-form-input v-if="mostrarInput(coluna, linha)" :class="getClasses(categoria, index)" :value="getValor(categoria, linha, coluna, index)"
                        :data-caminho="[categoria.nome_impressao, linha.nome_impressao, coluna.nome_impressao]"/>
                      <b-form-select v-else :class="getClasses(categoria, index)" :options="getOpcoes(coluna, linha)"/>
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
              <b-table-simple>
                <template v-for="secao in categoria.secoes">
                  <b-thead :key="'header-' + secao.id">
                    <b-tr class="text-center" v-if="!secao.esconderColunas">
                      <b-th>{{secao.nome}}</b-th>
                      <b-th v-for="coluna in secao.colunas" :key="coluna.id" width="270">{{coluna.nome}}</b-th>
                    </b-tr>
                  </b-thead>
                  <b-tbody :key="secao.id">
                    <b-tr v-for="linha in secao.linhas" :key="linha.id">
                      <b-td>{{linha.nome}} <b-icon role="button" icon="question-circle" v-b-modal.modal-1/></b-td>
                      <b-td v-for="(coluna, index) in secao.colunas" :key="coluna.id">
                        <b-form-input v-if="mostrarInput(coluna, linha)" :class="getClasses(categoria, index)"/>
                        <b-form-select v-else :class="getClasses(categoria, index)" :options="getOpcoes(coluna, linha)"/>
                      </b-td>
                    </b-tr>
                  </b-tbody>
                  </template>
              </b-table-simple>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
      <div class="d-flex">
        </div>
      <b-modal id="modal-1" ok-only title="Dados pessoais">
        <p class="my-4">Texto sobre como preencher os dados</p>
      </b-modal>
    </form>
    <b-button variant="primary" class="mt-2 rounded-0" form="cadastrar_inventario" type="submit">Salvar</b-button>
  </div>
</template>

<script>
export default {
  name: 'FormInventarioDados',
  props: {
    msg: String,
    template: Object
  },
  data () {
    return {
      dados: {
        identificacao: {
          nome_servico: { valor: 1 },
          n_referencia: { valor: 2 },
          data_criacao: { valor: 3 },
          data_atualizacao: { valor: 4 }
        },
        agentes: {
          controlador: { nome: 'Teste n1' },
          operador: { nome: 'Teste n2' }
        },
        dados_pessoais: {
          identificacao_pessoal: {
            info_pessoal: { descricao: 'teste', tempo_retencao: 192 }
          }
        }
      },
      dadosTemplate: this.template,
      categorias: this.template.categorias,
      titulo: '',
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
    salvar: function (event) {
      const inventario = {}
      const elementos = event.target.elements
      for (let i = 0; i < elementos.length; i++) {
        const elemento = elementos[i]
        this.salvarElemento(elemento, inventario)
      }
      console.log('inventario', inventario)
      // console.log('event', event.target.elements)
      // const inventarios = []

      // this.$store.dispatch('inventarios/addInventario', { titulo: this.titulo })
    },
    salvarElemento: function (elemento, inventario) {
      let caminhos = []
      let inventarioPosAtual = {}
      if (typeof elemento.dataset.caminho !== 'undefined') {
        inventarioPosAtual = inventario
        caminhos = elemento.dataset.caminho.split(',')
        caminhos.forEach((caminho, index) => {
          if (inventarioPosAtual[caminho] === undefined) {
            inventarioPosAtual[caminho] = {}
          }
          if (index === caminhos.length - 1) {
            inventarioPosAtual[caminho] = elemento.value
          }
          inventarioPosAtual = inventarioPosAtual[caminho]
        })
      }
    },
    mostrarInput: function (coluna, linha) {
      return (typeof coluna.campoOpcoes === 'undefined' && typeof linha.campoOpcoes === 'undefined') || coluna.ignorarOpcoes
    },
    getClasses: function (categoria, index) {
      return categoria.classes && typeof categoria.classes[index] !== 'undefined' ? categoria.classes[index] : ''
    },
    getOpcoes: function (coluna, linha) {
      return typeof coluna.campoOpcoes !== 'undefined' ? this.dadosTemplate[coluna.campoOpcoes] : this.dadosTemplate[linha.campoOpcoes]
    },
    getValor: function (categoria, linha, coluna, index) {
      if (categoria.nome_impressao === undefined || coluna.nome_impressao === undefined || linha.nome_impressao === undefined ||
        this.dados[categoria.nome_impressao] === undefined || typeof this.dados[categoria.nome_impressao][linha.nome_impressao] === 'undefined' ||
        typeof this.dados[categoria.nome_impressao][linha.nome_impressao] === 'undefined') { return null }
      // console.log('this.dados[categoria.nome_impressao]', this.dados[categoria.nome_impressao],
      //   this.dados[categoria.nome_impressao][linha.nome_impressao],
      //   this.dados[categoria.nome_impressao][linha.nome_impressao][coluna.nome_impressao],
      //   categoria.nome_impressao, linha.nome_impressao, coluna.nome_impressao, index)
      return this.dados[categoria.nome_impressao][linha.nome_impressao][coluna.nome_impressao]
      // console.log('categoria', categoria)
      // console.log('linha', linha)
      // console.log('coluna', coluna)
      // console.log('index', index)
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
.accordion .card {
  border-radius: 0;
  margin-bottom: 0!important;
}
.card-body {
  padding: 0;
  padding-bottom: 1rem ;
}
.table {
  margin: 0;
}
.table td {
  padding-left: 1.2rem;
  padding-right: 1.2rem;
}
.card-body.titulo {
  padding: 1.2rem;
}
</style>
