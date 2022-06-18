import { createStore } from 'vuex';

import teachers from '@/store/modules/teachers';
import applications from '@/store/modules/applications';

const store = createStore({
  modules: { teachers, applications },
  state () {
    return {
      userId: 't100',
      userIsTeacher: false
    };
  },
  getters: {
    userId (state) {
      return state.userId;
    },
    userIsTeacher(state) {
      return state.userIsTeacher
    }
  },
});

export default store;