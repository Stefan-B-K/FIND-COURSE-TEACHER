import axios from 'axios';

const API_KEY = 'AIzaSyBtIRvgn0s29_dYmkymoG7MUkOPl0BbbyI';
const SIGNUP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
const LOGIN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

const state = {
  userId: null,
  token: null,
  tokenExpiration: null
};

const getters = {
  userId (state) {
    return state.userId;
  },
  userIsLoggedIn (state) {
    return !!state.userId;
  },
  token (state) {
    return state.token;
  }
};

const mutations = {
  setUserAuthData (state, userAuthData) {
    state.userId = userAuthData.localId,
      state.token = userAuthData.idToken,
      state.tokenExpiration = userAuthData.expiresIn;
  }
};

const actions = {

  async authorize ({ commit }, userData) {
    const userInputData = userData[0];
    const authType = userData[1];
    let userAuthData;
    try {
      const url = authType === 'login' ? LOGIN_URL : SIGNUP_URL;
      const response = await axios
        .post(url + API_KEY, { ...userInputData, returnSecureToken: true });
      userAuthData = response.data;
    } catch (error) {
      let message = authType === 'login' ? 'Error logging in: ' : 'Error registering new user: ';
      message += error.message || error.response.statusText || error.response.data.error.message;
      throw  new Error('Error logging in: ' + message);
    }
    commit('setUserAuthData', userAuthData);
  },

  logout ({  commit }) {
    commit('setUserAuthData', {
      userId: null,
      token: null,
      tokenExpiration: null
    })
  }

};

export default {
  namespaced: false,
  state, getters, actions, mutations
};