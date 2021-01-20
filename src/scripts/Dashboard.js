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
      {
        text: "Dependencias",
        icon: "mdi-office-building-outline",
        ruta: "/consulta-dependencias"
      },
      {
        text: "Responsables",
        icon: "mdi-account",
        ruta: "/consulta-responsables"
      },
      {
        text: "Proyectos Servicio",
        icon: "mdi-file-cabinet",
        ruta: "/consulta-proyectos-servicio"
      },
      {
        text: "Proyectos Practica",
        icon: "mdi-clipboard-file",
        ruta: "/consulta-proyectos-servicios"
      },
      {
        text: "Documentos",
        icon: "mdi-file-multiple",
        ruta: "/consulta-proyectos-servicioss"
      }
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
