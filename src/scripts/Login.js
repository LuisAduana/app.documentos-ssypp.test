import Api from "../api/Usuario";
import { mapActions } from "vuex";

export default {
  data: () => ({
    validacion: true,
    esperandoRespuesta: false,
    formCredenciales: {
      correo: "",
      password: ""
    },
    correoRules: [
      v => !!v || "El correo es requerido",
      v => /.+@.+\..+/.test(v) || "El correo debe ser válido"
    ],
    passwordRules: [
      v => !!v || "La contraseña es requerida",
      v => (v && v.length >= 7) || "La contraseña es demasiado corta",
      v => (v && v.length <= 120) || "La contraseña es demasiado larga"
    ]
  }),
  methods: {
    ...mapActions(["snackBarError", "snackBarInfo", "saveAuth"]),

    login() {
      if (this.$refs.formularioCredenciales.validate()) {
        this.esperandoRespuesta = true;
        Api.login(this.formCredenciales)
          .then(response => {
            if (
              response.data.estado === "INSCRITO" ||
              response.data.estado === "ACTIVO"
            ) {
              localStorage.setItem("auth", "true");
              localStorage.setItem("rol", response.data.rol_usuario);
              this.$router.push({ name: "Dashboard" });
            } else if (response.data.estado === "INSCRIPCION") {
              this.snackBarInfo(
                "Actualmente te encuentras en proceso de asignación."
              );
            } else {
              this.snackBarError("Tu usuario está desactivado");
            }
          })
          .catch(error => {
            if (error.response.status === 422) {
              this.snackBarError("Las credenciales son inválidas");
            } else {
              this.snackBarError("Hubo un error, inténtelo nuevamente");
            }
          })
          .finally(() => {
            this.esperandoRespuesta = false;
          });
      }
    },
    registro() {
      this.$router.push({ name: "Registro" });
    }
  }
};
