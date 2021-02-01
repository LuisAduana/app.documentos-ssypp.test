import Coordinador from "./../../api/Coordinador";

export default {
  data: () => ({
    esperandoTabla: false,
    soloInactivos: false,
    busqueda: "",
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
    registrarInscripcion() {
      this.$router.push({ name: "RegistrarInscripcion" });
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
