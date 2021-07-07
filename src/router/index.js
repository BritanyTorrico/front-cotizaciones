import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

function lazyLoad(view){
    return() => import (`@/views/${view}.vue`)
}

const routes = [{
        path: "/",
        name: "PaginaPrincipalPage",
        component: lazyLoad('PaginaPrincipalPage'),
    },
    {
        path: "/principal",
        name: "PaginaPermisos",
        component: lazyLoad('PaginaPermisos'),
    },
    {
        path: "/item/nuevo",
        name: "RegistroItemGasto",
        component: lazyLoad('RegItem'),

        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/unidad/nueva",
        name: "RegistroUnidadGasto",
        component: lazyLoad('RegUnidad'),

        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/register",
        name: "RegisterUserPage",
        component: lazyLoad('RegisterUserPage'),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/login",
        name: "LoginPage",
        component: lazyLoad('LoginPage'),
    },
    {
        path: "/creaRol",
        name: "CreaRol",
        component: lazyLoad('creaRol'),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/solicitud/nueva",
        name: "SolicitudPage",
        component: lazyLoad('SolicitudPage'),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/revisar_solicitudes",
        name: "RequestReview",
        component: lazyLoad('RequestReview'),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/cotizacion/nueva",
        name: "QuotationForm",
        component: lazyLoad('QuotationForm'),
        meta: {
            rutaProtegida: true,
        },
    },

    {
        path: "/empresa/nueva",
        name: "creaEmpresa",
        component: lazyLoad('creaEmpresa'),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/filtro_cotizaciones",
        name: "QuotationFilter",
        component: lazyLoad('QuotationFilter'),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/solicitudes",
        name: "Solicitudes",
        component: lazyLoad('Solicitudes'),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/usuarios",
        name: "Usuarios",
        component: lazyLoad('Users'),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/roles",
        name: "Roles",
        component: lazyLoad('Roles'),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/unidades",
        name: "Unidades",
        component: lazyLoad('Units'),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/items",
        name: "Items",
        component: lazyLoad('Items'),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/empresas",
        name: "Empresas",
        component: lazyLoad('Companies'),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/presupuestos",
        name: "RegistrarPresupuestos",
        component: lazyLoad('RegistrarPresupuestos'),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/item/editar/:id",
        name: "EditarItemGasto",
        component: lazyLoad('EditItem'),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/unidad/editar/:id",
        name: "EditarUnidadGasto",
        component: lazyLoad('EditUnit'),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/empresa/editar/:id",
        name: "EditarEmpresas",
        component: lazyLoad('EditCompany'),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/usuario/editar/:id",
        name: "EditarUsuarios",
        component: lazyLoad('EditUser'),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/roles/editar/:id",
        name: "EditRole",
        component: lazyLoad('EditRole'),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/presupuestoDep",
        name: "RegistrarPresupuestoDepto",
        component: lazyLoad('RegistrarPresupuestoDepto'),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/historial_presupuestos",
        name: "HistorialPresupuestosPage",
        component: lazyLoad('HistorialPresupuestosPage'),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/historial_presupuestos_dep",
        name: "HistorialPresupuestoDepPage",
        component: lazyLoad('HistorialPresupuestoDepPage'),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/logss",
        name: "LogPage",
        component: lazyLoad('LogPage'),
    },
    {
        path: "/back",
        name: "vistaBack",
        component: lazyLoad('vistaBack'),
    },
    {
        path: "/cotizaciones",
        name: "Cotizaciones",
        component: lazyLoad('Cotizaciones'),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/cotizacion/respuesta/:id",
        name: "ActualizarRespuestas",
        component: lazyLoad('ActualizarRespuestas'),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/cuadro_comparativo/nuevo",
        name: "CuadroComparativo",
        component: lazyLoad('CuadroComparativo'),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/cuadro_comparativo",
        name: "CuadroComparativo",
        component: lazyLoad('TablasComparativas'),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/informe_final",
        name: "InformeFinal",
        component: lazyLoad('InformeFinal'),
        meta: {
            rutaProtegida: true,
        },
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