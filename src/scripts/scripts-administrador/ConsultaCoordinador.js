import Api from "../../api/Administrador";

export default {
  data: () => ({
    esperandoTabla: true,
    coordinadores: [],
    cabeceras: [
      { text: "No. Personal", value: "num_personal" },
      { text: "Apellido Paterno", value: "apellido_paterno" },
      { text: "Nombres", value: "nombres" },
      { text: "Correo", value: "correo" },
      { text: "Número", value: "num_contacto" },
      { text: "Estado", value: "estado" },
      { text: "Edición", value: "edicion", sortable: false }
    ]
  }),
  methods: {
    registrarCoordinador() {
      this.$router.push({ name: "RegistrarCoordinador" });
    },
    editarCoordinador(coordinador) {
      console.log("EDITAR", coordinador);
    },
    desactivarCoordinador(coordinador) {
      console.log("DESACTIVAR", coordinador);
    },
    getColor(estado) {
      if (estado === "ACTIVO") return "green";
      else return "red";
    }
  },
  mounted() {
    Api.obtenerCoordinadores()
      .then(response => {
        this.coordinadores = response.data;
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
