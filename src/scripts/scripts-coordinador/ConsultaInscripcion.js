import tabla from "./../../components/Tabla";
import { mapActions } from "vuex";

export default {
  data: () => ({
    soloInactivos: false,
    esperandoRespuesta: false,
    dialogoConfirmacion: false,
    boton: "",
    busqueda: "",
    mensaje: "",
    inscripcion: {}
  }),
  methods: {
    ...mapActions(["saveCabeceras", "saveSoloInactivos"]),
    ...mapActions("moduloInscripcion", [
      "cancelarInscripcion",
      "obtenerInscripciones",
      "terminarInscripcion"
    ]),

    registrarInscripcion() {
      this.saveCabeceras();
      this.$router.push({ name: "RegistrarInscripcion" });
    },
    activarDesactivarConfirmacion() {
      if (this.boton === "terminar") {
        this.terminarInscripcion();
      } else {
        this.cancelarInscripcion();
      }
    },
    async desactivarInscripcion(inscripcion) {
      return await this.terminarInscripcion(inscripcion);
    },
    async cancelInscripcion(inscripcion) {
      console.log("entro 2");
      return await this.cancelarInscripcion(inscripcion);
    }
  },
  async mounted() {
    await this.obtenerInscripciones();
  },
  watch: {
    soloInactivos() {
      this.saveSoloInactivos(this.soloInactivos);
    }
  },
  components: {
    tabla
  }
};
