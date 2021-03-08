import Api from "./../../api/Alumno";
import { mapActions } from "vuex";

export default {
  data: () => ({
    validacionCredenciales: true,
    validacionToken: true,
    validacion: true,
    dialogoValidarRegistro: false,
    dialogoInformacionServicio: false,
    dialogoInformacionPracticas: false,
    dialogoToken: false,
    esperandoRespuesta: false,
    esRegistro: true,
    step: 1,
    tipo_inscripcion: "",
    confirmarCorreo: "",
    confirmarPassword: "",
    formAlumno: {
      id: "",
      id_alumno: "",
      correo: "",
      password: "",
      nombres: "",
      apellido_paterno: "",
      apellido_materno: "",
      estado: "INSCRIPCION",
      num_contacto: "",
      rol_usuario: "ALUMNO",
      matricula: "",
      bloque: "",
      seccion: "",
      proyectos: "",
      token_inscripcion: ""
    },
    formCredenciales: {
      correo: "",
      password: ""
    },
    proyectoServicio: {},
    proyectoPracticas: {},
    seleccionados: [],
    proyectos: [],
    cabeceras: [],
    cabecerasPracticas: [
      { text: "Nombre del Proyecto", value: "nombre_proyecto" },
      { text: "Nombre de Dependencia", value: "nombre_dependencia" },
      { text: "Nombre del Responsable", value: "nombre_responsable" },
      { text: "Direccion", value: "direccion" },
      { text: "Horario", value: "horario" },
      { text: "Más inf.", value: "edicion", sortable: false }
    ],
    cabecerasServicio: [
      { text: "Nombre de Dependencia", value: "nombre_dependencia" },
      { text: "Nombre del Responsable", value: "nombre_responsable" },
      { text: "Direccion", value: "direccion" },
      { text: "Actividades", value: "actividades" },
      { text: "Horario", value: "horario" },
      { text: "Más inf.", value: "edicion", sortable: false }
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
    matriculaRules: [
      v => !!v || "La matrícula es requerida",
      v => /^(S[0-9]{8})$/.test(v) || "Matrícula inválida"
    ],
    bloqueRules: [
      v => !!v || "El bloque es requerido",
      v => /^([0-9]{1})$/.test(v) || "Bloque inválido"
    ],
    seccionRules: [
      v => !!v || "La sección es requerida",
      v => /^([0-9]{1})$/.test(v) || "Sección incorrecta"
    ],
    tokenRules: [
      v => !!v || "Token requerido",
      v => (v && v.length <= 5) || "El número es demasiado largo"
    ]
  }),
  methods: {
    ...mapActions(["snackBarError", "snackBarExito", "snackBarInfo"]),
    ...mapActions("moduloRegistro", ["comprobarInscripcion"]),

    registrarInscripcion() {
      if (this.$refs.formularioToken.validate()) {
        var ids = [];
        for (var i = 0; i < this.seleccionados.length; i++) {
          ids.push(this.seleccionados[i].id);
        }
        this.formAlumno.proyectos = ids.toString();
        this.esperandoRespuesta = true;
        Api.registrarInscripcion(this.formAlumno)
          .then(() => {
            this.snackBarExito(
              "¡Registrado exitosamente! Cuando el coordinador asigne tu proyecto podrás acceder al sistema."
            );
            this.$router.push({ name: "Login" });
          })
          .catch(error => {
            if (error.response.status === 401) {
              this.snackBarError(error.response.data);
            } else {
              this.snackBarError("Ocurrió un error. Inténtelo nuevamente");
            }
          })
          .finally(() => {
            this.esperandoRespuesta = false;
          });
      }
    },

    validarDatosRegistro() {
      if (this.$refs.formularioAlumno.validate()) {
        this.esperandoRespuesta = true;
        Api.validarRegistro({
          id: this.formAlumno.id,
          id_alumno: this.formAlumno.id_alumno,
          correo: this.formAlumno.correo,
          matricula: this.formAlumno.matricula,
          es_registro: this.esRegistro
        })
          .then(() => {
            this.step = 3;
          })
          .catch(error => {
            if (error.response.status === 422) {
              if (Object.keys(error.response.data.errors).length === 2) {
                this.snackBarError(error.response.data.errors.correo[0]);
              } else {
                if (error.response.data.errors.correo == null) {
                  this.snackBarError(error.response.data.errors.matricula[0]);
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

    comprobarExistencia() {
      if (this.$refs.formularioCredenciales.validate()) {
        this.esperandoRespuesta = true;
        Api.validarExistencia(this.formCredenciales)
          .then(response => {
            if (response.data.estado === "INSCRIPCION") {
              this.snackBarInfo(
                "Ya estás en proceso de asignación de proyecto."
              );
            } else {
              this.formAlumno = response.data;
              this.formAlumno.password = this.formCredenciales.password;
              this.confirmarCorreo = this.formAlumno.correo;
              this.confirmarPassword = this.formAlumno.password;
              this.step = 2;
              this.esRegistro = false;
              this.dialogoValidarRegistro = false;
            }
          })
          .catch(error => {
            if (error.response.status === 401) {
              this.snackBarError(error.response.data);
            } else {
              this.snackBarError("Ha ocurrido un error, inténtelo de nuevo.");
            }
          })
          .finally(() => {
            this.esperandoRespuesta = false;
          });
      }
    },
    validarProyectos() {
      if (this.seleccionados.length == 0 || this.seleccionados.length > 3) {
        this.snackBarError("Seleccione al menos un proyecto o máximo 3");
      } else {
        this.dialogoToken = true;
      }
    },
    masInformacion(proyecto) {
      if (this.tipo_inscripcion === "practicas") {
        this.proyectoPracticas = proyecto;
        this.dialogoInformacionPracticas = true;
      } else {
        this.proyectoServicio = proyecto;
        this.dialogoInformacionServicio = true;
      }
    },
    cerrarDialogoToken() {
      this.dialogoToken = false;
      this.$refs.formularioToken.reset();
    },
    regresarStep(step) {
      this.$refs.formularioCredenciales.reset();
      this.dialogoValidarRegistro = false;
      this.step = step;
    },
    regresar() {
      this.$router.back();
    }
  },
  async mounted() {
    const response = await this.comprobarInscripcion();
    console.log(response);
  }
};
