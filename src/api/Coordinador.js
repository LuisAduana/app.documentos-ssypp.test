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
  }
};
