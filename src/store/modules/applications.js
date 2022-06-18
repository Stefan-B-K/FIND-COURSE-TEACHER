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
        .post(`${FIREBASE_DB}/requests/${data.teacherId}.json`, newApplication);
    } catch (error) {
      throw new Error('Error writing to Firebase: ' + error);
    }
  },

  async fetchApplications ({ commit, rootGetters }) {
    let loadedApps = [];
    try {
      const response = await axios
        .get(`${FIREBASE_DB}/requests/${rootGetters.userId}.json`);
      if (response.data) {
        loadedApps = Object.keys(response.data)
          .map(key => ({ ...response.data[key], id: key }));
      }
    } catch (error) {
      throw new Error('Error fetching applications from Firebase: ' + error);
    }
    commit('setApplications', loadedApps);
    commit('setApplicationsLoaded');
  },

  async deleteApplication ({ commit, rootGetters }, appId) {

    try {
      await axios
        .delete(`${FIREBASE_DB}/requests/${rootGetters.userId}/${appId}.json`);
      commit('deleteApplication', appId);
    } catch (error) {
      throw new Error('Error deleting application from Firebase: ' + error);
    }
  }

};

export default {
  namespaced: true,
  state, getters, actions, mutations
};