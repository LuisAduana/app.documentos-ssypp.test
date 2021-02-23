import Api from "./Api";
import Csrf from "./Csrf";

export default {
  async validarExistencia(formulario) {
    await Csrf.getCookie();
    return Api.post("/alumno/comprobar-registro", formulario);
  },
  async validarRegistro(formulario) {
    await Csrf.getCookie();
    return Api.post("/alumno/validar-registro", formulario);
  },
  async registrarInscripcion(formulario) {
    await Csrf.getCookie();
    return Api.post("/alumno/registrar-alumno", formulario);
  },

  async comprobarInscripcion() {
    await Csrf.getCookie();
    return Api.get("utilidades/obtener-proyectos-inscripcion");
  }
};
