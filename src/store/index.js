import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
var EventBus = new Vue();
export default new Vuex.Store({
    state: {
        EventBus,
        lista: [],
    },
    mutations: {},
    actions: {},
    modules: {},
});