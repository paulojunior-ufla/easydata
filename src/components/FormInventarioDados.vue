<template>
  <div>
    <div class="accordion text-start" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <h5 block v-b-toggle.accordion-0 class="m-2"><b-icon style="height: 16px" icon="check-lg"/>Título</h5>
        </b-card-header>
        <b-collapse id="accordion-0" visible accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-input name="titulo" placeholder="Ex: Cadastramento de usuários externos no SIG"/>
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
      <b-button variant="primary" class="mt-2 rounded-0">Salvar</b-button>
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
</style>
