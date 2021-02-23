/* eslint-disable vue/valid-v-for */
<template>
  <v-col align="center">
    <v-card max-width="1200">
      <v-card-title>
        <h2>Alumnos inscritos</h2>
        <v-divider class="mx-4" vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="busqueda"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-divider></v-divider>
      <v-data-table
        :headers="cabeceras"
        :items="alumnos"
        :search="busqueda"
        :items-per-page="10"
        :loading="esperandoRespuesta"
        sort-by="matricula"
        :sort-desc="true"
        loading-text="Cargando... espere porfavor"
        class="elevation-1"
        :footer-props="{ 'items-per-page-text': 'alumnos por pág.' }"
      >
        <template v-slot:no-data>No existen registros</template>
        <template v-slot:no-results>No se encontraron coincidencias</template>
        <template v-slot:item.edicion="{ item }">
          <v-btn icon @click.prevent="consultarProyectos(item)">
            <v-icon small class="mr-2">
              mdi-book-information-variant
            </v-icon>
          </v-btn>
        </template>
        <template v-slot:top>
          <v-dialog
            v-model="dialogoAsignarProyecto"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <v-card>
              <v-toolbar dark color="primary">
                <v-btn icon @click="dialogoAsignarProyecto = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>
                  Asignar proyecto a
                  <strong>
                    {{ alumno.nombres }}
                    {{ alumno.apellido_paterno }}
                    {{ alumno.apellido_materno }}
                  </strong>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn
                    text
                    :loading="esperandoRespuesta"
                    @click="asignarProyecto()"
                  >
                    Asignar proyecto
                  </v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <v-col>
                <v-row>
                  <v-col>
                    <h2>Proyectos seleccionados por el alumno</h2>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    align="center"
                    v-for="proyecto in proyectosSeleccionados"
                    :key="proyecto.id"
                  >
                    <v-card
                      max-width="500"
                      elevation="5"
                      v-if="tipo_inscripcion == 'servicio'"
                    >
                      <v-card-subtitle align="start">
                        <p>
                          <strong>Dependencia: </strong
                          >{{ proyecto.nombre_dependencia }}
                        </p>
                        <p>
                          <strong>Responsable: </strong
                          >{{ proyecto.nombre_responsable }}
                        </p>
                        <p>
                          <strong>Actividades: </strong
                          >{{ proyecto.actividades }}
                        </p>
                        <p>
                          <strong>No. máx. de alumnos: </strong>
                          {{ proyecto.num_alumnos }}
                          <strong>Horario: </strong>
                          {{ proyecto.horario }}
                        </p>
                        <p>
                          <strong>Requisitos: </strong>
                          {{ proyecto.requisitos }}
                        </p>
                      </v-card-subtitle>
                    </v-card>
                    <v-card v-else max-width="500" elevation="5">
                      <v-card-subtitle align="start">
                        <p>
                          <strong>Dependencia: </strong
                          >{{ proyecto.nombre_dependencia }}
                        </p>
                        <p>
                          <strong>Responsable: </strong
                          >{{ proyecto.nombre_responsable }}
                        </p>
                        <p>
                          <strong>Proyecto: </strong
                          >{{ proyecto.nombre_proyecto }}
                        </p>
                      </v-card-subtitle>
                    </v-card>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-col>
                  <v-card elevation="0">
                    <v-card-title>
                      <h2>Proyectos disponibles para asignar</h2>
                      <v-divider class="mx-4" vertical></v-divider>
                      <v-text-field
                        v-model="busquedaProyectos"
                        append-icon="mdi-magnify"
                        label="Buscar"
                        single-line
                        hide-details
                      ></v-text-field>
                    </v-card-title>
                    <v-col>
                      <v-data-table
                        v-model="seleccionados"
                        :headers="cabecerasProyectos"
                        :items="proyectos"
                        :search="busquedaProyectos"
                        :items-per-page="10"
                        :loading="esperandoTabla"
                        sort-by="nombre_dependencia"
                        :sort-desc="true"
                        item-key="id"
                        show-select
                        loading-text="Cargando... espere porfavor"
                        class="elevation-1"
                        :footer-props="{
                          'items-per-page-text': 'proyectos por pág.'
                        }"
                      >
                        <template v-slot:no-data>
                          No existen registros
                        </template>
                        <template v-slot:no-results>
                          No se encontraron coincidencias
                        </template>
                      </v-data-table>
                    </v-col>
                  </v-card>
                </v-col>
              </v-col>
            </v-card>
          </v-dialog>
        </template>
      </v-data-table>
    </v-card>
  </v-col>
</template>

<script src="./../../scripts/scripts-coordinador/ConsultaAlumnosInscritos.js"></script>
