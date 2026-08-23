import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

import VueGtag from 'vue-gtag'

const app = createApp(App)
app.use(router)

app.use(VueGtag, {
  config: { id: "G-XXXXXXXXXX" } // Replace with actual GA4 Measurement ID
}, router)

app.mount('#app')
