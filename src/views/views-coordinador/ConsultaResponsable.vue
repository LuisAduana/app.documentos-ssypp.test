<template>
  <v-col align="center">
    <v-card max-width="1200">
      <v-card-title>
        <h2>Responsables</h2>
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
        <v-btn color="success" @click="registrarResponsable()">
          Nuevo
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <tabla
        :editar="editarResponsable"
        :desactivar="cambiarResponsable"
        :activar="cambiarResponsable"
      />
    </v-card>
  </v-col>
</template>

<script src="./../../scripts/scripts-coordinador/ConsultaResponsable.js"></script>
