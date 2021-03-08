// eslint-disable-next-line prettier/prettier
import { nombre_dependenciaRules, nombre_contactoRules, direccionRules, ciudadRules, correoRules, num_contactoRules, sectorRules, num_usRules } from "./../Rules";
import { mapActions, mapGetters } from "vuex";

export default {
  data: function() {
    return {
      validacion: true,
      formDependencia: this.dependencia,
      nombre_dependenciaRules: nombre_dependenciaRules,
      nombre_contactoRules: nombre_contactoRules,
      direccionRules: direccionRules,
      ciudadRules: ciudadRules,
      correoRules: correoRules,
      num_contactoRules: num_contactoRules,
      sectorRules: sectorRules,
      num_usRules: num_usRules
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
        const response = await this.registrarDependencia(this.formDependencia);
        if (response.status === 200) {
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
