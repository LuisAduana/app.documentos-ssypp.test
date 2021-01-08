import Coordinador from "../../api/Coordinador";

export default {
  data: () => ({
    esperandoTabla: false,
    busqueda: "",
    dependencias: [],
    cabeceras: [
      { text: "Nombre", value: "nombre_dependencia" },
      { text: "Nombre de contacto", value: "nombre_contacto" },
      { text: "Dirección", value: "direccion" },
      { text: "Correo", value: "correo" },
      { text: "No. Contacto", value: "num_contacto" },
      { text: "Estado", value: "estado" },
      { text: "Edición", value: "edicion", sortable: false }
    ]
  }),
  methods: {
    registrarDependencia() {
      this.$router.push({ name: "RegistrarDependencia" });
    }
  },
  mounted() {
    this.esperandoTabla = true;
    Coordinador.obtenerDependencias()
      .then(response => {
        this.dependencias = response.data;
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
