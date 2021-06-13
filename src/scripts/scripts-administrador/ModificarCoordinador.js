import Api from "../../api/Administrador";
import Rules from "./../Rules";
import { mapActions, mapGetters } from "vuex";

export default {
  data: function() {
    return {
      validacion: true,
      validacionPassword: true,
      esperandoRespuesta: false,
      mostrarPassword: false,
      mostrarConfirmacionPassword: false,
      password_confirmacion: "",
      resetPasswordConfirmacion: "",
      formPassword: {
        id: this.coordinador.id,
        password: ""
      },
      formCoordinador: this.coordinador,
      initCoordinador: this.coordinador,
      apellido_paternoRules: Rules.apellido_paternoRules,
      apellido_maternoRules: Rules.apellido_maternoRules,
      nombresRules: Rules.nombresRules,
      correoRules: Rules.correoRules,
      passwordRules: Rules.passwordRules,
      num_personalRules: Rules.num_personalRules,
      num_contactoRules: Rules.num_contactoRules
    };
  },
  methods: {
    ...mapActions(["snackBarError", "snackBarExito"]),
    ...mapActions("moduloUsuario", ["cambiarPassword"]),

    modificarCoordinador() {
      if (this.$refs.formularioCoordinador.validate()) {
        this.esperandoRespuesta = true;
        Api.modificarCoordinador(this.formCoordinador)
          .then(() => {
            this.esperandoRespuesta = false;
            this.snackBarExito("Coordinador modificado exitosamente");
          })
          .catch(error => {
            if (error.response && error.response.status === 422) {
              if (Object.keys(error.response.data.errors).length === 2) {
                this.snackBarError(error.response.data.errors.correo[0]);
              } else {
                if (error.response.data.errors.correo == null) {
                  this.snackBarError(
                    error.response.data.errors.num_personal[0]
                  );
                } else {
                  this.snackBarError(error.response.data.errors.correo[0]);
                }
              }
            } else {
              this.snackBarError("Ha ocurrido un error, inténtalo nuevamente");
            }
            this.esperandoRespuesta = false;
          });
      }
    },
    async modificarPassword() {
      if (this.$refs.formularioPassword.validate()) {
        if (await this.cambiarPassword(this.formPassword)) {
          this.$refs.formularioPassword.reset();
        }
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
  },
  computed: {
    ...mapGetters(["getEsperandoRespuestaDos"])
  }
};
