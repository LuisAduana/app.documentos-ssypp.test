import Coordinador from "./../../api/Coordinador";
import { mapActions } from "vuex";

export default {
  data: () => ({
    soloInactivos: false,
    esperandoTabla: false,
    dialogoConfirmarActDesactivar: false,
    esperandoRespuestaActDesact: false,
    busqueda: "",
    mensaje: "",
    proyectoEdit: {},
    proyectosEnTabla: [],
    proyectosActivos: [],
    proyectosInactivos: [],
    cabeceras: [
      { text: "Dependencia", value: "nombre_dependencia" },
      { text: "Responsable", value: "nombre_responsable" },
      { text: "No. alumnos", value: "num_alumnos" },
      { text: "Actividades", value: "actividades" },
      { text: "Direccion", value: "direccion" },
      { text: "Horario", value: "horario" },
      { text: "Requisitos", value: "requisitos" },
      { text: "Estado", value: "estado" },
      { text: "Edición", value: "edicion", sortable: false }
    ]
  }),
  methods: {
    ...mapActions(["snackBarError", "snackBarExito", "snackBarInfo"]),

    registrarProyectoServicio() {
      this.$router.push({ name: "ProyectoServicio" });
    },
    modificarProyectoServicio(proyecto) {
      proyecto.registro_proyecto = false;
      this.$router.push({
        name: "ProyectoServicio",
        params: { proyecto: proyecto }
      });
    },

    activarDesactivarConfirmacion() {
      this.esperandoRespuestaActDesact = true;
      var datos = {
        estado:
          this.proyectoEdit.estado === "NO ASIGNADO"
            ? "INACTIVO"
            : "NO ASIGNADO",
        id: this.proyectoEdit.id_proyecto
      };
      Coordinador.actDesactProyecto(datos)
        .then(() => {
          for (var i = 0; i < this.proyectosEnTabla.length; i++) {
            if (this.proyectosEnTabla[i].id === this.proyectoEdit.id) {
              if (this.proyectosEnTabla[i].estado === "NO ASIGNADO") {
                this.proyectosInactivos.push(this.proyectosEnTabla[i]);
              } else {
                this.proyectosActivos.push(this.proyectosEnTabla[i]);
              }
              this.proyectosEnTabla[i].estado =
                this.proyectoEdit.estado === "NO ASIGNADO"
                  ? "INACTIVO"
                  : "NO ASIGNADO";
              this.proyectosEnTabla.splice(i, 1);
            }
          }
          this.esperandoRespuestaActDesact = false;
          this.cerrarDialogo();
          this.snackBarExito("Se ha modificado con exitosamente");
        })
        .catch(error => {
          if (error.response.status === 422) {
            this.snackBarInfo(error.response.data.errors.estado[0]);
          } else {
            this.snackBarError("Ocurrió un error, inténtelo de nuevo");
          }
          this.esperandoRespuestaActDesact = false;
        });
    },
    desactivarActivarProyecto(proyecto) {
      this.proyectoEdit = Object.assign({}, proyecto);
      proyecto.estado === "NO ASIGNADO"
        ? (this.mensaje = "desactivar este proyecto")
        : (this.mensaje = "activar a este proyecto");
      this.dialogoConfirmarActDesactivar = true;
    },
    cerrarDialogo() {
      this.dialogoConfirmarActDesactivar = false;
      this.$nextTick(() => {
        this.proyectoEdit = {};
      });
    }
  },
  mounted() {
    this.esperandoTabla = true;
    Coordinador.obtenerProyectosServicio()
      .then(response => {
        for (var i = 0; i < response.data.length; i++) {
          if (response.data[i].estado !== "INACTIVO") {
            this.proyectosActivos.push(response.data[i]);
          } else {
            this.proyectosInactivos.push(response.data[i]);
          }
        }
        this.proyectosEnTabla = this.proyectosActivos;
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
        this.proyectosEnTabla = this.proyectosInactivos;
      } else {
        this.proyectosEnTabla = this.proyectosActivos;
      }
    }
  }
};
