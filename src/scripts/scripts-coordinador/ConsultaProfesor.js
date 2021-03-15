import tabla from "./../../components/Tabla";
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    soloInactivos: false,
    busqueda: "",
    profesor: {}
  }),
  methods: {
    ...mapActions("moduloProfesor", ["obtenerProfesores", "actDesactProfesor"]),
    ...mapActions(["saveSoloInactivos", "saveBusquedaEnTabla"]),

    registrarProfesor() {
      this.$router.push({ name: "Profesor" });
    },
    editarProfesor(profesor) {
      profesor.registro_profesor = false;
      this.$router.push({
        name: "Profesor",
        params: { profesor: profesor }
      });
    },
    async cambiarProfesor(profesor) {
      return this.actDesactProfesor(profesor);
    }
  },
  async mounted() {
    await this.obtenerProfesores();
  },
  watch: {
    soloInactivos() {
      this.saveSoloInactivos(this.soloInactivos);
    },
    busqueda() {
      this.saveBusquedaEnTabla(this.busqueda);
    }
  },
  computed: {
    ...mapGetters(["getEsperandoRespuesta", "getEsperandoTabla"])
  },
  components: {
    tabla
  }
};
