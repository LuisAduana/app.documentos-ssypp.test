import Api from "./../api/Coordinador";
import Utils from "./StoreUtils";

export default {
  namespaced: true,
  actions: {
    async obtenerAlumnosInscritos() {
      this.commit("SET_CABECERAS", Utils.cabecerasAlumno, { root: true });
      this.commit("SET_ESPERANDO_TABLA", true, { root: true });
      await Api.obtenerAlumnosInscritos()
        .then(response => {
          this.commit(
            "SET_ITEMS",
            {
              itemsActivos: response.data,
              itemsInactivos: {},
              tipoTabla: "alumnos_inscritos"
            },
            { root: true }
          );
        })
        .catch(() => {
          this.dispatch("snackBarError", Utils.MESSAGE_ERROR_DEFAULT_TABLE);
        });
      this.commit("SET_ESPERANDO_TABLA", false, { root: true });
    },

    async obtenerProyectosSeleccionados(context, proyectos) {
      const response = await Api.obtenerProyectosSeleccionados(proyectos)
        .then(response => {
          return { proyectos: response.data, resultado: true };
        })
        .catch(() => {
          this.dispatch("snackBarError", Utils.MESSAGE_ERROR_DEFAULT);
          return { proyectos: {}, resultado: false };
        });
      return response;
    },

    async asignarProyecto(context, proyecto) {
      this.commit("SET_ESPERANDO_RESPUESTA", true, { root: true });
      const response = await Api.asignarProyecto(proyecto)
        .then(() => {
          return true;
        })
        .catch(() => {
          this.dispatch("snackBarError", Utils.MESSAGE_ERROR_DEFAULT);
          return false;
        });
      this.commit("SET_ESPERANDO_RESPUESTA", false, { root: true });
      return response;
    }
  }
};
