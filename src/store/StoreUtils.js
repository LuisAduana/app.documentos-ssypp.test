export default {
  MESSAGE_ERROR_DEFAULT_TABLE:
    "No se pudo cargar la información de la tabla, vuelva a cargar la página.",
  MESSAGE_ERROR_DEFAULT: "Ha ocurrido un error. Inténtelo nuevamente",
  MESSAGE_EXITO_MODIFICAR: "¡Se ha modificado exitosamente!",
  MESSAGE_EXITO_REGISTRO: "¡Se ha registrado exitososamente!",
  cabecerasDependencias: [
    { text: "Nombre", value: "nombre_dependencia" },
    { text: "Nombre de contacto", value: "nombre_contacto" },
    { text: "Dirección", value: "direccion" },
    { text: "Correo", value: "correo" },
    { text: "No. Contacto", value: "num_contacto" },
    { text: "Edición", value: "edicion", sortable: false, align: "right" }
  ],
  cabecerasAlumno: [
    { text: "Matrícula", value: "matricula" },
    { text: "Correo", value: "correo" },
    { text: "Nombres", value: "nombres" },
    { text: "Apellido pat.", value: "apellido_paterno" },
    { text: "Apellido mat.", value: "apellido_materno" },
    { text: "No. de contácto", value: "num_contacto" },
    { text: "Sección", value: "seccion" },
    { text: "Proyectos", value: "edicion", sortable: false }
  ],
  cabecerasAlumnoConProyecto: [
    { text: "Matrícula", value: "matricula" },
    { text: "Correo", value: "correo" },
    { text: "Nombres", value: "nombres" },
    { text: "Apellido pat.", value: "apellido_paterno" },
    { text: "Apellido mat.", value: "apellido_materno" },
    { text: "No. de contácto", value: "num_contacto" },
    { text: "Sección", value: "seccion" },
    { text: "Acciones", value: "edicion", sortable: false }
  ],
  cabecerasAlumnoSeleccion: [
    { text: "Matrícula", value: "matricula" },
    { text: "Nombres", value: "nombres" },
    { text: "Apellido Pat.", value: "apellido_paterno" },
    { text: "Apellido Mat.", value: "apellido_materno" },
    { text: "Correo", value: "correo" },
    { text: "No. Contacto", value: "num_contacto" }
  ],
  cabecerasInscripcion: [
    { text: "Fecha de inicio", value: "inscripcion_inicio" },
    { text: "Fecha de fin", value: "fin_inscripcion" },
    { text: "Token inscripcion", value: "token_inscripcion" },
    { text: "Estado", value: "estado" },
    { text: "Edición", value: "edicion", sortable: false }
  ],
  cabecerasResponsables: [
    { text: "Nombre", value: "nombre_responsable" },
    { text: "Dependencia", value: "nombre_dependencia" },
    { text: "Cargo", value: "cargo" },
    { text: "Correo", value: "correo" },
    { text: "No. Contacto", value: "num_contacto" },
    { text: "Edición", value: "edicion", sortable: false }
  ],
  cabecerasProyectoServicio: [
    { text: "Dependencia", value: "nombre_dependencia" },
    { text: "Responsable", value: "nombre_responsable" },
    { text: "Nombre Proyecto", value: "nombre_proyecto" },
    { text: "Actividades", value: "actividades" },
    { text: "Estado", value: "estado" },
    { text: "Edición", value: "edicion", sortable: false }
  ],
  cabecerasProyectoServicioSeleccion: [
    { text: "Dependencia", value: "nombre_dependencia" },
    { text: "Responsable", value: "nombre_responsable" },
    { text: "Actividades", value: "actividades" },
    { text: "Direccion", value: "direccion" },
    { text: "Horario", value: "horario" },
    { text: "Requisitos", value: "requisitos" },
    { text: "No. alumnos", value: "num_alumnos" }
  ],
  cabecerasProyectoServicioObservar: [
    { text: "Nombre de Dependencia", value: "nombre_dependencia" },
    { text: "Nombre del Responsable", value: "nombre_responsable" },
    { text: "Direccion", value: "direccion" },
    { text: "Actividades", value: "actividades" },
    { text: "Horario", value: "horario" },
    { text: "Más inf.", value: "edicion", sortable: false }
  ],
  cabecerasProyectoPractica: [
    { text: "Nombre del Proyecto", value: "nombre_proyecto" },
    { text: "Nombre de Dependencia", value: "nombre_dependencia" },
    { text: "Nombre del Responsable", value: "nombre_responsable" },
    { text: "Duración", value: "duracion" },
    { text: "Horario", value: "horario" },
    { text: "Estado", value: "estado" },
    { text: "Edición", value: "edicion", sortable: false }
  ],
  cabecerasProyectoPracticaSeleccion: [
    { text: "Nombre del Proyecto", value: "nombre_proyecto" },
    { text: "Nombre de Dependencia", value: "nombre_dependencia" },
    { text: "Nombre del Responsable", value: "nombre_responsable" },
    { text: "Metodología", value: "metodologia" },
    { text: "Duración", value: "duracion" },
    { text: "Horario", value: "horario" }
  ],
  cabecerasProyectoPracticaObservar: [
    { text: "Nombre del Proyecto", value: "nombre_proyecto" },
    { text: "Nombre de Dependencia", value: "nombre_dependencia" },
    { text: "Nombre del Responsable", value: "nombre_responsable" },
    { text: "Direccion", value: "direccion" },
    { text: "Horario", value: "horario" },
    { text: "Más inf.", value: "edicion", sortable: false }
  ],
  cabecerasProfesores: [
    { text: "Correo", value: "correo" },
    { text: "Nombres", value: "nombres" },
    { text: "Apellido paterno", value: "apellido_paterno" },
    { text: "Apellido materno", value: "apellido_materno" },
    { text: "No. de personal", value: "num_personal" },
    { text: "No. contácto", value: "num_contacto" },
    { text: "Edición", value: "edicion", sortable: false }
  ],
  cabecerasAlumnoProfesor: [
    { text: "Matrícula", value: "matricula" },
    { text: "Correo", value: "correo" },
    { text: "Nombres", value: "nombres" },
    { text: "Apellido pat.", value: "apellido_paterno" },
    { text: "Apellido mat.", value: "apellido_materno" },
    { text: "No. de contácto", value: "num_contacto" },
    { text: "Documentos", value: "edicion", sortable: false }
  ],
  cabecerasDocumentosAlumno: [
    { text: "Nombre", value: "nombre" },
    { text: "Estado", value: "estado" },
    { text: "Edición", value: "edicion", sortable: false, align: "right" }
  ],
  separarItems(items) {
    var itemsActivos = [];
    var itemsInactivos = [];
    for (var i = 0; i < items.length; i++) {
      if (items[i].estado === "INACTIVO") {
        itemsInactivos.push(items[i]);
      } else {
        itemsActivos.push(items[i]);
      }
    }
    return { act: itemsActivos, inact: itemsInactivos };
  },
  getFechaActual() {
    var year = new Date().getFullYear();
    var mount =
      new Date().getMonth() < 9
        ? "0" + (new Date().getMonth() + 1)
        : new Date().getMonth() + 1;
    var day =
      new Date().getDate() <= 9
        ? "0" + new Date().getDate()
        : new Date().getDate();
    return year + "-" + mount + "-" + day;
  },
  getHoraActual() {
    var hour =
      new Date().getHours() <= 9
        ? "0" + new Date().getHours()
        : new Date().getHours();
    var minute =
      new Date().getMinutes() <= 9
        ? "0" + new Date().getMinutes()
        : new Date().getMinutes();
    var second =
      new Date().getSeconds() <= 9
        ? "0" + new Date().getSeconds()
        : new Date().getSeconds();
    return hour + ":" + minute + ":" + second;
  }
};
