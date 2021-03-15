<template>
  <v-col align="center">
    <v-card max-width="1200">
      <v-row>
        <v-col align="left" cols="12" xl="1" lg="1" md="1" sm="1" xs="12">
          <v-btn icon @click="regresar">
            <v-icon>mdi-keyboard-backspace</v-icon>
          </v-btn>
        </v-col>
        <v-col align="center" cols="12" xl="11" lg="11" md="11" sm="11" xs="12">
          <h1 v-if="formProfesor.registro_profesor">
            Registrar Profesor
          </h1>
          <h1 v-else>
            Modificar Profesor
          </h1>
        </v-col>
      </v-row>
      <v-stepper v-model="step" non-linear>
        <v-stepper-header v-if="!profesor.registro_profesor">
          <v-stepper-step :complete="step > 1" step="1" editable>
            Datos personales
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2" editable>
            Selección de alumnos
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-header v-else>
          <v-stepper-step :complete="step > 1" step="1">
            Datos personales
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2">
            Selección de alumnos
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-form
              ref="formularioPassword"
              v-model="validacionPassword"
              lazy-validation
            >
              <v-container v-if="!profesor.registro_profesor">
                <v-row no-gutters>
                  <v-col align="left">
                    <h4>Contraseña</h4>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" xs="12" sm="5" md="5">
                    <v-text-field
                      v-model="formPassword.password"
                      :rules="passwordRules"
                      type="password"
                      label="Contraseña *"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" xs="12" sm="5" md="5">
                    <v-text-field
                      v-model="resetPasswordConfirmacion"
                      :rules="[
                        v => !!v || 'Confirme la contraseña',
                        this.formPassword.password ===
                          this.resetPasswordConfirmacion ||
                          'Las contraseñas no coinciden'
                      ]"
                      type="password"
                      label="Confirmar contraseña *"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" xs="12" sm="2" md="2">
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
              </v-container>
            </v-form>
            <v-form
              ref="formularioProfesor"
              v-model="validacion"
              lazy-validation
            >
              <v-divider v-if="!profesor.registro_profesor"></v-divider>
              <v-container>
                <v-row no-gutters v-if="!profesor.registro_profesor">
                  <v-col align="left">
                    <h4>Datos</h4>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                    <v-text-field
                      v-model="formProfesor.correo"
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
                        this.formProfesor.correo === this.confirmarCorreo ||
                          'El correo no coincide'
                      ]"
                      type="email"
                      label="Confirmar correo electrónico *"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row v-if="profesor.registro_profesor">
                  <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                    <v-text-field
                      v-model="formProfesor.password"
                      :rules="passwordRules"
                      type="password"
                      label="Contraseña *"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                    <v-text-field
                      v-model="confirmarPassword"
                      :rules="[
                        v => !!v || 'Confirme la contraseña',
                        this.formProfesor.password === this.confirmarPassword ||
                          'Las contraseñas no coinciden'
                      ]"
                      type="password"
                      label="Confirmar contraseña *"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                    <v-text-field
                      v-model="formProfesor.apellido_paterno"
                      :rules="apellido_paternoRules"
                      label="Apellido paterno *"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                    <v-text-field
                      v-model="formProfesor.apellido_materno"
                      :rules="apellido_maternoRules"
                      label="Apellido materno *"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                    <v-text-field
                      v-model="formProfesor.nombres"
                      :rules="nombresRules"
                      label="Nombre(s) *"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                    <v-text-field
                      v-model="formProfesor.num_contacto"
                      :rules="num_contactoRules"
                      label="No. de contacto *"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                    <v-text-field
                      v-model="formProfesor.num_personal"
                      :rules="num_personalRules"
                      label="No. de personal *"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                    <v-text-field
                      v-model="confirmarNumPersonal"
                      :rules="[
                        v => !!v || 'Confirme el No. de personal',
                        this.formProfesor.num_personal ===
                          this.confirmarNumPersonal ||
                          'El No. de personal no coincide'
                      ]"
                      label="Confirmar No. de personal *"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-btn
                      v-if="profesor.registro_profesor"
                      :disabled="!validacion"
                      color="success"
                      :loading="getEsperandoRespuesta"
                      @click.prevent="validarDatosRegistro"
                    >
                      Siguiente
                    </v-btn>
                    <v-btn
                      v-else
                      :disabled="!validacion"
                      color="success"
                      :loading="getEsperandoRespuesta"
                      @click.prevent="modificar"
                    >
                      Modificar
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-card elevation="0">
              <v-card-title>
                <h2>Alumnos</h2>
                <v-divider class="mx-4" vertical></v-divider>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="busqueda"
                  append-icon="mdi-magnify"
                  label="Buscar"
                  single-line
                  hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-btn
                  v-if="!profesor.registro_profesor"
                  color="success"
                  :loading="getEsperandoRespuesta"
                  @click="asignarNuevosAlumnos"
                >
                  Modificar lista
                </v-btn>
                <v-btn
                  v-else
                  color="success"
                  :loading="getEsperandoRespuesta"
                  @click="asignarAlumnos"
                >
                  Terminar asignación
                </v-btn>
              </v-card-title>
              <v-divider></v-divider>
              <tabla />
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-col>
</template>

<script src="./../../scripts/scripts-coordinador/RegistrarModificarProfesor.js"></script>
