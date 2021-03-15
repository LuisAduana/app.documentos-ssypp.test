import Api from "./Api";
import Csrf from "./Csrf";

export default {
  async registrarInscripcion(formulario) {
    await Csrf.getCookie();
    return Api.post("/alumno/registrar-alumno", formulario);
  }
};
