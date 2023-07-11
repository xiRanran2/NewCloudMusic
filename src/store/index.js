import _state from "./state";
import Vue from 'vue'
import store from "storejs";
const state = Vue.observable(_state);

const mutations = {
    increase(){
        state.darkMode = !state.darkMode
        store.set('darkMode',state.darkMode)
    }
}
export default {
    state,
    mutations
};