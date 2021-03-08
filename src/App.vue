<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <v-snackbar v-model="snackbar.activo" :timeout="-1" :color="snackbar.color">
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
  computed: {
    ...mapState(["snackbar"])
  }
};
</script>
