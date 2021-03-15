<template>
  <v-card>
    <v-card-title> Información del proyecto </v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field
            v-model="getProyecto.nombre_dependencia"
            label="Dependencia"
            prepend-icon="mdi-office-building-outline"
            readonly
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="getProyecto.nombre_responsable"
            label="Responsable"
            prepend-icon="mdi-account"
            readonly
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="getProyecto.direccion"
            label="Dirección"
            readonly
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" xs="12">
          <v-text-field
            v-model="getProyecto.actividades"
            label="Actividades"
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" xs="12">
          <v-text-field
            v-model="getProyecto.requisitos"
            label="Requisitos"
            readonly
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" xs="12">
          <v-text-field
            v-model="getProyecto.horario"
            label="Horario"
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" xs="12">
          <v-text-field
            v-model="getProyecto.num_alumnos"
            label="No. de alumnos"
            readonly
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col align="center">
          <v-btn color="success" @click="saveDialogoServicio(false)">
            Cerrar
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions("moduloUsuario", ["saveDialogoServicio"])
  },
  computed: {
    ...mapGetters("moduloUsuario", ["getProyecto"])
  }
};
</script>
