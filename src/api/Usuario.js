import Api from "./Api";
import Csrf from "./Csrf";

export default {
  async login(formulario) {
    await Csrf.getCookie();
    return Api.post("/login", formulario);
  },
  async obtenerInformacionAlumno(formulario) {
    await Csrf.getCookie();
    return Api.post("/obtener-informacion-alumno", formulario);
  },
  async logout() {
    await Csrf.getCookie();
    return Api.post("/logout");
  },
  auth() {
    return Api.get("/user");
  }
};
