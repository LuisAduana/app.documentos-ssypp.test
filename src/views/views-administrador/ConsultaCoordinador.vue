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
                      Cancel
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      :loading="esperandoRespuestaActDesact"
                      @click="activarDesactivarConfirmacion()"
                    >
                      OK
                    </v-btn>
                  </v-col>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
          <template v-slot:item.edicion="{ item }">
            <v-icon small class="mr-2" @click="editarCoordinador(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="desactivarActivarCoordinador(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script src="./../../scripts/scripts-administrador/ConsultaCoordinador.js"></script>
