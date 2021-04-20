import Api from "./../api/Coordinador";
import ApiAlumno from "./../api/Alumno";
import Utils from "./StoreUtils";

export default {
  namespaced: true,
  actions: {
    async obtenerAlumnosInscritos() {
      this.commit("SET_CABECERAS", Utils.cabecerasAlumno, { root: true });
      this.commit("SET_ESPERANDO_TABLA", true, { root: true });
      this.commit("SET_ESPERANDO_RESPUESTA", true, { root: true });
      const response = await Api.obtenerAlumnosInscritos()
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
          return true;
        })
        .catch(error => {
          if (error.response.status === 422) {
            this.dispatch("snackBarInfo", "No existen alumnos inscritos");
          } else {
            this.dispatch("snackBarError", Utils.MESSAGE_ERROR_DEFAULT);
          }
          return false;
        });
      this.commit("SET_ESPERANDO_TABLA", false, { root: true });
      this.commit("SET_ESPERANDO_RESPUESTA", false, { root: true });
      return response;
    },

    async obtenerAlumnosConProyecto() {
      this.commit("SET_CABECERAS", Utils.cabecerasAlumnoConProyecto, {
        root: true
      });
      this.commit("SET_ESPERANDO_RESPUESTA", true, { root: true });
      this.commit("SET_ESPERANDO_TABLA", true, { root: true });
      const response = await Api.obtenerAlumnosConProyecto()
        .then(response => {
          response.data.forEach(element => {
            element.esperando = false;
          });
          this.commit(
            "SET_ITEMS",
            {
              itemsActivos: response.data,
              itemsInactivos: {},
              tipoTabla: "alumnos_con_proyectos"
            },
            { root: true }
          );
          return true;
        })
        .catch(() => {
          this.dispatch("snackBarError", Utils.MESSAGE_ERROR_DEFAULT_TABLE);
          return false;
        });
      this.commit("SET_ESPERANDO_TABLA", false, { root: true });
      this.commit("SET_ESPERANDO_RESPUESTA", false, { root: true });
      return response;
    },

    async obtenerInformacionProyecto(context, formulario) {
      return await ApiAlumno.obtenerInformacionProyecto(formulario)
        .then(response => {
          return response.data;
        })
        .catch(() => {
          this.dispatch(
            "snackBarError",
            "No se pudo consultar el proyecto. Recargue la página."
          );
          return {};
        });
    },

    async obtenerProyectosSeleccionados(context, formulario) {
      const response = await Api.obtenerProyectosSeleccionados(formulario)
        .then(response => {
          return { proyectos: response.data, resultado: true };
        })
        .catch(() => {
          this.dispatch("snackBarError", Utils.MESSAGE_ERROR_DEFAULT);
          return { proyectos: {}, resultado: false };
        });
      return response;
    },

    async modificarAlumno(context, formulario) {
      this.commit("SET_ESPERANDO_RESPUESTA", true, { root: true });
      await ApiAlumno.modificarAlumno(formulario)
        .then(() => {
          this.dispatch("snackBarExito", Utils.MESSAGE_EXITO_MODIFICAR);
        })
        .catch(error => {
          if (error.response.status === 422) {
            if (Object.keys(error.response.data.errors).length === 2) {
              this.dispatch(
                "snackBarError",
                error.response.data.errors.correo[0]
              );
            } else {
              if (error.response.data.errors.correo == null) {
                this.dispatch(
                  "snackBarError",
                  error.response.data.errors.matricula[0]
                );
              } else {
                this.dispatch(
                  "snackBarError",
                  error.response.data.errors.correo[0]
                );
              }
            }
          } else {
            this.dispatch("snackBarError", Utils.MESSAGE_ERROR_DEFAULT);
          }
        });
      this.commit("SET_ESPERANDO_RESPUESTA", false, { root: true });
    },

    async asignarProyecto(context, proyecto) {
      this.commit("SET_ESPERANDO_RESPUESTA", true, { root: true });
      const response = await Api.asignarProyecto(proyecto)
        .then(() => {
          this.dispatch("snackBarExito", "¡Proyecto asignado exitosamente!");
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
