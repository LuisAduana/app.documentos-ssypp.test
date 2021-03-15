import tabla from "./../../components/Tabla";
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    busqueda: ""
  }),
  methods: {
    ...mapActions(["saveBusquedaEnTabla"]),
    ...mapActions("moduloAlumno", ["obtenerAlumnosInscritos"])
  },
  async mounted() {
    await this.obtenerAlumnosInscritos();
  },
  watch: {
    busqueda() {
      this.saveBusquedaEnTabla(this.busqueda);
    }
  },
  computed: {
    ...mapGetters(["getBusquedaEnTabla"])
  },
  components: {
    tabla
  }
};
