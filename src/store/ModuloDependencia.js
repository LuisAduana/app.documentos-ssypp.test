import Api from "../api/Coordinador";

export default {
  namespaced: true,
  actions: {
    async obtenerDependencias() {
      this.commit(
        "SET_CABECERAS",
        [
          { text: "Nombre", value: "nombre_dependencia" },
          { text: "Nombre de contacto", value: "nombre_contacto" },
          { text: "Dirección", value: "direccion" },
          { text: "Correo", value: "correo" },
          { text: "No. Contacto", value: "num_contacto" },
          { text: "Edición", value: "edicion", sortable: false, align: "right" }
        ],
        { root: true }
      );
      this.commit("SET_ESPERANDO_TABLA", true, { root: true });
      const response = await Api.obtenerDependencias()
        .then(response => {
          var itemsActivos = [];
          var itemsInactivos = [];
          for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].estado === "ACTIVO") {
              itemsActivos.push(response.data[i]);
            } else {
              itemsInactivos.push(response.data[i]);
            }
          }
          this.commit(
            "SET_ITEMS",
            { itemsActivos: itemsActivos, itemsInactivos: itemsInactivos },
            { root: true }
          );
          this.commit("SET_ITEMS_EN_TABLA", itemsActivos, { root: true });
          return response;
        })
        .catch(error => {
          this.commit("SET_ITEMS_EN_TABLA", [], { root: true });
          this.dispatch(
            "snackBarError",
            "No se pudo cargar la información de la tabla, vuelva a cargar la página."
          );
          return error.response;
        });
      this.commit("SET_ESPERANDO_TABLA", false, { root: true });
      return response;
    },

    async actDesactDependencia(context, formulario) {
      this.commit("SET_ESPERANDO_RESPUESTA", true, { root: true });
      const response = await Api.actDesactDependencia(formulario)
        .then(response => {
          this.dispatch("snackBarExito", "¡Se ha modificado exitosamente!");
          return response;
        })
        .catch(error => {
          this.dispatch(
            "snackBarError",
            "No se pudo modificar la dependencia, inténtelo nuevamente."
          );
          return error.response;
        });
      this.commit("SET_ESPERANDO_RESPUESTA", false, { root: true });
      return response;
    },

    async modificarDependencia({ dispatch }, formulario) {
      this.commit("SET_ESPERANDO_RESPUESTA", true, { root: true });
      const response = await Api.modificarDependencia(formulario)
        .then(response => {
          this.dispatch("snackBarExito", "¡Se ha modificado exitosamente!");
          return response;
        })
        .catch(error => {
          dispatch("mensajeErrores", error.response);
          return error.response;
        });
      this.commit("SET_ESPERANDO_RESPUESTA", false, { root: true });
      return response;
    },

    async registrarDependencia({ dispatch }, formulario) {
      this.commit("SET_ESPERANDO_RESPUESTA", true, { root: true });
      const response = await Api.registrarDependencia(formulario)
        .then(response => {
          this.dispatch("snackBarExito", "¡Se ha registrado exitosamente!");
          return response;
        })
        .catch(error => {
          dispatch("mensajeErrores", error.response);
          return error.response;
        });
      this.commit("SET_ESPERANDO_RESPUESTA", false, { root: true });
      return response;
    },

    mensajeErrores(context, error) {
      console.log(error);
      if (error.status === 422) {
        this.dispatch(
          "snackBarError",
          "El nombre de la dependencia ya ha sido registrado."
        );
      } else {
        this.dispatch(
          "snackBarError",
          "Ha ocurrido un error, inténtelo nuevamente."
        );
      }
    }
  }
};
