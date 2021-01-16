import Coordinador from "../../api/Coordinador";
import { mapActions } from "vuex";

export default {
  data: function() {
    return {
      validacion: true,
      esperandoRespuesta: false,
      formDependencia: this.dependencia,
      nombre_dependenciaRules: [
        v => !!v || "Nombre de dependencia requerido",
        v =>
          (v && v.length <= 230) || "El nombre de dependencia demasiado largo"
      ],
      nombre_contactoRules: [
        v => !!v || "Nombre de contacto requerido",
        v => (v && v.length <= 200) || "El nombre de contacto demasiado largo"
      ],
      direccionRules: [
        v => !!v || "Dirección requerida",
        v => (v && v.length <= 250) || "La dirección es demasiado larga"
      ],
      ciudadRules: [
        v => !!v || "La ciudad es requerida",
        v => (v && v.length <= 120) || "La ciudad es demasiado larga"
      ],
      correoRules: [
        v => !!v || "Correo requerido",
        v => /.+@.+\..+/.test(v) || "El correo no es válido",
        v => (v && v.length <= 150) || "El correo es demasiado largo"
      ],
      num_contactoRules: [
        v => !!v || "Número de contacto requerido",
        v => (v && v.length >= 10) || "El número es demasiado corto",
        v => (v && v.length <= 20) || "El número es demasiado largo"
      ],
      sectorRules: [
        v => !!v || "El sector es requerido",
        v => (v && v.length <= 50) || "El sector es demasiado largo"
      ],
      num_usRules: [
        v => !!v || "No. ususarios requerido",
        v => (v && v.length <= 30) || "El número es demasiado largo"
      ]
    };
  },

  methods: {
    ...mapActions(["snackBarError", "snackBarExito"]),

    modificarDependencia() {
      if (this.$refs.formularioDependencia.validate()) {
        this.esperandoRespuesta = true;
        Coordinador.modificarDependencia(this.formDependencia)
          .then(() => {
            this.esperandoRespuesta = false;
            this.snackBarExito("Dependencia modificada exitosamente");
          })
          .catch(error => {
            this.esperandoRespuesta = false;
            if (error.response.status === 422) {
              this.snackBarError(
                error.response.data.errors.nombre_dependencia[0]
              );
            } else {
              this.snackBarError("Ha ocurrido un error de modificación.");
            }
          });
      }
    },

    registrarDependencia() {
      if (this.$refs.formularioDependencia.validate()) {
        this.esperandoRespuesta = true;
        Coordinador.registrarDependencia(this.formDependencia)
          .then(() => {
            this.esperandoRespuesta = false;
            this.$refs.formularioDependencia.reset();
            this.snackBarExito("Dependencia registrada exitosamente!");
          })
          .catch(error => {
            this.esperandoRespuesta = false;
            if (error.response.status === 422) {
              this.snackBarError(
                "El nombre de la dependencia ya ha sido registrado"
              );
            } else {
              this.snackBarError("Ha ocurrido un error, inténtelo nuevamente");
            }
          });
      }
    },

    regresar() {
      this.$router.back();
    }
  },

  props: {
    dependencia: {
      type: Object,
      default: function() {
        return {
          nombre_dependencia: "",
          nombre_contacto: "",
          direccion: "",
          ciudad: "",
          correo: "",
          num_contacto: "",
          sector: "",
          num_us_directos: "",
          num_us_indirectos: "",
          estado: "ACTIVO",
          registro_dependencia: true
        };
      }
    }
  }
};
