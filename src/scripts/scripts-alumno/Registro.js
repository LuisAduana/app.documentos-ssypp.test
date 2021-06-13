import Rules from "./../Rules";
import tabla from "./../../components/Tabla";
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    validacionCredenciales: true,
    validacionToken: true,
    validacion: true,
    dialogoValidarRegistro: false,
    dialogoToken: false,
    esperandoRespuesta: false,
    step: 1,
    tipo_inscripcion: "",
    confirmarCorreo: "",
    confirmarPassword: "",
    formAlumno: {
      id: "",
      alumno_id: "",
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
      token_inscripcion: "",
      esRegistro: true
    },
    formCredenciales: {
      correo: "",
      password: ""
    },
    correoRules: Rules.correoRules,
    passwordRules: Rules.passwordRules,
    apellido_paternoRules: Rules.apellido_paternoRules,
    apellido_maternoRules: Rules.apellido_maternoRules,
    nombresRules: Rules.nombresRules,
    num_contactoRules: Rules.num_contactoRules,
    matriculaRules: Rules.matriculaRules,
    bloqueRules: Rules.bloqueRules,
    seccionRules: Rules.seccionRules,
    tokenRules: Rules.tokenRules
  }),
  methods: {
    ...mapActions(["snackBarError"]),
    ...mapActions("moduloUsuario", [
      "authUsuario",
      "comprobarInscripcion",
      "deleteOpcion",
      "initOpciones",
      "saveOpcion",
      "registrarAlumno",
      "proyectosSeleccionados",
      "validarExistencia",
      "validarRegistro"
    ]),

    eliminarOpcion(value) {
      this.deleteOpcion(value);
    },

    async registrarInscripcion() {
      if (this.$refs.formularioToken.validate()) {
        var ids = [
          this.getOpcionUno.id,
          this.getOpcionDos.id,
          this.getOpcionTres.id
        ];
        this.formAlumno.proyectos = ids.toString();
        if (await this.registrarAlumno(this.formAlumno)) {
          this.$router.push({ name: "Login" });
        }
      }
    },

    async validarDatosRegistro() {
      if (this.$refs.formularioAlumno.validate()) {
        if (await this.validarRegistro(this.formAlumno)) {
          this.step = 3;
        }
      }
    },

    async comprobarExistencia() {
      if (this.$refs.formularioCredenciales.validate()) {
        const response = await this.validarExistencia(this.formCredenciales);
        if (response.fallo) {
          this.formAlumno = response.datos;
          this.formAlumno.password = this.formCredenciales.password;
          this.confirmarCorreo = this.formAlumno.correo;
          this.confirmarPassword = this.formAlumno.password;
          this.formAlumno.esRegistro = false;
          this.step = 2;
          this.dialogoValidarRegistro = false;
        }
      }
    },
    async validarProyectos() {
      if ((await this.proyectosSeleccionados()) == 3) {
        this.dialogoToken = true;
      } else {
        this.snackBarError("Seleccione los 3 proyectos.");
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
      this.$router.push({ name: "Login" });
    }
  },
  async mounted() {
    this.initOpciones();
    const response = await this.authUsuario();
    if (response === null || response === 200) {
      this.$router.push({ name: "Dashboard" });
    } else {
      await this.comprobarInscripcion();
    }
  },
  computed: {
    ...mapGetters("moduloUsuario", [
      "getOpcionUno",
      "getOpcionDos",
      "getOpcionTres"
    ]),
    ...mapGetters(["getEsperandoRespuesta", "getEsperandoRespuestaDos"])
  },
  components: {
    tabla
  }
};
