
// initial state
const state = () => ({
  inventarios: []
})

// getters
const getters = {}

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
