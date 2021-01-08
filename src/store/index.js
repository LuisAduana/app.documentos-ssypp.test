import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usuario: null,
    snackbar: { activo: false, color: "", mensaje: "" }
  },
  mutations: {
    SET_USUARIO(state, usuario) {
      state.usuario = usuario;
    },
    SET_SNACKBAR(state, snackbar) {
      state.snackbar = snackbar;
    }
  },
  actions: {
    saveUsuario({ commit }, usuario) {
      commit("SET_USUARIO", {
        usuario: usuario
      });
    },
    snackBarError({ commit }, message) {
      commit("SET_SNACKBAR", {
        activo: true,
        color: "error",
        mensaje: message
      });
    },
    snackBarInfo({ commit }, message) {
      commit("SET_SNACKBAR", {
        activo: true,
        color: "info",
        mensaje: message
      });
    },
    snackBarExito({ commit }, message) {
      commit("SET_SNACKBAR", {
        activo: true,
        color: "success",
        mensaje: message
      });
    }
  },
  getters: {
    getUsuario(state) {
      return state.usuario;
    }
  },
  modules: {}
});
