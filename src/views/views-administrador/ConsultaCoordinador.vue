<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Coordinadores registrados</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="right">
        <v-btn color="success" @click.prevent="registrarCoordinador()">
          Nuevo
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          :headers="cabeceras"
          :items="coordinadores"
          :items-per-page="10"
          :loading="esperandoTabla"
          sort-by="apellido_paterno"
          loading-text="Cargando... espere porfavor"
          class="elevation-1"
          :footer-props="{ 'items-per-page-text': 'coordinadores por pág.' }"
        >
          <template v-slot:item.estado="{ item }">
            <v-chip :color="getColor(item.estado)" dark>
              {{ item.estado }}
            </v-chip>
          </template>
          <template v-slot:item.edicion="{ coordinador }">
            <v-icon small class="mr-2" @click="editarCoordinador(coordinador)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="desactivarCoordinador(coordinador)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script src="./../../scripts/scripts-administrador/ConsultaCoordinador.js"></script>
