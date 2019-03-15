import Vue from 'vue'
import Vuex from 'vuex'
import initial from './modules/initial'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        initial
    }
})