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
      import(/* webpackChunkName: "registro" */ "../views/Registro.vue")
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
        path: "/consulta-proyectos",
        name: "ConsultaProyectos",
        component: () =>
          import(
            /* webpackChunkName: "consulta-proyectos" */ "../views/ConsultaProyectos.vue"
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
        path: "/consulta-dependencias",
        name: "ConsultaDependencias",
        component: () =>
          import(
            /* webpackChunkName: "consulta-dependencias" */ "../views/views-coordinador/ConsultaDependencia.vue"
          ),
        beforeEnter: (to, from, next) => {
          console.log("ENTRO EN EL BEFORE COMO: ", rol());
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
        path: "/registrar-dependencia",
        name: "RegistrarDependencia",
        component: () =>
          import(
            /* webpackChunkName: "registrar-dependencia" */ "../views/views-coordinador/RegistrarDependencia.vue"
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
        path: "/modificar-dependencia",
        name: "ModificarDependencia",
        component: () =>
          import(
            /* webpackChunkName: "modificar-dependencia" */ "../views/views-coordinador/ModificarDependencia.vue"
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
