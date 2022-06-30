<template>
  <div>
    <VueHtml2pdf
      :show-layout="false"
      :float-layout="true"
      :enable-download="true"
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
      <secoes-inventario-pdf v-bind:template="template" slot="pdf-content"/>
    </VueHtml2pdf>
  </div>
</template>

<script>
import SecoesInventarioPdf from '@/components/SecoesInventarioPdf.vue'
import template from '@/assets/template.json'
import VueHtml2pdf from 'vue-html2pdf'

export default {
  name: 'PdfInventario',
  data () {
    return {
      template
    }
  },
  components: {
    SecoesInventarioPdf,
    VueHtml2pdf
  },
  methods: {
    generateReport () {
      this.$refs.html2Pdf.generatePdf()
    }
  }
}
</script>

<style>
.footer {
  max-width: 76rem;
  padding: .9rem 1rem;
  margin: 0 auto;
  font-family: sans-serif;
  font-size: 14px;
  line-height: 12px;
  text-align: center;
}

.footer a {
  color: initial;
  padding: 5px;
}
</style>
