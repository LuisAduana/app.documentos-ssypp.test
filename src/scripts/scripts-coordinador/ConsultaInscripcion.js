import Coordinador from "./../../api/Coordinador";
import { mapActions } from "vuex";

export default {
  data: () => ({
    esperandoTabla: false,
    soloInactivos: false,
    esperandoRespuesta: false,
    dialogoConfirmacion: false,
    boton: "",
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
      if (this.boton === "terminar") {
        this.terminarInscripcion();
      } else {
        this.cancelarInscripcion();
      }
    },
    terminarInscripcion() {
      this.esperandoRespuesta = true;
      Coordinador.terminarInscripcion(this.inscripcionEdit)
        .then(() => {
          this.actualizarTabla();
          this.snackBarExito("La inscripción se terminó exitosamente.");
          this.cerrarDialogo();
        })
        .catch(() => {
          this.snackBarError("No se pudo terminar la inscripción.");
        })
        .finally(() => {
          this.esperandoRespuesta = false;
        });
    },
    cancelarInscripcion() {
      this.esperandoRespuesta = true;
      Coordinador.cancelarInscripcion(this.inscripcionEdit)
        .then(() => {
          this.actualizarTabla();
          this.snackBarExito("¡La inscripción se canceló exitosamente!");
          this.cerrarDialogo();
        })
        .catch(() => {
          this.snackBarError("No se pudo cancelar la inscripcion.");
        })
        .finally(() => {
          this.esperandoRespuesta = false;
        });
    },
    desactivarActivar(inscripcion, boton) {
      this.inscripcionEdit = Object.assign({}, inscripcion);
      this.boton = boton;
      this.boton === "terminar"
        ? (this.mensaje = "terminar esta inscripción")
        : (this.mensaje = "cancelar esta inscripción");
      this.dialogoConfirmacion = true;
    },
    actualizarTabla() {
      for (var i = 0; i < this.inscripcionesEnTabla.length; i++) {
        if (this.inscripcionesEnTabla[i].id === this.inscripcionEdit.id) {
          if (this.inscripcionesEnTabla[i].estado_inscripcion === "ACTIVO") {
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
