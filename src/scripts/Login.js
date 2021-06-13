import Rules from "./Rules";
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    validacion: true,
    formCredenciales: {
      correo: "",
      password: ""
    },
    correoRules: Rules.correoRules,
    passwordRules: Rules.passwordRules
  }),
  methods: {
    ...mapActions("moduloUsuario", ["loginUsuario", "authUsuario"]),
    ...mapActions(["saveInformacionDashboard", "saveUsuario"]),

    async login() {
      if (this.$refs.formularioCredenciales.validate()) {
        const response = await this.loginUsuario(this.formCredenciales);
        if (response.respuesta) {
          if (response.rol_usuario === "ALUMNO") {
            this.$router.push({ name: "ConsultarDocumento" });
          } else if (response.rol_usuario === "PROFESOR") {
            this.$router.push({ name: "ConsultaAlumnos" });
          } else if (response.rol_usuario === "COORDINADOR") {
            this.$router.push({ name: "ConsultaAlumnosInscritos" });
          } else if (response.rol_usuario === "ADMINISTRADOR") {
            this.$router.push({ name: "ConsultaCoordinadores" });
          }
        }
      }
    },
    registro() {
      this.$router.push({ name: "Registro" });
    }
  },
  async mounted() {
    const response = await this.authUsuario();
    if (response === 200) {
      this.$router.push({ name: "Dashboard" });
    }
  },
  computed: {
    ...mapGetters(["getEsperandoRespuesta"])
  }
};
