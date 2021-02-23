import Api from "./Api";
import Csrf from "./Csrf";

export default {
  async obtenerDependencias() {
    await Csrf.getCookie();
    return Api.get("/coordinador/obtener-dependencias");
  },
  async registrarDependencia(formulario) {
    await Csrf.getCookie();
    return Api.post("/coordinador/registrar-dependencia", formulario);
  },
  async modificarDependencia(formulario) {
    await Csrf.getCookie();
    return Api.put("/coordinador/modificar-dependencia", formulario);
  },
  async actDesactDependencia(formulario) {
    await Csrf.getCookie();
    return Api.put("/coordinador/activar-desactivar-dependencia", formulario);
  },

  async obtenerResponsables() {
    await Csrf.getCookie();
    return Api.get("/coordinador/obtener-responsables");
  },
  async registrarResponsable(formulario) {
    await Csrf.getCookie();
    return Api.post("/coordinador/registrar-responsable", formulario);
  },
  async modificarResponsable(formulario) {
    await Csrf.getCookie();
    return Api.put("/coordinador/modificar-responsable", formulario);
  },
  async actDesactResponsable(formulario) {
    await Csrf.getCookie();
    return Api.put("/coordinador/activar-desactivar-responsable", formulario);
  },
  async obtenerProyectosServicio(tipo_consulta) {
    await Csrf.getCookie();
    return Api.post("/coordinador/obtener-proyectos-servicio", tipo_consulta);
  },
  async registrarProyectoServicio(formulario) {
    await Csrf.getCookie();
    return Api.post("/coordinador/registrar-proyecto-servicio", formulario);
  },
  async modificarProyectoServicio(formulario) {
    await Csrf.getCookie();
    return Api.put("/coordinador/modificar-proyecto-servicio", formulario);
  },
  async actDesactProyecto(formulario) {
    await Csrf.getCookie();
    return Api.put("/coordinador/modificar-estado-proyecto", formulario);
  },
  async obtenerProyectoPractica() {
    await Csrf.getCookie();
    return Api.post("/coordinador/obtener-proyectos-practica");
  },
  async registrarProyectoPractica(formulario) {
    await Csrf.getCookie();
    return Api.post("/coordinador/registrar-proyecto-practica", formulario);
  },
  async modificarProyectoPractica(formulario) {
    await Csrf.getCookie();
    return Api.put("coordinador/modificar-proyecto-practica", formulario);
  },
  async actDesactProyectoPractica(formulario) {
    await Csrf.getCookie();
    return Api.put(
      "/coordinador/modificar-estado-proyecto-practica",
      formulario
    );
  },
  async obtenerAlumnosInscritos() {
    await Csrf.getCookie();
    return Api.get("coordinador/obtener-alumnos-inscritos");
  },
  async obtenerProyectosSeleccionados(formulario) {
    await Csrf.getCookie();
    return Api.post("coordinador/obtener-proyectos-seleccionador", formulario);
  },
  async asignarProyecto(formulario) {
    await Csrf.getCookie();
    return Api.post("coordinador/asignar-alumno-proyecto", formulario);
  },

  async obtenerInscripciones() {
    await Csrf.getCookie();
    return Api.get("coordinador/obtener-inscripciones");
  },
  async registrarInscripcion(formulario) {
    await Csrf.getCookie();
    return Api.post("coordinador/registrar-inscripcion", formulario);
  },
  async terminarInscripcion(formulario) {
    await Csrf.getCookie();
    return Api.put("coordinador/terminar-inscripcion", formulario);
  },
  async cancelarInscripcion(formulario) {
    await Csrf.getCookie();
    return Api.put("coordinador/cancelar-inscripcion", formulario);
  },

  async obtenerNombresDependencias() {
    await Csrf.getCookie();
    return Api.get("/coordinador/obtener-nombres-dependencias");
  },
  async obtenerNombresResponsables(formulario) {
    await Csrf.getCookie();
    return Api.post(
      "/coordinador/obtener-responsables-por-dependencia",
      formulario
    );
  }
};
