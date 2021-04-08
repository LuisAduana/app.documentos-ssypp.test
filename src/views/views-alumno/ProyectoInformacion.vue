<template>
  <v-container v-if="getInformacionDashboard">
    <v-row>
      <v-col align="center">
        <h2>Información</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center" cols="12" xs="12" sm="6" md="6">
        <h3>Dependencia</h3>
        <v-divider></v-divider>
        <br />
        <v-text-field
          :value="
            getInformacionDashboard.proyecto.dependencia.nombre_dependencia
          "
          label="Nombre"
          dense
          readonly
        ></v-text-field>
        <v-text-field
          :value="getInformacionDashboard.proyecto.dependencia.nombre_contacto"
          label="Nombre de contacto"
          dense
          readonly
        ></v-text-field>
        <v-text-field
          :value="getInformacionDashboard.proyecto.dependencia.correo"
          label="Correo electrónico"
          dense
          readonly
        ></v-text-field>
        <v-text-field
          :value="getInformacionDashboard.proyecto.dependencia.num_contacto"
          label="Número de contacto"
          dense
          readonly
        ></v-text-field>
      </v-col>
      <v-col align="center" cols="12" xs="12" sm="6" md="6">
        <h3>Responsable</h3>
        <v-divider></v-divider>
        <br />
        <v-text-field
          :value="
            getInformacionDashboard.proyecto.responsable.nombre_responsable
          "
          label="Nombre"
          dense
          readonly
        ></v-text-field>
        <v-text-field
          :value="getInformacionDashboard.proyecto.responsable.cargo"
          label="Cargo"
          dense
          readonly
        ></v-text-field>
        <v-text-field
          :value="getInformacionDashboard.proyecto.responsable.correo"
          label="Correo electrónico"
          dense
          readonly
        ></v-text-field>
        <v-text-field
          :value="getInformacionDashboard.proyecto.responsable.num_contacto"
          label="Número de contacto"
          dense
          readonly
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center">
        <h3>Proyecto</h3>
        <v-divider></v-divider>
        <br />
        <v-row v-if="getInformacionDashboard.tipo_proyecto === 'practicas'">
          <v-col align="center" cols="12" xs="12" sm="6" md="6">
            <v-text-field
              :value="
                getInformacionDashboard.proyecto.proyecto_practica
                  .nombre_proyecto
              "
              label="Nombre"
              dense
              readonly
            ></v-text-field>
            <v-text-field
              :value="
                getInformacionDashboard.proyecto.proyecto_practica
                  .objetivo_general
              "
              label="Objetivo general"
              dense
              readonly
            ></v-text-field>
            <v-text-field
              :value="
                getInformacionDashboard.proyecto.proyecto_practica
                  .actividades_funcionales
              "
              label="Actividades funcionales"
              dense
              readonly
            ></v-text-field>
            <v-text-field
              :value="
                getInformacionDashboard.proyecto.proyecto_practica.duracion
              "
              label="Duración"
              dense
              readonly
            ></v-text-field>
            <v-text-field
              :value="
                getInformacionDashboard.proyecto.proyecto_practica.recursos
              "
              label="Recursos"
              dense
              readonly
            ></v-text-field>
          </v-col>
          <v-col align="center" cols="12" xs="12" sm="6" md="6">
            <v-text-field
              :value="
                getInformacionDashboard.proyecto.proyecto_practica
                  .descripcion_general
              "
              label="Descripción general"
              dense
              readonly
            ></v-text-field>
            <v-text-field
              :value="
                getInformacionDashboard.proyecto.proyecto_practica
                  .objetivos_mediatos
              "
              label="Objetivos mediatos"
              dense
              readonly
            ></v-text-field>
            <v-text-field
              :value="
                getInformacionDashboard.proyecto.proyecto_practica
                  .objetivos_inmediatos
              "
              label="Objetivos inmediatos"
              dense
              readonly
            ></v-text-field>
            <v-text-field
              :value="
                getInformacionDashboard.proyecto.proyecto_practica.horario
              "
              label="Horario"
              dense
              readonly
            ></v-text-field>
            <v-text-field
              :value="
                getInformacionDashboard.proyecto.proyecto_practica
                  .responsabilidades
              "
              label="responsabilidades"
              dense
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col>
            <v-text-field
              :value="
                getInformacionDashboard.proyecto.proyecto_servicio.actividades
              "
              label="Actividades"
              dense
              readonly
            ></v-text-field>
            <v-text-field
              :value="
                getInformacionDashboard.proyecto.proyecto_servicio.requisitos
              "
              label="Requisitos"
              dense
              readonly
            ></v-text-field>
            <v-text-field
              :value="
                getInformacionDashboard.proyecto.proyecto_servicio.horario
              "
              label="Horario"
              dense
              readonly
            ></v-text-field>
            <v-text-field
              :value="
                getInformacionDashboard.proyecto.proyecto_servicio.num_alumnos
              "
              label="No. alumnos"
              dense
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script src="./../../scripts/scripts-alumno/ProyectoInformacion.js"></script>
