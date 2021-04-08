<template>
  <v-col align="center">
    <v-card max-width="800">
      <v-card-title>
        <h2>Documentos</h2>
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
        <template v-if="getInformacionDashboard">
          <v-dialog v-model="getDialogoDocumento" persistent width="600">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="success"
                v-bind="attrs"
                v-on="on"
                @click.prevent="saveDialogoDocumento(true)"
              >
                Nuevo
              </v-btn>
            </template>
            <Seleccionar
              v-if="getInformacionDashboard.tipo_proyecto === 'practicas'"
              :tipo="'practica'"
            />
            <Seleccionar v-else :tipo="'servicio'" />
          </v-dialog>
        </template>
      </v-card-title>
      <v-divider></v-divider>
      <Tabla />
    </v-card>
  </v-col>
</template>

<script src="./../../scripts/scripts-alumno/ConsultaDocumentos.js"></script>
