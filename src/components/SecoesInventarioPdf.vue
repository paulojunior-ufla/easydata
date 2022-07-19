<template>
  <div id="visualizacaoPdf">
    <div>
      <h5 block class="titulo">Título</h5>
      <p data-caminho="titulo" class="valorTitulo">{{inventario.titulo}}</p>
    </div>
    <section v-for="categoria in categorias" :key="categoria.id">
      <h5 block class="m-2">{{categoria.nome}}</h5>
      <b-table-simple>
        <b-thead>
          <b-tr class="text-center" v-if="!categoria.esconderColunas">
            <b-th v-if="categoria.linhas" style="text-align:left">
              <b-icon role="button" class="text-primary" alt="Adicionar linha" icon="plus-lg" v-if="categoria.linha_adicional" @click="adicionarLinha(categoria)"></b-icon>
            </b-th>
            <b-th v-for="coluna in categoria.colunas" :key="coluna.id" width="270">{{coluna.nome}}</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="linha in categoria.linhas" :key="linha.id">
            <b-td>{{linha.nome}}</b-td>
            <b-td v-for="(coluna, index) in categoria.colunas" :key="coluna.id">
              <b-form-input :class="getClasses(categoria, index)" :value="getValor(categoria, linha, coluna, index)"
                :data-caminho="getCaminho(categoria, linha, coluna)"/>
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
      <b-table-simple>
        <template v-for="secao in categoria.secoes">
          <b-thead :key="'header-' + secao.id">
            <b-tr class="text-center" v-if="!secao.esconderColunas">
              <b-th>{{secao.nome}}</b-th>
              <b-th v-for="coluna in secao.colunas" :key="coluna.id" width="270">{{coluna.nome}}</b-th>
            </b-tr>
          </b-thead>
          <b-tbody :key="secao.id">
            <b-tr v-for="linha in secao.linhas" :key="linha.id">
              <b-td>{{linha.nome}}</b-td>
              <b-td v-for="(coluna, index) in secao.colunas" :key="coluna.id">
                <b-form-input :class="getClasses(categoria, index)" :value="getValor(categoria, linha, coluna, index)"
                  :data-caminho="getCaminho(categoria, linha, coluna)"/>
              </b-td>
            </b-tr>
          </b-tbody>
          </template>
      </b-table-simple>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getCategoriaByNomeImpressao } from '../util/template'
