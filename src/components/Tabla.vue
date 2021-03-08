<template>
  <v-data-table
    :headers="getCabeceras"
    :items="getItemsEnTabla"
    :search="getBusquedaEnTabla"
    :loading="getEsperandoTabla"
    loading-text="Cargando... espere porfavor"
    class="elevation-1"
    :footer-props="{ 'items-per-page-text': 'items por pág.' }"
  >
    <template v-slot:no-data>No existen registros</template>
    <template v-slot:no-results>No se encontraron coincidencias</template>
    <template v-slot:top>
      <v-dialog v-model="dialogoConfirmacion" max-width="500px" persistent>
        <v-card>
          <v-card-title class="headline"> Confirmacion </v-card-title>
          <v-card-text> {{ MENSAJE_DESACTIVAR }} </v-card-text>
          <v-card-actions>
            <v-col align="right">
              <v-btn color="gray darken-1" text @click="cerrarDialogo">
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                :loading="getEsperandoRespuesta"
                @click="desactivarItem"
              >
                Aceptar
              </v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template v-slot:item.edicion="{ item }">
      <v-btn
        v-if="!getSoloInactivos"
        @click.prevent="editarItem(item)"
        fab
        x-small
        elevation="0"
      >
        <v-icon small> mdi-pencil </v-icon>
      </v-btn>
      <v-btn
        v-if="!getSoloInactivos"
        @click.prevent="desactivarConfirmacion(item)"
        fab
        x-small
        elevation="0"
      >
        <v-icon small> mdi-delete </v-icon>
      </v-btn>
      <v-btn
        v-if="getSoloInactivos"
        @click.prevent="activarItem(item)"
        :loading="getEsperandoRespuesta"
        fab
        x-small
        elevation="0"
      >
        <v-icon small> mdi-restart </v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "tabla",
  data: () => ({
    dialogoConfirmacion: false,
    MENSAJE_DESACTIVAR: "¿Está seguro que desea desactivar este elemento?",
    busqueda: "",
    itemsActivos: [],
    itemsInactivos: [],
    item: {}
  }),
  methods: {
    ...mapActions(["saveCambioTabla"]),

    editarItem(item) {
      this.editar(item);
    },
    async activarItem(item) {
      item.estado = "ACTIVO";
      if (await this.activar(item)) {
        this.moverItemsEnTabla(item, "ACTIVO");
      }
    },
    async desactivarItem() {
      this.item.estado = "INACTIVO";
      if (await this.desactivar(this.item)) {
        this.moverItemsEnTabla(this.item, "INACTIVO");
      }
    },
    moverItemsEnTabla(item, cambio) {
      for (var i = 0; i < this.getItemsEnTabla.length; i++) {
        if (this.getItemsEnTabla[i].id === item.id) {
          this.saveCambioTabla({ posicion: i, estado: cambio });
        }
      }
      this.cerrarDialogo();
    },
    desactivarConfirmacion(item) {
      this.item = Object.assign({}, item);
      this.dialogoConfirmacion = true;
    },
    cerrarDialogo() {
      this.dialogoConfirmacion = false;
      this.$nextTick(() => {
        this.item = {};
      });
    }
  },
  computed: {
    ...mapGetters([
      "getBusquedaEnTabla",
      "getCabeceras",
      "getEsperandoRespuesta",
      "getEsperandoTabla",
      "getItemsEnTabla",
      "getSoloInactivos"
    ])
  },
  props: {
    activar: {
      type: Function
    },
    desactivar: {
      type: Function
    },
    editar: {
      type: Function
    }
  }
};
</script>
