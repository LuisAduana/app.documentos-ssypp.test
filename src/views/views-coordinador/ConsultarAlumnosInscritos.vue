/* eslint-disable vue/valid-v-for */
<template>
  <v-col align="center">
    <v-card max-width="1200">
      <v-card-title>
        <h2>{{ titulo }}</h2>
        <v-divider class="mx-4" vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="getBusquedaEnTabla"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-switch
          v-model="soloInscritos"
          :loading="getEsperandoRespuesta"
          label="Alumnos sin proyecto"
        ></v-switch>
      </v-card-title>
      <v-divider></v-divider>
      <tabla />
    </v-card>
  </v-col>
</template>

<script src="./../../scripts/scripts-coordinador/ConsultaAlumnosInscritos.js"></script>
