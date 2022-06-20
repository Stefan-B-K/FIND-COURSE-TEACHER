import axios from 'axios';

const FIREBASE_DB = 'https://find-course-teacher-default-rtdb.europe-west1.firebasedatabase.app/';

const state = {
  applications: [],
  applicationsLoaded: false
};

const getters = {
  applications (state) {
    return state.applications;
  },
  applicationsLoaded (state) {
    return state.applicationsLoaded;
  },
  noApplications (state) {
    return state.applications.length === 0;
  }
};

const mutations = {
  setApplications (state, data) {
    state.applications = data;
  },
  setApplicationsLoaded (state) {
    state.applicationsLoaded = true;
  },
  deleteApplication (state, appId) {
    state.applications = state.applications.filter(app => app.id !== appId);
  }
};

const actions = {

  async contactTeacher (_, data) {
    const newApplication = {
      userEmail: data.email,
      message: data.message
    };

    try {
      await axios
        .post(`${FIREBASE_DB}/applications/${data.teacherId}.json`, newApplication);
    } catch (error) {
      let message = error.response.statusText || error.response.data.error.message;
      throw new Error('Error writing to Firebase: ' + message);
    }
  },

  async fetchApplications ({ commit, rootGetters }) {
    let loadedApps = [];
    try {
      const response = await axios
        .get(`${FIREBASE_DB}/applications/${rootGetters.userId}.json?auth=${rootGetters.token}`);
      if (response.data) {
        loadedApps = Object.keys(response.data)
          .map(key => ({ ...response.data[key], id: key }));
      }
    } catch (error) {
      let message = error.response.statusText || error.response.data.error.message;
      throw new Error('Error fetching applications from Firebase: ' + message);
    }
    commit('setApplications', loadedApps);
    commit('setApplicationsLoaded');
  },

  async deleteApplication ({ commit, rootGetters }, appId) {

    try {
      await axios
        .delete(`${FIREBASE_DB}/applications/${rootGetters.userId}/${appId}.json?auth=${rootGetters.token}`);
      commit('deleteApplication', appId);
    } catch (error) {
      let message = error.response.statusText || error.response.data.error.message;
      throw new Error('Error deleting application from Firebase: ' + message);
    }
  }

};

export default {
  namespaced: true,
  state, getters, actions, mutations
};