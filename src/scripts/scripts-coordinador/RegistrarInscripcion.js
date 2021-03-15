import tabla from "./../../components/TablaSeleccion";
import Utils from "./../../store/StoreUtils";
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    mensajeError: false,
    validacion: true,
    esperandoRespuesta: false,
    step: 1,
    servicioBotonColor: "grey lighten-1",
    practicasBotonColor: "grey lighten-1",
    mensajeValidacion: "",
    inscripcion_inicio: "",
    fecha_fin: "",
    hora_fin: "",
    fin_inscripcion: "",
    tipoInscripcion: "",
    busqueda: "",
    fin_inscripcionRules: [v => !!v || "Fin de inscripción requerido"]
  }),
  methods: {
    ...mapActions(["saveBusquedaEnTabla", "saveItemsEnTabla", "snackBarError"]),
    ...mapActions("moduloProyectos", [
      "obtenerProyectosServicio",
      "obtenerProyectosPractica"
    ]),
    ...mapActions("moduloInscripcion", ["registrarInscripcion"]),

    async registrar() {
      if (this.$refs.formularioInscripcion.validate()) {
        var fechaUno = new Date(this.inscripcion_inicio);
        var fechaDos = new Date(this.fin_inscripcion);
        if (fechaDos.getTime() <= fechaUno.getTime()) {
          this.mensajeError = true;
          this.mensajeValidacion =
            "La inscripción no puede finalizar en el pasado.";
        } else {
          var datos = {
            inscripcion_inicio: this.inscripcion_inicio,
            fin_inscripcion: this.fin_inscripcion,
            tipo_inscripcion: this.tipoInscripcion,
            proyectos: this.getItemsSeleccionados
          };
          if (await this.registrarInscripcion(datos)) {
            this.$router.push({ name: "ConsultaInscripcion" });
          }
        }
      }
    },

    async consultarProyectosServicio() {
      await this.obtenerProyectosServicio({ tipo_consulta: "ACTIVO" });
    },

    async consultarProyectosPracticas() {
      await this.obtenerProyectosPractica({ tipo_consulta: "ACTIVO" });
    },

    siguientePaso() {
      if (this.tipoInscripcion === "") {
        this.servicioBotonColor = "red lighten-1";
        this.practicasBotonColor = "red lighten-1";
        this.snackBarError("Seleccione el tipo de proyectos.");
      } else {
        if (this.getItemsSeleccionados.length === 0) {
          this.snackBarError("Seleccione al menos un proyecto.");
        } else {
          this.asignarFecha();
          this.step = 2;
        }
      }
    },
    volverPaso() {
      this.step = 1;
    },
    asignarRol(rol) {
      if (rol == "servicio") {
        this.consultarProyectosServicio();
        this.practicasBotonColor = "grey lighten-1";
        this.servicioBotonColor = "primary";
      } else {
        this.servicioBotonColor = "grey lighten-1";
        this.consultarProyectosPracticas();
        this.practicasBotonColor = "primary";
      }
      this.tipoInscripcion = rol;
    },
    regresar() {
      this.$router.back();
    },
    asignarFecha() {
      this.inscripcion_inicio =
        Utils.getFechaActual() + " " + Utils.getHoraActual();
    }
  },
  mounted() {
    this.saveItemsEnTabla([]);
  },
  watch: {
    fecha_fin() {
      this.mensajeError = false;
      this.mensajeValidacion = "";
      if (this.hora_fin === "") {
        this.fin_inscripcion = this.fecha_fin + " 00:00:00";
      } else {
        this.fin_inscripcion = this.fecha_fin + " " + this.hora_fin + ":00";
      }
    },
    hora_fin() {
      this.mensajeError = false;
      this.mensajeValidacion = "";
      if (this.fecha_fin === "") {
        this.fin_inscripcion =
          Utils.getFechaActual() + " " + this.hora_fin + ":00";
      } else {
        this.fin_inscripcion = this.fecha_fin + " " + this.hora_fin + ":00";
      }
    },
    busqueda() {
      this.saveBusquedaEnTabla(this.busqueda);
    }
  },
  computed: {
    ...mapGetters(["getEsperandoRespuesta", "getItemsSeleccionados"])
  },
  components: {
    tabla
  }
};
