<template>
  <center>
    <h1>Not Found!</h1>
    <v-btn @click="regresar">Regresar</v-btn>
  </center>
</template>

<script>
export default {
  name: "NotFound",
  methods: {
    regresar() {
      this.$router.back();
    }
  }
};
</script>

<style scoped>
center {
  margin: 15vw;
}

h1 {
  color: var(--border);
  font-size: 2em;
}
</style>
