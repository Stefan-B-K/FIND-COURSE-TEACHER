import axios from 'axios';

let timer;

const API_KEY = 'AIzaSyBtIRvgn0s29_dYmkymoG7MUkOPl0BbbyI';
const SIGNUP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
const LOGIN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

const state = {
  userId: null,
  token: null
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
    state.userId = userAuthData.localId;
    state.token = userAuthData.idToken;
  }
};

const actions = {
  async authorize ({ commit, dispatch, rootActions }, userData) {
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
      message += error.response.statusText || error.response.data.error.message;
      throw  new Error('Error logging in: ' + message);
    }

    const expiresInMilliseconds = 5000; //+userAuthData.expiresIn * 1000;
    const expirationTime = new Date().getTime() + expiresInMilliseconds;

    timer = setTimeout(function() {
      dispatch('logout');
    }, expiresInMilliseconds);

    localStorage.setItem('token', userAuthData.idToken);
    localStorage.setItem('userId', userAuthData.localId);
    localStorage.setItem('tokenExpiration', expirationTime)

    commit('setUserAuthData', userAuthData);
  },

  keepLogin ({ commit }) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresInMilliseconds = +tokenExpiration - new Date().getTime();
    if (expiresInMilliseconds < 10000) return;

    setTimeout(function() { this.logout(); }, expiresInMilliseconds);

    if (token && userId) {
      commit('setUserAuthData', {
        idToken: token,
        localId: userId
      });
    }
  },

  logout ({ commit }) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userIsTeacher');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);

    commit('setUserAuthData', {
      userId: null,
      token: null
    });
  }
};

export default {
  namespaced: false,
  state, getters, actions, mutations
};