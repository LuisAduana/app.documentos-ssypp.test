<template>
  <v-col align="center">
    <v-card max-width="1200">
      <v-card-title>
        <v-btn icon @click="regresar">
          <v-icon>mdi-keyboard-backspace</v-icon>
        </v-btn>
        <h2>
          Documentos <small> {{ nombre }} </small>
        </h2>
      </v-card-title>
      <v-divider></v-divider>
      <v-row no-gutters>
        <v-col md="6">
          <v-card elevation="0">
            <v-card-title>Prácticas profesionales</v-card-title>
            <v-data-table
              :headers="cabeceras"
              :items="documentosPractica"
              :items-per-page="5"
              :footer-props="{ 'items-per-page-text': 'Documentos por pág.' }"
              class="elevation-1"
            >
              <template v-slot:no-data>No hay documentos</template>
              <template v-slot:[`item.edicion`]="{ item }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      @click.prevent="descargarPractica(item)"
                      fab
                      x-small
                      elevation="0"
                      v-bind="attrs"
                      v-on="on"
                      :loading="item.esperando"
                    >
                      <v-icon small> mdi-download </v-icon>
                    </v-btn>
                  </template>
                  <span>Descargar</span>
                </v-tooltip>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
        <v-col md="6">
          <v-card elevation="0">
            <v-card-title>Servicio social</v-card-title>
            <v-data-table
              :headers="cabeceras"
              :items="documentosServicio"
              :items-per-page="5"
              :footer-props="{ 'items-per-page-text': 'Documentos por pág.' }"
              class="elevation-1"
            >
              <template v-slot:no-data>No hay documentos</template>
              <template v-slot:[`item.edicion`]="{ item }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      @click.prevent="descargarServicio(item)"
                      fab
                      x-small
                      elevation="0"
                      v-bind="attrs"
                      v-on="on"
                      :loading="item.esperando"
                    >
                      <v-icon small> mdi-download </v-icon>
                    </v-btn>
                  </template>
                  <span>Descargar</span>
                </v-tooltip>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    cabeceras: [
      { text: "Nombre", value: "nombre" },
      { text: "Acciones", value: "edicion", sortable: false, align: "right" }
    ],
    documentosPractica: [],
    documentosServicio: []
  }),
  methods: {
    ...mapActions("moduloDocumento", [
      "descargarDocumentoPractica",
      "descargarDocumentoServicio"
    ]),

    async descargarPractica(item) {
      item.esperando = true;
      await this.descargarDocumentoPractica(item);
      item.esperando = false;
    },
    async descargarServicio(item) {
      item.esperando = true;
      await this.descargarDocumentoServicio(item);
      item.esperando = false;
    },
    regresar() {
      this.$router.back();
    }
  },
  mounted() {
    if (this.documentos.length == 0) {
      this.$router.back();
    } else {
      this.documentos.forEach(element => {
        if (element.tipo == "servicio") {
          this.documentosServicio.push(element);
        } else {
          this.documentosPractica.push(element);
        }
      });
    }
  },
  props: {
    documentos: {
      type: Array,
      default: function() {
        return [];
      }
    },
    nombre: {
      type: String
    }
  }
};
</script>
