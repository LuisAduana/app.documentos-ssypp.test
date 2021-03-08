<template>
  <v-col align="center">
    <v-card elevation="9" max-width="450">
      <v-container>
        <v-row>
          <v-col align="center">
            <h1>Inicio de sesión</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col align="center">
            <v-form
              ref="formularioCredenciales"
              v-model="validacion"
              lazy-validation
            >
              <v-text-field
                v-model="formCredenciales.correo"
                :rules="correoRules"
                label="Correo electrónico"
                required
              ></v-text-field>

              <v-text-field
                v-model="formCredenciales.password"
                :rules="passwordRules"
                type="password"
                label="Contraseña"
                required
              ></v-text-field>

              <v-row>
                <v-col>
                  <v-btn color="accent" @click.prevent="registro">
                    Registrar
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn
                    :disabled="!validacion"
                    :loading="getEsperandoRespuesta"
                    color="success"
                    @click.prevent="login"
                  >
                    Entrar
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-col>
</template>

<script src="./../scripts/Login.js"></script>
