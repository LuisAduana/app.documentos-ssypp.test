<template>
  <v-col>
    <v-row>
      <v-col align="center">
        <h1>Datos de usuario</h1>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-container>
      <v-form
        ref="formularioPassword"
        v-model="validacionPassword"
        lazy-validation
      >
        <v-row align="center">
          <v-col cols="12" xs="12" sm="4" md="1" align="left">
            <h4>Contraseña:</h4>
          </v-col>
          <v-col cols="12" xs="12" sm="4" md="5">
            <v-text-field
              v-model="formPassword.password"
              :rules="passwordRules"
              type="password"
              label="Contraseña *"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" xs="12" sm="4" md="5">
            <v-text-field
              v-model="resetPasswordConfirmacion"
              :rules="[
                v => !!v || 'Confirme la contraseña',
                this.formPassword.password === this.resetPasswordConfirmacion ||
                  'Las contraseñas no coinciden'
              ]"
              type="password"
              label="Confirmar contraseña *"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" xs="12" sm="12" md="1">
            <v-btn
              :disabled="!validacionPassword"
              color="success"
              :loading="getEsperandoRespuestaDos"
              @click="modificarPassword"
            >
              Cambiar
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
    <v-divider></v-divider>
    <v-container v-if="getUsuario.rol_usuario == 'ALUMNO'">
      <v-row>
        <v-col align="left">
          <h4>Datos:</h4>
        </v-col>
      </v-row>
      <v-form ref="formulario" v-model="validacion" lazy-validation>
        <v-row>
          <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
            <v-text-field
              v-model="formUsuario.correo"
              :rules="correoRules"
              type="email"
              label="Correo electrónico *"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
            <v-text-field
              v-model="confirmarCorreo"
              :rules="[
                v => !!v || 'Confirme el correo',
                this.formUsuario.correo === this.confirmarCorreo ||
                  'El correo no coincide'
              ]"
              type="email"
              label="Confirmar correo electrónico *"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
            <v-text-field
              v-model="formUsuario.apellido_paterno"
              :rules="apellido_paternoRules"
              label="Apellido paterno *"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
            <v-text-field
              v-model="formUsuario.apellido_materno"
              :rules="apellido_maternoRules"
              label="Apellido materno *"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
            <v-text-field
              v-model="formUsuario.nombres"
              :rules="nombresRules"
              label="Nombre(s) *"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
            <v-text-field
              v-model="formUsuario.num_contacto"
              :rules="num_contactoRules"
              label="No. de contacto *"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="12">
            <v-text-field
              v-model="formUsuario.matricula"
              :rules="matriculaRules"
              label="Matrícula *"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="12">
            <v-text-field
              v-model="formUsuario.bloque"
              :rules="bloqueRules"
              label="Bloque *"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="12">
            <v-text-field
              v-model="formUsuario.seccion"
              :rules="seccionRules"
              label="Seccion *"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col align="center">
            <v-btn
              color="success"
              :disabled="!validacion"
              :loading="getEsperandoRespuesta"
              @click.prevent="modificarAlum"
            >
              Modificar
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
    <v-container v-else>
      <v-row no-gutters>
        <v-col align="left">
          <h4>Datos:</h4>
        </v-col>
      </v-row>
      <v-form ref="formulario" v-model="validacion" lazy-validation>
        <v-row>
          <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
            <v-text-field
              v-model="formUsuario.apellido_paterno"
              :rules="apellido_paternoRules"
              label="Apellido paterno *"
              required
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="formUsuario.apellido_materno"
              :rules="apellido_maternoRules"
              label="Apellido materno *"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
            <v-text-field
              v-model="formUsuario.nombres"
              :rules="nombresRules"
              label="Nombre(s) *"
              required
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="formUsuario.correo"
              :rules="correoRules"
              label="Correo electrónico *"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
            <v-text-field
              v-model="formUsuario.num_personal"
              :rules="num_personalRules"
              :counter="10"
              label="No. Personal *"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
            <v-text-field
              v-model="formUsuario.num_contacto"
              :rules="num_contactoRules"
              label="Número de contacto *"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col align="center">
            <v-btn
              :disabled="!validacion"
              :loading="getEsperandoRespuesta"
              color="success"
              @click.prevent="modificarProfe"
            >
              Modificar
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </v-col>
</template>

<script>
import Rules from "./../scripts/Rules";
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    validacionPassword: true,
    validacion: true,
    confirmarCorreo: "",
    resetPasswordConfirmacion: "",
    formUsuario: {},
    formPassword: {
      id: undefined,
      password: ""
    },
    passwordRules: Rules.passwordRules,
    apellido_paternoRules: Rules.apellido_paternoRules,
    apellido_maternoRules: Rules.apellido_maternoRules,
    nombresRules: Rules.nombresRules,
    correoRules: Rules.correoRules,
    num_personalRules: Rules.num_personalRules,
    num_contactoRules: Rules.num_contactoRules,
    matriculaRules: Rules.matriculaRules,
    bloqueRules: Rules.bloqueRules,
    seccionRules: Rules.seccionRules
  }),
  methods: {
    ...mapActions("moduloUsuario", ["cambiarPassword"]),
    ...mapActions("moduloProfesor", ["modificarProfesor"]),
    ...mapActions("moduloAlumno", ["modificarAlumno"]),

    async modificarProfe() {
      if (this.$refs.formulario.validate()) {
        await this.modificarProfesor(this.formUsuario);
      }
    },

    async modificarAlum() {
      if (this.$refs.formulario.validate()) {
        await this.modificarAlumno(this.formUsuario);
      }
    },

    async modificarPassword() {
      this.formPassword.id = this.getUsuario.id;
      if (this.$refs.formularioPassword.validate()) {
        if (await this.cambiarPassword(this.formPassword)) {
          this.$refs.formularioPassword.reset();
        }
      }
    }
  },
  mounted() {
    this.formUsuario = this.getUsuario;
    if (this.getUsuario.rol_usuario === "ALUMNO") {
      this.confirmarCorreo = this.getUsuario.correo;
      this.formUsuario.alumno_id = this.getUsuario.alumno.id;
      this.formUsuario.matricula = this.getUsuario.alumno.matricula;
      this.formUsuario.bloque = this.getUsuario.alumno.bloque;
      this.formUsuario.seccion = this.getUsuario.alumno.seccion;
    } else {
      this.confirmarCorreo = this.getUsuario.correo;
      this.formUsuario.num_personal = this.getUsuario.profesor.num_personal;
      this.formUsuario.profesor_id = this.getUsuario.profesor.id;
    }
  },
  computed: {
    ...mapGetters([
      "getUsuario",
      "getEsperandoRespuesta",
      "getEsperandoRespuestaDos"
    ])
  }
};
</script>
