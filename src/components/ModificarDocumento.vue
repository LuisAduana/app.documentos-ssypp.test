<template>
  <v-card>
    <v-card-title class="headline grey lighten-2">
      Modificar documento
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-form ref="formularioDocumento" v-model="validacion" lazy-validation>
          <v-row>
            <v-file-input
              v-model="documento"
              :rules="documentoRules"
              :messages="mensajeValidacion"
              :error="mensajeError"
              accept=".pdf"
              placeholder="Selecciona un documento"
              prepend-icon="mdi-file-pdf-outline"
              label="Documento"
              show-size
              required
            ></v-file-input>
          </v-row>
        </v-form>
      </v-container>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text @click="cerrarFormulario">Cerrar</v-btn>
      <v-btn
        v-if="tipo === 'practica'"
        :disabled="!validacion"
        :loading="getEsperandoRespuesta"
        text
        @click.prevent="modificarPractica"
      >
        Cargar
      </v-btn>
      <v-btn
        v-else
        :disabled="!validacion"
        :loading="getEsperandoRespuesta"
        text
        @click.prevent="modificarServicio"
      >
        Cargar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Rules from "../scripts/Rules";

export default {
  data: () => ({
    validacion: true,
    documento: null,
    mensajeError: false,
    mensajeValidacion: "",
    documentoRules: Rules.documentoRules
  }),
  methods: {
    ...mapActions("moduloDocumento", [
      "modificarDocumentoPractica",
      "modificarDocumentoServicio"
    ]),
    ...mapActions([
      "saveDialogoModificarDocumento",
      "saveNuevoItemEnTabla",
      "saveModificarItemTabla"
    ]),

    async modificarPractica() {
      if (!this.documento) {
        this.mensajeError = true;
        this.mensajeValidacion = "Documento requerido.";
      } else {
        if (this.$refs.formularioDocumento.validate()) {
          this.mensajeError = false;
          var formData = new FormData();
          formData.append("documento", this.documento);
          formData.append("ruta", this.item.ruta);
          formData.append("id", this.item.id);
          const response = await this.modificarDocumentoPractica(formData);
          if (response) {
            this.saveModificarItemTabla({
              id: this.item.id,
              estado: "ENVIADO"
            });
            this.cerrarFormulario();
          }
        }
      }
    },
    async modificarServicio() {
      if (!this.documento) {
        this.mensajeError = true;
        this.mensajeValidacion = "Documento requerido.";
      } else {
        if (this.$refs.formularioDocumento.validate()) {
          this.mensajeError = false;
          var formData = new FormData();
          formData.append("documento", this.documento);
          formData.append("ruta", this.item.ruta);
          formData.append("id", this.item.id);
          const response = await this.modificarDocumentoServicio(formData);
          if (response) {
            this.saveModificarItemTabla({
              id: this.item.id,
              estado: "ENVIADO"
            });
            this.cerrarFormulario();
          }
        }
      }
    },
    cerrarFormulario() {
      this.saveDialogoModificarDocumento(false);
      this.mensajeError = false;
      this.$refs.formularioDocumento.reset();
    }
  },
  watch: {
    documento() {
      if (this.documento) {
        this.mensajeError = false;
      }
    }
  },
  props: {
    tipo: {
      type: String,
      required: true
    },
    item: {
      type: Object
    }
  },
  computed: {
    ...mapGetters([
      "getEsperandoRespuesta",
      "getInformacionDashboard",
      "getItemsEnTabla",
      "getUsuario"
    ]),
    documento() {
      return this.documento;
    }
  }
};
</script>
