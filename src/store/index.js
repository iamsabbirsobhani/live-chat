import { createStore } from "vuex";
export default createStore({
    state: {
        route: null,
        back: null,
        style: {},
        dark: false,
        color: "black"
        // background: "black"
    },
    getters: {
        getRoute: (state) => {
            // console.log(state.route)
            return state.route
        },
        getBack: (state) => {
            // console.log(state.back)
            return state.back
        },
        getStyle: (state) => {
            // console.log(state.back)
            return state.style
        },
        isDark: (state) => {
            // console.log(state.back)
            return state.dark
        },
        color: (state) => {
            return state.color
        }
    },
    mutations: {
        clickOn (state, payload) {
            state.route = payload.name
            state.back = payload.back
        },
        darkMode (state, payload) {
            state.style = payload
        },
        isDark(state, payload) {
            state.dark = payload
        }
    },
    actions: {},
    modules: {},
});