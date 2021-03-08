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
      <div v-else-if="getUsuario.usuario.rol_usuario === 'ALUMNO'">
        <v-list-item>
          <v-list-item-icon>
            <v-btn icon @click="drawer = !drawer">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="title">
              Alumno
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
              v-for="(item, i) in menuAlumno"
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

    <v-app-bar v-if="getUsuario" app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-if="getUsuario">
        {{ getUsuario.usuario.nombres }}
        {{ getUsuario.usuario.apellido_paterno }}
        {{ getUsuario.usuario.apellido_materno }}
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

    <v-footer v-if="getUsuario" app dark color="primary">
      <v-row
        v-if="getUsuario.usuario.rol_usuario === 'ALUMNO'"
        no-gutters
        align="center"
      >
        <v-col no-gutters>
          <font size="1">
            <strong> Coordinador: </strong>
            {{
              getInformacionDashboard.informacionDashboard.nombres_coordinador
            }}
            {{
              getInformacionDashboard.informacionDashboard
                .apellido_paterno_coordinador
            }}
            {{
              getInformacionDashboard.informacionDashboard
                .apellido_materno_coordinador
            }}
          </font>
          <br />
          <font size="1">
            <strong> Correo: </strong>
            {{
              getInformacionDashboard.informacionDashboard.correo_coordinador
            }}
          </font>
          <br />
          <font size="1">
            <strong> Número: </strong>
            {{ getInformacionDashboard.informacionDashboard.num_coordinador }}
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
              getInformacionDashboard.informacionDashboard.nombre_responsable
            }}
          </font>
          <br />
          <font size="1">
            <strong>Correo: </strong>
            {{
              getInformacionDashboard.informacionDashboard.correo_responsable
            }}
          </font>
          <br />
          <font size="1">
            <strong>Número: </strong>
            {{ getInformacionDashboard.informacionDashboard.num_responsable }}
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
