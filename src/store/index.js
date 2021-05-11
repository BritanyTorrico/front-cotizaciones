import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        permisoHome: false,
        listaPermisos: [],
    },
    mutations: {
        habilitar(state) {
            for (let i = 0; i < state.listaPermisos.length; i++) {
                if (state.listaPermisos[i] == "Gestonar Usuarios") {
                    state.permisoHome = true;
                }
            }
            console.log("entre al mutations");
            console.log(state.listaPermisos.length);
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