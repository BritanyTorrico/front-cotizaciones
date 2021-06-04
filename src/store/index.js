import Vue from "vue";
import Vuex from "vuex";

import VuexPersist from "vuex-persist";

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
    key: "my-app",
    storage: window.localStorage,
});

Vue.use(Vuex);

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
        permisoRevisionSolicitudes: false,
        permisoFiltroCotizacion: false,
        username: false,
        token: null,

        contador: 0,
    },
    mutations: {
        async habilitar(state) {
            for (let i = 0; i < state.listaPermisos.length; i++) {
                if (state.listaPermisos[i] == "Vista_Nuevo_Item") {
                    state.permisoItemDeGasto = true;
                    state.contador = state.contador + 1;
                } else if (state.listaPermisos[i] == "Vista_Nueva_Unidad") {
                    state.permisoUnidadDeGasto = true;
                    state.contador = state.contador + 1;
                } else if (state.listaPermisos[i] == "Vista_Registro_Usuario") {
                    state.permisoCrearUsuario = true;
                    state.contador = state.contador + 1;
                } else if (state.listaPermisos[i] == "Vista_Crear_Roles") {
                    state.permisoCrearRol = true;
                    state.contador = state.contador + 1;
                } else if (state.listaPermisos[i] == "Vista_Solicitudes") {
                    state.permisoSolicitud = true;
                    state.contador = state.contador + 1;
                } else if (state.listaPermisos[i] == "Vista_Registro_Empresas") {
                    state.permisoEmpresa = true;
                    state.contador = state.contador + 1;
                } else if (state.listaPermisos[i] == "Vista_Revisar_Solicitudes") {
                    state.permisoRevisionSolicitudes = true;
                    state.contador = state.contador + 1;
                } else if (state.listaPermisos[i] == "Vista_Cotizaciones") {
                    state.permisoCotizacion = true;
                    state.contador = state.contador + 1;
                } else if (state.listaPermisos[i] == "Vista_Filtro_Cotizaciones") {
                    state.permisoFiltroCotizacion = true;
                    state.contador = state.contador + 1;
                }
            }
            console.log("HOLAAAAAAAAA");
            console.log(state.contador);
        },

        borrarContador(state) {
            state.contador = 0;
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
        //nuevos

        setPermisoCotizacion(state, dato2) {
            state.permisoCotizacion = dato2;
        },
        setPermisoRevisarCotizaciones(state, dato2) {
            state.permisoRevisionSolicitudes = dato2;
        },
        setPermisoFiltroCotizaciones(state, dato2) {
            state.permisoFiltroCotizacion = dato2;
        },
        setLista(state) {
            state.listaPermisos = [];
        },
        setToken(state, payload) {
            state.token = payload;
        },
    },
    actions: {
        getPermi(context) {
            context.commit("habilitar");
        },
        login({ commit }, tokensito) {
            let nuevoToken = "Bearer " + tokensito;
            commit("setToken", nuevoToken);
            localStorage.setItem("token", nuevoToken); //para que no se pierda al refrescar
            nuevoToken = "";
        },
        leerToken({ commit }) {
            if (localStorage.getItem("token")) {
                commit("setToken", localStorage.getItem("token"));
            } else {
                commit("setToken", null);
            }
        },
    },

    modules: {},
});