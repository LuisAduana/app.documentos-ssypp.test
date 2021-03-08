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
      <v-data-table
        :headers="cabeceras"
        :items="profesoresEnTabla"
        :search="busqueda"
        :items-per-page="10"
        :loading="esperandoTabla"
        sort-by="apellido_paterno"
        loading-text="Cargando... espere porfavor"
        class="elevation-1"
        :footer-props="{ 'items-per-page-text': 'profesores por pág.' }"
      >
        <template v-slot:no-data>No existen registros</template>
        <template v-slot:no-results>No se encontraron coincidencias</template>
        <template v-slot:item.edicion="{ item }">
          <v-icon
            v-if="!soloInactivos"
            small
            class="mr-2"
            @click="editarProfesor(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            v-if="!soloInactivos"
            small
            @click="desactivarActivarProfesor(item)"
          >
            mdi-delete
          </v-icon>
          <v-icon v-else small @click="desactivarActivarProfesor(item)">
            mdi-restart
          </v-icon>
        </template>
        <template v-slot:top>
          <v-dialog
            v-model="dialogoConfirmarActDesactivar"
            max-width="500px"
            persistent
          >
            <v-card>
              <v-card-title class="headline"> Confirmacion </v-card-title>
              <v-card-text> ¿Está seguro que desea {{ mensaje }}? </v-card-text>
              <v-card-actions>
                <v-col align="right">
                  <v-btn color="gray darken-1" text @click="cerrarDialogo()">
                    Cancelar
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    :loading="esperandoRespuestaActDesact"
                    @click="activarDesactivarConfirmacion()"
                  >
                    Aceptar
                  </v-btn>
                </v-col>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </v-data-table>
    </v-card>
  </v-col>
</template>

<script src="./../../scripts/scripts-coordinador/ConsultaProfesor.js"></script>
