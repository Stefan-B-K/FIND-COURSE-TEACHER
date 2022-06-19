const state = {
  userId: 't100',
  userIsTeacher: false
};

const getters = {
  userId (state) {
    return state.userId;
  },
  userIsTeacher (state) {
    return state.userIsTeacher;
  }
};

const mutations = {};

const actions = {};

export default {
  namespaced: false,
  state, getters, actions, mutations
};