<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-btn icon @click="saveDialogoAsignarProyecto(false)">
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
        <v-btn text :loading="getEsperandoRespuesta" @click="asignar()">
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
            v-if="tipoInscripcion == 'servicio'"
          >
            <v-card-title>
              <h5 v-if="proyecto == proyectosSeleccionados[0]">
                Alta prioridad
              </h5>
              <h5 v-else-if="proyecto == proyectosSeleccionados[1]">
                Media prioridad
              </h5>
              <h5 v-else>
                Baja prioridad
              </h5>
            </v-card-title>
            <v-card-text align="start">
              <v-container>
                <v-row>
                  <v-text-field
                    :value="proyecto.nombre_dependencia"
                    label="Dependencia: "
                    dense
                    readonly
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field
                    :value="proyecto.nombre_responsable"
                    label="Responsable: "
                    dense
                    readonly
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field
                    :value="proyecto.actividades"
                    label="Actividades: "
                    dense
                    readonly
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field
                    :value="proyecto.num_alumnos"
                    label="No. alumnos: "
                    dense
                    readonly
                  ></v-text-field>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
          <v-card v-else max-width="500" elevation="5">
            <v-card-title>
              <h5 v-if="proyecto == proyectosSeleccionados[0]">
                Alta prioridad
              </h5>
              <h5 v-else-if="proyecto == proyectosSeleccionados[1]">
                Media prioridad
              </h5>
              <h5 v-else>
                Baja prioridad
              </h5>
            </v-card-title>
            <v-card-text align="start">
              <v-container>
                <v-row>
                  <v-text-field
                    :value="proyecto.nombre_dependencia"
                    label="Dependencia: "
                    dense
                    readonly
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field
                    :value="proyecto.nombre_responsable"
                    label="Responsable: "
                    dense
                    readonly
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field
                    :value="proyecto.nombre_proyecto"
                    label="Nombre proyecto: "
                    dense
                    readonly
                  ></v-text-field>
                </v-row>
              </v-container>
            </v-card-text>
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
              :headers="getCabecerasDos"
              :single-select="true"
              :items="proyectos"
              :search="busquedaProyectos"
              :items-per-page="10"
              :loading="getEsperandoTabla"
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
              <template v-slot:top>
                <v-dialog v-model="getDialogoProyectoServicio" persistent>
                  <informacionProyectoServicio />
                </v-dialog>
                <v-dialog v-model="getDialogoProyectoPractica" persistent>
                  <informacionProyectoPractica />
                </v-dialog>
              </template>
              <template v-slot:[`item.edicion`]="{ item }">
                <v-btn
                  @click.prevent="masInformacion(item)"
                  fab
                  x-small
                  elevation="0"
                >
                  <v-icon small> mdi-eye-outline </v-icon>
                </v-btn>
              </template>
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
</template>

<script>
import informacionProyectoServicio from "./InformacionProyectoServicio";
import informacionProyectoPractica from "./InformacionProyectoPractica";
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    seleccionados: [],
    busquedaProyectos: ""
  }),
  methods: {
    ...mapActions("moduloAlumno", ["asignarProyecto"]),
    ...mapActions("moduloUsuario", [
      "saveDialogoPractica",
      "saveDialogoServicio",
      "saveProyecto"
    ]),
    ...mapActions([
      "saveDialogoAsignarProyecto",
      "snackBarInfo",
      "deleteItemEnTabla"
    ]),

    masInformacion(item) {
      this.saveProyecto(item);
      if (this.tipoInscripcion == "servicio") {
        this.saveDialogoServicio(true);
      } else if (this.getTipoTabla == "registroPractica") {
        this.saveDialogoPractica(true);
      }
    },

    async asignar() {
      if (this.seleccionados.length > 0) {
        if (
          await this.asignarProyecto({
            id: this.alumno.id,
            alumno_id: this.alumno.alumno_id,
            tipo_proyecto: this.tipoInscripcion,
            proyecto_id: this.seleccionados[0].id
          })
        ) {
          for (var i = 0; i < this.getItemsEnTabla.length; i++) {
            if (this.getItemsEnTabla[i].id === this.alumno.id) {
              this.deleteItemEnTabla(i);
            }
          }
          this.seleccionados = [];
          this.saveDialogoAsignarProyecto(false);
        }
      } else {
        this.snackBarInfo("Seleccione un proyecto");
      }
    }
  },
  props: {
    alumno: {
      type: Object,
      require: true
    },
    proyectosSeleccionados: {
      type: Array,
      require: true
    },
    proyectos: {
      type: Array,
      require: true
    },
    tipoInscripcion: {
      type: String,
      require: true
    }
  },
  computed: {
    ...mapGetters("moduloUsuario", [
      "getDialogoProyectoServicio",
      "getDialogoProyectoPractica"
    ]),
    ...mapGetters([
      "getCabecerasDos",
      "getEsperandoRespuesta",
      "getEsperandoTabla",
      "getItemsEnTabla"
    ])
  },
  components: {
    informacionProyectoPractica,
    informacionProyectoServicio
  }
};
</script>
