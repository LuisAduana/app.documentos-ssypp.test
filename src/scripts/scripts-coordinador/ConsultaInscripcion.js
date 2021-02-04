import Coordinador from "./../../api/Coordinador";
import { mapActions } from "vuex";

export default {
  data: () => ({
    esperandoTabla: false,
    soloInactivos: false,
    esperandoRespuesta: false,
    dialogoConfirmacion: false,
    busqueda: "",
    mensaje: "",
    inscripcionEdit: {},
    inscripcionesEnTabla: [],
    inscripcionesActivas: [],
    inscripcionesInactivas: [],
    cabeceras: [
      { text: "Fecha de inicio", value: "inscripcion_inicio" },
      { text: "Fecha de fin", value: "fin_inscripcion" },
      { text: "Token inscripcion", value: "token_inscripcion" },
      { text: "Estado", value: "estado_inscripcion" },
      { text: "Edición", value: "edicion", sortable: false }
    ]
  }),
  methods: {
    ...mapActions(["snackBarExito", "snackBarError"]),

    registrarInscripcion() {
      this.$router.push({ name: "RegistrarInscripcion" });
    },
    activarDesactivarConfirmacion() {
      this.esperandoRespuesta = true;
      Coordinador.cancelarInscripciones(this.inscripcionEdit)
        .then(() => {
          for (var i = 0; i < this.inscripcionesEnTabla.length; i++) {
            if (this.inscripcionesEnTabla[i].id === this.inscripcionEdit.id) {
              if (
                this.inscripcionesEnTabla[i].estado_inscripcion === "ACTIVO"
              ) {
                this.inscripcionesInactivas.push(this.inscripcionesEnTabla[i]);
              } else {
                this.inscripcionesActivas.push(this.inscripcionesEnTabla[i]);
              }
              this.inscripcionesEnTabla[i].estado_inscripcion =
                this.inscripcionEdit.estado_inscripcion === "ACTIVO"
                  ? "INACTIVO"
                  : "ACTIVO";
              this.inscripcionesEnTabla.splice(i, 1);
            }
          }
          this.snackBarExito("La inscripción se canceló exitosamente.");
          this.cerrarDialogo();
        })
        .catch(() => {
          this.snackBarError("No se pudo cancelar la inscripción.");
        })
        .finally(() => {
          this.esperandoRespuesta = false;
        });
    },
    desactivarActivar(inscripcion) {
      this.inscripcionEdit = Object.assign({}, inscripcion);
      inscripcion.estado_inscripcion === "ACTIVO"
        ? (this.mensaje = "desactivar esta inscripción?")
        : (this.mensaje = "activar esta inscripción?");
      this.dialogoConfirmacion = true;
    },
    cerrarDialogo() {
      this.dialogoConfirmacion = false;
      this.$nextTick(() => {
        this.inscripcionEdit = {};
      });
    }
  },
  mounted() {
    this.esperandoTabla = true;
    Coordinador.obtenerInscripciones()
      .then(response => {
        for (var i = 0; i < response.data.length; i++) {
          if (response.data[i].estado_inscripcion === "ACTIVO") {
            this.inscripcionesActivas.push(response.data[i]);
          } else {
            this.inscripcionesInactivas.push(response.data[i]);
          }
        }
        this.inscripcionesEnTabla = this.inscripcionesActivas;
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
        this.inscripcionesEnTabla = this.inscripcionesInactivas;
      } else {
        this.inscripcionesEnTabla = this.inscripcionesActivas;
      }
    }
  }
};
