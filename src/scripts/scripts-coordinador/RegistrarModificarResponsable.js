import Coordinador from "../../api/Coordinador";
import { mapActions } from "vuex";

export default {
  data: function() {
    return {
      esperandoNombres: false,
      esperandoRespuesta: false,
      validacion: true,
      nombres_dependencias: [],
      formResponsable: this.responsable,
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
      correoRules: [
        v => !!v || "Correo requerido",
        v => /.+@.+\..+/.test(v) || "El correo no es válido",
        v => (v && v.length <= 150) || "El correo es demasiado largo"
      ],
      num_contactoRules: [
        v => !!v || "Número de contacto requerido",
        v => (v && v.length >= 10) || "El número es demasiado corto",
        v => (v && v.length <= 20) || "El número es demasiado largo"
      ],
      cargoRules: [
        v => !!v || "Cargo requerido",
        v => (v && v.length <= 100) || "Es demasiado largo"
      ]
    };
  },
  methods: {
    ...mapActions(["snackBarError", "snackBarExito", "snackBarInfo"]),

    modificarResponsable() {
      if (this.$refs.formularioResponsable.validate()) {
        this.esperandoRespuesta = true;
        Coordinador.modificarResponsable(this.formResponsable)
          .then(() => {
            this.esperandoRespuesta = false;
            this.snackBarExito("¡Responsable modificado exitosamente!");
          })
          .catch(error => {
            this.mensajeErrores(error);
          });
      }
    },

    registrarResponsable() {
      if (this.$refs.formularioResponsable.validate()) {
        this.esperandoRespuesta = true;
        Coordinador.registrarResponsable(this.formResponsable)
          .then(() => {
            this.esperandoRespuesta = false;
            this.snackBarExito("¡Responsable registrado exitosamente!");
            this.$refs.formularioResponsable.reset();
          })
          .catch(error => {
            this.mensajeErrores(error);
          });
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
  mounted() {
    this.esperandoNombres = true;
    Coordinador.obtenerNombresDependencias()
      .then(response => {
        if (response.data.length == 0) {
          this.snackBarInfo("No existen dependencias, registre o active una.");
        }
        this.nombres_dependencias = response.data;
      })
      .catch(() => {
        this.snackBarError(
          "No se pudieron consultar las dependencias, sin las dependencias no podrá registrar o modificar un responsable. Recargue la página."
        );
      })
      .finally(() => {
        this.esperandoRespuesta = false;
      });
  }
};
