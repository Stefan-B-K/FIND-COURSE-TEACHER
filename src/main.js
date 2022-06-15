import { createApp } from 'vue';

import App from '@/App';
import router from '@/router';
import store from '@/store';

import BaseCard from '@/components/ui/BaseCard';
import BaseButton from '@/components/ui/BaseButton';
import BaseBadge from '@/components/ui/BaseBadge';

const app = createApp(App);

app
  .use(router)
  .use(store)
  .component('base-card', BaseCard)
  .component('base-button', BaseButton)
  .component('base-badge', BaseBadge)
  .mount('#app');
