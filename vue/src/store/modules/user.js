export default {
  state() {
    return {
      isAuthenticated: true,
      name: "",
      userName: "",
    };
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    name(state) {
      return state.name;
    },
    userName(state) {
      return state.userName;
    },
  },
  actions: {
    setAuth(context, payload) {
      console.log("action dispatched");
      context.commit("setAuth", payload);
    },
  },
  mutations: {
    setAuth(state, payload) {
      state.isAuthenticated = true;
      state.name = payload.name;
      state.userName = payload.username;
      console.log("is Auth", state.isAuthenticated);
    },
  },
};
