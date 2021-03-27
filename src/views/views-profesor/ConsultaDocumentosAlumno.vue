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
      </v-card-title>
      <v-divider></v-divider>
      <v-data-table
        :headers="cabeceras"
        :items="documentos"
        :search="busqueda"
        :footer-props="{ 'items-per-page-text': 'items por pág.' }"
        loading-text="Cargando... espere porfavor"
      >
        <template v-slot:no-data>No existen registros</template>
        <template v-slot:no-results>No se encontraron coincidencias</template>
        <template v-slot:[`item.edicion`]="{ item }">
          <v-btn @click.prevent="descargar(item)" fab x-small elevation="0">
            <v-icon small> mdi-download </v-icon>
          </v-btn>
          <v-btn @click.prevent="calificar(item)" fab x-small elevation="0">
            <v-icon small> mdi-check </v-icon>
          </v-btn>
        </template>
        <template v-slot:top>
          <v-dialog v-model="dialogo" max-width="500" persistent>
            <v-card max-width="500">
              <v-card-title>Calificar documento</v-card-title>
              <v-card-text>
                <v-select
                  v-model="estado"
                  :items="items"
                  label="Estado"
                ></v-select>
                <v-textarea
                  label="Razón:"
                  v-if="estado === 'RECHAZADO'"
                  counter="250"
                ></v-textarea>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="cerrar">Cerrar</v-btn>
                <v-btn
                  @click="aceptar"
                  :loading="esperandoRepsuesta"
                  color="success"
                  >Aceptar</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </v-data-table>
    </v-card>
  </v-col>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    busqueda: "",
    estado: "ACEPTADO",
    esperandoRepsuesta: false,
    dialogo: false,
    documento: {},
    items: ["ACEPTADO", "RECHAZADO"],
    cabeceras: [
      { text: "Nombre", value: "nombre" },
      { text: "Estado", value: "estado" },
      { text: "Edición", value: "edicion", sortable: false }
    ]
  }),
  mounted() {
    console.log(this.documentos);
    if (this.documentos.length === 0) {
      this.$router.back();
    }
  },
  methods: {
    ...mapActions("moduloDocumento", ["descargarDocumento"]),
    aceptar() {
      console.log("ACEPTADO");
    },
    async descargar(item) {
      this.esperandoRepsuesta = true;
      await this.descargarDocumento(item);
      this.esperandoRepsuesta = false;
    },
    calificar(item) {
      this.documento = item;
      this.dialogo = true;
    },
    cerrar() {
      this.documento = {};
      this.dialogo = false;
    }
  },
  props: {
    documentos: {
      type: Array,
      default: function() {
        return [];
      }
    }
  }
};
</script>
