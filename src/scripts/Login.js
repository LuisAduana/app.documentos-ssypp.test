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
    ...mapActions(["snackBarError", "saveAuth"]),

    login() {
      if (this.$refs.formularioCredenciales.validate()) {
        this.esperandoRespuesta = true;
        Api.login(this.formCredenciales)
          .then(response => {
            localStorage.setItem("auth", "true");
            localStorage.setItem("rol", response.data.rol_usuario);
            this.esperandoRespuesta = false;
            this.$router.push({ name: "Dashboard" });
          })
          .catch(error => {
            this.esperandoRespuesta = false;
            if (error.response.status === 422) {
              this.snackBarError("Las credenciales son inválidas");
            } else {
              this.snackBarError("Hubo un error, inténtelo nuevamente");
            }
          });
      }
    },
    registro() {
      this.$router.push({ name: "Registro" });
    }
  }
};
