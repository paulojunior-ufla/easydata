<template>
  <div>
    <form @submit="salvar" id="cadastrar_inventario">
      <div class="accordion text-start" role="tablist">
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <h5 block class="m-2"><b-icon style="height: 16px" icon="check-lg"/> Título</h5>
          </b-card-header>
            <b-card-body class="titulo">
              <b-input name="titulo" data-caminho="titulo" :value="inventario ? inventario.titulo : ''" placeholder="Ex: Cadastramento de usuários externos no SIG" ref="titulo"/>
            </b-card-body>
        </b-card>

        <b-card no-body class="mb-1" v-for="categoria in categorias" :key="categoria.id">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <h5 block v-b-toggle="'accordion-' + categoria.id" class="m-2"><b-icon style="height: 16px" icon="check-lg"/> {{categoria.nome}}</h5>
          </b-card-header>
          <b-collapse :id="'accordion-' + categoria.id" visible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-table-simple>
                <b-thead>
                  <b-tr class="text-center" v-if="!categoria.esconderColunas">
                    <b-th v-if="categoria.linhas" style="text-align:left">
                      <b-icon role="button" class="text-primary" alt="Adicionar linha" icon="plus-lg" v-if="categoria.linha_adicional" @click="adicionarLinha(categoria)"></b-icon>
                    </b-th>
                    <b-th v-for="coluna in categoria.colunas" :key="coluna.id">{{coluna.nome}}</b-th>
                  </b-tr>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="linha in categoria.linhas" :key="linha.id">
                    <b-td>
                      {{linha.nome}} <b-icon role="button" alt="Ajuda" icon="question-circle" v-if="linha.ajuda" @click="chamarModal(linha.nome, linha.ajuda)"/>
                      <b-icon role="button" class="text-danger" alt="Remover linha" icon="trash" v-if="linha.isAdicional" @click="removerLinha(categoria, linha)"/>
                    </b-td>
                    <b-td v-for="(coluna, index) in categoria.colunas" :key="coluna.id" :width="categoria.colunas && categoria.colunas.length > 1 ? 270 : '50%'">
                      <input-mask :tipo="getClasses(categoria, linha, index)" :class="getClasses(categoria, linha, index)" :value="getValor(categoria, linha, coluna, index)"
                        :data-caminho="getCaminho(categoria, linha, coluna)" :required="obrigatoriedadeCampos && !linha.isAdicional" :type="getTipo(getClasses(categoria, linha, index))" :options="getOpcoes(coluna, linha)"/>
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
              <b-table-simple>
                <template v-for="secao in categoria.secoes">
                  <b-thead :key="'header-' + secao.id">
                    <b-tr class="text-center" v-if="!secao.esconderColunas">
                      <b-th>{{secao.nome}}</b-th>
                      <b-th v-for="coluna in secao.colunas" :key="coluna.id">{{coluna.nome}}</b-th>
                    </b-tr>
                  </b-thead>
                  <b-tbody :key="secao.id">
                    <b-tr v-for="linha in secao.linhas" :key="linha.id">
                      <b-td>{{linha.nome}} <b-icon role="button" icon="question-circle"  v-if="linha.ajuda" @click="chamarModal(linha.nome, linha.ajuda)"/></b-td>
                      <b-td v-for="(coluna, index) in secao.colunas" :key="coluna.id" :width="secao.colunas && secao.colunas.length > 1 ? 270 : '50%'">
                        <input-mask :tipo="getClasses(categoria, linha, index)" :class="getClasses(categoria, linha, index)" :value="getValor(categoria, linha, coluna, index)"
                        :data-caminho="getCaminho(categoria, linha, coluna)" :required="obrigatoriedadeCampos && !linha.isAdicional" :type="getTipo(getClasses(categoria, linha, index))" :options="getOpcoes(coluna, linha)"/>
                      </b-td>
                    </b-tr>
                  </b-tbody>
                  </template>
              </b-table-simple>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
      <div class="d-flex">
        </div>
      <b-modal id="modal-1" ok-only v-bind:title="tituloModal">
        <p class="my-4" v-html="textoModal"></p>
      </b-modal>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getCategoriaByNomeImpressao } from '../util/template'
import InputMask from './InputMask.vue'

export default {
  name: 'FormInventarioDados',
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
      arrayCategoriasLinhasAdicionais: ['categoria_titulares_dados', 'compartilhamento_dados_pessoais', 'medidas_seguranca_privacidade', 'transferencia_internacional_dados_pessoais', 'contratos_servicos_tratam_dados_processo'],
      obrigatoriedadeCampos: false
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
        if (typeof this.inventario === 'undefined') {
          this.$router.push('/')
        }
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
    chamarToast (variant = 'success', mensagem = null) {
      if (!mensagem) { mensagem = variant === 'success' ? 'Realizado com sucesso.' : 'Erro ao realizar ação.' }
      this.$root.$bvToast.toast(mensagem, {
        title: variant === 'success' ? 'Sucesso' : 'Erro',
        variant: variant,
        autoHideDelay: 1000,
        solid: true
      })
    },
    validaForm () {
      const titulo = this.$refs.titulo.$el.value
      if (!titulo) {
        this.chamarToast('danger', 'Erro. O campo título é obrigatório')
        return false
      }
      return true
    },
    salvar: function (event) {
      event.preventDefault()
      if (!this.validaForm()) { return false }
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
      this.chamarToast('success')
      this.$router.push('/#salvo')
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
    getClasses: function (categoria, linha, index) {
      const colunas = categoria.secoes && typeof categoria.secoes[index] !== 'undefined' ? categoria.secoes[index].colunas : categoria.colunas
      if (colunas && typeof colunas[index] !== 'undefined' && !this.mostrarInput(colunas[index], linha)) return 'select'
      else if (linha.classes) { return linha.classes } else if (categoria.classes && typeof categoria.classes[index] !== 'undefined') { return categoria.classes[index] }
      return ''
    },
    getTipo: function (classes) {
      if (['email'].indexOf(classes) > -1) { return 'email' } else if (['data'].indexOf(classes) > -1) { return 'date' } else if (['select'].indexOf(classes) > -1) { return 'select' } else return 'text'
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
      if (linha.isAdicional) {
        return [categoria.nome_impressao, 'linhas_adicionais', linha.nome_impressao, coluna.nome_impressao]
      } else {
        return [categoria.nome_impressao, linha.nome_impressao, coluna.nome_impressao]
      }
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
  },
  components: { InputMask }
}
</script>

<style>
body {
  font-size: .8rem;
}
</style>
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
.table th {
  text-align: left;
}
.table td {
  padding-left: 1.2rem;
  padding-right: 1.2rem;
  font-size: .8rem;
}
.card-body.titulo {
  padding: 1.2rem;
}

.m-2 {
  font-size: 0.9rem;
}

.form-control {
  font-size: .8rem;
}

.custom-select {
  font-size: .8rem;
}
</style>
