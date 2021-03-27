<template>
  <v-col align="center">
    <v-card max-width="1200">
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
      </v-card-title>
      <v-divider></v-divider>
      <tabla />
    </v-card>
  </v-col>
</template>

<script src="./../../scripts/scripts-profesor/ConsultaAlumnos.js"></script>
