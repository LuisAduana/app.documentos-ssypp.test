import ModuloAlumno from "./ModuloAlumno";
import ModuloDependencia from "./ModuloDependencia";
import ModuloDocumento from "./ModuloDocumento";
import ModuloInscripcion from "./ModuloInscripcion";
import ModuloProfesor from "./ModuloProfesor";
import ModuloProyectos from "./ModuloProyectos";
import ModuloResponsable from "./ModuloResponsable";
import ModuloUsuario from "./ModuloUsuario";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    esperandoRespuesta: false,
    esperandoRespuestaDos: false,
    esperandoTabla: false,
    soloInactivos: false,
    dialogoDocumento: false,
    dialogoAsignarProyecto: false,
    usuario: null,
    informacionDashboard: null,
    profesor: {},
    busquedaEnTabla: "",
    tipoTabla: "",
    tipoSeleccion: false,
    rolUsuario: "",
    itemsSeleccionados: [],
    itemsActivos: [],
    itemsInactivos: [],
    itemsEnTabla: [],
    cabeceras: [],
    cabecerasDos: [],
    snackbars: []
  },
  mutations: {
    SET_USUARIO(state, usuario) {
      state.usuario = usuario;
    },
    SET_TIPO_SELECCION(state, tipoSeleccion) {
      state.tipoSeleccion = tipoSeleccion;
    },
    SET_ROL_USUARIO(state, rolUsuario) {
      state.rolUsuario = rolUsuario;
    },
    SET_INFORMACION_DASHBOARD(state, informacionDashboard) {
      state.informacionDashboard = informacionDashboard;
    },
    SET_PROFESOR(state, profesor) {
      state.profesor = profesor;
    },
    SET_SNACKBAR(state, snackbar) {
      state.snackbars = state.snackbars.concat(snackbar);
    },
    SET_ESPERANDO_RESPUESTA(state, esperandoRespuesta) {
      state.esperandoRespuesta = esperandoRespuesta;
    },
    SET_ESPERANDO_RESPUESTA_DOS(state, esperandoRespuestaDos) {
      state.esperandoRespuestaDos = esperandoRespuestaDos;
    },
    SET_ESPERANDO_TABLA(state, esperandoTabla) {
      state.esperandoTabla = esperandoTabla;
    },
    SET_CABECERAS(state, cabeceras) {
      state.cabeceras = cabeceras;
    },
    SET_CABECERAS_DOS(state, cabeceras) {
      state.cabecerasDos = cabeceras;
    },
    SET_ITEMS(state, { itemsActivos, itemsInactivos, tipoTabla }) {
      state.itemsActivos = itemsActivos;
      state.itemsInactivos = itemsInactivos;
      state.itemsEnTabla = itemsActivos;
      state.tipoTabla = tipoTabla;
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
    },
    SET_ITEMS_SELECCIONADOS(state, itemsSeleccionados) {
      state.itemsSeleccionados = itemsSeleccionados;
    },
    SET_DIALOGO_ASIGNAR_PROYECTO(state, dialogoAsignarProyecto) {
      state.dialogoAsignarProyecto = dialogoAsignarProyecto;
    },
    SET_DIALOGO_DOCUMENTO(state, dialogoDocumento) {
      state.dialogoDocumento = dialogoDocumento;
    },
    ELIMINAR_ITEM_EN_TABLA(state, posicion) {
      state.itemsEnTabla.splice(posicion, 1);
    }
  },
  actions: {
    deleteItemEnTabla({ commit }, posicion) {
      commit("ELIMINAR_ITEM_EN_TABLA", posicion);
    },
    saveUsuario({ commit }, usuario) {
      commit("SET_USUARIO", usuario);
    },
    saveRolUsuario({ commit }, rolUsuario) {
      commit("SET_ROL_USUARIO", rolUsuario);
    },
    saveInformacionDashboard({ commit }, informacionDashboard) {
      commit("SET_INFORMACION_DASHBOARD", informacionDashboard);
    },
    saveInformacionProfesor({ commit }, profesor) {
      commit("SET_PROFESOR", profesor);
    },
    saveTipoSeleccion({ commit }, tipoSeleccion) {
      commit("SET_TIPO_SELECCION", tipoSeleccion);
    },
    saveDialogoAsignarProyecto({ commit }, dialogoAsignarProyecto) {
      commit("SET_DIALOGO_ASIGNAR_PROYECTO", dialogoAsignarProyecto);
    },
    saveDialogoDocumento({ commit }, dialogoDocumento) {
      commit("SET_DIALOGO_DOCUMENTO", dialogoDocumento);
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
    saveItemsEnTabla({ commit }) {
      commit("SET_ITEMS_EN_TABLA", []);
    },
    saveCambioTabla({ commit }, { posicion, estado }) {
      commit("SET_CAMBIO_TABLA", { posicion, estado });
    },
    saveCabeceras({ commit }) {
      commit("SET_CABECERAS", []);
    },
    saveItemsSeleccionados({ commit }, itemsSeleccionados) {
      commit("SET_ITEMS_SELECCIONADOS", itemsSeleccionados);
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
    getProfesor(state) {
      return state.profesor;
    },
    getEsperandoRespuesta(state) {
      return state.esperandoRespuesta;
    },
    getEsperandoRespuestaDos(state) {
      return state.esperandoRespuestaDos;
    },
    getEsperandoTabla(state) {
      return state.esperandoTabla;
    },
    getCabeceras(state) {
      return state.cabeceras;
    },
    getCabecerasDos(state) {
      return state.cabecerasDos;
    },
    getItemsEnTabla(state) {
      return state.itemsEnTabla;
    },
    getBusquedaEnTabla(state) {
      return state.busquedaEnTabla;
    },
    getSoloInactivos(state) {
      return state.soloInactivos;
    },
    getTipoTabla(state) {
      return state.tipoTabla;
    },
    getItemsSeleccionados(state) {
      return state.itemsSeleccionados;
    },
    getDialogoAsignarProyecto(state) {
      return state.dialogoAsignarProyecto;
    },
    getDialogoDocumento(state) {
      return state.dialogoDocumento;
    },
    getTipoSeleccion(state) {
      return state.tipoSeleccion;
    }
  },
  modules: {
    moduloAlumno: ModuloAlumno,
    moduloDependencia: ModuloDependencia,
    moduloDocumento: ModuloDocumento,
    moduloInscripcion: ModuloInscripcion,
    moduloProfesor: ModuloProfesor,
    moduloProyectos: ModuloProyectos,
    moduloResponsable: ModuloResponsable,
    moduloUsuario: ModuloUsuario
  }
});
