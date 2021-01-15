import Coordinador from "../../api/Coordinador";
import { mapActions } from "vuex";

export default {
  data: () => ({
    dialogoConfirmarActDesactivar: false,
    esperandoRespuestaActDesact: false,
    esperandoTabla: false,
    busqueda: "",
    mensaje: "",
    responsableEdit: {},
    responsables: [],
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
    ...mapActions(["snackBarError", "snackBarExito"]),

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
          for (var i = 0; i < this.responsables.length; i++) {
            if (
              this.responsables[i].nombre_responsable ===
              this.responsableEdit.nombre_responsable
            ) {
              this.responsables[i].estado =
                this.responsableEdit.estado === "ACTIVO"
                  ? "INACTIVO"
                  : "ACTIVO";
            }
          }
          this.esperandoRespuestaActDesact = false;
          this.cerrarDialogo();
          this.snackBarExito("Se ha desactivado exitosamente");
        })
        .catch(() => {
          this.esperandoRespuestaActDesact = false;
          this.snackBarError("Ocurrió un error, inténtelo de nuevo");
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
        this.responsables = response.data;
        this.esperandoTabla = false;
      })
      .catch(() => {
        this.$store.dispatch(
          "snackBarError",
          "No se pudo cargar la información de la tabla, vuelva a cargar la página"
        );
        this.esperandoTabla = false;
      });
  }
};
