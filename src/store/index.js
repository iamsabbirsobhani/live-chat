import { createStore } from "vuex";
export default createStore({
    state: {
        route: null,
        back: null
    },
    getters: {
        getRoute: (state) => {
            console.log(state.route)
            return state.route
        },
        getBack: (state) => {
            console.log(state.back)
            return state.back
        },
    },
    mutations: {
        clickOn (state, payload) {
            state.route = payload.name
            state.back = payload.back
        }
    },
    actions: {},
    modules: {},
});