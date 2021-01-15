import Api from "./Api";
import Csrf from "./Csrf";

export default {
  async obtenerDependencias() {
    await Csrf.getCookie();
    return Api.get("/coordinador/obtener-dependencias");
  },
  async registrarDependencia(formulario) {
    await Csrf.getCookie();
    return Api.post("/coordinador/registrar-dependencia", formulario);
  },
  async modificarDependencia(formulario) {
    await Csrf.getCookie();
    return Api.put("/coordinador/modificar-dependencia", formulario);
  },
  async actDesactDependencia(formulario) {
    await Csrf.getCookie();
    return Api.put("/coordinador/activar-desactivar-dependencia", formulario);
  },

  async obtenerResponsables() {
    await Csrf.getCookie();
    return Api.get("/coordinador/obtener-responsables");
  },
  async registrarResponsable(formulario) {
    await Csrf.getCookie();
    return Api.post("/coordinador/registrar-responsable", formulario);
  },

  async obtenerNombresDependencias() {
    await Csrf.getCookie();
    return Api.get("/coordinador/obtener-nombres-dependencias");
  }
};
