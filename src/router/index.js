import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function auth() {
  return localStorage.getItem("auth");
}

function rol() {
  return localStorage.getItem("rol");
}

const routes = [
  {
    path: "/",
    name: "Login",
    meta: { guestOnly: true },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/registro",
    name: "Registro",
    meta: { guestOnly: true },
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth()) {
      next({
        path: "/",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guestOnly)) {
    if (auth()) {
      next({
        path: "/dashboard",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
