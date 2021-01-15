<template>
  <v-container>
    <v-col align="center">
      <v-card max-width="800">
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
              <h1>Registrar Responsable</h1>
            </v-col>
          </v-row>
          <v-row>
            <v-col align="center">
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
                      :items="nombres_dependencias"
                      :rules="nombre_dependenciaRules"
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
                      :disabled="!validacion"
                      :loading="esperandoRespuesta"
                      color="success"
                      @click.prevent="registrarResponsable()"
                    >
                      Registrar
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-container>
</template>

<script src="./../../scripts/scripts-coordinador/RegistrarResponsable.js"></script>
