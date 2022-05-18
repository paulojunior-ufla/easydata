<template>
  <div>
    <b-navbar toggleable="lg" variant="light" class="p-1 py-2 ms-2">
      <b-nav vertical class="w-100 text-start">
        <sidebar-inventario-dados-link v-b-toggle.accordion-1 v-bind:completo="true" texto="Identificação"/>
        <sidebar-inventario-dados-link v-b-toggle.accordion-2 v-bind:completo="false" texto="Financeiro"/>
        <sidebar-inventario-dados-link v-b-toggle.accordion-3 v-bind:completo="true" texto="Pessoal"/>
        <sidebar-inventario-dados-link v-bind:completo="false" texto="Agentes"/>
        <sidebar-inventario-dados-link v-bind:completo="true" texto="Ciclo de vida"/>
        <sidebar-inventario-dados-link v-bind:completo="false" texto="Categorias"/>
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
    msg: String
  }
}
</script>
