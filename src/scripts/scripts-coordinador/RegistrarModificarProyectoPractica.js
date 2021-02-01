import Coordinador from "../../api/Coordinador";
import { mapActions } from "vuex";

export default {
  data: function() {
    return {
      validacion: true,
      esperandoRespuesta: false,
      esperandoNombresDependencia: false,
      esperandoNombresResponsable: false,
      nombre_dependencia: this.proyecto.nombre_dependencia,
      formProyectoPractica: this.proyecto,
      nombres_dependencias: [],
      nombres_responsables: [],
      nombre_dependenciaRules: [
        v => !!v || "Nombre de dependencia requerido",
        v =>
          (v && v.length <= 230) ||
          "El nombre de responsable es demasiado largo"
      ],
      nombre_responsableRules: [
        v => !!v || "Nombre de responsable requerido",
        v =>
          (v && v.length <= 120) ||
          "El nombre de responsable es demasiado largo"
      ],
      nombre_proyectoRules: [
        v => !!v || "Nombre del proyecto requerido",
        v =>
          (v && v.length <= 250) || "El nombre del proyecto es demasiado largo"
      ],
      descripcion_generalRules: [
        v => !!v || "Descripción requerida",
        v => (v && v.length <= 250) || "La descripción es demasiado larga"
      ],
      objetivo_generalRules: [
        v => !!v || "Objetivo requerido",
        v => (v && v.length <= 250) || "El objetivo es demasiado largo"
      ],
      objetivos_inmediatosRules: [
        v => !!v || "Objetivo requerido",
        v =>
          (v && v.length <= 250) || "El objetivo inmediato es demasiado largo"
      ],
      objetivos_mediatosRules: [
        v => !!v || "Objetivo requerido",
        v => (v && v.length <= 250) || "El objetivo mediato es demasiado largo"
      ],
      metodologiaRules: [
        v => v.length <= 50 || "La metodología es demasiado larga"
      ],
      actividades_funcionalesRules: [
        v => v.length <= 250 || "Las actividades son demasiado larga"
      ],
      responsabilidadesRules: [
        v => v.length <= 200 || "Las actividades son demasiado larga"
      ],
      duracionRules: [
        v => v.length <= 200 || "La duración del proyecto es demasiado largo"
      ],
      horarioRules: [
        v => v.length <= 200 || "El horario del proyecto es demasiado largo"
      ]
    };
  },
  methods: {
    ...mapActions(["snackBarError", "snackBarExito", "snackBarInfo"]),

    registrarProyectoPractica() {
      if (this.$refs.formularioProyectoPractica.validate()) {
        this.esperandoRespuesta = true;
        Coordinador.registrarProyectoPractica(this.formProyectoPractica)
          .then(() => {
            this.snackBarExito("El proyecto se ha registrado exitosamente.");
            this.$refs.formularioProyectoPractica.reset();
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
      }
    },

    modificarProyectoPractica() {
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
      }
    },

    regresar() {
      this.$router.back();
    }
  },
  mounted() {
    this.esperandoNombresDependencia = true;
    Coordinador.obtenerNombresDependencias()
      .then(response => {
        if (response.data.length == 0) {
          this.snackBarError(
            "No hay ninguna dependencia registrada. Por favor registre una."
          );
        } else {
          this.nombres_dependencias = response.data;
          this.esperandoNombresDependencia = false;
        }
      })
      .catch(() => {
        this.snackBarError(
          "No se pudieron consultar las dependencias, sin las dependencias no podrá registrar o modificar un proyecto. Recargue la página."
        );
        this.esperandoNombresDependencia = false;
      });
    if (!this.proyecto.registro_proyecto) {
      Coordinador.obtenerNombresResponsables({
        nombre_dependencia: this.nombre_dependencia
      })
        .then(response => {
          this.nombres_responsables = response.data;
        })
        .catch(() => {
          this.snackBarError(
            "No se pudieron consultar los responsables, sin los responsables no podrá registrar o modificar un proyecto. Recargue la página."
          );
        });
    }
  },
  watch: {
    nombre_dependencia() {
      this.esperandoNombresResponsable = true;
      this.formProyectoPractica.nombre_dependencia = this.nombre_dependencia;
      Coordinador.obtenerNombresResponsables({
        nombre_dependencia: this.nombre_dependencia
      })
        .then(response => {
          this.esperandoNombresResponsable = false;
          if (response.data.length == 0) {
            this.nombres_responsables = [];
            this.formProyectoPractica.nombre_responsable = "";
            this.snackBarInfo(
              "No hay ningún responsable registrado o activados en esa dependencia. Por favor registre o active uno."
            );
          } else {
            this.nombres_responsables = response.data;
          }
        })
        .catch(error => {
          this.esperandoNombresResponsable = false;
          if (error.response.status !== 422) {
            this.snackBarError(
              "No se pudieron consultar los responsables, sin los responsables no podrá registrar o modificar un proyecto. Recargue la página."
            );
          }
        });
    }
  },
  props: {
    proyecto: {
      type: Object,
      default: function() {
        return {
          estado: "NO ASIGNADO",
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
  }
};
