// import Coordinador from "../../api/Coordinador";
import Rules from "./../Rules";
import { mapActions, mapGetters } from "vuex";

export default {
  data: function() {
    return {
      validacion: true,
      nombre_dependencia: this.proyecto.nombre_dependencia,
      formProyectoPractica: this.proyecto,
      nombre_dependenciaRules: Rules.nombre_dependenciaRules,
      nombre_responsableRules: Rules.nombre_responsableRules,
      nombre_proyectoRules: Rules.nombre_proyectoRules,
      descripcion_generalRules: Rules.descripcion_generalRules,
      objetivo_generalRules: Rules.objetivo_generalRules,
      objetivos_inmediatosRules: Rules.objetivos_inmediatosRules,
      objetivos_mediatosRules: Rules.objetivos_mediatosRules,
      metodologiaRules: Rules.metodologiaRulesOpcional,
      actividades_funcionalesRules: Rules.actividades_funcionalesRulesOpcional,
      responsabilidadesRules: Rules.responsabilidadesRulesOpcionales,
      duracionRules: Rules.duracionRulesOpcional,
      horarioRules: Rules.horarioRulesOpcional
    };
  },
  methods: {
    ...mapActions("moduloDependencia", ["obtenerNombresDependencias"]),
    ...mapActions("moduloProyectos", [
      "registrarProyectoPractica",
      "modificarProyectoPractica"
    ]),
    ...mapActions("moduloResponsable", ["obtenerNombresResponsables"]),
    ...mapActions(["snackBarError", "snackBarExito", "snackBarInfo"]),

    async registrar() {
      if (this.$refs.formularioProyectoPractica.validate()) {
        if (await this.registrarProyectoPractica(this.formProyectoPractica)) {
          this.$refs.formularioProyectoPractica.reset();
        }
      }
    },

    async modificar() {
      if (this.$refs.formularioProyectoPractica.validate()) {
        await this.modificarProyectoPractica(this.formProyectoPractica);
      }
    },

    /*modificar() {
      if (this.$refs.formularioProyectoPractica.validate()) {
        this.esperandoRespuesta = true;
        Coordinador.modificarProyectoPractica(this.formProyectoPractica)
          .then(() => {
            this.snackBarExito("Proyecto modificado exitosamente.");
          })
          .catch(error => {
            if (error.response.status === 422) {
              this.snackBarError("Ya existe un proyecto con ese nombre.");
            } else {
              this.snackBarError("Ha ocurrido un error, inténtelo nuevamente.");
            }
          })
          .finally(() => {
            this.esperandoRespuesta = false;
          });
      } else {
        console.log("No PASO");
      }
    },*/

    regresar() {
      this.$router.back();
    }
  },
  async mounted() {
    await this.obtenerNombresDependencias();
    if (!this.proyecto.registro_proyecto) {
      await this.obtenerNombresResponsables(this.nombre_dependencia);
    }
    for (const property in this.proyecto) {
      if (this.proyecto[property] == null) {
        this.proyecto[property] = "";
      }
    }
  },
  watch: {
    async nombre_dependencia() {
      this.formProyectoPractica.nombre_dependencia = this.nombre_dependencia;
      if (await this.obtenerNombresResponsables(this.nombre_dependencia)) {
        this.formProyectoPractica.nombre_responsable = "";
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
          nombre_proyecto: "",
          descripcion_general: "",
          objetivo_general: "",
          objetivos_inmediatos: "",
          objetivos_mediatos: "",
          metodologia: "",
          recursos: "",
          actividades_funcionales: "",
          responsabilidades: "",
          duracion: "",
          horario: "",
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
