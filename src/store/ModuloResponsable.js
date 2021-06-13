import Api from "../api/Coordinador";
import Utils from "./StoreUtils";

export default {
  namespaced: true,
  state: {
    esperandoNombres: false,
    nombresResponsables: []
  },
  mutations: {
    SET_NOMBRES_RESPONSABLES(state, nombresResponsables) {
      state.nombresResponsables = nombresResponsables;
    },
    SET_ESPERANDO_NOMBRES(state, esperandoNombres) {
      state.esperandoNombres = esperandoNombres;
    }
  },
  actions: {
    async obtenerResponsables() {
      this.commit("SET_CABECERAS", Utils.cabecerasResponsables, { root: true });
      this.commit("SET_ESPERANDO_TABLA", true, { root: true });
      await Api.obtenerResponsables()
        .then(response => {
          const itemsSeparados = Utils.separarItems(response.data);
          this.commit(
            "SET_ITEMS",
            {
              itemsActivos: itemsSeparados.act,
              itemsInactivos: itemsSeparados.inact,
              tipoTabla: "responsables"
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

    async obtenerNombresResponsables({ commit }, nombre_dependencia) {
      commit("SET_ESPERANDO_NOMBRES", true);
      const vacio = await Api.obtenerNombresResponsables({
        nombre_dependencia: nombre_dependencia
      })
        .then(response => {
          var vacio = false;
          if (response.data.length == 0) {
            this.dispatch(
              "snackBarInfo",
              "No existen responsables, registre o active uno."
            );
            commit("SET_NOMBRES_RESPONSABLES", []);
            vacio = true;
          } else if (response.data === "true") {
            commit("SET_NOMBRES_RESPONSABLES", []);
            vacio = true;
          } else {
            commit("SET_NOMBRES_RESPONSABLES", response.data);
          }
          return vacio;
        })
        .catch(() => {
          this.dispatch(
            "snackBarError",
            "No se pudieron consultar los nombres de los responsables. Recargue la página."
          );
        });
      commit("SET_ESPERANDO_NOMBRES", false);
      return vacio;
    },

    async actDesactResponsable(context, formulario) {
      this.commit("SET_ESPERANDO_RESPUESTA", true, { root: true });
      const response = await Api.actDesactResponsable(formulario)
        .then(() => {
          this.dispatch("snackBarExito", Utils.MESSAGE_EXITO_MODIFICAR);
          return true;
        })
        .catch(error => {
          if (error.response.status === 422) {
            this.dispatch(
              "snackBarError",
              error.response.data.errors.estado[0]
            );
          } else {
            this.dispatch("snackBarError", Utils.MESSAGE_ERROR_DEFAULT);
          }
          return false;
        });
      this.commit("SET_ESPERANDO_RESPUESTA", false, { root: true });
      return response;
    },

    async registrarResponsable(context, formulario) {
      this.commit("SET_ESPERANDO_RESPUESTA", true, { root: true });
      const response = await Api.registrarResponsable(formulario)
        .then(() => {
          this.dispatch("snackBarExito", Utils.MESSAGE_EXITO_REGISTRO);
          return true;
        })
        .catch(error => {
          if (error.response && error.response.status === 422) {
            if (Object.keys(error.response.data.errors).length === 2) {
              this.dispatch(
                "snackBarError",
                error.response.data.errors.correo[0]
              );
            } else {
              if (error.response.data.errors.correo == null) {
                this.dispatch(
                  "snackBarError",
                  error.response.data.errors.nombre_responsable[0]
                );
              } else {
                this.dispatch(
                  "snackBarError",
                  error.response.data.errors.correo[0]
                );
              }
            }
          } else {
            this.dispatch(
              "snackBarError",
              "Ha ocurrido un error, inténtelo nuevamente."
            );
          }
          return false;
        });
      this.commit("SET_ESPERANDO_RESPUESTA", false, { root: true });
      return response;
    },

    async modificarResponsable(context, formulario) {
      this.commit("SET_ESPERANDO_RESPUESTA", true, { root: true });
      await Api.modificarResponsable(formulario)
        .then(() => {
          this.dispatch("snackBarExito", Utils.MESSAGE_EXITO_MODIFICAR);
        })
        .catch(error => {
          if (error.response && error.response.status === 422) {
            if (Object.keys(error.response.data.errors).length === 2) {
              this.dispatch(
                "snackBarError",
                error.response.data.errors.correo[0]
              );
            } else {
              if (error.response.data.errors.correo == null) {
                this.dispatch(
                  "snackBarError",
                  error.response.data.errors.nombre_responsable[0]
                );
              } else {
                this.dispatch(
                  "snackBarError",
                  error.response.data.errors.correo[0]
                );
              }
            }
          } else {
            this.dispatch(
              "snackBarError",
              "Ha ocurrido un error, inténtelo nuevamente."
            );
          }
        });
      this.commit("SET_ESPERANDO_RESPUESTA", false, { root: true });
    },

    mensajeErrores(context, error) {
      if (error.status === 422) {
        this.dispatch(
          "snackBarError",
          "El nombre del responsable ya ha sido registrado."
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
    getEsperandoNombresResponsables(state) {
      return state.esperandoNombres;
    },
    getNombresResponsables(state) {
      return state.nombresResponsables;
    }
  }
};
