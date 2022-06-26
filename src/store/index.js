import { createStore } from 'vuex';

import teachers from './modules/teachers';
import applications from './modules/applications';
import auth from './modules/auth';

const store = createStore({
  modules: { teachers, applications, auth },
});

export default store;