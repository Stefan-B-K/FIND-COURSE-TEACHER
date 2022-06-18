import axios from 'axios';

const FIREBASE_DB = 'https://find-course-teacher-default-rtdb.europe-west1.firebasedatabase.app/';

const state = {
  teachers: [],
  teachersLoaded: false,
  areas: [],
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
};

const actions = {
  async addTeacher ({ rootState, rootGetters }, newTeacher) {
    try {
      await axios.put(`${FIREBASE_DB}/teachers/${rootGetters.userId}.json`, newTeacher);
    } catch (error) {
      throw new Error('Error writing to Firebase: ' + error);
    }
    rootState.userIsTeacher = true
  },

  async fetchTeachers ({ commit, rootState, rootGetters }) {
    let loadedTeachers = [];
    try {
      const response = await axios.get(`${FIREBASE_DB}/teachers.json`);
      loadedTeachers = Object.keys(response.data)
        .map(key => ({ ...response.data[key], id: key }));
    } catch (error) {
      throw new Error('Error fetching teachers from Firebase: ' + error);
    }
    commit('setTeachers', loadedTeachers);
    commit('setTeachersLoaded');

    const allAreas = [];
    state.teachers.forEach(teacher => {
      teacher.areas.forEach(area => {
        if (!allAreas.includes(area)) allAreas.push(area);
      });
    });
    commit('setAreas', allAreas);


      for(let teacher of  state.teachers)  {
        if (teacher.id === rootGetters.userId) rootState.userIsTeacher = true
      }

  }
};

export default {
  namespaced: true,
  state, getters, actions, mutations
};