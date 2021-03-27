import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    drawer: false,
    itemSeleccionado: 0,
    informacionProyecto: {},
    menu: [],
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
        icon: "mdi-school",
        ruta: "/consulta-alumnos-inscritos"
      },
      {
        text: "Documentos",
        icon: "mdi-file-multiple",
        ruta: "/consulta-proyectos-servicioss"
      },
      {
        text: "Profesores",
        icon: "mdi-face-profile",
        ruta: "/consulta-profesores"
      },
      {
        text: "Inscripción",
        icon: "mdi-clipboard-list-outline",
        ruta: "/consulta-inscripcion"
      }
    ],
    menuProfesor: [
      {
        text: "Alumnos",
        icon: "mdi-school",
        ruta: "/consulta-alumnos"
      }
    ],
    menuAlumno: [
      {
        text: "Documentos",
        icon: "mdi-file-document-multiple-outline",
        ruta: "/consultar-documentos"
      },
      {
        text: "Proyecto",
        icon: "mdi-office-building-outline",
        ruta: "/informacion-proyecto"
      }
    ]
  }),
  methods: {
    ...mapActions("moduloUsuario", [
      "authUsuario",
      "logoutUsuario",
      "obtenerInformacionAlumno",
      "obtenerInformacionProfesor"
    ]),

    async logout() {
      const response = await this.logoutUsuario();
      if (response.status === 200) {
        this.$router.push({ name: "Login" });
      }
    },

    modificarDatosPersonales() {
      this.$router.push({ name: "DatosPersonales" });
    }
  },
  async mounted() {
    const response = await this.authUsuario();
    if (response === 200) {
      if (this.getUsuario.rol_usuario === "ALUMNO") {
        this.menu = this.menuAlumno;
        await this.obtenerInformacionAlumno({
          id: this.getUsuario.id
        });
      } else if (this.getUsuario.rol_usuario === "PROFESOR") {
        this.menu = this.menuProfesor;
      } else if (this.getUsuario.rol_usuario === "COORDINADOR") {
        this.menu = this.menuCoordinador;
      } else if (this.getUsuario.rol_usuario === "ADMINISTRADOR") {
        this.menu = this.menuAdministrador;
      }
    } else if (response === 401) {
      this.$router.push({ name: "Login" });
    } else {
      this.$router.push({ name: "NotFound" });
    }
  },
  computed: {
    ...mapGetters(["getUsuario", "getInformacionDashboard"])
  }
};
