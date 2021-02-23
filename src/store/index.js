import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usuario: null,
    informacionDashboard: null,
    snackbar: { activo: false, color: "", mensaje: "" }
  },
  mutations: {
    SET_USUARIO(state, usuario) {
      state.usuario = usuario;
    },
    SET_INFORMACION_DASHBOARD(state, informacionDashboard) {
      state.informacionDashboard = informacionDashboard;
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
    saveInformacionDashboard({ commit }, informacionDashboard) {
      commit("SET_INFORMACION_DASHBOARD", {
        informacionDashboard: informacionDashboard
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
    },
    getInformacionDashboard(state) {
      return state.informacionDashboard;
    }
  },
  modules: {}
});
