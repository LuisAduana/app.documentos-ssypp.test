import tabla from "./../../components/Tabla";
import { mapActions } from "vuex";

export default {
  data: () => ({
    soloInactivos: false,
    busqueda: "",
    proyecto: {}
  }),
  methods: {
    ...mapActions(["saveBusquedaEnTabla", "saveSoloInactivos"]),
    ...mapActions("moduloProyectos", [
      "obtenerProyectosServicio",
      "actDesactProyectoServicio"
    ]),

    registrarProyectoServicio() {
      this.$router.push({ name: "ProyectoServicio" });
    },
    editarProyectoServicio(proyecto) {
      proyecto.registro_proyecto = false;
      this.$router.push({
        name: "ProyectoServicio",
        params: { proyecto: proyecto }
      });
    },
    async cambiarProyectoServicio(item) {
      return await this.actDesactProyectoServicio(item);
    }
  },
  async mounted() {
    await this.obtenerProyectosServicio({ tipo_consulta: "normal" });
  },
  watch: {
    soloInactivos() {
      this.saveSoloInactivos(this.soloInactivos);
    },
    busqueda() {
      this.saveBusquedaEnTabla(this.busqueda);
    }
  },
  components: {
    tabla
  }
};
