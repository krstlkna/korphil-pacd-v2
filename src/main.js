/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import axios from 'axios'
import App from './App.vue'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost/pacd-system-api/public/';

// Composables
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Plugins
import { registerPlugins } from '@/plugins'

import '@mdi/font/css/materialdesignicons.css'

const pinia = createPinia()
const app = createApp(App)

registerPlugins(app)

app.use(pinia)
app.mount('#app')
