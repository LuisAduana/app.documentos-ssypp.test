import { correoRules, passwordRules } from "./Rules";
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    validacion: true,
    formCredenciales: {
      correo: "",
      password: ""
    },
    correoRules: correoRules,
    passwordRules: passwordRules
  }),
  methods: {
    ...mapActions("moduloUsuario", ["loginUsuario"]),
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
  mounted() {
    this.saveUsuario({});
    this.saveInformacionDashboard({});
  },
  computed: {
    ...mapGetters(["getEsperandoRespuesta"])
  }
};
