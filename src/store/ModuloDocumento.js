import Api from "./../api/Alumno";
import ApiProfesor from "./../api/Profesor";
import Utils from "./StoreUtils";
import Download from "downloadjs";

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
          response.data.forEach(element => {
            element.esperandoMensaje = false;
            element.esperandoDescarga = false;
          });
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

    async descargarDocumentoPractica(context, formulario) {
      await ApiProfesor.descargarDocumentoPractica(formulario)
        .then(response => {
          const content = response.headers["content-type"];
          Download(response.data, formulario.nombre, content);
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
        });
    },

    async descargarDocumentoServicio(context, formulario) {
      await ApiProfesor.descargarDocumentoServicio(formulario)
        .then(response => {
          const content = response.headers["content-type"];
          Download(response.data, formulario.nombre, content);
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
        });
    },

    async modificarEstadoDocumento(context, formulario) {
      return await ApiProfesor.modificarEstadoDocumento(formulario)
        .then(() => {
          this.dispatch("snackBarExito", "¡Documento modificado!");
          return true;
        })
        .catch(() => {
          this.dispatch("snackBarError", Utils.MESSAGE_ERROR_DEFAULT);
          return false;
        });
    },

    async obtenerMensajes(context, formulario) {
      return await ApiProfesor.obtenerMensajes(formulario)
        .then(response => {
          return { estado: true, mensajes: response.data };
        })
        .catch(() => {
          this.dispatch("snackBarError", Utils.MESSAGE_ERROR_DEFAULT);
          return { estado: false };
        });
    },

    async registrarDocumentoPractica(context, formulario) {
      this.commit("SET_ESPERANDO_RESPUESTA", true, { root: true });
      const response = await Api.registrarDocumentoPractica(formulario)
        .then(response => {
          this.dispatch("snackBarExito", "¡Documento registrado exitosamente!");
          return { response: response.data, exito: true };
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
          return { exito: false };
        });
      this.commit("SET_ESPERANDO_RESPUESTA", false, { root: true });
      return response;
    },

    async registrarDocumentoServicio(context, formulario) {
      this.commit("SET_ESPERANDO_RESPUESTA", true, { root: true });
      const response = await Api.registrarDocumentoServicio(formulario)
        .then(response => {
          this.dispatch("snackBarExito", "¡Documento registrado exitosamente!");
          return { response: response.data, exito: true };
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
          return { exito: false };
        });
      this.commit("SET_ESPERANDO_RESPUESTA", false, { root: true });
      return response;
    },

    async modificarDocumentoPractica(context, formulario) {
      this.commit("SET_ESPERANDO_RESPUESTA", true, { root: true });
      const response = await Api.modificarDocumentoPractica(formulario)
        .then(() => {
          this.dispatch("snackBarExito", "¡Documento modificado exitosamente!");
          return true;
        })
        .catch(() => {
          this.dispatch("snackBarError", Utils.MESSAGE_ERROR_DEFAULT);
          return false;
        });
      this.commit("SET_ESPERANDO_RESPUESTA", false, { root: true });
      return response;
    },

    async modificarDocumentoServicio(context, formulario) {
      this.commit("SET_ESPERANDO_RESPUESTA", true, { root: true });
      const response = await Api.modificarDocumentoServicio(formulario)
        .then(() => {
          this.dispatch("snackBarExito", "¡Documento modificado exitosamente!");
          return true;
        })
        .catch(() => {
          this.dispatch("snackBarError", Utils.MESSAGE_ERROR_DEFAULT);
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
