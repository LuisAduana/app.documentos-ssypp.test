import Rules from "./../Rules";
import { mapActions, mapGetters } from "vuex";

export default {
  data: function() {
    return {
      validacion: true,
      formResponsable: this.responsable,
      nombre_responsableRules: Rules.nombre_responsableRules,
      nombre_dependenciaRules: Rules.nombre_dependenciaRules,
      correoRules: Rules.correoRules,
      num_contactoRules: Rules.num_contactoRules,
      cargoRules: Rules.cargoRules
    };
  },
  methods: {
    ...mapActions("moduloResponsable", [
      "registrarResponsable",
      "modificarResponsable"
    ]),
    ...mapActions("moduloDependencia", ["obtenerNombresDependencias"]),

    async modificar() {
      if (this.$refs.formularioResponsable.validate()) {
        await this.modificarResponsable();
      }
    },

    async registrar() {
      if (this.$refs.formularioResponsable.validate()) {
        if (await this.registrarResponsable(this.formResponsable)) {
          this.$refs.formularioResponsable.reset();
        }
      }
    },

    mensajeErrores(error) {
      this.esperandoRespuesta = false;
      if (error.response.status === 422) {
        this.snackBarError("El responsable ya se ha registrado");
      } else {
        this.snackBarError("Algo salió mal, inténtelo de nuevo.");
      }
    },

    regresar() {
      this.$router.back();
    }
  },
  props: {
    responsable: {
      type: Object,
      default: function() {
        return {
          nombre_responsable: "",
          cargo: "",
          correo: "",
          num_contacto: "",
          estado: "ACTIVO",
          nombre_dependencia: "",
          registro_responsable: true
        };
      }
    }
  },
  async mounted() {
    await this.obtenerNombresDependencias();
  },
  computed: {
    ...mapGetters(["getEsperandoRespuesta"]),
    ...mapGetters("moduloDependencia", [
      "getEsperandoNombresDependencias",
      "getNombresDependencias"
    ])
  }
};
