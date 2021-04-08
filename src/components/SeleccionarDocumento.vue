<template>
  <v-card>
    <v-card-title class="headline grey lighten-2">
      Cargar documento
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-form ref="formularioDocumento" v-model="validacion" lazy-validation>
          <v-row>
            <v-col cols="10">
              <v-select
                v-model="formDocumento.tipo"
                :rules="tipoRules"
                :items="items"
                label="Tipo de documento"
                required
              ></v-select>
            </v-col>
            <v-col v-if="formDocumento.tipo === 'reporte-mensual'" cols="2">
              <v-text-field
                v-model="noReporte"
                :rules="noReporteRules"
                label="Reporte"
                persistent-hint
                hint="Ej. 01, 05, 10"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-file-input
              v-model="formDocumento.documento"
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
        @click.prevent="registrarPractica"
      >
        Cargar
      </v-btn>
      <v-btn
        v-else
        :disabled="!validacion"
        :loading="getEsperandoRespuesta"
        text
        @click.prevent="registrarServicio"
      >
        Cargar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Rules from "./../scripts/Rules";

export default {
  data: () => ({
    validacion: true,
    formDocumento: {
      documento: null,
      tipo: ""
    },
    mensajeError: false,
    mensajeValidacion: "",
    busqueda: "",
    items: [],
    archivosPractica: [
      { text: "Oficio de asignación", value: "oficio-asignacion" },
      { text: "Carta de aceptación", value: "carta-aceptacion" },
      { text: "Cronograma de actividades", value: "cronograma-actividades" },
      { text: "Reporte mensual", value: "reporte-mensual" },
      { text: "Reporte 210 horas", value: "reporte-210-horas" },
      { text: "Reporte 420 horas", value: "reporte-420-horas" },
      { text: "Reporte final", value: "reporte-final" },
      { text: "Evaluación de la organización", value: "eval-organizacion" },
      { text: "Rúbrica de competencias", value: "rubrica-competencias" },
      { text: "Autoevaluación del alumno", value: "auto-eval" }
    ],
    archivosServicio: [
      { text: "Oficio de asignacion", value: "oficio-asignacion" },
      { text: "Registro y plan de actividades", value: "registro-plan" },
      { text: "Carta de aceptación", value: "carta-aceptacion" },
      { text: "Reporte mensual", value: "reporte-mensual" },
      { text: "Carta de liberación", value: "carta-liberacion" },
      { text: "Memoria", value: "memoria" }
    ],
    noReporte: "",
    noReporteRules: Rules.noReporteRules,
    documentoRules: Rules.documentoRules,
    tipoRules: Rules.tipoRules
  }),
  mounted() {
    if (this.tipo === "practica") {
      this.items = this.archivosPractica;
    } else {
      this.items = this.archivosServicio;
    }
  },
  methods: {
    ...mapActions("moduloDocumento", [
      "registrarDocumentoPractica",
      "registrarDocumentoServicio"
    ]),
    ...mapActions(["saveDialogoDocumento", "saveNuevoItemEnTabla"]),

    async registrarPractica() {
      if (!this.formDocumento.documento) {
        this.mensajeError = true;
        this.mensajeValidacion = "Documento requerido.";
      } else {
        if (this.$refs.formularioDocumento.validate()) {
          this.mensajeError = false;
          var formData = new FormData();
          formData.append("documento", this.formDocumento.documento);
          formData.append("tipo", this.formDocumento.tipo + this.noReporte);
          formData.append("matricula", this.getUsuario.alumno.matricula);
          formData.append("alumno_id", this.getUsuario.alumno.id);
          formData.append(
            "proyecto_id",
            this.getInformacionDashboard.proyecto.id
          );
          const response = await this.registrarDocumentoPractica(formData);
          if (response.exito) {
            this.saveNuevoItemEnTabla(response.response);
            this.cerrarFormulario();
          }
        }
      }
    },
    async registrarServicio() {
      if (!this.formDocumento.documento) {
        this.mensajeError = true;
        this.mensajeValidacion = "Documento requerido.";
      } else {
        if (this.$refs.formularioDocumento.validate()) {
          this.mensajeError = false;
          var formData = new FormData();
          formData.append("documento", this.formDocumento.documento);
          formData.append("tipo", this.formDocumento.tipo + this.noReporte);
          formData.append("matricula", this.getUsuario.alumno.matricula);
          formData.append("alumno_id", this.getUsuario.alumno.id);
          formData.append(
            "proyecto_id",
            this.getInformacionDashboard.proyecto.id
          );
          const response = await this.registrarDocumentoServicio(formData);
          if (response.exito) {
            this.saveNuevoItemEnTabla(response.response);
            this.cerrarFormulario();
          }
        }
      }
    },
    cerrarFormulario() {
      this.saveDialogoDocumento(false);
      this.mensajeError = false;
      this.$refs.formularioDocumento.reset();
    }
  },
  watch: {
    documento() {
      if (this.formDocumento.documento) {
        this.mensajeError = false;
      }
    }
  },
  props: {
    tipo: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      "getEsperandoRespuesta",
      "getInformacionDashboard",
      "getUsuario"
    ]),
    documento() {
      return this.formDocumento.documento;
    }
  }
};
</script>
