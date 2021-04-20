import Rules from "./../Rules";
import tabla from "./../../components/TablaSeleccion";
import { mapActions, mapGetters } from "vuex";

export default {
  data: function() {
    return {
      validacion: true,
      validacionPassword: true,
      hola: false,
      step: 1,
      busqueda: "",
      formPassword: {
        id: this.profesor.id,
        password: ""
      },
      resetPasswordConfirmacion: "",
      confirmarPassword: "",
      confirmarCorreo: this.profesor.correo,
      confirmarNumPersonal: this.profesor.num_personal,
      formProfesor: this.profesor,
      item: {},
      correoRules: Rules.correoRules,
      passwordRules: Rules.passwordRules,
      apellido_paternoRules: Rules.apellido_paternoRules,
      apellido_maternoRules: Rules.apellido_maternoRules,
      nombresRules: Rules.nombresRules,
      num_contactoRules: Rules.num_contactoRules,
      num_personalRules: Rules.num_personalRules
    };
  },
  methods: {
    ...mapActions("moduloProfesor", [
      "obtenerAlumnosAsignadosActivos",
      "registrarProfesor",
      "validarDatosProfesor",
      "modificarProfesor",
      "modificarAlumnosAsignados"
    ]),
    ...mapActions("moduloUsuario", ["cambiarPassword"]),
    ...mapActions([
      "snackBarError",
      "saveItemsSeleccionados",
      "saveBusquedaEnTabla"
    ]),

    async asignarNuevosAlumnos() {
      if (this.getItemsSeleccionados.length > 0) {
        await this.modificarAlumnosAsignados({
          profesor_id: this.formProfesor.profesor_id,
          alumnos: this.getItemsSeleccionados
        });
      } else {
        this.snackBarError("Seleccione al menos un alumno.");
      }
    },
    async asignarAlumnos() {
      if (this.getItemsSeleccionados.length > 0) {
        this.formProfesor.alumnos = this.getItemsSeleccionados;
        if (await this.registrarProfesor(this.formProfesor)) {
          this.$router.push({ name: "ConsultarProfesores" });
        }
      } else {
        this.snackBarError("Seleccione al menos un alumno.");
      }
    },
    regresar() {
      this.$router.back();
    },
    async validarDatosRegistro() {
      if (this.$refs.formularioProfesor.validate()) {
        if (await this.validarDatosProfesor(this.formProfesor)) {
          this.step = 2;
        }
      }
    },
    async modificarPassword() {
      if (this.$refs.formularioPassword.validate()) {
        if (await this.cambiarPassword(this.formPassword)) {
          this.$refs.formularioPassword.reset();
        }
      }
    },
    async modificar() {
      if (this.$refs.formularioProfesor.validate()) {
        await this.modificarProfesor(this.formProfesor);
      }
    }
  },
  watch: {
    busqueda() {
      this.saveBusquedaEnTabla(this.busqueda);
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
  async mounted() {
    await this.obtenerAlumnosAsignadosActivos();
  },
  computed: {
    ...mapGetters([
      "getEsperandoRespuesta",
      "getItemsSeleccionados",
      "getEsperandoRespuestaDos"
    ])
  },
  components: {
    tabla
  }
};
