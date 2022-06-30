<template>
  <div>
    <b-nav-item active :title="texto">
      <b-icon style="height: 16px" :icon=" completo ? 'check-lg' : 'x-lg' "/> {{texto}}
    </b-nav-item>
  </div>
</template>

<script>
export default {
  name: 'SidebarInventarioDadosLink',
  props: {
    completo: Boolean,
    texto: String
  }
}
</script>
