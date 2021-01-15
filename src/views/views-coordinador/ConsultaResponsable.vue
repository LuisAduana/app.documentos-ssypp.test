<template>
  <v-container>
    <v-col align="center">
      <v-card>
        <v-card-title>
          <h2>Responsables</h2>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="busqueda"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="registrarResponsable()">
            Nuevo
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-data-table
          :headers="cabeceras"
          :items="responsables"
          :search="busqueda"
          :items-per-page="10"
          :loading="esperandoTabla"
          sort-by="nombre_responsable"
          loading-text="Cargando... espere porfavor"
          class="elevation-1"
          :footer-props="{ 'items-per-page-text': 'dependencias por pág.' }"
        >
          <template v-slot:no-data>No existen registros</template>
          <template v-slot:no-results>No se encontraron coincidencias</template>
          <template v-slot:item.edicion="{ item }">
            <v-icon small class="mr-2" @click="editarDependencia(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="desactivarActivarDependencia(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-container>
</template>

<script src="./../../scripts/scripts-coordinador/ConsultaResponsable.js"></script>
