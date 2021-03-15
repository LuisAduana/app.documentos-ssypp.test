import Api from "../api/Coordinador";
import Utils from "./StoreUtils";

export default {
  namespaced: true,
  actions: {
    async obtenerProyectosServicio(context, formulario) {
      this.commit("SET_ESPERANDO_TABLA", true, { root: true });
      await Api.obtenerProyectosServicio(formulario)
        .then(response => {
          if (formulario.tipo_consulta === "ACTIVO") {
            this.commit(
              "SET_CABECERAS",
              Utils.cabecerasProyectoServicioSeleccion,
              {
                root: true
              }
            );
            this.commit("SET_TIPO_SELECCION", false, { root: true });
          } else {
            this.commit("SET_CABECERAS", Utils.cabecerasProyectoServicio, {
              root: true
            });
          }
          const itemsSeparados = Utils.separarItems(response.data);
          this.commit("SET_ITEMS_SELECCIONADOS", [], { root: true });
          this.commit(
            "SET_ITEMS",
            {
              itemsActivos: itemsSeparados.act,
              itemsInactivos: itemsSeparados.inact,
              tipoTabla: "servicio"
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

    async obtenerProyectosPractica(context, formulario) {
      this.commit("SET_ESPERANDO_TABLA", true, { root: true });
      await Api.obtenerProyectosPracticas(formulario)
        .then(response => {
          if (formulario.tipo_consulta === "ACTIVO") {
            this.commit(
              "SET_CABECERAS",
              Utils.cabecerasProyectoPracticaSeleccion,
              {
                root: true
              }
            );
            this.commit("SET_TIPO_SELECCION", false, { root: true });
          } else {
            this.commit("SET_CABECERAS", Utils.cabecerasProyectoPractica, {
              root: true
            });
          }
          const itemsSeparados = Utils.separarItems(response.data);
          this.commit("SET_ITEMS_SELECCIONADOS", [], { root: true });
          this.commit(
            "SET_ITEMS",
            {
              itemsActivos: itemsSeparados.act,
              itemsInactivos: itemsSeparados.inact,
              tipoTabla: "practicas"
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

    async obtenerProyectosActivosServicio() {
      const response = await Api.obtenerProyectosServicio({
        tipo_consulta: "ACTIVO"
      })
        .then(response => {
          this.commit(
            "SET_CABECERAS_DOS",
            Utils.cabecerasProyectoServicioObservar,
            { root: true }
          );
          return response.data;
        })
        .catch(() => {
          this.dispatch("snackBarError", Utils.MESSAGE_ERROR_DEFAULT);
          return [];
        });
      return response;
    },

    async obtenerProyectosActivosPractica() {
      const response = await Api.obtenerProyectosPracticas({
        tipo_consulta: "ACTIVO"
      })
        .then(response => {
          this.commit(
            "SET_CABECERAS_DOS",
            Utils.cabecerasProyectoPracticaObservar,
            { root: true }
          );
          return response.data;
        })
        .catch(() => {
          this.dispatch("snackBarError", Utils.MESSAGE_ERROR_DEFAULT);
          return [];
        });
      return response;
    },

    async registrarProyectoServicio(context, formulario) {
      this.commit("SET_ESPERANDO_RESPUESTA", true, { root: true });
      const response = await Api.registrarProyectoServicio(formulario)
        .then(() => {
          this.dispatch("snackBarExito", Utils.MESSAGE_EXITO_REGISTRO);
          return true;
        })
        .catch(() => {
          this.dispatch("snackBarError", Utils.MESSAGE_ERROR_DEFAULT);
        });
      this.commit("SET_ESPERANDO_RESPUESTA", false, { root: true });
      return response;
    },

    async registrarProyectoPractica(context, formulario) {
      this.commit("SET_ESPERANDO_RESPUESTA", true, { root: true });
      const response = await Api.registrarProyectoPractica(formulario)
        .then(() => {
          this.dispatch("snackBarExito", Utils.MESSAGE_EXITO_REGISTRO);
          return true;
        })
        .catch(() => {
          this.dispatch("snackBarError", Utils.MESSAGE_ERROR_DEFAULT);
        });
      this.commit("SET_ESPERANDO_RESPUESTA", false, { root: true });
      return response;
    },

    async modificarProyectoServicio(context, formulario) {
      this.commit("SET_ESPERANDO_RESPUESTA", true, { root: true });
      await Api.modificarProyectoServicio(formulario)
        .then(() => {
          this.dispatch("snackBarExito", Utils.MESSAGE_EXITO_MODIFICAR);
        })
        .catch(() => {
          this.dispatch("snackBarError", Utils.MESSAGE_ERROR_DEFAULT);
        });
      this.commit("SET_ESPERANDO_RESPUESTA", false, { root: true });
    },

    async modificarProyectoPractica(context, formulario) {
      this.commit("SET_ESPERANDO_RESPUESTA", true, { root: true });
      await Api.modificarProyectoPractica(formulario)
        .then(() => {
          this.dispatch("snackBarExito", Utils.MESSAGE_EXITO_MODIFICAR);
        })
        .catch(() => {
          this.dispatch("snackBarError", Utils.MESSAGE_ERROR_DEFAULT);
        });
      this.commit("SET_ESPERANDO_RESPUESTA", false, { root: true });
    },

    async actDesactProyectoServicio(context, formulario) {
      this.commit("SET_ESPERANDO_RESPUESTA", true, { root: true });
      const response = await Api.actDesactProyecto(formulario)
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

    async actDesactProyectoPractica(context, formulario) {
      this.commit("SET_ESPERANDO_RESPUESTA", true, { root: true });
      const response = await Api.actDesactProyectoPractica(formulario)
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
    }
  }
};
