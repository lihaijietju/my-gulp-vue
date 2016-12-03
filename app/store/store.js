import Vue from 'vue/dist/vue.js';
import Vuex from 'vuex';
import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
Vue.use(Vuex);
var store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
export default store;
