<template>
  <div class="home">
      <b-row>
        <b-col>
          <sidebar-inventario-dados/>
        </b-col>
        <b-col cols="10">
          <form-inventario-dados v-bind:template="template"/>
        </b-col>
      </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import FormInventarioDados from '@/components/FormInventarioDados.vue'
import SidebarInventarioDados from '@/components/SidebarInventarioDados.vue'
import template from '@/assets/template.json'

export default {
  name: 'HomeView',
  data () {
    return {
      template
    }
  },
  components: {
    FormInventarioDados,
    SidebarInventarioDados
  }
}
</script>
