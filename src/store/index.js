import Vue from "vue"
import Vuex from "vuex"
import changeAside from "./changeAside"
import user from "./user"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        changeAside,
        user
    }
})