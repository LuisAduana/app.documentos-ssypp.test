import Vue from "vue";
import Vuex from "vuex";
import ModuloDependencia from "./ModuloDependencia";
import ModuloRegistro from "./ModuloRegistro";
import ModuloUsuario from "./ModuloUsuario";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    esperandoRespuesta: false,
    esperandoTabla: false,
    soloInactivos: false,
    usuario: null,
    informacionDashboard: null,
    busquedaEnTabla: "",
    itemsActivos: [],
    itemsInactivos: [],
    itemsEnTabla: [],
    cabeceras: [],
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
    },
    SET_ESPERANDO_RESPUESTA(state, esperandoRespuesta) {
      state.esperandoRespuesta = esperandoRespuesta;
    },
    SET_ESPERANDO_TABLA(state, esperandoTabla) {
      state.esperandoTabla = esperandoTabla;
    },
    SET_CABECERAS(state, cabeceras) {
      state.cabeceras = cabeceras;
    },
    SET_ITEMS(state, { itemsActivos, itemsInactivos }) {
      state.itemsActivos = itemsActivos;
      state.itemsInactivos = itemsInactivos;
    },
    SET_ITEMS_EN_TABLA(state, items) {
      state.itemsEnTabla = items;
    },
    SET_BUSQUEDA_EN_TABLA(state, busquedaEnTabla) {
      state.busquedaEnTabla = busquedaEnTabla;
    },
    SET_CAMBIO_TABLA(state, { posicion, estado }) {
      state.itemsEnTabla[posicion].estado = estado;
      if (estado === "INACTIVO") {
        state.itemsInactivos.push(state.itemsEnTabla[posicion]);
      } else {
        state.itemsActivos.push(state.itemsEnTabla[posicion]);
      }
      state.itemsEnTabla.splice(posicion, 1);
    },
    SET_SOLO_INACTIVOS(state, soloInactivos) {
      state.soloInactivos = soloInactivos;
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
    saveBusquedaEnTabla({ commit }, busquedaEnTabla) {
      commit("SET_BUSQUEDA_EN_TABLA", busquedaEnTabla);
    },
    saveSoloInactivos({ commit, state }, soloInactivos) {
      commit("SET_SOLO_INACTIVOS", soloInactivos);
      if (state.soloInactivos) {
        commit("SET_ITEMS_EN_TABLA", state.itemsInactivos);
      } else {
        commit("SET_ITEMS_EN_TABLA", state.itemsActivos);
      }
    },
    saveCambioTabla({ commit }, { posicion, estado }) {
      commit("SET_CAMBIO_TABLA", { posicion, estado });
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
    },
    getEsperandoRespuesta(state) {
      return state.esperandoRespuesta;
    },
    getEsperandoTabla(state) {
      return state.esperandoTabla;
    },
    getCabeceras(state) {
      return state.cabeceras;
    },
    getItemsEnTabla(state) {
      return state.itemsEnTabla;
    },
    getBusquedaEnTabla(state) {
      return state.busquedaEnTabla;
    },
    getSoloInactivos(state) {
      return state.soloInactivos;
    }
  },
  modules: {
    moduloRegistro: ModuloRegistro,
    moduloDependencia: ModuloDependencia,
    moduloUsuario: ModuloUsuario
  }
});
