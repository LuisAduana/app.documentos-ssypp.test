import tabla from "./../../components/Tabla";
import { mapActions } from "vuex";

export default {
  data: () => ({
    soloInactivos: false,
    busqueda: "",
    responsable: {}
  }),
  methods: {
    ...mapActions(["saveBusquedaEnTabla", "saveSoloInactivos"]),
    ...mapActions("moduloResponsable", [
      "obtenerResponsables",
      "actDesactResponsable"
    ]),
    registrarResponsable() {
      this.$router.push({ name: "Responsable" });
    },
    editarResponsable(responsable) {
      responsable.registro_responsable = false;
      this.$router.push({
        name: "Responsable",
        params: { responsable: responsable }
      });
    },
    async cambiarResponsable(item) {
      return await this.actDesactResponsable(item);
    }
  },
  async mounted() {
    await this.obtenerResponsables();
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
