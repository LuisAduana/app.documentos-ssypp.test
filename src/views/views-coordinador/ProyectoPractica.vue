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
              <h1 v-if="formProyectoPractica.registro_proyecto">
                Registrar Proyecto Practica
              </h1>
              <h1 v-else>
                Modificar Proyecto Practica
              </h1>
            </v-col>
          </v-row>
          <v-form
            ref="formularioProyectoPractica"
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
                  v-model="formProyectoPractica.nombre_responsable"
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
                  v-model="formProyectoPractica.nombre_proyecto"
                  :rules="nombre_proyectoRules"
                  label="Nombre del proyecto *"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                <v-text-field
                  v-model="formProyectoPractica.descripcion_general"
                  :rules="descripcion_generalRules"
                  label="Descripcion general del proyecto *"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                <v-text-field
                  v-model="formProyectoPractica.objetivo_general"
                  :rules="objetivo_generalRules"
                  label="Objetivo general del proyecto *"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                <v-text-field
                  v-model="formProyectoPractica.objetivos_inmediatos"
                  :rules="objetivos_inmediatosRules"
                  label="Objetivos inmediatos del proyecto *"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                <v-text-field
                  v-model="formProyectoPractica.objetivos_mediatos"
                  :rules="objetivos_mediatosRules"
                  label="Objetivos mediatos del proyecto *"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                <v-text-field
                  v-model="formProyectoPractica.metodologia"
                  :rules="metodologiaRules"
                  label="Metodología"
                ></v-text-field>
              </v-col>
              <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                <v-text-field
                  v-model="formProyectoPractica.actividades_funcionales"
                  :rules="actividades_funcionalesRules"
                  label="Actividades funcionales"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                <v-text-field
                  v-model="formProyectoPractica.responsabilidades"
                  :rules="responsabilidadesRules"
                  label="Responsabilidades"
                ></v-text-field>
              </v-col>
              <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                <v-text-field
                  v-model="formProyectoPractica.duracion"
                  :rules="duracionRules"
                  label="Duracion"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col align="center">
                <v-text-field
                  v-model="formProyectoPractica.horario"
                  :rules="horarioRules"
                  label="Horario"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col align="center">
                <v-btn
                  v-if="formProyectoPractica.registro_proyecto"
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

<script src="./../../scripts/scripts-coordinador/RegistrarModificarProyectoPractica.js"></script>
