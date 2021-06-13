import Administrador from "../../api/Administrador";
import { mapActions } from "vuex";

export default {
  data: () => ({
    dialogoConfirmarActDesactivar: false,
    esperandoTabla: false,
    esperandoRespuestaActDesact: false,
    busqueda: "",
    coordinadores: [],
    coordinadorEdit: {},
    cabeceras: [
      { text: "No. Personal", value: "num_personal" },
      { text: "Apellido Paterno", value: "apellido_paterno" },
      { text: "Nombres", value: "nombres" },
      { text: "Correo", value: "correo" },
      { text: "Número", value: "num_contacto" },
      { text: "Estado", value: "estado" },
      { text: "Edición", value: "edicion", sortable: false }
    ],
    mensaje: ""
  }),
  methods: {
    ...mapActions(["snackBarError", "snackBarExito"]),

    registrarCoordinador() {
      this.$router.push({ name: "RegistrarCoordinador" });
    },
    editarCoordinador(coordinador) {
      this.$router.push({
        name: "ModificarCoordinador",
        params: { coordinador: coordinador }
      });
    },
    desactivarActivarCoordinador(coordinador) {
      this.coordinadorEdit = Object.assign({}, coordinador);
      coordinador.estado === "ACTIVO"
        ? (this.mensaje = "desactivar a " + coordinador.nombres + "?")
        : (this.mensaje = "activar a " + coordinador.nombres + "?");
      this.dialogoConfirmarActDesactivar = true;
    },
    activarDesactivarConfirmacion() {
      var datos = {
        estado:
          this.coordinadorEdit.estado === "ACTIVO" ? "INACTIVO" : "ACTIVO",
        correo: this.coordinadorEdit.correo
      };
      var paso = false;
      if (datos.estado === "ACTIVO") {
        this.coordinadores.forEach(element => {
          if (element.estado === "ACTIVO") {
            paso = true;
            this.snackBarError("Ya existe un coorinador activo");
            return;
          }
        });
      }
      if (paso) return;
      Administrador.actDesactCoordinador(datos)
        .then(() => {
          for (var i = 0; i < this.coordinadores.length; i++) {
            if (this.coordinadores[i].correo === this.coordinadorEdit.correo) {
              this.coordinadores[i].estado =
                this.coordinadorEdit.estado === "ACTIVO"
                  ? "INACTIVO"
                  : "ACTIVO";
            }
          }
          this.esperandoRespuestaActDesact = false;
          this.cerrarDialogo();
          this.snackBarExito("Se ha desactivado con exitosamente");
        })
        .catch(() => {
          this.esperandoRespuestaActDesact = false;
          this.snackBarError("Ocurrió un error, inténtelo de nuevo");
        });
    },
    cerrarDialogo() {
      this.dialogoConfirmarActDesactivar = false;
      this.$nextTick(() => {
        this.coordinadorEdit = {};
      });
    },
    getColor(estado) {
      if (estado === "ACTIVO") return "blue";
      else return "red";
    }
  },
  mounted() {
    this.esperandoTabla = true;
    Administrador.obtenerCoordinadores()
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
