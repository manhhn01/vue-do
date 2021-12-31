import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      psc: null,
      sideNavStatus: false,
    };
  },
  mutations: {
    setPsc(state, payload) {
      state.psc = payload;
    },
    setSideNavStatus(state, payload) {
      state.sideNavStatus = payload;
    },
  },
  actions: {},
  modules: {},
});
