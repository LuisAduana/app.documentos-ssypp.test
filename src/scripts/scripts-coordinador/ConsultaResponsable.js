import Coordinador from "../../api/Coordinador";
import { mapActions } from "vuex";

export default {
  data: () => ({
    dialogoConfirmarActDesactivar: false,
    esperandoRespuestaActDesact: false,
    esperandoTabla: false,
    soloInactivos: false,
    busqueda: "",
    mensaje: "",
    responsablesEnTabla: [],
    responsablesActivos: [],
    responsablesInactivos: [],
    responsableEdit: {},
    cabeceras: [
      { text: "Nombre", value: "nombre_responsable" },
      { text: "Dependencia", value: "nombre_dependencia" },
      { text: "Cargo", value: "cargo" },
      { text: "Correo", value: "correo" },
      { text: "No. Contacto", value: "num_contacto" },
      { text: "Estado", value: "estado" },
      { text: "Edición", value: "edicion", sortable: false }
    ]
  }),
  methods: {
    ...mapActions(["snackBarError", "snackBarExito", "snackBarInfo"]),

    registrarResponsable() {
      this.$router.push({ name: "Responsable" });
    },
    editarResponsable(responsable) {
      responsable.registro_responsable = false;
      this.$router.push({
        name: "Responsable",
        params: { responsable: responsable }
      });
    },
    activarDesactivarConfirmacion() {
      this.esperandoRespuestaActDesact = true;
      var datos = {
        estado:
          this.responsableEdit.estado === "ACTIVO" ? "INACTIVO" : "ACTIVO",
        id: this.responsableEdit.id
      };
      Coordinador.actDesactResponsable(datos)
        .then(() => {
          for (var i = 0; i < this.responsablesEnTabla.length; i++) {
            if (
              this.responsablesEnTabla[i].nombre_responsable ===
              this.responsableEdit.nombre_responsable
            ) {
              if (this.responsablesEnTabla[i].estado === "ACTIVO") {
                this.responsablesInactivos.push(this.responsablesEnTabla[i]);
              } else {
                this.responsablesActivos.push(this.responsablesEnTabla[i]);
              }
              this.responsablesEnTabla[i].estado =
                this.responsableEdit.estado === "ACTIVO"
                  ? "INACTIVO"
                  : "ACTIVO";
              this.responsablesEnTabla.splice(i, 1);
            }
          }
          this.esperandoRespuestaActDesact = false;
          this.cerrarDialogo();
          this.snackBarExito("Se ha desactivado exitosamente");
        })
        .catch(error => {
          console.log(error.response);
          this.esperandoRespuestaActDesact = false;
          if (error.response.status === 422) {
            this.snackBarInfo(error.response.data.errors.estado[0]);
          } else {
            this.snackBarError("Ocurrió un error, inténtelo de nuevo");
          }
        });
    },
    desactivarActivarResponsable(responsable) {
      this.responsableEdit = Object.assign({}, responsable);
      responsable.estado === "ACTIVO"
        ? (this.mensaje =
            "desactivar a " + responsable.nombre_responsable + "?")
        : (this.mensaje = "activar a " + responsable.nombre_responsable + "?");
      this.dialogoConfirmarActDesactivar = true;
    },
    cerrarDialogo() {
      this.dialogoConfirmarActDesactivar = false;
      this.$nextTick(() => {
        this.responsableEdit = {};
      });
    }
  },
  mounted() {
    this.esperandoTabla = true;
    Coordinador.obtenerResponsables()
      .then(response => {
        for (var i = 0; i < response.data.length; i++) {
          if (response.data[i].estado === "ACTIVO") {
            this.responsablesActivos.push(response.data[i]);
          } else {
            this.responsablesInactivos.push(response.data[i]);
          }
        }
        this.responsablesEnTabla = this.responsablesActivos;
        this.esperandoTabla = false;
      })
      .catch(() => {
        this.$store.dispatch(
          "snackBarError",
          "No se pudo cargar la información de la tabla, vuelva a cargar la página"
        );
        this.esperandoTabla = false;
      });
  },
  watch: {
    soloInactivos() {
      if (this.soloInactivos) {
        this.responsablesEnTabla = this.responsablesInactivos;
      } else {
        this.responsablesEnTabla = this.responsablesActivos;
      }
    }
  }
};
