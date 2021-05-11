import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
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
    },
    mutations: {
        async habilitar(state) {
            for (let i = 0; i < state.listaPermisos.length; i++) {
                /* if (state.listaPermisos[i] == "Gestionar Usuarios")//llamar a la cookie para obtener su valors
                            state.permisoHome = true;
                        else */
                if (
                    state.listaPermisos[i] == "Gestionar itemsDeGasto"
                )
                    state.permisoItemDeGasto = true;
                else if (state.listaPermisos[i] == "Gestionar unidadDeGasto")
                    state.permisoUnidadDeGasto = true;
                else if (state.listaPermisos[i] == "Gestionar Usuarios")
                    state.permisoCrearUsuario = true;
                else if (state.listaPermisos[i] == "Gestionar Roles")
                    state.permisoCrearRol = true;
                else if (state.listaPermisos[i] == "Gestionar Solicitud")
                    state.permisoSolicitud = true;
                else if (state.listaPermisos[i] == "Gestionar Empresa")
                    state.permisoEmpresa = true;

                /*else if (state.listaPermisos[i] == "Gestionar Informe")
                          state.permisoInforme = true;
                        else if (state.listaPermisos[i] == "Gestionar Cotizacion")
                          state.permisoCotizacion = true;*/
            }
            console.log("entre al mutations");

            console.log(state.permisoHome);
        },
        addCustomer(state, customer) {
            // mutate state
            state.listaPermisos.push(customer);
        },
    },
    /* push(state, categ) {
                            for (let i = 0; i < state.categ.length; i++) {
                                state.listaPermisos.push(categ[i].nombre_funcion);
                            }
                            console.log("entre al push");
                        },*/
    actions: {
        getPermi(context) {
            context.commit("habilitar");
        },
    },
    modules: {},
});