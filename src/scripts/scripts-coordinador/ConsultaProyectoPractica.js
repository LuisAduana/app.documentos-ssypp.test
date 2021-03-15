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
      "obtenerProyectosPractica",
      "actDesactProyectoPractica"
    ]),

    registrarProyectoPractica() {
      this.$router.push({ name: "ProyectoPractica" });
    },
    editarProyectoPractica(proyecto) {
      proyecto.registro_proyecto = false;
      this.$router.push({
        name: "ProyectoPractica",
        params: { proyecto: proyecto }
      });
    },
    async cambiarProyectoPractica(item) {
      return await this.actDesactProyectoPractica(item);
    }
  },
  async mounted() {
    await this.obtenerProyectosPractica({ tipo_consulta: "normal" });
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
