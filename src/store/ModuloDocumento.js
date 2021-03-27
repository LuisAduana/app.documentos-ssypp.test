import Api from "./../api/Alumno";
import ApiProfesor from "./../api/Profesor";
import Utils from "./StoreUtils";

export default {
  namespaced: true,
  actions: {
    async obtenerDocumentosProyecto(context, formulario) {
      this.commit("SET_CABECERAS", Utils.cabecerasDocumentosAlumno, {
        root: true
      });
      this.commit("SET_ESPERANDO_TABLA", true, { root: true });
      await Api.obtenerDocumentos(formulario)
        .then(response => {
          this.commit(
            "SET_ITEMS",
            {
              itemsActivos: response.data,
              itemsInactivos: [],
              tipoTabla: "documentos-alumno"
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

    async descargarDocumento(context, formulario) {
      await ApiProfesor.descargarDocumento(formulario)
        .then(response => {
          console.log(response);
        })
        .catch();
    },

    async registrarDocumentoPractica(context, formulario) {
      this.commit("SET_ESPERANDO_RESPUESTA", true, { root: true });
      const response = await Api.registrarDocumentoPractica(formulario)
        .then(() => {
          this.dispatch("snackBarExito", "¡Documento registrado exitosamente!");
          return true;
        })
        .catch(error => {
          if (error.response.status === 422) {
            this.dispatch(
              "snackBarError",
              error.response.data.errors.documento[0]
            );
          } else {
            this.dispatch("snackBarError", Utils.MESSAGE_ERROR_DEFAULT);
          }
          return false;
        });
      this.commit("SET_ESPERANDO_RESPUESTA", false, { root: true });
      return response;
    },

    async obtenerDocumentosAlumno(context, formulario) {
      return await ApiProfesor.obtenerDocumentosAlumno(formulario)
        .then(response => {
          return response.data;
        })
        .catch(() => {
          this.dispatch("snackBarError", Utils.MESSAGE_ERROR_DEFAULT);
          return null;
        });
    }
  }
};
