<template>
   <div>
     <VueHtml2pdf
        :show-layout="false"
        :float-layout="false"
        :enable-download="true"
        :preview-modal="false"
        :paginate-elements-by-height="1400"
        filename="myPDF"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="landscape"
        pdf-content-width="100%"
        ref="html2Pdf"
    >
      <secoes-inventario-pdf v-bind:template="template" slot="pdf-content"/>
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
</style>
