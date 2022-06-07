<template>
  <div class="home">
    <sidebar-inventario-dados v-bind:template="template" v-model="menuAberto"/>
    <form-inventario-dados v-bind:template="template" v-model="menuAberto" :class="menuAberto? 'formRestrito' : 'formExpandido'"/>
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
      template,
      menuAberto: true
    }
  },
  components: {
    FormInventarioDados,
    SidebarInventarioDados
  },
  methods: {
    toggleMenu () {
      console.log('Toggle')
      this.menuAberto = !this.menuAberto
    }
  }
}
</script>
<style>
.home {
  display: flex;
}
.formExpandido {
  margin-left: 70px;
  width: 100%;
}
.formRestrito {
  width: 100%;
}
</style>