export default {
  name: 'SecoesInventarioPdf',
  props: {
    msg: String,
    template: Object
  },
  data () {
    return {
      id: this.$route.params.id,
      dadosTemplate: this.template,
      categorias: this.template.categorias,
      titulo: 'teste',
      tituloModal: '',
      textoModal: '',
      arrayCategoriasLinhasAdicionais: ['categoria_titulares_dados', 'compartilhamento_dados_pessoais', 'medidas_seguranca_privacidade', 'transferencia_internacional_dados_pessoais', 'contratos_servicos_tratam_dados_processo']
    }
  },
  computed: {
    ...mapGetters({ getInventarioByIndex: 'inventarios/getInventarioByIndex' }),
    inventario () {
      return this.getInventarioByIndex(this.id)
    }
  },
  watch: {
    inventario: {
      handler () {
        if (typeof this.inventario === 'undefined') { this.$router.push('/') }
        this.categorias = JSON.parse(JSON.stringify(this.dadosTemplate.categorias))
        let linhasAdicionais = []
        let categoriaAtual = null
        if (this.inventario) {
          this.arrayCategoriasLinhasAdicionais.forEach((nomeCategoria) => {
            linhasAdicionais = this.inventario[nomeCategoria].linhas_adicionais
            if (linhasAdicionais) {
              categoriaAtual = getCategoriaByNomeImpressao(this.categorias, nomeCategoria)
              Object.entries(linhasAdicionais).forEach((linha) => {
                this.adicionarLinha(categoriaAtual)
              })
            }
          })
        }
      },
      immediate: true
    }
  },
  methods: {
    chamarModal (titulo, texto) {
      this.$bvModal.show('modal-1')
      this.tituloModal = titulo
      this.textoModal = texto
    },
    chamarToast (variant = null) {
      this.$bvToast.toast('Salvo com sucesso', {
        title: 'Sucesso',
        variant: variant,
        solid: true,
        autoHideDelay: 1000
      })
    },
    salvar: function (event) {
      const inventario = {}
      const elementos = event.target.elements
      for (let i = 0; i < elementos.length; i++) {
        const elemento = elementos[i]
        this.salvarElemento(elemento, inventario)
      }
      this.prepararInventarioSave(inventario)
      if (typeof this.id !== 'undefined') {
        this.$store.dispatch('inventarios/updateInventario', { inventario, index: this.id })
      } else {
        this.$store.dispatch('inventarios/addInventario', inventario)
      }
      this.chamarToast('sucesso')
      setTimeout(() => this.$router.push('/#salvo'), 500)
    },
    prepararInventarioSave (inventario) {
      let templateCategoriaTitularesDados = null
      let linhasAdicionais = null
      let indiceAdicional = null
      let templateLinhaAdicional = null
      this.arrayCategoriasLinhasAdicionais.forEach((nomeCategoria) => {
        if (inventario[nomeCategoria].linhas_adicionais) {
          templateCategoriaTitularesDados = getCategoriaByNomeImpressao(this.categorias, nomeCategoria)
          indiceAdicional = templateCategoriaTitularesDados.primeiro_indice_adicionavel
          linhasAdicionais = {}
          templateLinhaAdicional = templateCategoriaTitularesDados.linha_adicional
          Object.entries(inventario[nomeCategoria].linhas_adicionais).forEach((linhaAdicional) => {
            const nomeImpressao = templateLinhaAdicional.nome_impressao.replaceAll('%indiceAdicionavel%', indiceAdicional++)
            linhasAdicionais[nomeImpressao] = linhaAdicional[1]
          })
          inventario[nomeCategoria].linhas_adicionais = linhasAdicionais
        }
      })
    },
    salvarElemento: function (elemento, inventarioSalvar) {
      let caminhos = []
      let inventarioPosAtual = {}
      if (typeof elemento.dataset.caminho !== 'undefined') {
        inventarioPosAtual = inventarioSalvar
        caminhos = elemento.dataset.caminho.split(',')
        caminhos.forEach((caminho, index) => {
          if (inventarioPosAtual[caminho] === undefined) {
            inventarioPosAtual[caminho] = {}
          }
          if (index === caminhos.length - 1) {
            inventarioPosAtual[caminho] = elemento.value
          }
          inventarioPosAtual = inventarioPosAtual[caminho]
        })
      }
    },
    mostrarInput: function (coluna, linha) {
      return (typeof coluna.campoOpcoes === 'undefined' && typeof linha.campoOpcoes === 'undefined') || coluna.ignorarOpcoes
    },
    getClasses: function (categoria, index) {
      return categoria.classes && typeof categoria.classes[index] !== 'undefined' ? categoria.classes[index] : ''
    },
    getOpcoes: function (coluna, linha) {
      return typeof coluna.campoOpcoes !== 'undefined' ? this.dadosTemplate[coluna.campoOpcoes] : this.dadosTemplate[linha.campoOpcoes]
    },
    getValor: function (categoria, linha, coluna, index) {
      try {
        if (linha.isAdicional) {
          return this.inventario[categoria.nome_impressao].linhas_adicionais[linha.nome_impressao][coluna.nome_impressao]
        } else {
          return this.inventario[categoria.nome_impressao][linha.nome_impressao][coluna.nome_impressao]
        }
      } catch (error) {
        return null
      }
    },
    getCaminho: function (categoria, linha, coluna) {
      if (linha.isAdicional) { return [categoria.nome_impressao, 'linhas_adicionais', linha.nome_impressao, coluna.nome_impressao] } else { return [categoria.nome_impressao, linha.nome_impressao, coluna.nome_impressao] }
    },
    adicionarLinha: function (categoria) {
      const novaLinha = JSON.parse(JSON.stringify(categoria.linha_adicional))
      categoria.indice_geral = parseInt(categoria.indice_geral) + 1
      categoria.indice_adicionavel = parseInt(categoria.indice_adicionavel) + 1
      const indiceGeral = categoria.indice_geral
      const indiceAdicionavel = categoria.indice_adicionavel
      novaLinha.nome = novaLinha.nome.replaceAll('%indiceGeral%', indiceGeral).replaceAll('%indiceAdicionavel%', indiceAdicionavel)
      novaLinha.nome_impressao = novaLinha.nome_impressao.replaceAll('%indiceAdicionavel%', indiceAdicionavel)
      novaLinha.id = categoria.indice_geral
      categoria.linhas.push(novaLinha)
    },
    removerLinha: function (categoria, linha) {
      categoria.linhas = categoria.linhas.filter((linhaFiltrada) => linhaFiltrada.id !== linha.id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.accordion .card {
  border-radius: 0;
  margin-bottom: 0!important;
}
.card-body {
  padding: 0;
  padding-bottom: 1rem ;
}
.table {
  margin: 0;
}
h5 {
  break-inside: avoid;
  padding-top: 10px;
  padding-bottom: 10px;
}
.table tr, .table td {
  break-inside: avoid;
}
.table td {
  padding-left: 1.2rem;
  padding-right: 1.2rem;
  border-right: 1px solid #eee;
}
.table td:last-child {
  border-right: 0;
}
.table tr:last-child {
  border-bottom: 1px solid #eee;
}
.table {
  margin-bottom: 10px;
}
.card-body.titulo {
  padding: 1.2rem;
}
h5.titulo {
  border-bottom: 1px solid #dee2e6;
  padding: 8px;
}
.valorTitulo {
  padding: 0 1.2rem;
}
#visualizacaoPdf {
  width: 100%;
  margin: auto;
  padding: 1rem;
}
</style>
