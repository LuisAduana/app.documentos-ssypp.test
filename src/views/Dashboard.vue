<template>
  <v-app>
    <v-navigation-drawer
      app
      v-model="drawer"
      temporary
      color="secundary"
      v-if="getUsuario"
    >
      <div v-if="getUsuario.usuario.rol_usuario === 'ADMINISTRADOR'">
        <v-list-item>
          <v-list-item-icon>
            <v-btn icon @click="drawer = !drawer">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="title">
              Administrador
            </v-list-item-title>
            <v-list-item-subtitle>
              Menú
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list>
          <v-list-item-group v-model="itemSeleccionado" color="primary">
            <v-list-item
              v-for="(item, i) in menuAdministrador"
              :key="i"
              :to="item.ruta"
              link
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
      <div v-else-if="getUsuario.usuario.rol_usuario === 'COORDINADOR'">
        <v-list-item>
          <v-list-item-icon>
            <v-btn icon @click="drawer = !drawer">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="title">
              Coordinador
            </v-list-item-title>
            <v-list-item-subtitle>
              Menú
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list>
          <v-list-item-group v-model="itemSeleccionado" color="primary">
            <v-list-item
              v-for="(item, i) in menuCoordinador"
              :key="i"
              :to="item.ruta"
              link
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-if="getUsuario">
        Hola {{ getUsuario.usuario.nombres }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn href="#" @click.prevent="logout()" target="_blank" text>
        <span class="mr-2">Cerrar sesión</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view :key="$route.path" />
    </v-main>

    <v-footer app color="primary">
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script src="./../scripts/Dashboard.js"></script>
