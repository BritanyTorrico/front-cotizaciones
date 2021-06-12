import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "PaginaPrincipalPage",
        component: () =>
            import ("@/views/PaginaPrincipalPage.vue"),
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/About.vue"),
    },
    {
        path: "/item/nuevo",
        name: "RegistroItemGasto",
        component: () =>
            import ("@/views/RegItem.vue"),

        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/unidad/nueva",
        name: "RegistroUnidadGasto",
        component: () =>
            import ("@/views/RegUnidad.vue"),

        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/register",
        name: "RegisterUserPage",
        component: () =>
            import ("../views/RegisterUserPage.vue"),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/login",
        name: "LoginPage",
        component: () =>
            import ("../views/LoginPage.vue"),
    },
    {
        path: "/creaRol",
        name: "CreaRol",
        component: () =>
            import ("../views/creaRol.vue"),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/solicitud/nueva",
        name: "SolicitudPage",
        component: () =>
            import ("../views/SolicitudPage.vue"),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/revisar_solicitudes",
        name: "RequestReview",
        component: () =>
            import ("@/views/RequestReview.vue"),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/cotizacion",
        name: "QuotationForm",
        component: () =>
            import ("@/views/QuotationForm.vue"),
        meta: {
            rutaProtegida: true,
        },
    },

    {
        path: "/empresa/nueva",
        name: "creaEmpresa",
        component: () =>
            import ("../views/creaEmpresa.vue"),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/filtro_cotizaciones",
        name: "QuotationFilter",
        component: () =>
            import ("../views/QuotationFilter.vue"),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/solicitudes",
        name: "Solicitudes",
        component: () =>
            import ("../views/Solicitudes.vue"),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/usuarios",
        name: "Usuarios",
        component: () =>
            import ("../views/Users.vue"),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/roles",
        name: "Roles",
        component: () =>
            import ("../views/Roles.vue"),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/unidades",
        name: "Unidades",
        component: () =>
            import ("../views/Units.vue"),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/items",
        name: "Items",
        component: () =>
            import ("../views/Items.vue"),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/empresas",
        name: "Empresas",
        component: () =>
            import ("../views/Companies.vue"),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/presupuestos",
        name: "RegistrarPresupuestos",
        component: () =>
            import ("../views/RegistrarPresupuestos.vue"),
    },
    {
        path: "/historial_presupuestos",
        name: "HistorialPresupuestosPage",
        component: () =>
            import ("../views/HistorialPresupuestosPage.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});
router.beforeEach((to, from, next) => {
    const rutaEsProtegida = to.matched.some((item) => item.meta.rutaProtegida);
    const user = localStorage.getItem("username");
    if (rutaEsProtegida && user === "true") {
        next(); //protegida
    } else if (rutaEsProtegida && user === "false") {
        next("/login");
    } else if (!rutaEsProtegida) {
        next();
    } else if (rutaEsProtegida) {
        next("/login");
    }
});

export default router;