<template>
  <v-app>
    <v-navigation-drawer
      app
      v-model="drawer"
      temporary
      color="secundary"
      v-if="getUsuario"
    >
      <v-list-item>
        <v-list-item-icon>
          <v-btn icon @click="drawer = !drawer">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ getUsuario.rol_usuario }}
          </v-list-item-title>
          <v-list-item-subtitle>
            Menú
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <v-list-item-group
          v-if="menu != []"
          v-model="itemSeleccionado"
          color="primary"
        >
          <v-list-item v-for="(item, i) in menu" :key="i" :to="item.ruta" link>
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar v-if="getUsuario" app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-if="getUsuario">
        {{ getUsuario.nombres }}
        {{ getUsuario.apellido_paterno }}
        {{ getUsuario.apellido_materno }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu right bottom transition="slide-y-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item-group>
            <v-list-item @click="modificarDatosPersonales">
              <v-list-item-content>
                <v-list-item-title> Datos personales </v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon>mdi-account-edit</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item @click.prevent="logout">
              <v-list-item-content>
                <v-list-item-title> Cerrar sesión </v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon>mdi-open-in-new</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view :key="$route.path" />
    </v-main>

    <v-footer v-if="getUsuario" app dark color="primary">
      <v-row
        v-if="getUsuario.rol_usuario === 'ALUMNO' && getInformacionDashboard"
        no-gutters
        align="center"
      >
        <v-col no-gutters>
          <font size="1">
            <strong> Dependencia: </strong>
            {{
              getInformacionDashboard.proyecto.dependencia.nombre_dependencia
            }}
          </font>
          <br />
          <font size="1">
            <strong> Número: </strong>
            {{ getInformacionDashboard.proyecto.dependencia.num_contacto }}
          </font>
        </v-col>
        <v-col align="center">
          <small>
            <strong> Fecha </strong> <br />
            {{ new Date().getDate() }} - {{ new Date().getMonth() + 1 }} -
            {{ new Date().getFullYear() }}
          </small>
        </v-col>
        <v-col align="right">
          <font size="1">
            <strong>Responsable: </strong>
            {{
              getInformacionDashboard.proyecto.responsable.nombre_responsable
            }}
          </font>
          <br />
          <font size="1">
            <strong>Número: </strong>
            {{ getInformacionDashboard.proyecto.responsable.num_contacto }}
          </font>
        </v-col>
      </v-row>
      <v-row v-else align="center" no-gutters>
        <v-col align="center">
          <strong> Fecha </strong> <br />
          {{ new Date().getDate() }} - {{ new Date().getMonth() + 1 }} -
          {{ new Date().getFullYear() }}
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script src="./../scripts/Dashboard.js"></script>
