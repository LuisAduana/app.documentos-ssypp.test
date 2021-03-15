<template>
  <v-container>
    <v-col align="center">
      <v-card max-width="1000">
        <v-container>
          <v-row no-gutters>
            <v-col align="left">
              <v-btn icon @click="regresar()">
                <v-icon>mdi-keyboard-backspace</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col align="center">
              <h1 v-if="formResponsable.registro_responsable">
                Registrar Responsable
              </h1>
              <h1 v-else>
                Modificar Responsable
              </h1>
            </v-col>
          </v-row>
          <v-form
            ref="formularioResponsable"
            v-model="validacion"
            lazy-validation
          >
            <v-row>
              <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                <v-text-field
                  v-model="formResponsable.nombre_responsable"
                  :rules="nombre_responsableRules"
                  label="Nombre *"
                  required
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="formResponsable.correo"
                  :rules="correoRules"
                  label="Correo *"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                <v-text-field
                  v-model="formResponsable.num_contacto"
                  :rules="num_contactoRules"
                  label="No. de contacto *"
                  required
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="formResponsable.cargo"
                  :rules="cargoRules"
                  label="Cargo del responsable *"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  v-model="formResponsable.nombre_dependencia"
                  :items="getNombresDependencias"
                  :rules="nombre_dependenciaRules"
                  :loading="getEsperandoNombresDependencias"
                  label="Dependencia *"
                  no-data-text="No se encontraron coincidencias"
                  required
                  prepend-icon="mdi-office-building-outline"
                >
                </v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col align="center">
                <v-btn
                  v-if="formResponsable.registro_responsable"
                  :disabled="!validacion"
                  :loading="getEsperandoRespuesta"
                  color="success"
                  @click.prevent="registrar()"
                >
                  Registrar
                </v-btn>
                <v-btn
                  v-else
                  :disabled="!validacion"
                  :loading="getEsperandoRespuesta"
                  color="success"
                  @click.prevent="modificarResponsable()"
                >
                  Modificar
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card>
    </v-col>
  </v-container>
</template>

<script src="./../../scripts/scripts-coordinador/RegistrarModificarResponsable.js"></script>
