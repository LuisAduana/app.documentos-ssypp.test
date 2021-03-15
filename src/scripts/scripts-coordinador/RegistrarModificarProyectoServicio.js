import Rules from "./../Rules";
import { mapActions, mapGetters } from "vuex";

export default {
  data: function() {
    return {
      validacion: true,
      nombre_dependencia: this.proyecto.nombre_dependencia,
      formProyectoServicio: this.proyecto,
      nombre_responsableRules: Rules.nombre_responsableRules,
      nombre_dependenciaRules: Rules.nombre_dependenciaRules,
      actividadesRules: Rules.actividadesRules,
      horarioRules: Rules.horarioRules,
      requisitosRules: Rules.requisitosRules,
      num_alumnosRules: Rules.num_alumnosRules
    };
  },
  methods: {
    ...mapActions("moduloDependencia", ["obtenerNombresDependencias"]),
    ...mapActions("moduloProyectos", [
      "registrarProyectoServicio",
      "modificarProyectoServicio"
    ]),
    ...mapActions("moduloResponsable", ["obtenerNombresResponsables"]),

    async registrar() {
      if (this.$refs.formularioProyectoServicio.validate()) {
        if (await this.registrarProyectoServicio(this.formProyectoServicio)) {
          this.$refs.formularioProyectoServicio.reset();
        }
      }
    },
    async modificar() {
      if (this.$refs.formularioProyectoServicio.validate()) {
        await this.modificarProyectoServicio(this.formProyectoServicio);
      }
    },
    regresar() {
      this.$router.back();
    }
  },
  async mounted() {
    await this.obtenerNombresDependencias();
    if (!this.proyecto.registro_proyecto) {
      await this.obtenerNombresResponsables(this.nombre_dependencia);
    }
  },
  watch: {
    async nombre_dependencia() {
      this.formProyectoServicio.nombre_dependencia = this.nombre_dependencia;
      if (await this.obtenerNombresResponsables(this.nombre_dependencia)) {
        this.formProyectoServicio.nombre_responsable = "";
      }
    }
  },

  props: {
    proyecto: {
      type: Object,
      default: function() {
        return {
          estado: "ACTIVO",
          nombre_responsable: "",
          nombre_dependencia: "",
          num_alumnos: "",
          actividades: "",
          horario: "",
          requisitos: "",
          registro_proyecto: true
        };
      }
    }
  },
  computed: {
    ...mapGetters(["getEsperandoRespuesta"]),
    ...mapGetters("moduloDependencia", [
      "getEsperandoNombresDependencias",
      "getNombresDependencias"
    ]),
    ...mapGetters("moduloResponsable", [
      "getEsperandoNombresResponsables",
      "getNombresResponsables"
    ])
  }
};
