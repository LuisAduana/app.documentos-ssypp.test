<template>
  <v-card max-width="500">
    <v-card-title class="headline grey lighten-2">
      Mensajes
    </v-card-title>
    <v-container>
      <v-virtual-scroll
        :items="retroalimentacion"
        :item-height="85"
        height="380"
      >
        <template v-slot:default="{ item }">
          <v-text-field
            solo
            readonly
            outlined
            v-model="item.mensaje"
            label="Mensaje"
            :hint="'Enviado: ' + item.fecha_envio"
            persistent-hint
          ></v-text-field>
        </template>
      </v-virtual-scroll>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Mensajes",
  props: {
    retroalimentacion: {
      type: Array
    }
  },
  computed: {
    ...mapGetters(["getUsuario"])
  }
};
</script>
