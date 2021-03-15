<template>
  <v-app>
    <v-col align="center">
      <v-card max-width="1300">
        <v-stepper v-model="step">
          <v-stepper-header>
            <v-btn icon @click="regresar()">
              <v-icon>mdi-keyboard-backspace</v-icon>
            </v-btn>
            <v-stepper-step :complete="step > 1" step="1">
              Comprobar Registro
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 2" step="2">
              Datos Personales
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3">
              Selección de Proyectos
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-row>
                <v-col align="center">
                  <h1>¿Ya se ha registrado en el sistema?</h1>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn text x-large @click="step = 2">No</v-btn>
                </v-col>
                <v-col>
                  <v-dialog
                    persistent
                    v-model="dialogoValidarRegistro"
                    max-width="400"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn text x-large v-bind="attrs" v-on="on">
                        Si
                      </v-btn>
                    </template>
                    <v-card width="400">
                      <v-card-title>
                        <h4>Ingrese sus credenciales</h4>
                      </v-card-title>
                      <v-form
                        ref="formularioCredenciales"
                        v-model="validacionCredenciales"
                        lazy-validation
                      >
                        <v-col>
                          <v-text-field
                            v-model="formCredenciales.correo"
                            :rules="correoRules"
                            type="email"
                            label="Correo electrónico"
                            required
                          ></v-text-field>
                          <v-text-field
                            v-model="formCredenciales.password"
                            :rules="passwordRules"
                            type="password"
                            label="Contraseña"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="regresarStep(1)"
                          >
                            Cerrar
                          </v-btn>
                          <v-btn
                            :loading="getEsperandoRespuestaDos"
                            color="blue darken-1"
                            text
                            @click.prevent="comprobarExistencia()"
                          >
                            Siguiente
                          </v-btn>
                        </v-card-actions>
                      </v-form>
                    </v-card>
                  </v-dialog>
                </v-col>
              </v-row>
            </v-stepper-content>
            <v-stepper-content step="2">
              <h1 v-if="formAlumno.esRegistro">Datos de usuario</h1>
              <h1 v-else>Confimar datos</h1>
              <v-form
                ref="formularioAlumno"
                v-model="validacion"
                lazy-validation
              >
                <v-row>
                  <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                    <v-text-field
                      v-model="formAlumno.correo"
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
                        this.formAlumno.correo === this.confirmarCorreo ||
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
                      v-model="formAlumno.password"
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
                        this.formAlumno.password === this.confirmarPassword ||
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
                      v-model="formAlumno.apellido_paterno"
                      :rules="apellido_paternoRules"
                      label="Apellido paterno *"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                    <v-text-field
                      v-model="formAlumno.apellido_materno"
                      :rules="apellido_maternoRules"
                      label="Apellido materno *"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                    <v-text-field
                      v-model="formAlumno.nombres"
                      :rules="nombresRules"
                      label="Nombre(s) *"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                    <v-text-field
                      v-model="formAlumno.num_contacto"
                      :rules="num_contactoRules"
                      label="No. de contacto *"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="12">
                    <v-text-field
                      v-model="formAlumno.matricula"
                      :rules="matriculaRules"
                      label="Matrícula *"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="12">
                    <v-text-field
                      v-model="formAlumno.bloque"
                      :rules="bloqueRules"
                      label="Bloque *"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="12">
                    <v-text-field
                      v-model="formAlumno.seccion"
                      :rules="seccionRules"
                      label="Seccion *"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col align="center">
                    <v-btn
                      v-if="formAlumno.esRegistro"
                      color="success"
                      :loading="getEsperandoRespuesta"
                      @click.prevent="validarDatosRegistro()"
                    >
                      Siguiente
                    </v-btn>
                    <v-btn
                      v-else
                      color="success"
                      :loading="getEsperandoRespuesta"
                      @click.prevent="validarDatosRegistro()"
                    >
                      Confirmar
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-stepper-content>
            <v-stepper-content step="3">
              <v-card>
                <v-card-title>
                  <h2>Proyectos disponibles</h2>
                  <v-divider class="mx-4" vertical></v-divider>
                  <h5>Seleccione 3 proyectos</h5>
                  <v-spacer></v-spacer>
                  <v-btn color="success" @click.prevent="validarProyectos()">
                    Terminar registro
                  </v-btn>
                  <v-dialog persistent v-model="dialogoToken" max-width="400">
                    <v-card width="400">
                      <v-card-title>
                        <h4>Ingrese el token de inscripción</h4>
                      </v-card-title>
                      <v-form
                        ref="formularioToken"
                        v-model="validacionToken"
                        lazy-validation
                      >
                        <v-col>
                          <v-text-field
                            v-model="formAlumno.token_inscripcion"
                            :rules="tokenRules"
                            label="Token de inscripción *"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="cerrarDialogoToken()"
                          >
                            Cancelar
                          </v-btn>
                          <v-btn
                            :loading="getEsperandoRespuestaDos"
                            color="blue darken-1"
                            text
                            @click.prevent="registrarInscripcion()"
                          >
                            Terminar inscripción
                          </v-btn>
                        </v-card-actions>
                      </v-form>
                    </v-card>
                  </v-dialog>
                </v-card-title>
                <v-divider></v-divider>
                <v-row>
                  <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="12">
                    <v-card elevation="0">
                      <v-card-title> <h5>Opción 1</h5> </v-card-title>
                      <v-text-field
                        v-model="getOpcionUno.nombre_dependencia"
                        dense
                        readonly
                        label="Dependencia"
                      >
                      </v-text-field>
                      <v-text-field
                        v-model="getOpcionUno.nombre_responsable"
                        dense
                        readonly
                        label="Responsable"
                      >
                      </v-text-field>
                      <v-card-actions dense>
                        <v-spacer></v-spacer>
                        <v-icon @click="eliminarOpcion(1)" medium>
                          mdi-close-circle-outline
                        </v-icon>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                  <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="12">
                    <v-card elevation="0">
                      <v-card-title> <h5>Opción 2</h5> </v-card-title>
                      <v-text-field
                        v-model="getOpcionDos.nombre_dependencia"
                        dense
                        readonly
                        label="Dependencia"
                      ></v-text-field>
                      <v-text-field
                        v-model="getOpcionDos.nombre_responsable"
                        dense
                        readonly
                        label="Responsable"
                      >
                      </v-text-field>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-icon @click="eliminarOpcion(2)" medium>
                          mdi-close-circle-outline
                        </v-icon>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                  <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="12">
                    <v-card elevation="0">
                      <v-card-title> <h5>Opción 3</h5> </v-card-title>
                      <v-text-field
                        v-model="getOpcionTres.nombre_dependencia"
                        dense
                        readonly
                        label="Dependencia"
                      ></v-text-field>
                      <v-text-field
                        v-model="getOpcionTres.nombre_responsable"
                        dense
                        readonly
                        label="Responsable"
                      >
                      </v-text-field>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-icon @click="eliminarOpcion(3)" medium>
                          mdi-close-circle-outline
                        </v-icon>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
                <tabla />
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card>
    </v-col>
  </v-app>
</template>

<script src="./../../scripts/scripts-alumno/Registro.js"></script>
