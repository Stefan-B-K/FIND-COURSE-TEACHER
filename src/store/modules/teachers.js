const state = {
  registeredAsTeacher: false,
  teachers: [
    {
      id: 't1',
      firstName: 'Maximilian',
      lastName: 'Schwarzmüller',
      areas: ['backend', 'frontend'],
      description:
        'I\'m Maximilian and I\'ve worked as a freelance web developer for years. Let me help you become a developer as well!',
      hourlyRate: 30,
      available: true
    },
    {
      id: 't2',
      firstName: 'Julie',
      lastName: 'Jones',
      areas: ['frontend', 'career'],
      description:
        'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
      hourlyRate: 30,
      available: true
    },
    {
      id: 't3',
      firstName: 'Madonna',
      lastName: 'Ciccone',
      areas: ['design', 'career'],
      description:
        "I am Madonna and dsigned your life. My name is Dita, I'll be your mistress tonight..",
      hourlyRate: 100,
      available: false
    }
  ]
};

const getters = {
  allTeachers (state) {
    return state.teachers;
  },
  teachersLoaded (state) {
    return state.teachers && state.teachers.length > 0;
  },
  allAreas (state) {
    const allAreas = [];
    state.teachers.forEach(teacher => {
      teacher.areas.forEach(area => {
        if (!allAreas.includes(area)) allAreas.push(area);
      });
    });
    return allAreas
  },
  registeredAsTeacher(state) {
    return state.registeredAsTeacher
  },
  lastId(state) {
    return state.teachers[state.teachers.length - 1].id
  }
};

const mutations = {
  addTeacher(state, newTeacher) {
    state.teachers.push(newTeacher)
  },
  setRegistered(state) {
    state.registeredAsTeacher = true
  }
};

const actions = {
  addTeacher({ commit, getters, rootState }, newTeacher) {
    const newId = 't' + (Number(getters.lastId.slice(1)) + 1)
    commit('addTeacher', {...newTeacher, id: newId })
    commit('setRegistered')
    rootState.userId = newId
  }
};

export default {
  namespaced: true,
  state, getters, actions, mutations
};