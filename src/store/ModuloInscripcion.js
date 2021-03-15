import Api from "./../api/Coordinador";
import Utils from "./StoreUtils";

export default {
  namespaced: true,
  actions: {
    async obtenerInscripciones() {
      this.commit("SET_CABECERAS", Utils.cabecerasInscripcion, { root: true });
      this.commit("SET_ESPERANDO_TABLA", true, { root: true });
      await Api.obtenerInscripciones()
        .then(response => {
          const itemsSeparados = Utils.separarItems(response.data);
          this.commit(
            "SET_ITEMS",
            {
              itemsActivos: itemsSeparados.act,
              itemsInactivos: itemsSeparados.inact,
              tipoTabla: "inscripcion"
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

    async registrarInscripcion(context, formulario) {
      this.commit("SET_ESPERANDO_RESPUESTA", true, { root: true });
      const response = await Api.registrarInscripcion(formulario)
        .then(() => {
          this.dispatch("snackBarExito", Utils.MESSAGE_EXITO_REGISTRO);
          return true;
        })
        .catch(error => {
          if (error.response.status === 422) {
            this.dispatch(
              "snackBarError",
              error.response.data.errors.inscripcion[0]
            );
          } else {
            this.dispatch("snackBarError", Utils.MESSAGE_ERROR_DEFAULT);
          }
        });
      this.commit("SET_ESPERANDO_RESPUESTA", false, { root: true });
      return response;
    },

    async terminarInscripcion(context, inscripcion) {
      this.commit("SET_ESPERANDO_RESPUESTA", true, { root: true });
      const response = await Api.terminarInscripcion(inscripcion)
        .then(() => {
          this.dispatch("snackBarExito", "¡La inscripción ha terminado!");
          return true;
        })
        .catch(() => {
          this.dispatch("snackBarError", Utils.MESSAGE_ERROR_DEFAULT);
          return false;
        });
      this.commit("SET_ESPERANDO_RESPUESTA", false, { root: true });
      return response;
    },

    async cancelarInscripcion(context, inscripcion) {
      this.commit("SET_ESPERANDO_RESPUESTA", true, { root: true });
      const response = await Api.cancelarInscripcion(inscripcion)
        .then(() => {
          this.dispatch("snackBarExito", "¡La inscripción fue cancelada!");
          return true;
        })
        .catch(() => {
          this.dispatch("snackBarError", Utils.MESSAGE_ERROR_DEFAULT);
        });
      this.commit("SET_ESPERANDO_RESPUESTA", false, { root: true });
      return response;
    }
  }
};
