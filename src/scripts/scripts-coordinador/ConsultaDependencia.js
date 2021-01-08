import Coordinador from "../../api/Coordinador";
import { mapActions } from "vuex";

export default {
  data: () => ({
    dialogoConfirmarActDesactivar: false,
    esperandoRespuestaActDesact: false,
    esperandoTabla: false,
    busqueda: "",
    mensaje: "",
    dependencias: [],
    dependenciaEdit: {},
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
    ...mapActions(["snackBarError", "snackBarExito"]),

    registrarDependencia() {
      this.$router.push({ name: "RegistrarDependencia" });
    },
    editarDependencia(dependencia) {
      this.$router.push({
        name: "ModificarDependencia",
        params: { dependencia: dependencia }
      });
    },
    activarDesactivarConfirmacion() {
      this.esperandoRespuestaActDesact = true;
      var datos = {
        estado:
          this.dependenciaEdit.estado === "ACTIVO" ? "DESACTIVADO" : "ACTIVO",
        id: this.dependenciaEdit.id
      };
      Coordinador.actDesactDependencia(datos)
        .then(() => {
          for (var i = 0; i < this.dependencias.length; i++) {
            if (
              this.dependencias[i].nombre_dependencia ===
              this.dependenciaEdit.nombre_dependencia
            ) {
              this.dependencias[i].estado =
                this.dependenciaEdit.estado === "ACTIVO"
                  ? "DESACTIVADO"
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
    desactivarActivarDependencia(dependencia) {
      this.dependenciaEdit = Object.assign({}, dependencia);
      dependencia.estado === "ACTIVO"
        ? (this.mensaje =
            "desactivar a " + dependencia.nombre_dependencia + "?")
        : (this.mensaje = "activar a " + dependencia.nombre_dependencia + "?");
      this.dialogoConfirmarActDesactivar = true;
    },
    cerrarDialogo() {
      this.dialogoConfirmarActDesactivar = false;
      this.$nextTick(() => {
        this.dependenciaEdit = {};
      });
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
