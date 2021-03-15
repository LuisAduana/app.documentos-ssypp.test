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
        if (await this.loginUsuario(this.formCredenciales)) {
          this.$router.push({ name: "Dashboard" });
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
