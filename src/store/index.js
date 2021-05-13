import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
    key: "my-app",
    storage: window.sessionStorage,
});

export default new Vuex.Store({
    plugins: [vuexPersist.plugin],
    state: {
        permisoHome: true,
        permisoItemDeGasto: false,
        permisoUnidadDeGasto: false,
        permisoCrearUsuario: false,
        permisoCrearRol: false,
        permisoSolicitud: false,
        permisoInforme: false,
        permisoCotizacion: false,
        permisoEmpresa: false,
        listaPermisos: [],
        username: false,
    },
    mutations: {
        async habilitar(state) {
            for (let i = 0; i < state.listaPermisos.length; i++) {
                /* if (state.listaPermisos[i] == "Gestionar Usuarios")//llamar a la cookie para obtener su valors
                                                                                                    state.permisoHome = true;
                                                                                                else */
                if (state.listaPermisos[i] == "Gestionar itemsDeGasto") {
                    state.permisoItemDeGasto = true;
                } else if (state.listaPermisos[i] == "Gestionar unidadDeGasto") {
                    state.permisoUnidadDeGasto = true;
                } else if (state.listaPermisos[i] == "Gestionar Usuarios") {
                    state.permisoCrearUsuario = true;
                    console.log("stateeee");
                    console.log(state.permisoCrearUsuario);
                    console.log(state.listaPermisos[i]);
                } else if (state.listaPermisos[i] == "Gestionar Roles") {
                    state.permisoCrearRol = true;
                } else if (state.listaPermisos[i] == "Gestionar Solicitud") {
                    state.permisoSolicitud = true;
                } else if (state.listaPermisos[i] == "Gestionar Empresa") {
                    state.permisoEmpresa = true;
                }
            }
            console.log("entre al mutations");

            console.log(state.permisoHome);
        },
        addCustomer(state, customer) {
            // mutate state
            state.listaPermisos.push(customer);
        },
        setUser(state, dato) {
            state.username = dato;
        },
        setPermisoUsuario(state, dato2) {
            state.permisoCrearUsuario = dato2;
        },
        setPermisoItem(state, dato2) {
            state.permisoItemDeGasto = dato2;
        },
        setPermisoUnidad(state, dato2) {
            state.permisoUnidadDeGasto = dato2;
        },
        setPermisoRol(state, dato2) {
            state.permisoCrearRol = dato2;
        },
        setPermisoSolicitud(state, dato2) {
            state.permisoSolicitud = dato2;
        },
        setPermisoEmpresa(state, dato2) {
            state.permisoEmpresa = dato2;
        },
        setLista(state) {
            state.listaPermisos = [];
        },
    },
    actions: {
        getPermi(context) {
            context.commit("habilitar");
        },
    },
    modules: {},
});