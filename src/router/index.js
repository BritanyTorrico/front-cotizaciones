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
        path: "/principal",
        name: "PaginaPermisos",
        component: () =>
            import ("@/views/PaginaPermisos.vue"),
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
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/item/editar/:id",
        name: "EditarItemGasto",
        component: () =>
            import ("@/views/EditItem.vue"),

        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/unidad/editar/:id",
        name: "EditarUnidadGasto",
        component: () =>
            import ("@/views/EditUnit.vue"),

        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/empresa/editar/:id",
        name: "EditarEmpresas",
        component: () =>
            import ("@/views/EditCompany.vue"),

        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/usuario/editar/:id",
        name: "EditarUsuarios",
        component: () =>
            import ("@/views/EditUser.vue"),

        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/presupuestoDep",
        name: "RegistrarPresupuestoDepto",
        component: () =>
            import ("../views/RegistrarPresupuestoDepto.vue"),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/historial_presupuestos",
        name: "HistorialPresupuestosPage",
        component: () =>
            import ("../views/HistorialPresupuestosPage.vue"),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/historial_presupuestos_dep",
        name: "HistorialPresupuestoDepPage",
        component: () =>
            import ("../views/HistorialPresupuestoDepPage.vue"),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/logss",
        name: "LogPage",
        component: () =>
            import ("../views/LogPage.vue"),
    },
    {
        path: "/back",
        name: "vistaBack",
        component: () =>
            import ("../views/vistaBack.vue"),
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