<template>
  <div>
    <Slide
      :isOpen="value"
      @openMenu="handleOpenMenu"
      @closeMenu="handleCloseMenu"
      width="300"
      disableOutsideClick
      fixed
    >
      <b-navbar toggleable="lg" variant="light" class="p-1 py-2 ms-2">
        <b-nav vertical class="w-100 text-start">
          <b-nav-item class="toggleAll" @click="exibirTodos()" v-if="!isCollapsed">Expandir todos</b-nav-item>
          <b-nav-item class="toggleAll" @click="ocultarTodos()" v-else>Ocultar todos</b-nav-item>
          <sidebar-inventario-dados-link v-for="categoria in categorias" :key="categoria.id" v-b-toggle="'accordion-' + categoria.id" v-bind:completo="true" :texto="categoria.nome"/>
        </b-nav>
      </b-navbar>
    </Slide>
  </div>
</template>

<script>
import SidebarInventarioDadosLink from './SidebarInventarioDadosLink.vue'
import { Slide } from 'vue-burger-menu'
export default {
  components: {
    SidebarInventarioDadosLink,
    Slide
  },
  name: 'SidebarInventarioDados',
  props: {
    template: Object,
    value: Boolean
  },
  data () {
    return {
      categorias: this.template.categorias,
      isCollapsed: false
    }
  },
  methods: {
    handleOpenMenu () {
      this.$emit('input', true)
    },
    handleCloseMenu () {
      this.$emit('input', false)
    },
    exibirTodos () {
      const collapses = document.getElementsByClassName('collapse')
      for (const collapse of collapses) {
        collapse.classList.add('show')
        collapse.style.display = 'block'
        this.isCollapsed = true
      }
    },
    ocultarTodos () {
      const collapses = document.getElementsByClassName('collapse')
      for (const collapse of collapses) {
        collapse.classList.remove('show')
        collapse.style.display = 'none'
        this.isCollapsed = false
      }
    }
  }
}
</script>
<style>
.bm-burger-button {
  position: fixed;
  width: 36px;
  height: 30px;
  left: 15px;
  top: 76px;
  cursor: pointer;
}
.bm-burger-bars {
  background-color: #373a47;
}
.line-style {
  position: absolute;
  height: 20%;
  left: 0;
  right: 0;
}
.cross-style {
  position: absolute;
  top: 12px;
  right: 2px;
  cursor: pointer;
}
.bm-cross {
  background: #bdc3c7;
}
.bm-cross-button {
  transform: scale(1.5);
  margin-top: 5px;
  z-index: 9999;
}
.bm-menu {
  height: auto;
  width: auto; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  max-height: calc(100% - 60px);
  overflow: auto;
  z-index: 1000; /* Stay on top */
  top: 60px;
  left: 0;
  background-color: #f8f9fa;
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 0;
  transition: 0.5s; /*0.5 second transition effect to slide in the sidenav*/
}
.bm-menu .nav-link {
  text-overflow: unset;
  overflow: hidden;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  line-height: 1.8rem;
  padding: 5px;
}

.nav-item {
  margin: 0
}

.bm-overlay {
  background: initial;
}
.bm-item-list {
  color: #b8b7ad;
  margin-left: 0;
  margin-top: 10px;
  font-size: .8rem;
  padding: 10px;
}
.bm-item-list > * {
  display: flex;
  text-decoration: none;
  padding: 0.7em;
}
.bm-item-list > * > span {
  margin-left: 0;
  font-weight: 700;
  color: white;
}
.bm-item-list .navbar {
  width: 280px;
  background: red;
}
div[isopen="true"] .bm-burger-button {
  display: none;
}
.toggleAll{
  font-size: .7rem;
  color: #999;
  margin-top: -15px;
}
</style>
