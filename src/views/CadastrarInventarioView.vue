<template>
  <div class="home">
      <b-row>
        <b-col>
          <sidebar-inventario-dados/>
        </b-col>
        <b-col cols="10">
          <form-inventario-dados/>
        </b-col>
      </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import FormInventarioDados from '@/components/FormInventarioDados.vue'
import SidebarInventarioDados from '@/components/SidebarInventarioDados.vue'

export default {
  name: 'HomeView',
  components: {
    FormInventarioDados,
    SidebarInventarioDados
  }
}
</script>
