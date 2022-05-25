import Vue from 'vue'
import Vuex from 'vuex'
import inventarios from './modules/inventarios'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    inventarios
  },
  strict: debug
})
