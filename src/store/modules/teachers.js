import axios from 'axios';

const FIREBASE_DB = 'https://find-course-teacher-default-rtdb.europe-west1.firebasedatabase.app/';

const state = {
  teachers: [],
  teachersLoaded: false,
  areas: [],
  userIsTeacher: false
};

const getters = {
  allTeachers (state) {
    return state.teachers;
  },
  teachersLoaded (state) {
    return state.teachersLoaded;
  },
  allAreas (state) {
    return state.areas;
  },
  userIsTeacher (state) {
    return state.userIsTeacher;
  }

};

const mutations = {
  setTeachers (state, data) {
    state.teachers = data;
  },
  setAreas (state, data) {
    state.areas = data;
  },
  setTeachersLoaded (state) {
    state.teachersLoaded = true;
  },
  setTeachersNotLoaded (state) {
    state.teachersLoaded = false;
  },
  addTeacher (state, newTeacher) {
    state.teachers.push(newTeacher);
  },
  setUserIsTeacher (state) {
    state.userIsTeacher = true;
    localStorage.setItem('userIsTeacher', 'true')
  },
  setUserIsNotTeacher (state) {
    state.userIsTeacher = false;
    localStorage.removeItem('userIsTeacher')
  },
};

const actions = {
  async addTeacher ({ commit, rootGetters }, newTeacher) {
    try {
      await axios.put(`${FIREBASE_DB}/teachers/${rootGetters.userId}.json?auth=${rootGetters.token}`, newTeacher);
    } catch (error) {
      let message = error.response.statusText || error.response.data.error.message;
      throw new Error('Error writing to Firebase: ' + message);
    }
    commit('setUserIsTeacher');
    commit('addTeacher', { ...newTeacher, id: rootGetters.userId });
  },

  async fetchTeachers ({ commit, state, getters,rootGetters }) {
    commit('setTeachersNotLoaded');
    commit('setAreas', []);

    let loadedTeachers = [];
    try {
      const response = await axios.get(`${FIREBASE_DB}/teachers.json`);
      loadedTeachers = Object.keys(response.data)
        .map(key => ({ ...response.data[key], id: key }));
    } catch (error) {
      let message = error.response.statusText || error.response.data.error.message;
      throw new Error('Error fetching teachers from Firebase: ' + message);
    }
    commit('setTeachers', loadedTeachers);
    commit('setTeachersLoaded');

    for (let teacher in loadedTeachers) {
      if (teacher.id === rootGetters.userId) commit('setUserIsTeacher');
    }

    const allAreas = [];
    getters.allTeachers.forEach(teacher => {
      teacher.areas.forEach(area => {
        if (!allAreas.includes(area)) allAreas.push(area);
      });
    });
    commit('setAreas', allAreas);

    state.userIsTeacher = false;
    for (let teacher of state.teachers) {
      if (teacher.id === rootGetters.userId) state.userIsTeacher = true;
    }

  },
  setUserIsTeacher({ commit }) {
    commit('setUserIsTeacher')
  },
  setUserIsNotTeacher({ commit }) {
    commit('setUserIsNotTeacher')
  },
};

export default {
  namespaced: true,
  state, getters, actions, mutations
};