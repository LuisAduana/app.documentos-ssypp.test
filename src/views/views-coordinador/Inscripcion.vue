<template>
  <v-col align="center">
    <v-card max-width="1000">
      <v-row>
        <v-col align="left" cols="12" xl="1" lg="1" md="1" sm="1" xs="12">
          <v-btn icon @click="regresar()">
            <v-icon>mdi-keyboard-backspace</v-icon>
          </v-btn>
        </v-col>
        <v-col align="center" cols="12" xl="11" lg="11" md="11" sm="11" xs="12">
          <h1>Registrar Inscripción</h1>
        </v-col>
      </v-row>
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step :complete="step > 1" step="1">
            Horario de inscripción
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2">
            Selección de proyectos
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-row>
              <v-col>
                <v-btn
                  width="320"
                  x-large
                  outlined
                  :color="servicioBotonColor"
                  @click.prevent="asignarRol('servicio')"
                >
                  <v-icon left x-large> mdi-face-agent </v-icon>
                  Servicio Social
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  width="320"
                  x-large
                  outlined
                  :color="practicasBotonColor"
                  @click.prevent="asignarRol('practicas')"
                >
                  <v-icon left x-large> mdi-account-tie </v-icon>
                  Prácticas Profesionales
                </v-btn>
              </v-col>
            </v-row>
            <v-card elevation="0">
              <v-card-title>
                <v-text-field
                  v-model="busqueda"
                  append-icon="mdi-magnify"
                  label="Buscar"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-col>
                <v-data-table
                  v-model="seleccionados"
                  :headers="cabeceras"
                  :items="proyectos"
                  :single-select="singleSelect"
                  :search="busqueda"
                  :loading="esperandoRespuesta"
                  item-key="id"
                  show-select
                  class="elevation-1"
                  :footer-props="{
                    'items-per-page-text': 'proyectos por pág.'
                  }"
                >
                  <template v-slot:no-results>
                    No se encontraron coincidencias
                  </template>
                  <template v-slot:no-data>No existen registros</template>
                </v-data-table>
              </v-col>
            </v-card>
            <v-row>
              <v-col>
                <v-btn color="success" @click.prevent="siguientePaso()">
                  Siguiente
                </v-btn>
              </v-col>
            </v-row>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-form
              ref="formularioInscripcion"
              v-model="validacion"
              lazy-validation
            >
              <v-row align="center">
                <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                  <v-date-picker
                    elevation="5"
                    v-model="fecha_fin"
                  ></v-date-picker>
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                  <v-time-picker
                    elevation="5"
                    v-model="hora_fin"
                    format="ampm"
                  ></v-time-picker>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="inscripcion_inicio"
                    label="Fecha de inicio"
                    prepend-icon="mdi-calendar"
                    readonly
                  ></v-text-field>
                  <v-text-field
                    v-model="fin_inscripcion"
                    :rules="fin_inscripcionRules"
                    label="Fecha de finalización"
                    prepend-icon="mdi-calendar"
                    readonly
                    :messages="mensajeValidacion"
                    :error="mensajeError"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn @click="volverPaso()">
                    regresar
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn
                    :disabled="!validacion"
                    :loading="esperandoRespuesta"
                    color="success"
                    @click.prevent="registrarInscripcion()"
                  >
                    Registrar
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-col>
</template>

<script src="./../../scripts/scripts-coordinador/RegistrarInscripcion.js"></script>
