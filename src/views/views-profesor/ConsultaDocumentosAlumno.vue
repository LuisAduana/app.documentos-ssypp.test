<template>
  <v-col align="center">
    <v-card max-width="800">
      <v-card-title>
        <v-btn icon @click="regresar">
          <v-icon>mdi-keyboard-backspace</v-icon>
        </v-btn>
        <h2>Documentos</h2>
        <v-divider class="mx-4" vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="busqueda"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-divider></v-divider>
      <v-data-table
        :headers="cabeceras"
        :items="documentos"
        :search="busqueda"
        :footer-props="{ 'items-per-page-text': 'items por pág.' }"
        loading-text="Cargando... espere porfavor"
      >
        <template v-slot:no-data>No existen registros</template>
        <template v-slot:no-results>No se encontraron coincidencias</template>
        <template v-slot:[`item.edicion`]="{ item }">
          <template v-if="item.estado != 'RECHAZADO'">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click.prevent="calificar(item)"
                  fab
                  x-small
                  elevation="0"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon small> mdi-check </v-icon>
                </v-btn>
              </template>
              <span>Calificar</span>
            </v-tooltip>
          </template>
          <template v-if="item.estado == 'RECHAZADO'">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click.prevent="mensajes(item)"
                  fab
                  x-small
                  elevation="0"
                  :loading="item.esperando"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon small> mdi-message-text-outline </v-icon>
                </v-btn>
              </template>
              <span>Mensajes</span>
            </v-tooltip>
          </template>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-if="tipo === 'practica'"
                @click.prevent="descargarPractica(item)"
                fab
                x-small
                elevation="0"
                :loading="item.esperando"
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
                :loading="item.esperando"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon small> mdi-download </v-icon>
              </v-btn>
            </template>
            <span>Descargar</span>
          </v-tooltip>
        </template>
        <template v-slot:top>
          <v-dialog v-model="dialogo" max-width="500" persistent>
            <v-card max-width="500">
              <v-card-title>Calificar documento</v-card-title>
              <v-card-text>
                <v-select
                  v-model="estado"
                  :items="items"
                  label="Estado"
                ></v-select>
                <v-form
                  ref="formulario"
                  v-model="validacion"
                  lazy-validation
                  v-if="estado === 'RECHAZADO'"
                >
                  <v-textarea
                    v-model="mensaje"
                    :rules="mensajeRules"
                    label="Razón:"
                    counter="250"
                    required
                  ></v-textarea>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="cerrar">Cerrar</v-btn>
                <v-btn
                  @click="aceptar"
                  :disabled="!validacion"
                  :loading="esperandoRespuesta"
                  color="success"
                  >Aceptar</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogoMensajes" max-width="500">
            <Mensajes :retroalimentacion="retroalimentacion" />
          </v-dialog>
        </template>
      </v-data-table>
    </v-card>
  </v-col>
</template>

<script>
import Mensajes from "./../../components/Mensajes";
import { mapActions } from "vuex";

export default {
  data: () => ({
    mensaje: "",
    busqueda: "",
    estado: "ACEPTADO",
    esperandoRespuesta: false,
    validacion: true,
    dialogo: false,
    dialogoMensajes: false,
    documento: {},
    items: ["ACEPTADO", "RECHAZADO"],
    retroalimentacion: [],
    cabeceras: [
      { text: "Nombre", value: "nombre" },
      { text: "Estado", value: "estado", align: "right" },
      { text: "Edición", value: "edicion", sortable: false, align: "right" }
    ],
    mensajeRules: [
      v => !!v || "Mensaje requerido",
      v => (v && v.length <= 250) || "El mensaje es demasiado largo"
    ]
  }),
  mounted() {
    if (this.documentos.length === 0 || this.tipo === "") {
      this.$router.back();
    }
  },
  methods: {
    ...mapActions("moduloDocumento", [
      "descargarDocumentoPractica",
      "descargarDocumentoServicio",
      "modificarEstadoDocumento",
      "obtenerMensajes"
    ]),
    async aceptar() {
      var form = false;
      if (this.estado === "RECHAZADO") {
        if (this.$refs.formulario.validate()) {
          form = true;
        } else {
          form = false;
        }
      } else if (this.estado === "ACEPTADO") {
        form = true;
      }
      if (form) {
        this.esperandoRespuesta = true;
        if (
          await this.modificarEstadoDocumento({
            id: this.documento.id,
            estado: this.estado,
            mensaje: this.mensaje
          })
        ) {
          for (var i = 0; i < this.documentos.length; i++) {
            if (this.documentos[i].id == this.documento.id) {
              this.documentos[i].estado = this.estado;
            }
          }
          this.cerrar();
        }
        this.esperandoRespuesta = false;
      }
    },
    async descargarPractica(item) {
      item.esperando = true;
      await this.descargarDocumentoPractica(item);
      item.esperando = false;
    },
    async descargarServicio(item) {
      item.esperando = true;
      await this.descargarDocumentoServicio(item);
      item.esperando = false;
    },
    async mensajes(item) {
      item.esperando = true;
      const response = await this.obtenerMensajes(item);
      if (response.estado) {
        this.retroalimentacion = response.mensajes;
        this.dialogoMensajes = true;
      }
      item.esperando = false;
    },
    calificar(item) {
      this.documento = item;
      this.dialogo = true;
    },
    cerrar() {
      this.documento = {};
      if (this.estado === "RECHAZADO") this.$refs.formulario.reset();
      this.dialogo = false;
    },
    regresar() {
      this.$router.back();
    }
  },
  props: {
    documentos: {
      type: Array,
      default: function() {
        return [];
      }
    },
    tipo: {
      type: String,
      default: function() {
        return "";
      }
    }
  },
  components: {
    Mensajes
  },
  watch: {
    estado() {
      if (this.estado === "ACEPTADO") {
        this.validacion = true;
      }
    }
  }
};
</script>
