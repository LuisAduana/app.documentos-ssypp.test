import Api from "./../api/Usuario";
import Utils from "./../store/StoreUtils";

export default {
  namespaced: true,
  state: {
    opcionUno: { nombre_dependencia: "" },
    opcionDos: { nombre_dependencia: "" },
    opcionTres: { nombre_dependencia: "" },
    dialogoProyectoServicio: false,
    dialogoProyectoPractica: false,
    proyecto: {}
  },
  mutations: {
    SET_OPCION_UNO(state, opcion) {
      state.opcionUno = opcion;
    },
    SET_OPCION_DOS(state, opcion) {
      state.opcionDos = opcion;
    },
    SET_OPCION_TRES(state, opcion) {
      state.opcionTres = opcion;
    },
    SET_OPCIONES(state, opcion) {
      state.opcionUno = opcion[0];
      state.opcionDos = opcion[1];
      state.opcionTres = opcion[2];
    },
    SET_DIALOGO_PROYECTO_SERVICIO(state, valor) {
      state.dialogoProyectoServicio = valor;
    },
    SET_DIALOGO_PROYECTO_PRACTICA(state, valor) {
      state.dialogoProyectoPractica = valor;
    },
    SET_PROYECTO(state, proyecto) {
      state.proyecto = proyecto;
    }
  },
  actions: {
    saveDialogoServicio({ commit }, valor) {
      commit("SET_DIALOGO_PROYECTO_SERVICIO", valor);
    },
    saveDialogoPractica({ commit }, valor) {
      commit("SET_DIALOGO_PROYECTO_PRACTICA", valor);
    },
    saveProyecto({ commit }, proyecto) {
      commit("SET_PROYECTO", proyecto);
    },

    saveOpcion({ state, commit }, opcion) {
      if (
        Object.keys(state.opcionUno).length === 1 &&
        opcion != state.opcionDos &&
        opcion != state.opcionTres
      ) {
        commit("SET_OPCION_UNO", opcion);
      } else if (
        Object.keys(state.opcionDos).length === 1 &&
        opcion != state.opcionUno &&
        opcion != state.opcionTres
      ) {
        commit("SET_OPCION_DOS", opcion);
      } else if (
        Object.keys(state.opcionTres).length === 1 &&
        opcion != state.opcionUno &&
        opcion != state.opcionDos
      ) {
        commit("SET_OPCION_TRES", opcion);
      }
    },

    deleteOpcion({ commit }, opcion) {
      if (opcion == 1) {
        commit("SET_OPCION_UNO", { nombre_dependencia: "" });
      } else if (opcion == 2) {
        commit("SET_OPCION_DOS", { nombre_dependencia: "" });
      } else {
        commit("SET_OPCION_TRES", { nombre_dependencia: "" });
      }
    },

    initOpciones({ commit }) {
      commit("SET_OPCIONES", [
        { nombre_dependencia: "" },
        { nombre_dependencia: "" },
        { nombre_dependencia: "" }
      ]);
    },

    proyectosSeleccionados({ state }) {
      var length = 0;
      if (Object.keys(state.opcionUno).length != 1) {
        length++;
      }
      if (Object.keys(state.opcionDos).length != 1) {
        length++;
      }
      if (Object.keys(state.opcionTres).length != 1) {
        length++;
      }
      return length;
    },

    async loginUsuario(context, credenciales) {
      this.commit("SET_ESPERANDO_RESPUESTA", true, { root: true });
      const response = await Api.login(credenciales)
        .then(response => {
          if (response.data.estado === "ACTIVO") {
            return { respuesta: true, rol_usuario: response.data.rol_usuario };
          } else if (
            response.data.estado === "INSCRIPCION" ||
            response.data.estado === "ASIGNADO"
          ) {
            this.dispatch(
              "snackBarInfo",
              "Actualmente te encuentras en proceso de asignación. Inicie sesión más tarde."
            );
          } else if (response.data.estado === "CANCELADO") {
            this.dispatch(
              "snackBarInfo",
              "El coordinador ha cancelado la inscripción."
            );
          } else {
            this.dispatch("snackBarError", "Tu usuario ha sido desactivado.");
          }
          return { respuesta: false };
        })
        .catch(error => {
          if (error.response.status === 422) {
            this.dispatch(
              "snackBarError",
              error.response.data.errors.correo[0]
            );
          } else {
            this.dispatch(
              "snackBarError",
              "Hubo un error, inténtelo nuevamente"
            );
          }
          return { respuesta: false };
        });
      this.commit("SET_ESPERANDO_RESPUESTA", false, { root: true });
      return response;
    },

    async registrarAlumno(context, formulario) {
      this.commit("SET_ESPERANDO_RESPUESTA_DOS", true, { root: true });
      const response = await Api.registrarInscripcion(formulario)
        .then(() => {
          this.dispatch("snackBarExito", "¡Se ha registrado exitosamente!");
          return true;
        })
        .catch(error => {
          if (error.response && error.response.status === 401) {
            this.dispatch("snackBarError", error.response.data);
          } else {
            this.dispatch(
              "snackBarError",
              "Ocurrió un error. Inténtelo nuevamente"
            );
          }
          return false;
        });
      this.commit("SET_ESPERANDO_RESPUESTA_DOS", false, { root: true });
      return response;
    },

    async obtenerInformacionAlumno(context, id) {
      await Api.obtenerInformacionAlumno(id).then(response => {
        this.dispatch("saveInformacionDashboard", response.data);
      });
    },

    async validarExistencia(context, formulario) {
      this.commit("SET_ESPERANDO_RESPUESTA_DOS", true, { root: true });
      const response = await Api.validarExistencia(formulario)
        .then(response => {
          if (
            response.data.estado === "INSCRIPCION" ||
            response.data.estado === "ASIGNADO"
          ) {
            this.dispatch(
              "snackBarError",
              "Ya estás en proceso de asignación de proyecto."
            );
            return { datos: {}, fallo: false };
          } else {
            return { datos: response.data, fallo: true };
          }
        })
        .catch(error => {
          if (error.response && error.response.status === 401) {
            this.dispatch("snackBarError", error.response.data);
          } else {
            this.dispatch(
              "snackBarError",
              "Ha ocurrido un error, inténtelo nuevamente"
            );
          }
          return { datos: {}, fallo: false };
        });
      this.commit("SET_ESPERANDO_RESPUESTA_DOS", false, { root: true });
      return response;
    },

    async comprobarInscripcion() {
      await Api.comprobarInscripcion()
        .then(response => {
          var tipoTablaRegistro = "";
          if (response.data.tipo_inscripcion === "servicio") {
            this.commit(
              "SET_CABECERAS",
              Utils.cabecerasProyectoServicioObservar,
              { root: true }
            );
            tipoTablaRegistro = "registroServicio";
          } else {
            this.commit(
              "SET_CABECERAS",
              Utils.cabecerasProyectoPracticaObservar,
              { root: true }
            );
            tipoTablaRegistro = "registroPractica";
          }
          this.commit(
            "SET_ITEMS",
            {
              itemsActivos: response.data.proyectos,
              itemsInactivos: [],
              tipoTabla: tipoTablaRegistro
            },
            { root: true }
          );
        })
        .catch(error => {
          if (error.response && error.response.status === 422) {
            this.dispatch("snackBarError", "La inscripción ha terminado.");
            return error.response;
          } else {
            this.dispatch(
              "snackBarError",
              "No se pudieron obtener los proyectos. Vuelva a cargar la página."
            );
            return null;
          }
        });
    },

    async validarRegistro(context, formulario) {
      this.commit("SET_ESPERANDO_RESPUESTA", true, { root: true });
      const response = await Api.validarRegistro(formulario)
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
          return false;
        });
      this.commit("SET_ESPERANDO_RESPUESTA", false, { root: true });
      return response;
    },

    async cambiarPassword(context, formulario) {
      this.commit("SET_ESPERANDO_RESPUESTA_DOS", true, { root: true });
      const response = await Api.cambiarPassword(formulario)
        .then(() => {
          this.dispatch("snackBarExito", Utils.MESSAGE_EXITO_MODIFICAR);
          return true;
        })
        .catch(() => {
          this.dispatch(
            "snackBarError",
            "Ha ocurrido un error, inténtelo nuevamente"
          );
          return false;
        });
      this.commit("SET_ESPERANDO_RESPUESTA_DOS", false, { root: true });
      return response;
    },

    async logoutUsuario() {
      const response = await Api.logout()
        .then(response => {
          this.dispatch("saveUsuario", null);
          return response;
        })
        .catch(error => {
          if (error.response) {
            this.dispatch(
              "snackBarError",
              "No se pudo cerrar sesión, inténtelo de nuevo"
            );
            return error.response;
          } else {
            this.dispatch(
              "snackBarError",
              "Ha ocurrido un error, inténtelo de nuevo"
            );
            return null;
          }
        });
      return response;
    },

    async authUsuario() {
      const response = await Api.auth()
        .then(response => {
          this.dispatch("saveUsuario", response.data);
          return response.status;
        })
        .catch(error => {
          return error.response.status;
        });
      return response;
    }
  },
  getters: {
    getOpcionUno(state) {
      return state.opcionUno;
    },
    getOpcionDos(state) {
      return state.opcionDos;
    },
    getOpcionTres(state) {
      return state.opcionTres;
    },
    getDialogoProyectoServicio(state) {
      return state.dialogoProyectoServicio;
    },
    getDialogoProyectoPractica(state) {
      return state.dialogoProyectoPractica;
    },
    getProyecto(state) {
      return state.proyecto;
    }
  }
};
