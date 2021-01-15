<template>
  <v-main>
    <router-view />

    <v-app>
      <v-snackbar
        v-model="snackbar.activo"
        :timeout="-1"
        :color="snackbar.color"
      >
        {{ snackbar.mensaje }}
        <v-btn text @click="snackbar.activo = false">
          Aceptar
        </v-btn>
      </v-snackbar>
    </v-app>
  </v-main>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",
  data: () => ({
    dependencias: ["hola", "mundo"]
    // Hola mundo
  }),
  computed: {
    ...mapState(["snackbar"])
  }
};
</script>
