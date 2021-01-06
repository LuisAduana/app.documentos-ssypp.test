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
              <h1>Modificar Coordinador</h1>
            </v-col>
          </v-row>
          <v-row>
            <v-col align="center">
              <v-form
                ref="formularioCoordinador"
                v-model="validacion"
                lazy-validation
              >
                <v-row>
                  <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                    <v-text-field
                      v-model="formCoordinador.apellido_paterno"
                      :rules="apellido_paternoRules"
                      label="Apellido paterno *"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="formCoordinador.apellido_materno"
                      :rules="apellido_maternoRules"
                      label="Apellido materno *"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                    <v-text-field
                      v-model="formCoordinador.nombres"
                      :rules="nombresRules"
                      label="Nombre(s) *"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="formCoordinador.correo"
                      :rules="correoRules"
                      label="Correo electrónico *"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <!--v-row>
                  <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                    <v-text-field
                      v-model="formCoordinador.password"
                      :append-icon="mostrarPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="passwordRules"
                      :type="mostrarPassword ? 'text' : 'password'"
                      @click:append="mostrarPassword = !mostrarPassword"
                      label="Contraseña *"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="password_confirmacion"
                      :append-icon="
                        mostrarConfirmacionPassword ? 'mdi-eye' : 'mdi-eye-off'
                      "
                      :rules="[
                        v => !!v || 'Confirme su contraseña',
                        this.formCoordinador.password ===
                          this.password_confirmacion || 'Contraseña no coincide'
                      ]"
                      :type="mostrarConfirmacionPassword ? 'text' : 'password'"
                      @click:append="
                        mostrarConfirmacionPassword = !mostrarConfirmacionPassword
                      "
                      label="Confirmar contraseña *"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row-->
                <v-row>
                  <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                    <v-text-field
                      v-model="formCoordinador.num_personal"
                      :rules="num_personalRules"
                      :counter="10"
                      label="No. Personal *"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                    <v-text-field
                      v-model="formCoordinador.num_contacto"
                      :rules="num_contactoRules"
                      label="Número de contacto *"
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
                      @click.prevent="modificarCoordinador()"
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

<script src="./../../scripts/scripts-administrador/ModificarCoordinador.js"></script>
