import Api from "./Api";
import Csrf from "./Csrf";

export default {
  async registrarInscripcion(formulario) {
    await Csrf.getCookie();
    return Api.post("/alumno/registrar-alumno", formulario);
  },
  async obtenerInformacionProyecto(formulario) {
    await Csrf.getCookie();
    return Api.post("/alumno/obtener-informacion-proyecto", formulario);
  },
  async modificarAlumno(formulario) {
    await Csrf.getCookie();
    return Api.put("/alumno/modificar-alumno", formulario);
  },
  async obtenerDocumentos(formulario) {
    await Csrf.getCookie();
    return Api.post("/alumno/obtener-documentos", formulario);
  },
  async registrarDocumentoPractica(formulario) {
    await Csrf.getCookie();
    return Api.post("/alumno/registrar-documento-practica", formulario, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
  async registrarDocumentoServicio(formulario) {
    await Csrf.getCookie();
    return Api.post("/alumno/registrar-documento-servicio", formulario, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
  async modificarDocumentoPractica(formulario) {
    await Csrf.getCookie();
    return Api.post("alumno/modificar-documento-practica", formulario, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
  async modificarDocumentoServicio(formulario) {
    await Csrf.getCookie();
    return Api.post("alumno/modificar-documento-servicio", formulario, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }
};
