import Api from "../../api/Coordinador";
import { mapActions } from "vuex";

export default {
  data: () => ({
    dialogoConfirmarActDesactivar: false,
    esperandoRespuestaActDesact: false,
    soloInactivos: false,
    esperandoTabla: false,
    busqueda: "",
    mensaje: "",
    profesorEdit: {},
    profesoresEnTabla: [],
    profesoresActivos: [],
    profesoresInactivos: [],
    cabeceras: [
      { text: "Correo", value: "correo" },
      { text: "Nombres", value: "nombres" },
      { text: "Apellido paterno", value: "apellido_paterno" },
      { text: "Apellido materno", value: "apellido_materno" },
      { text: "No. de personal", value: "num_personal" },
      { text: "No. contácto", value: "num_contacto" },
      { text: "Edición", value: "edicion", sortable: false }
    ]
  }),
  methods: {
    ...mapActions(["snackBarError", "snackBarExito"]),

    registrarProfesor() {
      this.$router.push({ name: "Profesor" });
    },
    editarProfesor(profesor) {
      profesor.registro_profesor = false;
      this.$router.push({
        name: "Profesor",
        params: { profesor: profesor }
      });
    },
    activarDesactivarConfirmacion() {
      this.esperandoRespuestaActDesact = true;
      var datos = {
        estado: this.profesorEdit.estado === "ACTIVO" ? "INACTIVO" : "ACTIVO",
        id: this.profesorEdit.id
      };
      Api.actDesactProfesor(datos)
        .then(() => {
          for (var i = 0; i < this.profesoresEnTabla.length; i++) {
            if (this.profesoresEnTabla[i].id === this.profesorEdit.id) {
              if (this.profesoresEnTabla[i].estado === "ACTIVO") {
                this.profesoresInactivos.push(this.profesoresEnTabla[i]);
              } else {
                this.profesoresActivos.push(this.profesoresEnTabla[i]);
              }
              this.profesoresEnTabla[i].estado =
                this.profesorEdit.estado === "ACTIVO" ? "INACTIVO" : "ACTIVO";
              this.profesoresEnTabla.splice(i, 1);
            }
          }
          this.cerrarDialogo();
          this.snackBarExito("Se ha desactivado exitosamente");
        })
        .catch(() => {
          this.snackBarError(
            "No se pudo cambiar el estado. Inténtelo de nuevo."
          );
        })
        .finally(() => {
          this.esperandoRespuestaActDesact = false;
        });
    },
    desactivarActivarProfesor(profesor) {
      this.profesorEdit = Object.assign({}, profesor);
      profesor.estado === "ACTIVO"
        ? (this.mensaje =
            "desactivar a " + profesor.nombres + profesor.apellido_paterno)
        : (this.mensaje =
            "activar a " + profesor.nombres + profesor.apellido_paterno);
      this.dialogoConfirmarActDesactivar = true;
    },
    cerrarDialogo() {
      this.dialogoConfirmarActDesactivar = false;
      this.$nextTick(() => {
        this.profesorEdit = {};
      });
    }
  },
  mounted() {
    this.esperandoTabla = true;
    Api.consultarProfesores()
      .then(response => {
        for (var i = 0; i < response.data.length; i++) {
          if (response.data[i].estado === "ACTIVO") {
            this.profesoresActivos.push(response.data[i]);
          } else {
            this.profesoresInactivos.push(response.data[i]);
          }
        }
        this.profesoresEnTabla = this.profesoresActivos;
      })
      .catch(() => {
        this.snackBarError(
          "No se pudieron consultar los profesores. Recargue la página."
        );
      })
      .finally(() => {
        this.esperandoTabla = false;
      });
  },
  watch: {
    soloInactivos() {
      if (this.soloInactivos) {
        this.profesoresEnTabla = this.profesoresInactivos;
      } else {
        this.profesoresEnTabla = this.profesoresActivos;
      }
    }
  }
};
