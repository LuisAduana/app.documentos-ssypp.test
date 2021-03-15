<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <v-snackbar
      v-for="(snackbar, index) in snackbars.filter(s => s.activo)"
      :key="snackbar.text + random()"
      v-model="snackbar.activo"
      :timeout="-1"
      :color="snackbar.color"
      :style="`bottom: ${index * 60}px`"
    >
      {{ snackbar.mensaje }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar.activo = false">
          Aceptar
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",
  data: () => ({
    timeout: 17000
  }),
  methods: {
    random() {
      return Math.random().toString();
    }
  },
  computed: {
    ...mapState(["snackbars"])
  }
};
</script>
