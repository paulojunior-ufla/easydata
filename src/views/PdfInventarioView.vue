<template>
   <div>
     <VueHtml2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="false"
        :preview-modal="true"
        :paginate-elements-by-height="1400"
        filename="myPDF"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="landscape"
        pdf-content-width="100%"
        ref="html2Pdf"
    >
      <secoes-inventario-pdf v-bind:template="template" v-model="menuAberto" :class="menuAberto? 'formRestrito' : 'formExpandido'" slot="pdf-content"/>
    </VueHtml2pdf>
   </div>
</template>

<script>
// @ is an alias to /src
import SecoesInventarioPdf from '@/components/SecoesInventarioPdf.vue'
import template from '@/assets/template.json'
import VueHtml2pdf from 'vue-html2pdf'

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
    SecoesInventarioPdf,
    VueHtml2pdf
  },
  methods: {
    toggleMenu () {
      console.log('Toggle')
      this.menuAberto = !this.menuAberto
    },
    generateReport () {
      this.$refs.html2Pdf.generatePdf()
    }
  },
  mounted () {
    this.generateReport()
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
