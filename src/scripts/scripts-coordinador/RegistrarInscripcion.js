import Coordinador from "./../../api/Coordinador";
import { mapActions } from "vuex";

export default {
  data: () => ({
    mensajeError: false,
    validacion: true,
    esperandoRespuesta: false,
    singleSelect: false,
    step: 1,
    servicioBotonColor: "grey lighten-1",
    practicasBotonColor: "grey lighten-1",
    mensajeValidacion: "",
    inscripcion_inicio: "",
    fecha_fin: "",
    hora_fin: "",
    fin_inscripcion: "",
    year: "",
    mount: "",
    day: "",
    hour: "",
    minute: "",
    second: "",
    tipoInscripcion: "",
    busqueda: "",
    proyectos: [],
    seleccionados: [],
    cabeceras: [],
    cabecerasServicio: [
      { text: "Dependencia", value: "nombre_dependencia" },
      { text: "No. alumnos", value: "num_alumnos" },
      { text: "Actividades", value: "actividades" },
      { text: "Direccion", value: "direccion" },
      { text: "Responsable", value: "nombre_responsable" },
      { text: "Horario", value: "horario" },
      { text: "Requisitos", value: "requisitos" }
    ],
    fin_inscripcionRules: [v => !!v || "Fin de inscripción requerido"]
  }),
  methods: {
    ...mapActions(["snackBarError", "snackBarExito"]),

    registrarInscripcion() {
      if (this.$refs.formularioInscripcion.validate()) {
        var fechaUno = new Date(this.inscripcion_inicio);
        var fechaDos = new Date(this.fin_inscripcion);
        if (fechaDos.getTime() <= fechaUno.getTime()) {
          this.mensajeError = true;
          this.mensajeValidacion =
            "La inscripción no puede finalizar en el pasado.";
        } else {
          this.esperandoRespuesta = true;
          var datos = {
            inscripcion_inicio: this.inscripcion_inicio,
            fin_inscripcion: this.fin_inscripcion,
            proyectos: this.seleccionados,
            estado_inscripcion: "ACTIVO"
          };
          if (this.tipoInscripcion === "servicio") {
            Coordinador.registrarInscripcion(datos)
              .then(() => {
                this.snackBarExito(
                  "Se ha registrado la inscripción correctamente"
                );
                this.$router.push({ name: "ConsultaInscripcion" });
              })
              .catch(error => {
                if (error.response.status === 422) {
                  this.snackBarError(error.response.data.errors.inscripcion[0]);
                } else {
                  this.snackBarError(
                    "Ha ocurrido un error, inténtelo nuevamente."
                  );
                }
              })
              .finally(() => {
                this.esperandoRespuesta = false;
              });
          } else {
            console.log("INSCRIBIENDO PRACTICAS");
          }
        }
      }
    },

    consultarProyectosServicio() {
      this.esperandoRespuesta = true;
      Coordinador.obtenerProyectosServicio({
        tipo_consulta: "NO ASIGNADO"
      })
        .then(response => {
          this.proyectos = response.data;
          this.cabeceras = this.cabecerasServicio;
        })
        .catch(() => {
          this.snackBarError(
            "No se pudieron consultar los proyectos. Inténtelo de nuevo"
          );
        })
        .finally(() => {
          this.esperandoRespuesta = false;
        });
    },
    consultarProyectosPracticas() {
      console.log("Registrar proyecto");
    },
    siguientePaso() {
      if (this.tipoInscripcion === "") {
        this.servicioBotonColor = "red lighten-1";
        this.practicasBotonColor = "red lighten-1";
        this.snackBarError("Seleccione el tipo de proyectos.");
      } else {
        if (this.seleccionados.length === 0) {
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
        this.practicasBotonColor = "primary";
      }
      this.tipoInscripcion = rol;
    },
    regresar() {
      this.$router.back();
    },
    asignarFecha() {
      this.year = new Date().getFullYear();
      this.mount =
        new Date().getMonth() < 9
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1;
      this.day =
        new Date().getDay() <= 9
          ? "0" + new Date().getDay()
          : new Date().getDay();
      this.hour =
        new Date().getHours() <= 9
          ? "0" + new Date().getHours()
          : new Date().getHours();
      this.minute =
        new Date().getMinutes() <= 9
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      this.second =
        new Date().getSeconds() <= 9
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      this.inscripcion_inicio =
        this.year +
        "-" +
        this.mount +
        "-" +
        this.day +
        " " +
        this.hour +
        ":" +
        this.minute +
        ":" +
        this.second;
    }
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
          this.year +
          "-" +
          this.mount +
          "-" +
          this.day +
          " " +
          this.hora_fin +
          ":00";
      } else {
        this.fin_inscripcion = this.fecha_fin + " " + this.hora_fin + ":00";
      }
    }
  }
};
