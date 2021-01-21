import Coordinador from "./../../api/Coordinador";
import { mapActions } from "vuex";

export default {
  data: function() {
    return {
      validacion: true,
      esperandoRespuesta: false,
      esperandoNombresDependencia: false,
      esperandoNombresResponsable: false,
      nombre_dependencia: this.proyecto.nombre_dependencia,
      nombres_dependencias: [],
      nombres_responsables: [],
      formProyectoServicio: this.proyecto,
      nombre_responsableRules: [
        v => !!v || "Nombre de responsable requerido",
        v =>
          (v && v.length <= 120) ||
          "El nombre de responsable es demasiado largo"
      ],
      nombre_dependenciaRules: [
        v => !!v || "Nombre de dependencia requerido",
        v =>
          (v && v.length <= 230) ||
          "El nombre de responsable es demasiado largo"
      ],
      actividadesRules: [
        v => !!v || "Actividades requeridas",
        v => (v && v.length <= 250) || "Las actividades son demasiado largas"
      ],
      horarioRules: [
        v => !!v || "Horario requerido",
        v => (v && v.length <= 100) || "El horario es demasiado largo"
      ],
      requisitosRules: [
        v => !!v || "Requisitos requerido",
        v => (v && v.length <= 250) || "Las actividades son demasiado largas"
      ],
      num_alumnosRules: [
        v => !!v || "No. de alumnos requerido",
        v => (v && v.length <= 45) || "El campo es demasiado largo"
      ]
    };
  },
  methods: {
    ...mapActions(["snackBarError", "snackBarExito"]),

    registrarProyectoServicio() {
      if (this.$refs.formularioProyectoServicio.validate()) {
        this.esperandoRespuesta = true;
        Coordinador.registrarProyectoServicio(this.formProyectoServicio)
          .then(() => {
            this.snackBarExito("¡Proyecto registrado exitosamente!");
            this.$refs.formularioProyectoServicio.reset();
            this.esperandoRespuesta = false;
          })
          .catch(() => {
            this.snackBarError("Ocurrió un error inténtelo de nuevo");
            this.esperandoRespuesta = false;
          });
      }
    },
    modificarProyectoServicio() {
      if (this.$refs.formularioProyectoServicio.validate()) {
        this.esperandoRespuesta = true;
        Coordinador.modificarProyectoServicio(this.formProyectoServicio)
          .then(() => {
            this.snackBarExito("¡Proyecto modificado exitosamente!");
            this.esperandoRespuesta = false;
          })
          .catch(() => {
            this.snackBarError("Ocurrió un error inténtelo de nuevo");
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
          this.$store.dispatch(
            "snackBarInfo",
            "No hay ninguna dependencia registrada. Por favor registre una."
          );
        } else {
          this.nombres_dependencias = response.data;
          this.esperandoNombresDependencia = false;
        }
      })
      .catch(() => {
        this.$store.dispatch(
          "snackBarInfo",
          "No se pudieron consultar las dependencias, sin las dependencias no podrá registrar o modificar un responsable. Recargue la página."
        );
        this.esperandoNombresDependencia = false;
      });
    if (!this.proyecto.registro_proyecto) {
      Coordinador.obtenerNombresResponsables({
        nombre_dependencia: this.nombre_dependencia
      }).then(response => {
        this.nombres_responsables = response.data;
      });
    }
  },
  watch: {
    nombre_dependencia() {
      this.esperandoNombresResponsable = true;
      this.formProyectoServicio.nombre_dependencia = this.nombre_dependencia;
      Coordinador.obtenerNombresResponsables({
        nombre_dependencia: this.nombre_dependencia
      })
        .then(response => {
          this.esperandoNombresResponsable = false;
          if (response.data.length == 0) {
            this.nombres_responsables = [];
            this.$store.dispatch(
              "snackBarInfo",
              "No hay ningún responsable registrado o activados en esa dependencia. Por favor registre o active uno."
            );
          } else {
            this.nombres_responsables = response.data;
          }
        })
        .catch(error => {
          if (error.response.status !== 422) {
            this.esperandoNombresResponsable = false;
            this.$store.dispatch(
              "snackBarError",
              "No se pudieron consultar los responsables, sin los responsables no podrá registrar o modificar un proyecto. Recargue la página."
            );
          } else {
            this.esperandoNombresResponsable = false;
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
          num_alumnos: "",
          actividades: "",
          horario: "",
          requisitos: "",
          registro_proyecto: true
        };
      }
    }
  }
};
