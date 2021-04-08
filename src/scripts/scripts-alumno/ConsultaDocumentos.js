import Tabla from "./../../components/Tabla";
import Seleccionar from "./../../components/SeleccionarDocumento";
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    busqueda: ""
  }),
  async mounted() {
    await this.obtenerDocumentosProyecto({ id: this.getUsuario.id });
  },
  methods: {
    ...mapActions("moduloDocumento", ["obtenerDocumentosProyecto"]),
    ...mapActions(["saveBusquedaEnTabla", "saveDialogoDocumento"])
  },
  watch: {
    busqueda() {
      this.saveBusquedaEnTabla(this.busqueda);
    }
  },
  computed: {
    ...mapGetters([
      "getDialogoDocumento",
      "getEsperandoRespuesta",
      "getInformacionDashboard",
      "getUsuario"
    ])
  },
  components: {
    Tabla,
    Seleccionar
  }
};
