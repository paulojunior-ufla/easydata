<template>
  <div class="home">
      <b-row class="text-center">
        <b-col></b-col>
        <b-col cols="10">
          <table-inventario-dados msg="Welcome to Your Vue.js App"/>
        </b-col>
      </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import TableInventarioDados from '@/components/TableInventarioDados.vue'

export default {
  name: 'HomeView',
  components: {
    TableInventarioDados
  }
}
</script>
