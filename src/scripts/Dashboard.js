import Api from "../api/Usuario";
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    drawer: false,
    itemSeleccionado: 0,
    informacionProyecto: {},
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
        ruta: "/consulta-proyectos-practicas"
      },
      {
        text: "Alumnos Inscritos",
        icon: "mdi-account-edit",
        ruta: "/consulta-alumnos-inscritos"
      },
      {
        text: "Documentos",
        icon: "mdi-file-multiple",
        ruta: "/consulta-proyectos-servicioss"
      },
      {
        text: "Inscripción",
        icon: "mdi-clipboard-list-outline",
        ruta: "/consulta-inscripcion"
      }
    ],
    menuAlumno: [
      {
        text: "Documentos",
        icon: "mdi-block-helper",
        ruta: ""
      },
      {
        text: "Cargar documento",
        icon: "mdi-block-helper",
        ruta: ""
      },
      {
        text: "Generar documentos",
        icon: "mdi-block-helper",
        ruta: ""
      }
    ]
  }),
  methods: {
    ...mapActions(["saveAuth", "saveUsuario", "saveInformacionDashboard"]),

    logout() {
      Api.logout().then(() => {
        localStorage.removeItem("auth");
        localStorage.removeItem("rol");
        this.$router.push({ name: "Login" });
      });
    }
  },
  computed: {
    ...mapGetters(["getUsuario", "getInformacionDashboard"])
  },
  mounted() {
    Api.auth()
      .then(response => {
        this.$store.dispatch("saveUsuario", response.data);
        if (response.data.rol_usuario === "ALUMNO") {
          Api.obtenerInformacionAlumno({ id: response.data.id }).then(
            response => {
              this.$store.dispatch("saveInformacionDashboard", response.data);
            }
          );
        }
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
