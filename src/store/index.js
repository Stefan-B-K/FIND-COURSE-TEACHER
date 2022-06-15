import { createStore } from 'vuex';

import teachers from '@/store/modules/teachers';
import applications from '@/store/modules/applications';

const store = createStore({
  modules: { teachers, applications },
  // state() {
  //   return {
  //
  //   }
  // }
});

export default store;