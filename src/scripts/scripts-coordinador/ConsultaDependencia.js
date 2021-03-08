import tabla from "./../../components/Tabla";
import { mapActions } from "vuex";

export default {
  data: () => ({
    soloInactivos: false,
    busqueda: "",
    dependencia: {}
  }),
  methods: {
    ...mapActions(["saveBusquedaEnTabla", "saveSoloInactivos"]),
    ...mapActions("moduloDependencia", [
      "obtenerDependencias",
      "actDesactDependencia"
    ]),
    registrarDependencia() {
      this.$router.push({ name: "Dependencia" });
    },
    editarDependencia(dependencia) {
      dependencia.registro_dependencia = false;
      this.$router.push({
        name: "Dependencia",
        params: { dependencia: dependencia }
      });
    },
    async cambiarDependencia(item) {
      const response = await this.actDesactDependencia(item);
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    }
  },
  async mounted() {
    await this.obtenerDependencias();
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
