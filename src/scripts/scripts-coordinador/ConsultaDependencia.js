import Coordinador from "../../api/Coordinador";
import { mapActions } from "vuex";

export default {
  data: () => ({
    dialogoConfirmarActDesactivar: false,
    esperandoRespuestaActDesact: false,
    esperandoTabla: false,
    soloInactivos: false,
    busqueda: "",
    mensaje: "",
    dependenciasEnTabla: [],
    dependenciasActivas: [],
    dependenciasInactivas: [],
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
      this.$router.push({ name: "Dependencia" });
    },
    editarDependencia(dependencia) {
      dependencia.registro_dependencia = false;
      this.$router.push({
        name: "Dependencia",
        params: { dependencia: dependencia }
      });
    },
    activarDesactivarConfirmacion() {
      this.esperandoRespuestaActDesact = true;
      var datos = {
        estado:
          this.dependenciaEdit.estado === "ACTIVO" ? "INACTIVO" : "ACTIVO",
        id: this.dependenciaEdit.id
      };
      Coordinador.actDesactDependencia(datos)
        .then(() => {
          for (var i = 0; i < this.dependenciasEnTabla.length; i++) {
            if (
              this.dependenciasEnTabla[i].nombre_dependencia ===
              this.dependenciaEdit.nombre_dependencia
            ) {
              if (this.dependenciasEnTabla[i].estado === "ACTIVO") {
                this.dependenciasInactivas.push(this.dependenciasEnTabla[i]);
              } else {
                this.dependenciasActivas.push(this.dependenciasEnTabla[i]);
              }
              this.dependenciasEnTabla[i].estado =
                this.dependenciaEdit.estado === "ACTIVO"
                  ? "INACTIVO"
                  : "ACTIVO";
              this.dependenciasEnTabla.splice(i, 1);
            }
          }
          this.cerrarDialogo();
          this.snackBarExito("Se ha desactivado con exitosamente");
        })
        .catch(() => {
          this.snackBarError("Ocurrió un error, inténtelo de nuevo");
        })
        .finally(() => {
          this.esperandoRespuestaActDesact = false;
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
        for (var i = 0; i < response.data.length; i++) {
          if (response.data[i].estado === "ACTIVO") {
            this.dependenciasActivas.push(response.data[i]);
          } else {
            this.dependenciasInactivas.push(response.data[i]);
          }
        }
        this.dependenciasEnTabla = this.dependenciasActivas;
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
        this.dependenciasEnTabla = this.dependenciasInactivas;
      } else {
        this.dependenciasEnTabla = this.dependenciasActivas;
      }
    }
  }
};
