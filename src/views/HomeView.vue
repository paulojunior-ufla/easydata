<template>
  <div>
      <b-row class="justify-content-md-center">
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
