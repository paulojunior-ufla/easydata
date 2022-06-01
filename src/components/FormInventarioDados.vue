<template>
  <div>
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
                  <b-th v-for="coluna in categoria.colunas" :key="coluna.id">{{coluna.nome}}</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr v-for="linha in categoria.linhas" :key="linha.id">
                  <b-td>{{linha.nome}} <b-icon role="button" icon="question-circle" v-b-modal.modal-1/></b-td>
                  <b-td v-for="coluna in categoria.colunas" :key="coluna.id">
                    <b-form-input/>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
            <b-table-simple v-for="secao in categoria.secoes" :key="secao.id">
              <b-thead>
                <b-tr class="text-center" v-if="!secao.esconderColunas">
                  <b-th>{{secao.nome}}</b-th>
                  <b-th v-for="coluna in secao.colunas" :key="coluna.id">{{coluna.nome}}</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr v-for="linha in secao.linhas" :key="linha.id">
                  <b-td>{{linha.nome}} <b-icon role="button" icon="question-circle" v-b-modal.modal-1/></b-td>
                  <b-td v-for="coluna in secao.colunas" :key="coluna.id">
                    <b-form-input/>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <h5 block v-b-toggle.accordion-1 class="m-2"><b-icon style="height: 16px" icon="check-lg"/>  Dados de Identificação Pessoal</h5>
        </b-card-header>
        <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
          <b-card-body>

            <b-table-simple>
              <b-thead>
                <b-tr class="text-center">
                  <b-th></b-th>
                  <b-th>Descrição</b-th>
                  <b-th>Retenção</b-th>
                  <b-th>Fonte</b-th>
                  <b-th>Base de dados</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
              <b-tr >
                <b-td>Dados pessoais <b-icon role="button" icon="question-circle" v-b-modal.modal-1/></b-td>
                <b-td><b-form-input/></b-td>
                <b-td><b-form-input/></b-td>
                <b-td><b-form-select :options='["Fonte 1", "Fonte 2", "Fonte 3"]' plain value="Fonte 2"/></b-td>
                <b-td><b-form-select :options='["Base de dados 1", "Base de dados 2", "Base de dados 3"]' plain value="Base de dados 3"/></b-td>
              </b-tr>
              <b-tr>
                <b-td>Detalhes militares</b-td>
                <b-td><b-form-input/></b-td>
                <b-td><b-form-input/></b-td>
                <b-td><b-form-select :options='["Fonte 1", "Fonte 2", "Fonte 3"]' plain value="Fonte 2"/></b-td>
                <b-td><b-form-select :options='["Base de dados 1", "Base de dados 2", "Base de dados 3"]' plain value="Base de dados 3"/></b-td>
              </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <h5 block v-b-toggle.accordion-2 class="m-2"><b-icon style="height: 16px" icon="x-lg"/> Dados Financeiros</h5>
        </b-card-header>
        <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
          <b-card-body>

            <b-table-simple>
              <b-thead>
                <b-tr class="text-center">
                  <b-th></b-th>
                  <b-th>Descrição</b-th>
                  <b-th>Retenção</b-th>
                  <b-th>Fonte</b-th>
                  <b-th>Base de dados</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
              <b-tr>
                <b-td>Dados pessoais</b-td>
                <b-td><b-form-input/></b-td>
                <b-td><b-form-input/></b-td>
                <b-td><b-form-select :options='["Fonte 1", "Fonte 2", "Fonte 3"]' plain value="Fonte 2"/></b-td>
                <b-td><b-form-select :options='["Base de dados 1", "Base de dados 2", "Base de dados 3"]' plain value="Base de dados 3"/></b-td>
              </b-tr>
              <b-tr>
                <b-td>Detalhes militares</b-td>
                <b-td><b-form-input/></b-td>
                <b-td><b-form-input/></b-td>
                <b-td><b-form-select :options='["Fonte 1", "Fonte 2", "Fonte 3"]' plain value="Fonte 2"/></b-td>
                <b-td><b-form-select :options='["Base de dados 1", "Base de dados 2", "Base de dados 3"]' plain value="Base de dados 3"/></b-td>
              </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <h5 block v-b-toggle.accordion-3 class="m-2"><b-icon style="height: 16px" icon="check-lg"/> Características Pessoais</h5>
        </b-card-header>
        <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
          <b-card-body>

            <b-table-simple>
              <b-thead>
                <b-tr class="text-center">
                  <b-th></b-th>
                  <b-th>Descrição</b-th>
                  <b-th>Retenção</b-th>
                  <b-th>Fonte</b-th>
                  <b-th>Base de dados</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
              <b-tr>
                <b-td>Dados pessoais</b-td>
                <b-td><b-form-input/></b-td>
                <b-td><b-form-input/></b-td>
                <b-td><b-form-select :options='["Fonte 1", "Fonte 2", "Fonte 3"]' plain value="Fonte 2"/></b-td>
                <b-td><b-form-select :options='["Base de dados 1", "Base de dados 2", "Base de dados 3"]' plain value="Base de dados 3"/></b-td>
              </b-tr>
              <b-tr>
                <b-td>Detalhes militares</b-td>
                <b-td><b-form-input/></b-td>
                <b-td><b-form-input/></b-td>
                <b-td><b-form-select :options='["Fonte 1", "Fonte 2", "Fonte 3"]' plain value="Fonte 2"/></b-td>
                <b-td><b-form-select :options='["Base de dados 1", "Base de dados 2", "Base de dados 3"]' plain value="Base de dados 3"/></b-td>
              </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
    <div class="d-flex">
      <b-button variant="primary" class="mt-2 rounded-0" v-on:click="salvar">Salvar</b-button>
    </div>
    <b-modal id="modal-1" ok-only title="Dados pessoais">
      <p class="my-4">Texto sobre como preencher os dados</p>
    </b-modal>
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
    salvar: function () {
      this.$store.dispatch('inventarios/addInventario', { titulo: this.titulo })
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
