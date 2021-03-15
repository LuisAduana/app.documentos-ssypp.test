<template>
  <v-data-table
    @click:row="agregarProyecto"
    class="row-pointer"
    :headers="getCabeceras"
    :items="getItemsEnTabla"
    :search="getBusquedaEnTabla"
    :loading="getEsperandoTabla"
    :footer-props="{ 'items-per-page-text': 'items por pág.' }"
    loading-text="Cargando... espere porfavor"
  >
    <template v-slot:no-data>No existen registros</template>
    <template v-slot:no-results>No se encontraron coincidencias</template>
    <template v-slot:top>
      <v-dialog v-model="dialogoConfirmacion" max-width="500px" persistent>
        <v-card>
          <v-card-title class="headline"> Confirmacion </v-card-title>
          <v-card-text> {{ mensaje }} </v-card-text>
          <v-card-actions>
            <v-col align="right">
              <v-btn color="gray darken-1" text @click="cerrarDialogo">
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                :loading="getEsperandoRespuesta"
                @click="desactivarItem"
              >
                Aceptar
              </v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="getDialogoProyectoServicio" persistent>
        <informacionProyectoServicio />
      </v-dialog>
      <v-dialog v-model="getDialogoProyectoPractica" persistent>
        <informacionProyectoPractica />
      </v-dialog>
      <v-dialog
        v-model="getDialogoAsignarProyecto"
        fullscreen
        hide-overlay
        persistent
        transition="dialog-bottom-transition"
      >
        <asignarProyectos
          :alumno="alumno"
          :proyectosSeleccionados="proyectosSeleccionados"
          :proyectos="proyectos"
          :tipoInscripcion="tipoInscripcion"
        />
      </v-dialog>
    </template>
    <template v-slot:[`item.edicion`]="{ item }">
      <template v-if="getTipoTabla === 'inscripcion'">
        <template v-if="!getSoloInactivos">
          <v-btn
            @click.prevent="cancelarConfirmacion(item)"
            fab
            x-small
            elevation="0"
          >
            <v-icon small> mdi-cancel </v-icon>
          </v-btn>
          <v-btn
            @click.prevent="desactivarConfirmacion(item)"
            fab
            x-small
            elevation="0"
          >
            <v-icon small> mdi-delete </v-icon>
          </v-btn>
        </template>
      </template>
      <template
        v-else-if="
          getTipoTabla == 'registroServicio' ||
            getTipoTabla == 'registroPractica'
        "
      >
        <v-btn @click.prevent="masInformacion(item)" fab x-small elevation="0">
          <v-icon small> mdi-eye-outline </v-icon>
        </v-btn>
      </template>
      <template v-if="getTipoTabla == 'alumnos_inscritos'">
        <v-btn icon @click.prevent="consultarProyectos(item)">
          <v-icon small class="mr-2">
            mdi-book-information-variant
          </v-icon>
        </v-btn>
      </template>
      <template
        v-else-if="
          getTipoTabla == 'dependencias' ||
            getTipoTabla == 'responsables' ||
            getTipoTabla == 'servicio' ||
            getTipoTabla == 'practicas' ||
            getTipoTabla == 'profesor'
        "
      >
        <template v-if="item.estado == 'ACTIVO'">
          <template v-if="!getSoloInactivos">
            <v-btn @click.prevent="editarItem(item)" fab x-small elevation="0">
              <v-icon small> mdi-pencil </v-icon>
            </v-btn>
            <v-btn
              @click.prevent="desactivarConfirmacion(item)"
              fab
              x-small
              elevation="0"
            >
              <v-icon small> mdi-delete </v-icon>
            </v-btn>
          </template>
        </template>
        <template v-if="getSoloInactivos">
          <v-btn @click.prevent="activarItem(item)" fab x-small elevation="0">
            <v-icon small> mdi-restart </v-icon>
          </v-btn>
        </template>
      </template>
    </template>
  </v-data-table>
</template>

