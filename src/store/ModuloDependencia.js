import Api from "../api/Coordinador";
import Utils from "./StoreUtils";

export default {
  namespaced: true,
  state: {
    esperandoNombres: false,
    nombresDependencias: []
  },
  mutations: {
    SET_NOMBRES_DEPENDENCIAS(state, nombresDependencias) {
      state.nombresDependencias = nombresDependencias;
    },
    SET_ESPERANDO_NOMBRES(state, esperandoNombres) {
      state.esperandoNombres = esperandoNombres;
    }
  },
  actions: {
    async obtenerDependencias() {
      this.commit("SET_CABECERAS", Utils.cabecerasDependencias, { root: true });
      this.commit("SET_ESPERANDO_TABLA", true, { root: true });
      await Api.obtenerDependencias()
        .then(response => {
          const itemsSeparados = Utils.separarItems(response.data);
          this.commit(
            "SET_ITEMS",
            {
              itemsActivos: itemsSeparados.act,
              itemsInactivos: itemsSeparados.inact,
              tipoTabla: "dependencias"
            },
            { root: true }
          );
        })
        .catch(() => {
          this.commit("SET_ITEMS_EN_TABLA", [], { root: true });
          this.dispatch("snackBarError", Utils.MESSAGE_ERROR_DEFAULT_TABLE);
        });
      this.commit("SET_ESPERANDO_TABLA", false, { root: true });
    },

    async actDesactDependencia(context, formulario) {
      this.commit("SET_ESPERANDO_RESPUESTA", true, { root: true });
      const response = await Api.actDesactDependencia(formulario)
        .then(() => {
          this.dispatch("snackBarExito", Utils.MESSAGE_EXITO_MODIFICAR);
          return true;
        })
        .catch(() => {
          this.dispatch("snackBarError", Utils.MESSAGE_ERROR_DEFAULT);
          return false;
        });
      this.commit("SET_ESPERANDO_RESPUESTA", false, { root: true });
      return response;
    },

    async modificarDependencia({ dispatch }, formulario) {
      this.commit("SET_ESPERANDO_RESPUESTA", true, { root: true });
      await Api.modificarDependencia(formulario)
        .then(() => {
          this.dispatch(
            "snackBarExito",
            "¡Dependencia modificada exitosamente!"
          );
        })
        .catch(error => {
          if (error.response) {
            dispatch("mensajeErrores", error.response);
          } else {
            dispatch(
              "mensajeErrores",
              "Ha ocurrido un error, inténtelo nuevamente"
            );
          }
        });
      this.commit("SET_ESPERANDO_RESPUESTA", false, { root: true });
    },

    async obtenerNombresDependencias({ commit }) {
      commit("SET_ESPERANDO_NOMBRES", true);
      await Api.obtenerNombresDependencias()
        .then(response => {
          if (response.data.length == 0) {
            this.dispatch(
              "snackBarInfo",
              "No existen dependencias, registre o active una."
            );
          }
          commit("SET_NOMBRES_DEPENDENCIAS", response.data);
        })
        .catch(() => {
          this.dispatch(
            "snackBarError",
            "No se pudieron consultar las dependencias. Recargue la página."
          );
        });
      commit("SET_ESPERANDO_NOMBRES", false);
    },

    async registrarDependencia({ dispatch }, formulario) {
      this.commit("SET_ESPERANDO_RESPUESTA", true, { root: true });
      const response = await Api.registrarDependencia(formulario)
        .then(() => {
          this.dispatch(
            "snackBarExito",
            "¡Dependencia registrada exitosamente!"
          );
          return true;
        })
        .catch(error => {
          if (error.response) {
            dispatch("mensajeErrores", error.response);
          } else {
            dispatch(
              "mensajeErrores",
              "Ha ocurrido un error, inténtelo nuevamente"
            );
          }
          return false;
        });
      this.commit("SET_ESPERANDO_RESPUESTA", false, { root: true });
      return response;
    },

    mensajeErrores(context, error) {
      if (error.status === 422) {
        this.dispatch(
          "snackBarError",
          "El nombre de la dependencia ya ha sido registrado."
        );
      } else {
        this.dispatch(
          "snackBarError",
          "Ha ocurrido un error, inténtelo nuevamente."
        );
      }
    }
  },
  getters: {
    getEsperandoNombresDependencias(state) {
      return state.esperandoNombres;
    },
    getNombresDependencias(state) {
      return state.nombresDependencias;
    }
  }
};
