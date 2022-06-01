<template>
  <div>
    <b-navbar toggleable="lg" variant="light" class="p-1 py-2 ms-2">
      <b-nav vertical class="w-100 text-start">
        <sidebar-inventario-dados-link v-for="categoria in categorias" :key="categoria.id" v-b-toggle="'accordion-' + categoria.id" v-bind:completo="true" :texto="categoria.nome"/>
      </b-nav>
    </b-navbar>
  </div>
</template>

<script>
import SidebarInventarioDadosLink from './SidebarInventarioDadosLink.vue'
export default {
  components: { SidebarInventarioDadosLink },
  name: 'SidebarInventarioDados',
  props: {
    template: Object
  },
  data () {
    return {
      categorias: this.template.categorias
    }
  }
}
</script>