<script>
import asignarProyectos from "./../components/AsignarProyecto";
import informacionProyectoServicio from "./../components/InformacionProyectoServicio";
import informacionProyectoPractica from "./../components/InformacionProyectoPractica";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "tabla",
  data: () => ({
    dialogoConfirmacion: false,
    dialogoAsignarProyecto: false,
    isCancelar: false,
    MENSAJE_DESACTIVAR: "¿Está seguro que desea desactivar este elemento?",
    MENSAJE_CANCELAR: "¿Está seguro que desea cancelar la inscripción?",
    mensaje: "",
    tipoInscripcion: "",
    alumno: {},
    proyectosSeleccionados: [],
    proyectos: []
  }),
  methods: {
    ...mapActions("moduloAlumno", ["obtenerProyectosSeleccionados"]),
    ...mapActions("moduloProyectos", [
      "obtenerProyectosActivosPractica",
      "obtenerProyectosActivosServicio"
    ]),
    ...mapActions("moduloUsuario", [
      "saveDialogoServicio",
      "saveDialogoPractica",
      "saveProyecto",
      "saveOpcion"
    ]),
    ...mapActions([
      "saveCambioTabla",
      "saveDialogoAsignarProyecto",
      "saveItemsEnTabla",
      "saveSoloInactivos"
    ]),

    agregarProyecto(item) {
      this.saveOpcion(item);
    },
    async consultarProyectos(item) {
      const response = await this.obtenerProyectosSeleccionados({
        proyectos: item.proyectos.split(",").map(Number)
      });
      if (response.resultado) {
        this.alumno = item;
        this.proyectosSeleccionados = response.proyectos.proyectos;
        this.tipoInscripcion = response.proyectos.tipo_inscripcion;
        if (this.tipoInscripcion === "servicio") {
          this.proyectos = await this.obtenerProyectosActivosServicio();
        } else {
          this.proyectos = await this.obtenerProyectosActivosPractica();
        }
        this.saveDialogoAsignarProyecto(true);
      }
    },
    editarItem(item) {
      this.editar(item);
    },
    masInformacion(item) {
      this.saveProyecto(item);
      if (this.getTipoTabla == "registroServicio") {
        this.saveDialogoServicio(true);
      } else if (this.getTipoTabla == "registroPractica") {
        this.saveDialogoPractica(true);
      }
    },
    async activarItem(item) {
      item.estado = "ACTIVO";
      if (await this.activar(item)) {
        this.moverItemsEnTabla(item, "ACTIVO");
      } else {
        item.estado = "INACTIVO";
      }
    },
    async desactivarItem() {
      if (!this.isCancelar) {
        this.item.estado = "INACTIVO";
        if (await this.desactivar(this.item)) {
          this.moverItemsEnTabla(this.item, "INACTIVO");
        }
      } else {
        this.item.estado = "INACTIVO";
        if (await this.cancelar(this.item)) {
          this.moverItemsEnTabla(this.item, "INACTIVO");
        }
      }
    },
    moverItemsEnTabla(item, cambio) {
      for (var i = 0; i < this.getItemsEnTabla.length; i++) {
        if (this.getItemsEnTabla[i].id === item.id) {
          this.saveCambioTabla({ posicion: i, estado: cambio });
        }
      }
      this.cerrarDialogo();
    },
    cancelarConfirmacion(item) {
      this.item = Object.assign({}, item);
      this.mensaje = this.MENSAJE_CANCELAR;
      this.isCancelar = true;
      this.dialogoConfirmacion = true;
    },
    desactivarConfirmacion(item) {
      this.item = Object.assign({}, item);
      this.mensaje = this.MENSAJE_DESACTIVAR;
      this.isCancelar = false;
      this.dialogoConfirmacion = true;
    },
    cerrarDialogo() {
      this.dialogoConfirmacion = false;
      this.$nextTick(() => {
        this.item = {};
      });
    }
  },
  mounted() {
    this.saveSoloInactivos(false);
    this.saveItemsEnTabla();
  },
  computed: {
    ...mapGetters("moduloUsuario", [
      "getDialogoProyectoServicio",
      "getDialogoProyectoPractica"
    ]),
    ...mapGetters([
      "getBusquedaEnTabla",
      "getCabeceras",
      "getDialogoAsignarProyecto",
      "getEsperandoRespuesta",
      "getEsperandoTabla",
      "getItemsEnTabla",
      "getSoloInactivos",
      "getTipoTabla"
    ])
  },
  props: {
    activar: {
      type: Function
    },
    desactivar: {
      type: Function
    },
    cancelar: {
      type: Function
    },
    editar: {
      type: Function
    }
  },
  components: {
    asignarProyectos,
    informacionProyectoServicio,
    informacionProyectoPractica
  }
};
</script>

<style>
.row-pointer > .v-data-table__wrapper > table > tbody > tr :hover {
  cursor: pointer;
}
</style>
