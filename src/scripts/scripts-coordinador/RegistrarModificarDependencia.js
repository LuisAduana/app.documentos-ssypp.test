import Rules from "./../Rules";
import { mapActions, mapGetters } from "vuex";

export default {
  data: function() {
    return {
      validacion: true,
      formDependencia: this.dependencia,
      nombre_dependenciaRules: Rules.nombre_dependenciaRules,
      nombre_contactoRules: Rules.nombre_contactoRules,
      direccionRules: Rules.direccionRules,
      ciudadRules: Rules.ciudadRules,
      correoRules: Rules.correoRules,
      num_contactoRules: Rules.num_contactoRules,
      sectorRules: Rules.sectorRules,
      num_usRules: Rules.num_usRules
    };
  },

  methods: {
    ...mapActions("moduloDependencia", [
      "registrarDependencia",
      "modificarDependencia"
    ]),

    async modificar() {
      if (this.$refs.formularioDependencia.validate()) {
        await this.modificarDependencia(this.formDependencia);
      }
    },

    async registrar() {
      if (this.$refs.formularioDependencia.validate()) {
        if (await this.registrarDependencia(this.formDependencia)) {
          this.$refs.formularioDependencia.reset();
        }
      }
    },

    regresar() {
      this.$router.back();
    }
  },

  props: {
    dependencia: {
      type: Object,
      default: function() {
        return {
          nombre_dependencia: "",
          nombre_contacto: "",
          direccion: "",
          ciudad: "",
          correo: "",
          num_contacto: "",
          sector: "",
          num_us_directos: "",
          num_us_indirectos: "",
          estado: "ACTIVO",
          registro_dependencia: true
        };
      }
    }
  },
  computed: {
    ...mapGetters(["getEsperandoRespuesta"])
  }
};
