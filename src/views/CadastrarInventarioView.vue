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
  beforeRouteLeave (to, from, next) {
    if (to.hash === '#salvo') {
      next()
    } else {
      const answer = window.confirm('Você realmente deseja sair? Todas as alterações serão perdidas!')
      if (answer) {
        next()
      } else {
        next(false)
      }
    }
  },
  components: {
    FormInventarioDados,
    SidebarInventarioDados
  },
  methods: {
    toggleMenu () {
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
  width: calc(100% - 80px);
}
.formRestrito {
  margin-left: 310px;
  width: calc(100% - 320px);
}
</style>
