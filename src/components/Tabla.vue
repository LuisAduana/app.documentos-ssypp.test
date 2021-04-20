<template>
  <v-data-table
    @click:row="agregarProyecto"
    class="row-pointer"
    :headers="getCabeceras"
    :items="getItemsEnTabla"
    :search="getBusquedaEnTabla"
    :loading="getEsperandoTabla"
    :footer-props="{ 'items-per-page-text': 'Registros por pág.' }"
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
      <v-dialog v-model="dialogoMensajes" max-width="500">
        <Mensajes :retroalimentacion="retroalimentacion" />
      </v-dialog>
      <v-dialog
        v-model="getDialogoModificarDocumento"
        max-width="600"
        persistent
      >
        <ModificarDocumento
          v-if="getInformacionDashboard === 'practicas'"
          :tipo="'practica'"
          :item="documento"
        />
        <ModificarDocumento v-else :tipo="'servicio'" :item="documento" />
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
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click.prevent="cancelarConfirmacion(item)"
                fab
                x-small
                elevation="0"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon small> mdi-cancel </v-icon>
              </v-btn>
            </template>
            <span>Cancelar</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click.prevent="desactivarConfirmacion(item)"
                fab
                x-small
                elevation="0"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon small> mdi-delete </v-icon>
              </v-btn>
            </template>
            <span>Terminar</span>
          </v-tooltip>
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
      <template v-else-if="getTipoTabla == 'consulta-alumnos'">
        <v-badge
          color="red"
          dot
          icon
          overlap
          bordered
          :value="item.notificacion"
        >
          <v-btn
            @click.prevent="consultaDocumentosAlumno(item)"
            fab
            x-small
            elevation="0"
            :loading="item.esperando"
          >
            <v-icon small> mdi-file-document-multiple-outline </v-icon>
          </v-btn>
        </v-badge>
      </template>
      <template v-else-if="getTipoTabla == 'documentos-alumno'">
        <template v-if="item.estado == 'RECHAZADO'">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click.prevent="modificarPractica(item)"
                fab
                x-small
                elevation="0"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon> mdi-upload-outline </v-icon>
              </v-btn>
            </template>
            <span>Modificar</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click.prevent="mensajes(item)"
                fab
                x-small
                elevation="0"
                :loading="item.esperandoMensaje"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon> mdi-message-text-outline </v-icon>
              </v-btn>
            </template>
            <span>Mensajes</span>
          </v-tooltip>
        </template>
        <v-tooltip bottom v-if="getInformacionDashboard">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-if="getInformacionDashboard.tipo_proyecto === 'practicas'"
              @click.prevent="descargarPractica(item)"
              fab
              x-small
              elevation="0"
              :loading="item.esperandoDescarga"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon small> mdi-download </v-icon>
            </v-btn>
            <v-btn
              v-else
              @click.prevent="descargarServicio(item)"
              fab
              x-small
              elevation="0"
              :loading="item.esperandoDescarga"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon small> mdi-download </v-icon>
            </v-btn>
          </template>
          <span>Descargar</span>
        </v-tooltip>
      </template>
      <template v-else-if="getTipoTabla == 'alumnos_con_proyectos'">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              @click.prevent="consultarDocumentos(item)"
              fab
              x-small
              elevation="0"
              v-bind="attrs"
              v-on="on"
              :loading="item.esperando"
            >
              <v-icon> mdi-file-document-multiple-outline</v-icon>
            </v-btn>
          </template>
          <span>Documentos</span>
        </v-tooltip>
      </template>
    </template>
  </v-data-table>
</template>

<script>
import asignarProyectos from "./../components/AsignarProyecto";
import informacionProyectoServicio from "./../components/InformacionProyectoServicio";
import informacionProyectoPractica from "./../components/InformacionProyectoPractica";
import Mensajes from "./../components/Mensajes";
import ModificarDocumento from "./../components/ModificarDocumento";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "tabla",
  data: () => ({
    dialogoConfirmacion: false,
    dialogoAsignarProyecto: false,
    dialogoMensajes: false,
    isCancelar: false,
    MENSAJE_DESACTIVAR: "¿Está seguro que desea desactivar este elemento?",
    MENSAJE_CANCELAR: "¿Está seguro que desea cancelar la inscripción?",
    mensaje: "",
    tipoInscripcion: "",
    alumno: {},
    documento: {},
    retroalimentacion: [],
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
      "snackBarInfo",
      "saveCambioTabla",
      "saveDialogoAsignarProyecto",
      "saveDialogoModificarDocumento",
      "saveItemsEnTabla",
      "saveSoloInactivos"
    ]),
    ...mapActions("moduloDocumento", [
      "descargarDocumentoPractica",
      "descargarDocumentoServicio",
      "obtenerDocumentosAlumno",
      "obtenerDocumentosAceptadosAlumno",
      "obtenerMensajes"
    ]),

    agregarProyecto(item) {
      this.saveOpcion(item);
    },
    async consultaDocumentosAlumno(item) {
      item.esperando = true;
      const response = await this.obtenerDocumentosAlumno({
        alumno_id: item.alumno_id
      });
      if (response.documentos.length === 0) {
        this.snackBarInfo("El alumno no tiene documentos registrados.");
      } else if (response.documentos.length > 0) {
        for (var i = 0; i < response.documentos.length; i++) {
          response.documentos[i].esperando = false;
        }
        this.$router.push({
          name: "ConsultaDocumentosAlumno",
          params: { documentos: response.documentos, tipo: response.tipo }
        });
        item.esperando = false;
      }
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
    async consultarDocumentos(item) {
      item.esperando = true;
      const response = await this.obtenerDocumentosAceptadosAlumno(item);
      if (response.exito) {
        this.$router.push({
          name: "DocumentosAceptados",
          params: {
            documentos: response.documentos,
            nombre:
              item.nombres +
              " " +
              item.apellido_paterno +
              " " +
              item.apellido_materno
          }
        });
      }
      item.esperando = false;
    },
    editarItem(item) {
      this.editar(item);
    },
    modificarPractica(item) {
      this.documento = item;
      this.saveDialogoModificarDocumento(true);
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
    async descargarPractica(item) {
      item.esperandoDescarga = true;
      await this.descargarDocumentoPractica(item);
      item.esperandoDescarga = false;
    },
    async descargarServicio(item) {
      item.esperandoDescarga = true;
      await this.descargarDocumentoServicio(item);
      item.esperandoDescarga = false;
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
    },
    async mensajes(item) {
      item.esperandoMensaje = true;
      const response = await this.obtenerMensajes(item);
      if (response.estado) {
        this.retroalimentacion = response.mensajes;
        this.dialogoMensajes = true;
      }
      item.esperandoMensaje = false;
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
      "getDialogoModificarDocumento",
      "getEsperandoRespuesta",
      "getEsperandoTabla",
      "getInformacionDashboard",
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
    informacionProyectoPractica,
    Mensajes,
    ModificarDocumento
  }
};
</script>

<style>
.row-pointer > .v-data-table__wrapper > table > tbody > tr :hover {
  cursor: pointer;
}
</style>
