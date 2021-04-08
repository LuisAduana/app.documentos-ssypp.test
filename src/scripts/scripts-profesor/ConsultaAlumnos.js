import Tabla from "./../../components/Tabla";
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    busqueda: ""
  }),
  async mounted() {
    await this.obtenerAlumnos({ id: this.getUsuario.profesor.id });
  },
  methods: {
    ...mapActions("moduloProfesor", ["obtenerAlumnos"]),
    ...mapActions(["saveBusquedaEnTabla"])
  },
  watch: {
    busqueda() {
      this.saveBusquedaEnTabla(this.busqueda);
    }
  },
  computed: {
    ...mapGetters(["getUsuario"])
  },
  components: {
    Tabla
  }
};
