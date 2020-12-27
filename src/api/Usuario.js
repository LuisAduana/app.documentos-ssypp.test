import Api from "./Api";
import Csrf from "./Csrf";

export default {
  async login(formulario) {
    await Csrf.getCookie();
    return Api.post("/login", formulario);
  },
  async logout() {
    await Csrf.getCookie();
    return Api.post("/logout");
  },
  auth() {
    return Api.get("/user");
  }
};
