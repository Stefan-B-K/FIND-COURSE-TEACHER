import { createApp, defineAsyncComponent } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

import BaseCard from './components/ui/BaseCard.vue'
import BaseButton from './components/ui/BaseButton.vue'
import BaseBadge from './components/ui/BaseBadge.vue'
import BaseSpinner from './components/ui/BaseSpinner'

const BaseDialog = defineAsyncComponent(() => import('./components/ui/BaseDialog'))

const app = createApp(App)

app
  .use(store)
  .use(router)
  .component('base-card', BaseCard)
  .component('base-button', BaseButton)
  .component('base-badge', BaseBadge)
  .component('base-spinner', BaseSpinner)
  .component('base-dialog', BaseDialog)
  .mount('#app')
