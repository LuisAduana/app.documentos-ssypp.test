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
  async descargarDocumento(formulario) {
    await Csrf.getCookie();
    return Api.post("/profesor/descargar-documento", formulario);
  }
};
