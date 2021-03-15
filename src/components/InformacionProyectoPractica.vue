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
            v-model="getProyecto.nombre_proyecto"
            label="Nombre del proyecto"
            readonly
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" xs="12">
          <v-text-field
            v-model="getProyecto.descripcion_general"
            label="Descripcion general del proyecto"
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" xs="12">
          <v-text-field
            v-model="getProyecto.objetivo_general"
            label="Objetivo general del proyecto"
            readonly
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" xs="12">
          <v-text-field
            v-model="getProyecto.objetivos_inmediatos"
            label="Objetivos inmediatos del proyecto"
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" xs="12">
          <v-text-field
            v-model="getProyecto.objetivos_mediatos"
            label="Objetivos mediatos del proyecto"
            readonly
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" xs="12">
          <v-text-field
            v-model="getProyecto.metodologia"
            label="Metodología"
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" xs="12">
          <v-text-field
            v-model="getProyecto.actividades_funcionales"
            label="Acttividades funcionales"
            readonly
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" xs="12">
          <v-text-field
            v-model="getProyecto.responsabilidades"
            label="Responsabilidades"
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" xs="12">
          <v-text-field
            v-model="getProyecto.duracion"
            label="Duracion"
            readonly
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col align="center">
          <v-text-field
            v-model="getProyecto.horario"
            label="Horario"
            readonly
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col align="center">
          <v-btn color="success" @click="saveDialogoPractica(false)">
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
    ...mapActions("moduloUsuario", ["saveDialogoPractica"])
  },
  computed: {
    ...mapGetters("moduloUsuario", ["getProyecto"])
  }
};
</script>
