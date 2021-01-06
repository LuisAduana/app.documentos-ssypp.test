import Api from "../../api/Administrador";
import { mapActions } from "vuex";

export default {
  data: function() {
    return {
      validacion: true,
      esperandoRespuesta: false,
      mostrarPassword: false,
      mostrarConfirmacionPassword: false,
      password_confirmacion: "",
      formCoordinador: this.coordinador,
      initCoordinador: this.coordinador,
      apellido_paternoRules: [
        v => !!v || "El apellido es requerido",
        v => (v && v.length <= 45) || "El apellido es demasiado largo"
      ],
      apellido_maternoRules: [
        v => !!v || "El apellido es requerido",
        v => (v && v.length <= 450) || "El apellido es demasiado larga"
      ],
      nombresRules: [
        v => !!v || "Nombre(s) requerido(s)",
        v => (v && v.length <= 90) || "Nombre demasiado largo"
      ],
      correoRules: [
        v => !!v || "Correo requerido",
        v => /.+@.+\..+/.test(v) || "El correo debe ser válido",
        v => (v && v.length <= 150) || "El correo es demasiado largo"
      ],
      passwordRules: [
        v => !!v || "Contraseña requerida",
        v => (v && v.length >= 7) || "La contraseña es demasiado corta",
        v => (v && v.length <= 120) || "La contraseña es demasiado larga"
      ],
      num_personalRules: [
        v => !!v || "No. personal requerido",
        v => (v && v.length >= 10) || "No. personal incorrecto (corto)",
        v => (v && v.length <= 10) || "No. personal incorrecto (largo)"
      ],
      num_contactoRules: [
        v => !!v || "Número de contacto requerido",
        v => (v && v.length >= 10) || "El número es demasiado corto",
        v => (v && v.length <= 20) || "El número es demasiado largo"
      ]
    };
  },
  methods: {
    ...mapActions(["snackBarError", "snackBarExito"]),

    modificarCoordinador() {
      if (this.$refs.formularioCoordinador.validate()) {
        this.esperandoRespuesta = true;
        Api.modificarCoordinador(this.formCoordinador)
          .then(() => {
            this.esperandoRespuesta = false;
            this.snackBarExito("Coordinador modificado exitosamente");
          })
          .catch(error => {
            this.esperandoRespuesta = false;
            if (error.response.status === 422) {
              if (Object.keys(error.response.data.errors).length === 2) {
                this.snackBarError(error.response.data.errors.correo[0]);
              } else {
                this.snackBarError(error.response.data.errors.num_personal[0]);
              }
            } else {
              this.snackBarError("Ha ocurrido un error, inténtelo nuevamente.");
            }
          });
      }
    },
    regresar() {
      this.$router.push({ name: "ConsultaCoordinadores" });
    }
  },
  props: {
    coordinador: {
      type: Object,
      default: function() {
        return {
          apellido_paterno: ""
        };
      }
    }
  },
  mounted() {
    if (this.formCoordinador.apellido_paterno === "") {
      this.$router.push({ name: "ConsultaCoordinadores" });
    }
  }
};
