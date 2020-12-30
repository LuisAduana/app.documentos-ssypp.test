import Api from "../api/Usuario";
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    drawer: false,
    itemSeleccionado: 0,
    menuAdministrador: [
      {
        text: "Coordinadores",
        icon: "mdi-clock",
        ruta: "/consulta-coordinadores"
      }
    ],
    menuCoordinador: [
      { text: "Proyectos", icon: "mdi-account", ruta: "/consulta-proyectos" },
      { text: "Documentos", icon: "mdi-flag", ruta: "/consulta-documentos" }
    ]
  }),
  methods: {
    ...mapActions(["saveAuth"]),

    logout() {
      Api.logout().then(() => {
        localStorage.removeItem("auth");
        localStorage.removeItem("rol");
        this.$router.push({ name: "Login" });
      });
    }
  },
  computed: {
    ...mapGetters(["getUsuario"])
  },
  mounted() {
    Api.auth()
      .then(response => {
        this.$store.dispatch("saveUsuario", response.data);
      })
      .catch(error => {
        if (error.response.status === 401) {
          localStorage.removeItem("auth");
          this.$router.push({ name: "Login" });
        } else {
          localStorage.removeItem("auth");
          this.$router.push({ name: "NotFound" });
        }
      });
  }
};
