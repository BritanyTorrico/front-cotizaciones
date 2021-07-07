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
        permisoPresupuestoDep: false,
        permisoPresupuestoUnidad: false,
        permisoHistorialPresupuestoDep: false,
        permisoHistorialPresupuestoUnidad: false,
        permisoCuadroComparativo: false,
        permisoBitacora: false,
        permisoBackup: false,
        permisoInformeFinal: false,
        contadorGestionar: 0,
        contadorSolicitudes: 0,
        contadorCotizaciones: 0,
        contadorPresupuestos: 0,
        contadorSistema: 0,
    },
    mutations: {
        async habilitar(state) {
            for (let i = 0; i < state.listaPermisos.length; i++) {
                if (state.listaPermisos[i] == "Vista_Nuevo_Item") {
                    state.permisoItemDeGasto = true;
                    state.contadorGestionar = state.contadorGestionar + 1;
                } else if (state.listaPermisos[i] == "Vista_Nueva_Unidad") {
                    state.permisoUnidadDeGasto = true;
                    state.contadorGestionar = state.contadorGestionar + 1;
                } else if (state.listaPermisos[i] == "Vista_Registro_Usuario") {
                    state.permisoCrearUsuario = true;
                    state.contadorGestionar = state.contadorGestionar + 1;
                } else if (state.listaPermisos[i] == "Vista_Crear_Roles") {
                    state.permisoCrearRol = true;
                    state.contadorGestionar = state.contadorGestionar + 1;
                } else if (state.listaPermisos[i] == "Vista_Solicitudes") {
                    state.permisoSolicitud = true;
                    state.contadorSolicitudes = state.contadorSolicitudes + 1;
                } else if (state.listaPermisos[i] == "Vista_Registro_Empresas") {
                    state.permisoEmpresa = true;
                    state.contadorGestionar = state.contadorGestionar + 1;
                } else if (state.listaPermisos[i] == "Vista_Revisar_Solicitudes") {
                    state.permisoRevisionSolicitudes = true;
                    state.contadorSolicitudes = state.contadorSolicitudes + 1;
                } else if (state.listaPermisos[i] == "Vista_Cotizaciones") {
                    state.permisoCotizacion = true;
                    state.contadorCotizaciones = state.contadorCotizaciones + 1;
                } else if (state.listaPermisos[i] == "Vista_Filtro_Cotizaciones") {
                    state.permisoFiltroCotizacion = true;
                    state.contadorCotizaciones = state.contadorCotizaciones + 1;
                } else if (
                    state.listaPermisos[i] == "Vista_Actualizar_Presupuesto_Departamento"
                ) {
                    state.permisoPresupuestoDep = true;
                    state.contadorPresupuestos = state.contadorPresupuestos + 1;
                } else if (
                    state.listaPermisos[i] == "Vista_Actualizar_Presupuesto_Unidad"
                ) {
                    state.permisoPresupuestoUnidad = true;
                    state.contadorPresupuestos = state.contadorPresupuestos + 1;
                } else if (state.listaPermisos[i] == "Vista_Ver_Tabla") {
                    state.permisoCuadroComparativo = true;
                    state.contadorCotizaciones = state.contadorCotizaciones + 1;
                } else if (state.listaPermisos[i] == "Vista_Ver_Bitacora") {
                    state.permisoBitacora = true;
                    state.contadorSistema = state.contadorSistema + 1;
                } else if (state.listaPermisos[i] == "Vista_Backup") {
                    state.permisoBackup = true;
                    state.contadorSistema = state.contadorSistema + 1;
                } else if (state.listaPermisos[i] == "Vista_ReporteFinal") {
                    state.permisoInformeFinal = true;
                    state.contadorCotizaciones = state.contadorCotizaciones + 1;
                }
            }
        },

        borrarContador1(state) {
            state.contadorGestionar = 0;
        },
        borrarContador2(state) {
            state.contadorSolicitudes = 0;
        },
        borrarContador3(state) {
            state.contadorCotizaciones = 0;
        },
        borrarContador4(state) {
            state.contadorPresupuestos = 0;
        },
        borrarContador5(state) {
            state.contadorSistema = 0;
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
        //tercer sprint
        setPermisoPresupuestoDep(state, dato2) {
            state.permisoPresupuestoDep = dato2;
        },
        setPermisoPresupuestoUnidad(state, dato2) {
            state.permisoPresupuestoUnidad = dato2;
        },
        setPermisoPresupuestoHistorialDep(state, dato2) {
            state.permisoHistorialPresupuestoDep = dato2;
        },
        setPermisoPresupuestoHistorialUnidad(state, dato2) {
            state.permisoHistorialPresupuestoUnidad = dato2;
        },
        setPermisoCuadroComparativo(state, dato2) {
            state.permisoCuadroComparativo = dato2;
        },
        setPermisoBitacora(state, dato2) {
            state.permisoBitacora = dato2;
        },
        setPermisoBackup(state, dato2) {
            state.permisoBackup = dato2;
        },
        setPermisoInformeFinal(state, dato2) {
            state.permisoInformeFinal = dato2;
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