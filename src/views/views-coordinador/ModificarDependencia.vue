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
              <h1>Modificar Dependencia</h1>
            </v-col>
          </v-row>
          <v-row>
            <v-col align="center">
              <v-form
                ref="formularioDependencia"
                v-model="validacion"
                lazy-validation
              >
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formDependencia.nombre_dependencia"
                      :rules="nombre_dependenciaRules"
                      label="Nombre de la dependencia *"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                    <v-text-field
                      v-model="formDependencia.direccion"
                      :rules="direccionRules"
                      label="Direccion *"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="formDependencia.ciudad"
                      :rules="ciudadRules"
                      label="Ciudad *"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                    <v-text-field
                      v-model="formDependencia.nombre_contacto"
                      :rules="nombre_contactoRules"
                      label="Nombre de contacto *"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="formDependencia.correo"
                      :rules="correoRules"
                      label="Correo electrónico *"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                    <v-text-field
                      v-model="formDependencia.num_contacto"
                      :rules="num_contactoRules"
                      label="No. de contacto *"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="formDependencia.sector"
                      :rules="sectorRules"
                      label="Sector de la dependencia *"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                    <v-text-field
                      v-model="formDependencia.num_us_directos"
                      :rules="num_usRules"
                      label="No. usuarios directos *"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="formDependencia.num_us_indirectos"
                      :rules="num_usRules"
                      label="No. usuarios indirectos *"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col align="center">
                    <v-btn
                      :disabled="!validacion"
                      :loading="esperandoRespuesta"
                      color="success"
                      @click.prevent="modificarDependencia()"
                    >
                      Modificar
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

<script src="./../../scripts/scripts-coordinador/ModificarDependencia.js"></script>
