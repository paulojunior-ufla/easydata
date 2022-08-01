
<template>
    <b-form-textarea v-bind="$props" v-mask="vMask" v-model="valor" :minlength="minLength" required v-if="tipo == 'textarea'"/>
    <b-form-input v-bind="$props" v-mask="vMask" v-model="valor" :minlength="minLength" required v-else/>
</template>

<script>
import Vue from 'vue'
import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective)

export default {
  props: ['value', 'tipo'],
  data () {
    return {
      maskTelefone: '(##) ####-####',
      maskCep: '#####-###',
      valor: this.$props.value
    }
  },
  computed: {
    vMask () {
      let vMask = 0
      switch (this.tipo) {
        case 'telefone':
          vMask = this.maskTelefone
          break
        case 'cep':
          vMask = this.maskCep
          break
      }
      return vMask
    },
    minLength () {
      let minLength = 0
      switch (this.tipo) {
        case 'telefone':
          minLength = 14
          break
        case 'cep':
          minLength = 9
          break
      }
      return minLength
    }
  }
}

</script>
