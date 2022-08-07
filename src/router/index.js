import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CadastrarInventarioView from '../views/CadastrarInventarioView.vue'
import PdfInventarioView from '../views/PdfInventarioView.vue'
import ImportarInventarioView from '../views/ImportarInventarioView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cadastrarInventario',
    name: 'cadastrarInventario',
    component: CadastrarInventarioView
  },
  {
    path: '/editarInventario/:id',
    name: 'editarInventario',
    component: CadastrarInventarioView
  },
  {
    path: '/baixarPdfInventario/:id',
    name: 'baixarPdfInventario',
    component: PdfInventarioView
  },
  {
    path: '/importarInventario',
    name: 'importarInventario',
    component: ImportarInventarioView
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
