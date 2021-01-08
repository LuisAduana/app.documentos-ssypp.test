import Api from "./Api";
import Csrf from "./Csrf";

export default {
  async obtenerCoordinadores() {
    await Csrf.getCookie();
    return Api.get("/administrador/obtener-coordinadores");
  },
  async registrarCoordinador(formulario) {
    await Csrf.getCookie();
    return Api.post("/administrador/registrar-coordinador", formulario);
  },
  async modificarCoordinador(formulario) {
    await Csrf.getCookie();
    return Api.put("/administrador/modificar-coordinador", formulario);
  },
  async actDesactCoordinador(formulario) {
    await Csrf.getCookie();
    return Api.put("/administrador/activar-desactivar-coordinador", formulario);
  }
};
