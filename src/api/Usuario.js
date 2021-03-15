import Api from "./Api";
import Csrf from "./Csrf";

export default {
  async login(formulario) {
    await Csrf.getCookie();
    return Api.post("/login", formulario);
  },
  async cambiarPassword(formulario) {
    await Csrf.getCookie();
    return Api.put("/utilidades/cambiar-password", formulario);
  },
  async registrarInscripcion(formulario) {
    await Csrf.getCookie();
    return Api.post("/alumno/registrar-alumno", formulario);
  },
  async obtenerInformacionAlumno(formulario) {
    await Csrf.getCookie();
    return Api.post("/obtener-informacion-alumno", formulario);
  },
  async validarRegistro(formulario) {
    await Csrf.getCookie();
    return Api.post("/alumno/validar-registro", formulario);
  },
  async validarExistencia(formulario) {
    await Csrf.getCookie();
    return Api.post("/alumno/comprobar-registro", formulario);
  },
  async comprobarInscripcion() {
    await Csrf.getCookie();
    return Api.get("utilidades/obtener-proyectos-inscripcion");
  },
  async logout() {
    await Csrf.getCookie();
    return Api.post("/logout");
  },
  auth() {
    return Api.get("/user");
  }
};
