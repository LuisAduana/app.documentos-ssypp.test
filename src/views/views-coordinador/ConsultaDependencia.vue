<template>
  <v-container>
    <v-col align="center">
      <v-card>
        <v-card-title>
          <h2>Dependencias Registradas</h2>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="busqueda"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="registrarDependencia()">
            Nuevo
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-data-table
          :headers="cabeceras"
          :items="dependencias"
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
          <template v-slot:top>
            <v-dialog
              v-model="dialogoConfirmarActDesactivar"
              max-width="500px"
              persistent
            >
              <v-card>
                <v-card-title class="headline"> Confirmacion </v-card-title>
                <v-card-text>
                  ¿Está seguro que desea {{ mensaje }}?
                </v-card-text>
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

<script src="./../../scripts/scripts-coordinador/ConsultaDependencia.js"></script>
