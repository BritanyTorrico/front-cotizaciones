import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
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
        path: "/registro_item",
        name: "RegistroItemGasto",
        component: () =>
            import ("@/views/RegItem.vue"),
        meta: {
            rutaProtegida: true,
        },
    },
    {
        path: "/registro_unidad",
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