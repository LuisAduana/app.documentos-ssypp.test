<template>
  <v-col align="center">
    <v-card max-width="1200">
      <v-card-title>
        <h2>Profesores</h2>
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
        <v-switch v-model="soloInactivos" label="Solo inactivos"></v-switch>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="registrarProfesor()">
          Nuevo
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <tabla
        :activar="cambiarProfesor"
        :desactivar="cambiarProfesor"
        :editar="editarProfesor"
      />
    </v-card>
  </v-col>
</template>

<script src="./../../scripts/scripts-coordinador/ConsultaProfesor.js"></script>
