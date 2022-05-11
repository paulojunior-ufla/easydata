<template>
  <div>
    <b-table striped hover :items="items">
      <template #cell(editar)="data">
        <a v-bind:href="data.value"><b-icon icon="pencil"/></a>
      </template>
      <template #cell(excluir)="data">
        <a v-bind:href="data.value"><b-icon icon="trash"/></a>
      </template>
      <template #cell(op\ç\ões)="data">
        <a v-bind:href="data.value"><b-icon icon="menu-up"/></a>
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
      items: [
        { nome_inventário: 'Cadastramento de usuários externos no SIG', editar: 'Link', excluir: 'Link', opções: 'Link' }
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
a {
  color: #42b983;
}
</style>
