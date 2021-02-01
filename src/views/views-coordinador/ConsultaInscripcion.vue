<template>
  <v-container>
    <v-col align="center">
      <v-card>
        <v-card-title>
          <h2>Inscripciones</h2>
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
          <v-btn color="success" @click="registrarInscripcion()">
            Nuevo
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-data-table
          :headers="cabeceras"
          :items="inscripcionesEnTabla"
          :search="busqueda"
          :items-per-page="10"
          :loading="esperandoTabla"
          sort-by="nombre_dependencia"
          loading-text="Cargando... espere porfavor"
          class="elevation-1"
          :footer-props="{ 'items-per-page-text': 'dependencias por pág.' }"
        >
          <template v-slot:no-data>No existen registros</template>
          <template v-slot:no-results>No se encontraron coincidencias</template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-container>
</template>

<script src="./../../scripts/scripts-coordinador/ConsultaInscripcion.js"></script>
