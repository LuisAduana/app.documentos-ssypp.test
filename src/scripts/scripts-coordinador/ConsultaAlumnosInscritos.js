import Api from "../../api/Coordinador";
import { mapActions } from "vuex";

export default {
  data: () => ({
    dialogoAsignarProyecto: false,
    esperandoRespuesta: false,
    esperandoTabla: false,
    soloInactivos: false,
    busqueda: "",
    busquedaProyectos: "",
    tipo_inscripcion: "",
    alumno: {},
    alumnos: [],
    seleccionados: [],
    proyectosSeleccionados: [],
    proyectos: [],
    cabecerasProyectos: [],
    cabecerasServicio: [
      { text: "Dependencia", value: "nombre_dependencia" },
      { text: "Responsable", value: "nombre_responsable" },
      { text: "Actividades", value: "actividades" },
      { text: "Requisitos", value: "requisitos" },
      { text: "Horario", value: "horario" },
      { text: "No. de alumnos", value: "num_alumnos" }
    ],
    cabecerasPracticas: [
      { text: "Dependencia", value: "nombre_dependencia" },
      { text: "Responsable", value: "nombre_responsable" },
      { text: "Proyecto", value: "nombre_proyecto" },
      { text: "Descripcion General", value: "descripcion_general" },
      { text: "Objetivo General", value: "objetivo_general" },
      { text: "Objetivos inmediatos", value: "objetivos_inmediatos" },
      { text: "Objetivos mediatos", value: "objetivos_mediatos" }
    ],
    cabeceras: [
      { text: "Matrícula", value: "matricula" },
      { text: "Correo", value: "correo" },
      { text: "Nombres", value: "nombres" },
      { text: "Apellido pat.", value: "apellido_paterno" },
      { text: "Apellido mat.", value: "apellido_materno" },
      { text: "No. de contácto", value: "num_contacto" },
      { text: "Sección", value: "seccion" },
      { text: "Proyectos", value: "edicion", sortable: false }
    ]
  }),
  methods: {
    ...mapActions(["snackBarError", "snackBarInfo", "snackBarExito"]),

    asignarProyecto() {
      if (this.seleccionados.length === 1) {
        this.esperandoRespuesta = true;
        console.log(this.seleccionados[0]);
        Api.asignarProyecto({
          id: this.alumno.id,
          tipo_proyecto: this.tipo_inscripcion,
          alumno_id: this.alumno.alumno_id,
          proyecto_id: this.seleccionados[0].id_proyecto
        })
          .then(() => {
            for (var i = 0; i < this.alumnos.length; i++) {
              if (this.alumnos[i].id == this.alumno.id) {
                this.alumnos.splice(i, 1);
              }
            }
            this.snackBarExito("¡Proyecto asignado exitosamente!");
            this.seleccionados = [];
            this.dialogoAsignarProyecto = false;
          })
          .catch(() => {
            this.snackBarError(
              "No se pudo asignar el alumno, inténtelo nuevamente."
            );
          })
          .finally(() => {
            this.esperandoRespuesta = false;
          });
      } else {
        this.snackBarError("Seleccione 1 proyecto");
      }
    },

    consultarProyectos(alumno) {
      this.alumno = Object.assign({}, alumno);
      Api.obtenerProyectosSeleccionados({
        proyectos: alumno.proyectos.split(",").map(Number)
      })
        .then(response => {
          this.proyectosSeleccionados = response.data.proyectos;
          this.tipo_inscripcion = response.data.tipo_inscripcion;
          this.esperandoTabla = true;
          if (this.tipo_inscripcion === "servicio") {
            this.consultarProyectosServicio();
          } else {
            this.consultarProyectosPracticas();
          }
        })
        .catch(() => {
          this.snackBarInfo(
            "No se pudieron consultar los proyectos seleccionados del alumno."
          );
        })
        .finally(() => {
          this.dialogoAsignarProyecto = true;
        });
    },

    consultarProyectosServicio() {
      this.cabecerasProyectos = this.cabecerasServicio;
      Api.obtenerProyectosServicio()
        .then(response => {
          this.proyectos = response.data;
        })
        .catch(() => {
          this.snackBarError(
            "No se pudieron consultar los proyectos, recargue la página."
          );
        })
        .finally(() => {
          this.esperandoTabla = false;
        });
    },

    consultarProyectosPracticas() {
      this.cabecerasProyectos = this.cabecerasPracticas;
      Api.obtenerProyectoPractica()
        .then(response => {
          this.proyectos = response.data;
        })
        .catch(() => {
          this.snackBarError(
            "No se pudieron consultar los proyectos, recargue la página."
          );
        })
        .finally(() => {
          this.esperandoTabla = false;
        });
    }
  },
  mounted() {
    this.esperandoRespuesta = true;
    Api.obtenerAlumnosInscritos()
      .then(response => {
        this.alumnos = response.data;
      })
      .catch(() => {
        this.snackBarError(
          "No se pudieron consultar los alumnos inscritos. Vuelva a cargar la página."
        );
      })
      .finally(() => {
        this.esperandoRespuesta = false;
      });
  }
};
