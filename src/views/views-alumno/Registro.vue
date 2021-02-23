<template>
  <v-app>
    <v-col align="center">
      <v-card max-width="1300">
        <v-row>
          <v-col align="left" cols="12" lg="1" md="1" sm="1" xs="12">
            <v-btn icon @click="regresar()">
              <v-icon>mdi-keyboard-backspace</v-icon>
            </v-btn>
          </v-col>
          <v-col align="center" cols="12" lg="11" md="11" sm="11" xs="12">
            <h1>Registro</h1>
          </v-col>
        </v-row>
        <v-stepper v-model="step">
          <v-stepper-header>
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
                            :loading="esperandoRespuesta"
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
              <h1 v-if="esRegistro">Datos de usuario</h1>
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
                      v-if="esRegistro"
                      color="success"
                      :loading="esperandoRespuesta"
                      @click.prevent="validarDatosRegistro()"
                    >
                      Siguiente
                    </v-btn>
                    <v-btn
                      v-else
                      color="success"
                      :loading="esperandoRespuesta"
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
                  <h5>Seleccione 3 proyectos máximo</h5>
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
                            Cerrar
                          </v-btn>
                          <v-btn
                            :loading="esperandoRespuesta"
                            color="blue darken-1"
                            text
                            @click.prevent="registrarInscripcion()"
                          >
                            Terminar
                          </v-btn>
                        </v-card-actions>
                      </v-form>
                    </v-card>
                  </v-dialog>
                </v-card-title>
                <v-data-table
                  v-model="seleccionados"
                  :headers="cabeceras"
                  :items="proyectos"
                  :items-per-page="10"
                  :single-select="false"
                  item-key="id"
                  show-select
                  class="elevation-1"
                  :footer-props="{
                    'items-per-page-text': 'Proyectos por pág.'
                  }"
                >
                  <template v-slot:item.edicion="{ item }">
                    <v-icon small @click="masInformacion(item)">
                      mdi-eye
                    </v-icon>
                  </template>
                  <template v-slot:no-data>
                    No hay proyectos disponibles
                  </template>
                  <template v-slot:top>
                    <v-dialog
                      v-model="dialogoInformacionServicio"
                      max-width="900px"
                    >
                      <v-card>
                        <v-card-title> Información del proyecto </v-card-title>
                        <v-card-text>
                          <v-row>
                            <v-col>
                              <v-text-field
                                v-model="proyectoServicio.nombre_dependencia"
                                label="Dependencia"
                                prepend-icon="mdi-office-building-outline"
                                readonly
                              >
                              </v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <v-text-field
                                v-model="proyectoServicio.nombre_responsable"
                                label="Responsable"
                                prepend-icon="mdi-account"
                                readonly
                              >
                              </v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <v-text-field
                                v-model="proyectoServicio.direccion"
                                label="Dirección"
                                readonly
                              >
                              </v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" sm="6" xs="12">
                              <v-text-field
                                v-model="proyectoServicio.actividades"
                                label="Actividades"
                                readonly
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" xs="12">
                              <v-text-field
                                v-model="proyectoServicio.requisitos"
                                label="Requisitos"
                                readonly
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" sm="6" xs="12">
                              <v-text-field
                                v-model="proyectoServicio.horario"
                                label="Horario"
                                readonly
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" xs="12">
                              <v-text-field
                                v-model="proyectoServicio.num_alumnos"
                                label="No. de alumnos"
                                readonly
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col align="center">
                              <v-btn
                                color="success"
                                @click="dialogoInformacionServicio = false"
                              >
                                Cerrar
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-card>
                    </v-dialog>
                    <v-dialog
                      v-model="dialogoInformacionPracticas"
                      max-width="900px"
                    >
                      <v-card>
                        <v-card-title> Información del proyecto </v-card-title>
                        <v-card-text>
                          <v-row>
                            <v-col>
                              <v-text-field
                                v-model="proyectoPracticas.nombre_dependencia"
                                label="Dependencia"
                                prepend-icon="mdi-office-building-outline"
                                readonly
                              >
                              </v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <v-text-field
                                v-model="proyectoPracticas.nombre_responsable"
                                label="Responsable"
                                prepend-icon="mdi-account"
                                readonly
                              >
                              </v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <v-text-field
                                v-model="proyectoPracticas.nombre_proyecto"
                                label="Nombre del proyecto"
                                readonly
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" sm="6" xs="12">
                              <v-text-field
                                v-model="proyectoPracticas.descripcion_general"
                                label="Descripcion general del proyecto"
                                readonly
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" xs="12">
                              <v-text-field
                                v-model="proyectoPracticas.objetivo_general"
                                label="Objetivo general del proyecto"
                                readonly
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" sm="6" xs="12">
                              <v-text-field
                                v-model="proyectoPracticas.objetivos_inmediatos"
                                label="Objetivos inmediatos del proyecto"
                                readonly
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" xs="12">
                              <v-text-field
                                v-model="proyectoPracticas.objetivos_mediatos"
                                label="Objetivos mediatos del proyecto"
                                readonly
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" sm="6" xs="12">
                              <v-text-field
                                v-model="proyectoPracticas.metodologia"
                                label="Metodología"
                                readonly
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" xs="12">
                              <v-text-field
                                v-model="
                                  proyectoPracticas.actividades_funcionales
                                "
                                label="Acttividades funcionales"
                                readonly
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" sm="6" xs="12">
                              <v-text-field
                                v-model="proyectoPracticas.responsabilidades"
                                label="Responsabilidades"
                                readonly
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" xs="12">
                              <v-text-field
                                v-model="proyectoPracticas.duracion"
                                label="Duracion"
                                readonly
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col align="center">
                              <v-text-field
                                v-model="proyectoPracticas.horario"
                                label="Horario"
                                readonly
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col align="center">
                              <v-btn
                                color="success"
                                @click="dialogoInformacionPracticas = false"
                              >
                                Cerrar
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-card>
                    </v-dialog>
                  </template>
                </v-data-table>
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card>
    </v-col>
  </v-app>
</template>

<script src="./../../scripts/scripts-alumno/Registro.js"></script>
