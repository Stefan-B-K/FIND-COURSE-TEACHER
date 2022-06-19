import { createStore } from 'vuex';

import teachers from '@/store/modules/teachers';
import applications from '@/store/modules/applications';
import auth from '@/store/modules/auth';

const store = createStore({
  modules: { teachers, applications, auth },
});

export default store;