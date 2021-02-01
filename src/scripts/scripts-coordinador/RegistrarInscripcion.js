import Coordinador from "./../../api/Coordinador";
import { mapActions } from "vuex";

export default {
  data: () => ({
    mensajeError: false,
    validacion: true,
    esperandoRespuesta: false,
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
            estado_inscripcion: "ACTIVO"
          };
          Coordinador.registrarInscripcion(datos)
            .then(() => {
              this.esperandoRespuesta = false;
              this.snackBarExito(
                "Se ha registrado la inscripción correctamente"
              );
            })
            .catch(error => {
              this.esperandoRespuesta = false;
              if (error.response.status === 422) {
                this.snackBarError(error.response.data.errors.inscripcion[0]);
              } else {
                this.snackBarError(
                  "Ha ocurrido un error, inténtelo nuevamente."
                );
              }
            });
        }
      }
    },
    regresar() {
      this.$router.back();
    }
  },
  mounted() {
    this.year = new Date().getFullYear();
    this.mount =
      new Date().getMonth() < 9
        ? "0" + (new Date().getMonth() + 1)
        : new Date().getMonth() + 1;
    this.day = new Date().getDate();
    this.hour = new Date().getHours();
    this.minute =
      new Date().getMinutes() < 10
        ? "0" + new Date().getMinutes()
        : new Date().getMinutes();
    this.second = new Date().getSeconds();
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
      this.fin_inscripcion = this.fecha_fin + " " + this.hora_fin + ":00";
    }
  }
};
