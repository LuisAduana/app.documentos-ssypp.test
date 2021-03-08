import Api from "./../api/Usuario";

export default {
  namespaced: true,
  actions: {
    async loginUsuario(context, credenciales) {
      this.commit("SET_ESPERANDO_RESPUESTA", true, { root: true });
      const response = await Api.login(credenciales)
        .then(response => {
          if (response.data.estado === "ACTIVO") {
            localStorage.setItem("auth", "true");
            localStorage.setItem("rol", response.data.rol_usuario);
            return true;
          } else if (response.data.estado === "INSCRIPCION") {
            this.dispatch(
              "snackBarInfo",
              "Actualmente te encuentras en proceso de asignación de proyecto. Inicie sesión más tarde."
            );
            return false;
          } else {
            this.dispatch("snackBarError", "Tu usuario ha sido desactivado.");
            return false;
          }
        })
        .catch(error => {
          if (error.response.status === 422) {
            this.dispatch("snackBarError", "Las credenciales son inválidas");
          } else {
            this.dispatch(
              "snackBarError",
              "Hubo un error, inténtelo nuevamente"
            );
          }
          return false;
        });
      this.commit("SET_ESPERANDO_RESPUESTA", false, { root: true });
      return response;
    },

    async obtenerInformacionAlumno(context, id) {
      await Api.obtenerInformacionAlumno(id).then(response => {
        this.dispatch("saveInformacionDashboard", response.data);
      });
    },

    async logoutUsuario() {
      const response = await Api.logout()
        .then(response => {
          localStorage.removeItem("auth");
          localStorage.removeItem("rol");
          return response;
        })
        .catch(error => {
          this.dispatch(
            "snackBarError",
            "No se pudo cerrar sesión, inténtelo de nuevo"
          );
          return error.response;
        });
      return response;
    },

    async authUsuario() {
      const response = await Api.auth()
        .then(response => {
          this.dispatch("saveUsuario", response.data);
          return response;
        })
        .catch(error => {
          localStorage.removeItem("auth");
          localStorage.removeItem("rol");
          return error.response;
        });
      return response;
    }
  }
};
