import { createStore } from "vuex";

export default createStore({
  state: {
    route: null,
    back: null,
    style: {},
    dark: false,
    color: "#0f172a",
    otherProfileName: null,
    explorePass: 63952,
    userExplorePass: null,
    messagesPass: 63952,
    userMessagesPass: null,
    masterPass: 63952,
    userMasterPass: null,
    currentToken: null,
    profiles: null,
    profile: null,
    // personal chat settings
    openChatSettings: false,
    friendName: null,
    ownChipColor: 'black',
    // personal chat settings

    // background: "black"
  },
  getters: {
    getRoute: (state) => {
      return state.route;
    },
    getBack: (state) => {
      return state.back;
    },
    getStyle: (state) => {
      return state.style;
    },
    isDark: (state) => {
      return state.dark;
    },
    color: (state) => {
      return state.color;
    },
    getMetaName: (state) => {
      return state.otherProfileName;
    },
    getProfiles: (state) => {
      return state.profiles;
    },
    getProfile: (state) => {
      return state.profiles;
    },
    // personal chat settings
    getChatSettings: (state) => {
      return state.openChatSettings;
    },
    getFriendName: (state) => {
      return state.friendName;
    },
    // personal chat settings
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
    setMessagesPass(state, payload) {
      state.userMessagesPass = payload;
    },
    setMasterPass(state, payload) {
      state.userMasterPass = payload;
    },
    setCurrentToken(state, payload) {
      state.currentToken = payload;
    },
    setProfiles(state, payload) {
      state.profiles = payload;
    },
    setProfile(state, payload) {
      state.profile = payload;
    },
    // personal chat settings
    setChatSettingse(state, payload) {
      state.openChatSettings = payload;
    },
    setFriendName(state, payload) {
      state.friendName = payload;
    },
    setOwnChatColor(state, payload) {
      state.ownChipColor = payload;
    },
    // personal chat settings
  },
  actions: {},
  modules: {},
});
