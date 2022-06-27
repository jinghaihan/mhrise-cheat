const micro = {
  namespaced: true,
  state: {
    keepAlive: []
  },
  mutations: {
    SET_KEEPALIVE (state, keepAlive) {
      state.keepAlive = keepAlive
    }
  }
}
export default micro
