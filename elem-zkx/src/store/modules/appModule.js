const appModule = {
  state: {
    collapsed: false
  },
  mutations: {
    setCollapsed(state, flag) {
      state.collapsed = flag
    }
  },
  actions: {
    toggleCollapsed({ commit, state }) {
      commit('setCollapsed', !state.collapsed)
    }
  }
}

export { appModule }
