<template>
  <v-data-table
    v-model="seleccionados"
    :headers="getCabeceras"
    :items="getItemsEnTabla"
    :single-select="getTipoSeleccion"
    :search="getBusquedaEnTabla"
    :loading="getEsperandoTabla"
    item-key="id"
    show-select
    class="elevation-1"
    :footer-props="{ 'items-per-page-text': 'proyectos por pág.' }"
  >
    <template v-slot:no-results>
      No se encontraron coincidencias
    </template>
    <template v-slot:no-data>No existen registros</template>
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    seleccionados: []
  }),
  methods: {
    ...mapActions("moduloUsuario", ["saveOpcion"]),
    ...mapActions(["saveItemsSeleccionados"])
  },
  mounted() {
    this.saveItemsSeleccionados([]);
    this.seleccionados = this.getItemsSeleccionados;
  },
  watch: {
    seleccionados() {
      var tam = this.seleccionados.length;
      if (tam > 0 && tam < 4) {
        this.saveOpcion(this.seleccionados[tam - 1]);
      }
      this.saveItemsSeleccionados(this.seleccionados);
    },
    getCabeceras() {
      this.seleccionados = [];
    }
  },
  computed: {
    ...mapGetters("moduloUsuario", [
      "getDialogoProyectoServicio",
      "getDialogoProyectoPractica"
    ]),
    ...mapGetters([
      "getTipoSeleccion",
      "getItemsSeleccionados",
      "getBusquedaEnTabla",
      "getCabeceras",
      "getEsperandoTabla",
      "getItemsEnTabla"
    ])
  }
};
</script>
