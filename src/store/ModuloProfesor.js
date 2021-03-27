import Api from "./../api/Coordinador";
import ApiProfesor from "./../api/Profesor";
import Utils from "./StoreUtils";

export default {
  namespaced: true,
  actions: {
    async obtenerProfesores() {
      this.commit("SET_CABECERAS", Utils.cabecerasProfesores, { root: true });
      this.commit("SET_ESPERANDO_TABLA", true, { root: true });
      await Api.consultarProfesores()
        .then(response => {
          const itemsSeparados = Utils.separarItems(response.data);
          this.commit(
            "SET_ITEMS",
            {
              itemsActivos: itemsSeparados.act,
              itemsInactivos: itemsSeparados.inact,
              tipoTabla: "profesor"
            },
            { root: true }
          );
        })
        .catch(() => {
          this.commit("SET_ITEMS_EN_TABLA", [], { root: true });
          this.dispatch("snackBarError", Utils.MESSAGE_ERROR_DEFAULT_TABLE);
        });
      this.commit("SET_ESPERANDO_TABLA", false, { root: true });
    },

    async registrarProfesor(context, formulario) {
      this.commit("SET_ESPERANDO_RESPUESTA", true, { root: true });
      const response = await Api.registrarProfesor(formulario)
        .then(() => {
          this.dispatch("snackBarExito", Utils.MESSAGE_EXITO_REGISTRO);
          return true;
        })
        .catch(() => {
          this.dispatch("snackBarError", Utils.MESSAGE_ERROR_DEFAULT);
          return false;
        });
      this.commit("SET_ESPERANDO_RESPUESTA", false, { root: true });
      return response;
    },

    async modificarProfesor(context, formulario) {
      this.commit("SET_ESPERANDO_RESPUESTA", true, { root: true });
      await Api.modificarProfesor(formulario)
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
                  error.response.data.errors.num_personal[0]
                );
              } else {
                this.dispatch(
                  "snackBarError",
                  error.response.data.errors.correo[0]
                );
              }
            }
          }
        });
      this.commit("SET_ESPERANDO_RESPUESTA", false, { root: true });
    },

    async modificarAlumnosAsignados(context, formulario) {
      this.commit("SET_ESPERANDO_RESPUESTA", true, { root: true });
      await Api.modificarAlumnosAsignados(formulario)
        .then(() => {
          this.dispatch("snackBarExito", Utils.MESSAGE_EXITO_REGISTRO);
        })
        .catch(() => {
          this.dispatch("snackBarError", Utils.MESSAGE_ERROR_DEFAULT);
        });
      this.commit("SET_ESPERANDO_RESPUESTA", false, { root: true });
    },

    async obtenerAlumnosAsignadosActivos() {
      this.commit("SET_CABECERAS", Utils.cabecerasAlumnoSeleccion, {
        root: true
      });
      this.commit("SET_ESPERANDO_TABLA", true, { root: true });
      await Api.obtenerAlumnosAsignadosActivos()
        .then(response => {
          this.commit(
            "SET_ITEMS",
            {
              itemsActivos: response.data,
              itemsInactivos: {},
              tipoTabla: "alumnos_inscritos_profesor"
            },
            { root: true }
          );
        })
        .catch(() => {
          this.dispatch("snackBarError", Utils.MESSAGE_ERROR_DEFAULT);
        });
      this.commit("SET_ESPERANDO_TABLA", false, { root: true });
    },

    async validarDatosProfesor(context, formulario) {
      this.commit("SET_ESPERANDO_RESPUESTA", true, { root: true });
      const response = await Api.validarRegistroProfesor(formulario)
        .then(() => {
          return true;
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
                  error.response.data.errors.num_personal[0]
                );
              } else {
                this.dispatch(
                  "snackBarError",
                  error.response.data.errors.correo[0]
                );
              }
            }
          }
          return false;
        });
      this.commit("SET_ESPERANDO_RESPUESTA", false, { root: true });
      return response;
    },

    async actDesactProfesor(context, formulario) {
      this.commit("SET_ESPERANDO_RESPUESTA", true, { root: true });
      const response = await Api.actDesactProfesor(formulario)
        .then(() => {
          this.dispatch("snackBarExito", Utils.MESSAGE_EXITO_MODIFICAR);
          return true;
        })
        .catch(() => {
          this.dispatch("snackBarError", Utils.MESSAGE_ERROR_DEFAULT);
          return false;
        });
      this.commit("SET_ESPERANDO_RESPUESTA", false, { root: true });
      return response;
    },

    async obtenerAlumnos(context, formulario) {
      this.commit("SET_CABECERAS", Utils.cabecerasAlumnoProfesor, {
        root: true
      });
      this.commit("SET_ESPERANDO_TABLA", true, { root: true });
      await ApiProfesor.consultaAlumnos(formulario)
        .then(response => {
          this.commit(
            "SET_ITEMS",
            {
              itemsActivos: response.data,
              itemsInactivos: [],
              tipoTabla: "consulta-alumnos"
            },
            { root: true }
          );
        })
        .catch(() => {
          this.dispatch("snackBarError", Utils.MESSAGE_ERROR_DEFAULT_TABLE);
        });
      this.commit("SET_ESPERANDO_TABLA", false, { root: true });
    }
  }
};
