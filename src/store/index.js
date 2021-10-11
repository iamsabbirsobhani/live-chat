import { createStore } from "vuex";

export default createStore({
  state: {
    route: null,
    back: null,
    style: {},
    dark: false,
    color: "black",
    otherProfileName: null,
    explorePass: 63952,
    userExplorePass: null,
    // background: "black"
  },
  getters: {
    getRoute: (state) => {
      // console.log(state.route)
      return state.route;
    },
    getBack: (state) => {
      // console.log(state.back)
      return state.back;
    },
    getStyle: (state) => {
      // console.log(state.back)
      return state.style;
    },
    isDark: (state) => {
      // console.log(state.back)
      return state.dark;
    },
    color: (state) => {
      return state.color;
    },
    getMetaName: (state) => {
      return state.otherProfileName;
    },
  },
  mutations: {
    clickOn(state, payload) {
      state.route = payload.name;
      state.back = payload.back;
    },
    darkMode(state, payload) {
      state.style = payload;
    },
    isDark(state, payload) {
      state.dark = payload;
    },
    setMetaProfileName(state, payload) {
      state.otherProfileName = payload;
    },
    setExplorePass(state, payload) {
      state.userExplorePass = payload;
    },
  },
  actions: {},
  modules: {},
});
