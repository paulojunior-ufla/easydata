
// initial state
const state = () => ({
  inventarios: []
})

// getters
const getters = {
  getInventarios: state => {
    return state.inventarios
  },
  getInventarioByIndex: (state) => (index) => {
    return state.inventarios[index]
  },
  getTitulosInventarios: state => {
    return state.inventarios.map((inventario, index) => {
      return {
        id: index,
        titulo: inventario.titulo
      }
    })
  }
}

// actions
const actions = {
  getAllInventarios ({ commit }) {
    commit('setInventarios', [])
  },
  addInventario ({ commit }, inventario) {
    commit('addInventario', inventario)
  }
}

// mutations
const mutations = {
  setInventarios (state, inventarios) {
    state.inventarios = inventarios
  },
  addInventario (state, inventario) {
    state.inventarios.push(inventario)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
