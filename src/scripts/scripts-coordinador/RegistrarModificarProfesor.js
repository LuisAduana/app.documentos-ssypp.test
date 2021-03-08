import Api from "./../../api/Coordinador";
import { mapActions } from "vuex";

export default {
  data: function() {
    return {
      validacion: true,
      esperandoRespuesta: false,
      step: 1,
      busqueda: "",
      confirmarCorreo: this.profesor.correo,
      confirmarPassword: "",
      confirmarNumPersonal: this.profesor.num_personal,
      formProfesor: this.profesor,
      alumnos: [],
      seleccionados: [],
      cabeceras: [
        { text: "Matrícula", value: "matricula" },
        { text: "Nombres", value: "nombres" },
        { text: "Apellido Pat.", value: "apellido_paterno" },
        { text: "Apellido Mat.", value: "apellido_materno" },
        { text: "Correo", value: "correo" },
        { text: "No. Contacto", value: "num_contacto" }
      ],
      correoRules: [
        v => !!v || "El correo es requerido",
        v => /.+@.+\..+/.test(v) || "El correo debe ser válido",
        v => (v && v.length <= 150) || "El correo es demasiado largo"
      ],
      passwordRules: [
        v => !!v || "La contraseña es requerida",
        v => (v && v.length >= 7) || "La contraseña es demasiado corta",
        v => (v && v.length <= 120) || "La contraseña es demasiado larga"
      ],
      apellido_paternoRules: [
        v => !!v || "El apellido paterno es requerido",
        v => (v && v.length <= 45) || "El apellido es demasiado largo"
      ],
      apellido_maternoRules: [
        v => !!v || "El apellido materno es requerido",
        v => (v && v.length <= 45) || "El apellido es demasiado largo"
      ],
      nombresRules: [
        v => !!v || "El nombre de usuario es requerido",
        v => (v && v.length <= 90) || "El nombre es demasiado largo"
      ],
      num_contactoRules: [
        v => !!v || "Número de contacto requerido",
        v => (v && v.length >= 10) || "El número es demasiado corto",
        v => (v && v.length <= 20) || "El número es demasiado largo"
      ],
      num_personalRules: [
        v => !!v || "Número personal requerido",
        v => /^([0-9]{10})$/.test(v) || "Número incorrecto"
      ]
    };
  },
  methods: {
    ...mapActions(["snackBarError", "snackBarExito"]),

    asignarAlumnos() {
      if (this.seleccionados < 1) {
        this.snackBarError("Seleccione al menos un alumno");
      } else {
        this.esperandoRespuesta = true;
        this.formProfesor.alumnos = this.seleccionados;
        Api.registrarProfesor(this.formProfesor)
          .then(() => {
            this.snackBarExito("¡Profesor registrado exitosamente!");
            this.$router.push({ name: "ConsultarProfesores" });
          })
          .catch(() => {
            this.snackBarError("Ha ocurrido un error. Inténtelo de nuevo.");
          })
          .finally(() => {
            this.esperandoRespuesta = false;
          });
      }
    },
    regresar() {
      this.$router.back();
    },
    validarDatosRegistro() {
      if (this.$refs.formularioProfesor.validate()) {
        this.esperandoRespuesta = true;
        Api.validarRegistroProfesor(this.formProfesor)
          .then(() => {
            this.step = 2;
          })
          .catch(error => {
            if (error.response.status === 422) {
              if (Object.keys(error.response.data.errors).length === 2) {
                this.snackBarError(error.response.data.errors.correo[0]);
              } else {
                if (error.response.data.errors.correo == null) {
                  this.snackBarError(
                    error.response.data.errors.num_personal[0]
                  );
                } else {
                  this.snackBarError(error.response.data.errors.correo[0]);
                }
              }
            } else {
              this.snackBarError("Error en el registro");
            }
          })
          .finally(() => {
            this.esperandoRespuesta = false;
          });
      }
    },
    modificarProfesor() {
      if (this.$refs.formularioProfesor.validate()) {
        this.esperandoRespuesta = true;
        Api.modificarProfesor(this.formProfesor)
          .then(() => {
            this.snackBarExito("¡Profesor modificado exitosamente!");
          })
          .catch(error => {
            if (error.response.status === 422) {
              if (Object.keys(error.response.data.errors).length === 2) {
                this.snackBarError(error.response.data.errors.correo[0]);
              } else {
                if (error.response.data.errors.correo == null) {
                  this.snackBarError(
                    error.response.data.errors.num_personal[0]
                  );
                } else {
                  this.snackBarError(error.response.data.errors.correo[0]);
                }
              }
            } else {
              this.snackBarError("Error en el registro");
            }
          })
          .finally(() => {
            this.esperandoRespuesta = false;
          });
      }
    }
  },
  props: {
    profesor: {
      type: Object,
      default: function() {
        return {
          correo: "",
          password: "",
          nombres: "",
          apellido_paterno: "",
          apellido_materno: "",
          estado: "ACTIVO",
          num_contacto: "",
          rol_usuario: "PROFESOR",
          num_personal: "",
          registro_profesor: true
        };
      }
    }
  },
  mounted() {
    Api.obtenerAlumnosAsignados()
      .then(response => {
        this.alumnos = response.data;
        console.log(this.alumnos);
      })
      .catch(() => {
        this.snackBarError(
          "No se pudieron consultar los alumnos. Recargue la página"
        );
      });
  }
};
