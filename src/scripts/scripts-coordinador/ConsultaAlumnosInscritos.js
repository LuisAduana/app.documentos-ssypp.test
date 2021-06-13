import tabla from "./../../components/Tabla";
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    busqueda: "",
    soloInscritos: false,
    titulo: "Alumnos asignados"
  }),
  methods: {
    ...mapActions(["saveBusquedaEnTabla"]),
    ...mapActions("moduloAlumno", [
      "obtenerAlumnosInscritos",
      "obtenerAlumnosConProyecto"
    ])
  },
  async mounted() {
    await this.obtenerAlumnosConProyecto();
  },
  watch: {
    busqueda() {
      this.saveBusquedaEnTabla(this.busqueda);
    },
    async soloInscritos() {
      if (this.soloInscritos) {
        if (await this.obtenerAlumnosInscritos()) {
          this.soloInscritos = true;
          this.titulo = "Alumnos sin proyectos";
        } else {
          this.soloInscritos = false;
        }
      } else {
        if (await this.obtenerAlumnosConProyecto()) {
          this.soloInscritos = false;
          this.titulo = "Alumnos inscritos";
        } else {
          this.soloInscritos = true;
        }
      }
    }
  },
  computed: {
    ...mapGetters(["getBusquedaEnTabla", "getEsperandoRespuesta"])
  },
  components: {
    tabla
  }
};
