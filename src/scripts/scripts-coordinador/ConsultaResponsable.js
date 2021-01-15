import Coordinador from "../../api/Coordinador";

export default {
  data: () => ({
    esperandoTabla: false,
    busqueda: "",
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
    registrarResponsable() {
      this.$router.push({ name: "RegistrarResponsable" });
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
