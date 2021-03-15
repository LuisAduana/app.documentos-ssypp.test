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
              <h1 v-if="formProyectoServicio.registro_proyecto">
                Registrar Proyecto Servicio
              </h1>
              <h1 v-else>
                Modificar Proyecto Servicio
              </h1>
            </v-col>
          </v-row>
          <v-form
            ref="formularioProyectoServicio"
            v-model="validacion"
            lazy-validation
          >
            <v-row>
              <v-col>
                <v-autocomplete
                  v-model="nombre_dependencia"
                  :items="getNombresDependencias"
                  :loading="getEsperandoNombresDependencias"
                  :rules="nombre_dependenciaRules"
                  label="Dependencia *"
                  no-data-text="No se encontraron coincidencias"
                  required
                  prepend-icon="mdi-office-building-outline"
                >
                </v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-autocomplete
                  v-model="formProyectoServicio.nombre_responsable"
                  :items="getNombresResponsables"
                  :loading="getEsperandoNombresResponsables"
                  :rules="nombre_responsableRules"
                  label="Responsable *"
                  no-data-text="No se encontraron coincidencias"
                  required
                  prepend-icon="mdi-account"
                >
                </v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="formProyectoServicio.actividades"
                  :rules="actividadesRules"
                  label="Actividades *"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" xl="4" lg="4" md="4" sm="6" xs="12">
                <v-text-field
                  v-model="formProyectoServicio.horario"
                  :rules="horarioRules"
                  label="Horario *"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" xl="4" lg="4" md="4" sm="6" xs="12">
                <v-text-field
                  v-model="formProyectoServicio.requisitos"
                  :rules="requisitosRules"
                  label="Requisitos *"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" xl="4" lg="4" md="4" sm="12" xs="12">
                <v-text-field
                  v-model="formProyectoServicio.num_alumnos"
                  :rules="num_alumnosRules"
                  label="No. de alumnos *"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col align="center">
                <v-btn
                  v-if="formProyectoServicio.registro_proyecto"
                  :disabled="!validacion"
                  :loading="getEsperandoRespuesta"
                  color="success"
                  @click.prevent="registrar()"
                >
                  Registrar
                </v-btn>
                <v-btn
                  v-else
                  :disabled="!validacion"
                  :loading="getEsperandoRespuesta"
                  color="success"
                  @click.prevent="modificar()"
                >
                  Modificar
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card>
    </v-col>
  </v-container>
</template>

<script src="./../../scripts/scripts-coordinador/RegistrarModificarProyectoServicio.js"></script>
