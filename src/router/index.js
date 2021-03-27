import Vue from "vue";
import VueRouter from "vue-router";
import Store from "./../store/index";
import Api from "./../api/Usuario";

Vue.use(VueRouter);

function rol() {
  return Store.state.usuario.rol_usuario;
}

const routes = [
  {
    path: "/",
    name: "Login",
    meta: { requiresAuth: false },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/registro",
    name: "Registro",
    meta: { requiresAuth: false },
    component: () =>
      import(
        /* webpackChunkName: "registro" */ "../views/views-alumno/Registro.vue"
      )
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    meta: { requiresAuth: true },
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),
    children: [
      {
        path: "/consulta-coordinadores",
        name: "ConsultaCoordinadores",
        component: () =>
          import(
            /* webpackChunkName: "consulta-coordinador" */ "../views/views-administrador/ConsultaCoordinador.vue"
          ),
        beforeEnter: (to, from, next) => {
          if (rol() === "ADMINISTRADOR") {
            next();
          } else {
            next({
              name: "NotFound",
              query: { redirect: to.fullPath }
            });
          }
        }
      },
      {
        path: "/registrar-coordinador",
        name: "RegistrarCoordinador",
        component: () =>
          import(
            /* webpackChunkName: "registrar-coordinador" */ "../views/views-administrador/RegistrarCoordinador.vue"
          ),
        beforeEnter: (to, from, next) => {
          if (rol() === "ADMINISTRADOR") {
            next();
          } else {
            next({
              name: "NotFound",
              query: { redirect: to.fullPath }
            });
          }
        }
      },
      {
        path: "/modificar-coordinador",
        name: "ModificarCoordinador",
        component: () =>
          import(
            /* webpackChunkName: "registrar-coordinador" */ "../views/views-administrador/ModificarCoordinador.vue"
          ),
        props: true,
        beforeEnter: (to, from, next) => {
          if (rol() === "ADMINISTRADOR") {
            next();
          } else {
            next({
              name: "NotFound",
              query: { redirect: to.fullPath }
            });
          }
        }
      },
      {
        path: "/consulta-dependencias",
        name: "ConsultaDependencias",
        component: () =>
          import(
            /* webpackChunkName: "consulta-dependencias" */ "../views/views-coordinador/ConsultaDependencia.vue"
          ),
        beforeEnter: (to, from, next) => {
          if (rol() === "COORDINADOR") {
            next();
          } else {
            next({
              name: "NotFound",
              query: { redirect: to.fullPath }
            });
          }
        }
      },
      {
        path: "/dependencia",
        name: "Dependencia",
        component: () =>
          import(
            /* webpackChunkName: "registrar-dependencia" */ "../views/views-coordinador/Dependencia.vue"
          ),
        props: true,
        beforeEnter: (to, from, next) => {
          if (rol() === "COORDINADOR") {
            next();
          } else {
            next({
              name: "NotFound",
              query: { redirect: to.fullPath }
            });
          }
        }
      },
      {
        path: "/consulta-responsables",
        name: "ConsultaResponsables",
        component: () =>
          import(
            /* webpackChunkName: "consulta-responsables" */ "../views/views-coordinador/ConsultaResponsable.vue"
          ),
        beforeEnter: (to, from, next) => {
          if (rol() === "COORDINADOR") {
            next();
          } else {
            next({
              name: "NotFound",
              query: { redirect: to.fullPath }
            });
          }
        }
      },
      {
        path: "/responsable",
        name: "Responsable",
        component: () =>
          import(
            /* webpackChunkName: "responsable" */ "../views/views-coordinador/Responsable.vue"
          ),
        props: true,
        beforeEnter: (to, from, next) => {
          if (rol() === "COORDINADOR") {
            next();
          } else {
            next({
              name: "NotFound",
              query: { redirect: to.fullPath }
            });
          }
        }
      },
      {
        path: "/consulta-proyectos-servicio",
        name: "ConsultaProyectosServicio",
        component: () =>
          import(
            /* webpackChunkName: "consulta-proyectos-servicio" */ "../views/views-coordinador/ConsultaProyectoServicio.vue"
          ),
        beforeEnter: (to, from, next) => {
          if (rol() === "COORDINADOR") {
            next();
          } else {
            next({
              name: "NotFound",
              query: { redirect: to.fullPath }
            });
          }
        }
      },
      {
        path: "/proyecto-servicio",
        name: "ProyectoServicio",
        component: () =>
          import(
            /* webpackChunkName: "proyecto-servicio" */ "../views/views-coordinador/ProyectoServicio.vue"
          ),
        props: true,
        beforeEnter: (to, from, next) => {
          if (rol() === "COORDINADOR") {
            next();
          } else {
            next({
              name: "NotFound",
              query: { redirect: to.fullPath }
            });
          }
        }
      },
      {
        path: "/consulta-proyectos-practicas",
        name: "ConsultarProyectosPractica",
        component: () =>
          import(
            /* webpackChunkName: "consulta-proyectos-practicas" */ "../views/views-coordinador/ConsultaProyectoPractica.vue"
          ),
        beforeEnter: (to, from, next) => {
          if (rol() === "COORDINADOR") {
            next();
          } else {
            next({
              name: "NotFound",
              query: { redirect: to.fullPath }
            });
          }
        }
      },
      {
        path: "/proyecto-practica",
        name: "ProyectoPractica",
        component: () =>
          import(
            /* webpackChunkName: "proyecto-practica" */ "../views/views-coordinador/ProyectoPractica.vue"
          ),
        props: true,
        beforeEnter: (to, from, next) => {
          if (rol() === "COORDINADOR") {
            next();
          } else {
            next({
              name: "NotFound",
              query: { redirect: to.fullPath }
            });
          }
        }
      },
      {
        path: "/consulta-alumnos-inscritos",
        name: "ConsultaAlumnosInscritos",
        component: () =>
          import(
            /* webpackChunkName: "consulta-alumnos-inscritos" */ "../views/views-coordinador/ConsultarAlumnosInscritos.vue"
          ),
        beforeEnter: (to, from, next) => {
          if (rol() === "COORDINADOR") {
            next();
          } else {
            next({
              name: "NotFound",
              query: { redirect: to.fullPath }
            });
          }
        }
      },
      {
        path: "/consulta-inscripcion",
        name: "ConsultaInscripcion",
        component: () =>
          import(
            /* webpackChunkName: "consulta-inscripcion" */ "../views/views-coordinador/ConsultaInscripcion.vue"
          ),
        beforeEnter: (to, from, next) => {
          if (rol() === "COORDINADOR") {
            next();
          } else {
            next({
              name: "NotFound",
              query: { redirect: to.fullPath }
            });
          }
        }
      },
      {
        path: "/registrar-inscripcion",
        name: "RegistrarInscripcion",
        component: () =>
          import(
            /* webpackChunkName: "registrar-inscripcion" */ "../views/views-coordinador/Inscripcion.vue"
          ),
        beforeEnter: (to, from, next) => {
          if (rol() === "COORDINADOR") {
            next();
          } else {
            next({
              name: "NotFound",
              query: { redirect: to.fullPath }
            });
          }
        }
      },
      {
        path: "/consulta-profesores",
        name: "ConsultarProfesores",
        component: () =>
          import(
            /* webpackChunkName: "consultar-profesores" */ "../views/views-coordinador/ConsultaProfesor.vue"
          ),
        beforeEnter: (to, from, next) => {
          if (rol() === "COORDINADOR") {
            next();
          } else {
            next({
              name: "NotFound",
              query: { redirect: to.fullPath }
            });
          }
        }
      },
      {
        path: "/profesor",
        name: "Profesor",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "profesor" */ "../views/views-coordinador/Profesor.vue"
          ),
        beforeEnter: (to, from, next) => {
          if (rol() === "COORDINADOR") {
            next();
          } else {
            next({
              name: "NotFound",
              query: { redirect: to.fullPath }
            });
          }
        }
      },
      {
        path: "/consulta-alumnos",
        name: "ConsultaAlumnos",
        component: () =>
          import(
            /* webpackChunkName: "consulta-alumnos" */ "../views/views-profesor/ConsultaAlumnos.vue"
          ),
        beforeEnter: (to, from, next) => {
          if (rol() === "PROFESOR") {
            next();
          } else {
            next({
              name: "NotFound",
              query: { redirect: to.fullPath }
            });
          }
        }
      },
      {
        path: "/consulta-documentos-alumno",
        name: "ConsultaDocumentosAlumno",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "consulta-documentos-alumno" */ "../views/views-profesor/ConsultaDocumentosAlumno.vue"
          ),
        beforeEnter: (to, from, next) => {
          if (rol() === "PROFESOR") {
            next();
          } else {
            next({
              name: "NotFound",
              query: { redirect: to.fullPath }
            });
          }
        }
      },
      {
        path: "/consultar-documentos",
        name: "ConsultarDocumento",
        component: () =>
          import(
            /* webpackChunkName: "consultar-documentos" */ "../views/views-alumno/ConsultaDocumentos.vue"
          ),
        beforeEnter: (to, from, next) => {
          if (rol() === "ALUMNO") {
            next();
          } else {
            next({
              name: "NotFound",
              query: { redirect: to.fullPath }
            });
          }
        }
      },
      {
        path: "/informacion-proyecto",
        name: "InformacionProyecto",
        component: () =>
          import(
            /* webpackChunkName: "informacion-proyecto" */ "../views/views-alumno/ProyectoInformacion.vue"
          ),
        beforeEnter: (to, from, next) => {
          if (rol() === "ALUMNO") {
            next();
          } else {
            next({
              name: "NotFound",
              query: { redirect: to.fullPath }
            });
          }
        }
      },
      {
        path: "/datos-personales",
        name: "DatosPersonales",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "datos-personales" */ "../components/DatosPersonales.vue"
          )
      }
    ]
  },
  {
    path: "*",
    name: "NotFound",
    component: () =>
      import(
        /* webpackChunkName: "consulta-proyectos" */ "../views/NotFound.vue"
      )
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!(await autenticarse())) {
      next({
        path: "/",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

async function autenticarse() {
  if (Store.state.usuario === null) {
    const auth = Api.auth()
      .then(response => {
        Store.state.usuario = response.data;
        return true;
      })
      .catch(() => {
        return false;
      });
    return auth;
  } else {
    return true;
  }
}

export default router;
