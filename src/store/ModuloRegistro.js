import Api from "../api/Alumno";

export default {
  namespaced: true,
  actions: {
    async comprobarInscripcion() {
      const response = await Api.comprobarInscripcion()
        .then(response => {
          return response;
        })
        .catch(error => {
          if (error.response.status === 422) {
            this.dispatch("snackBarError", "No existe una inscripción activa");
          } else {
            this.dispatch(
              "snackBarError",
              "No se pudieron obtener los proyectos. Vuelva a cargar la página."
            );
          }
          return error.response;
        });
      return response;
    }
  }
};
