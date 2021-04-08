import Api from "./Api";
import Csrf from "./Csrf";

export default {
  async consultaAlumnos(formulario) {
    await Csrf.getCookie();
    return Api.post("/profesor/consulta-alumnos", formulario);
  },
  async obtenerDocumentosAlumno(formulario) {
    await Csrf.getCookie();
    return Api.post("/profesor/obtener-documentos-alumno", formulario);
  },
  async obtenerMensajes(formulario) {
    await Csrf.getCookie();
    return Api.post("/profesor/obtener-mensajes", formulario);
  },
  async descargarDocumentoPractica(formulario) {
    await Csrf.getCookie();
    return Api.post("/profesor/descargar-documento-practica", formulario, {
      responseType: "blob"
    });
  },
  async descargarDocumentoServicio(formulario) {
    await Csrf.getCookie();
    return Api.post("/profesor/descargar-documento-servicio", formulario, {
      responseType: "blob"
    });
  },
  async modificarEstadoDocumento(formulario) {
    await Csrf.getCookie();
    return Api.put("/profesor/modificar-estado-documento", formulario);
  }
};
