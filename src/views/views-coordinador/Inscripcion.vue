<template>
  <v-container>
    <v-col align="center">
      <v-card max-width="1000">
        <v-container>
          <v-row no-gutters>
            <v-col align="left">
              <v-btn icon @click="regresar()">
                <v-icon>mdi-keyboard-backspace</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col align="center">
              <h1>Registrar Inscripción</h1>
            </v-col>
          </v-row>
          <v-form
            ref="formularioInscripcion"
            v-model="validacion"
            lazy-validation
          >
            <v-row>
              <v-col cols="12" xl="4" lg="4" md="6" sm="6" xs="12">
                <v-date-picker
                  elevation="5"
                  v-model="fecha_fin"
                ></v-date-picker>
              </v-col>
              <v-col cols="12" xl="4" lg="4" md="6" sm="6" xs="12">
                <v-time-picker
                  elevation="5"
                  v-model="hora_fin"
                  format="ampm"
                ></v-time-picker>
              </v-col>
              <v-col cols="12" xl="4" lg="4" md="12" sm="12" xs="12">
                <v-row>
                  <v-col>
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
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card>
    </v-col>
  </v-container>
</template>

<script src="./../../scripts/scripts-coordinador/RegistrarInscripcion.js"></script>
