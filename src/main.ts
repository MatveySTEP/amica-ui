import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.withCredentials = true // Include cookies in requests

axios.interceptors.response.use(
  response => {
    // Check if the response contains a 'Set-Cookie' header and handle the cookie as needed
    const cookie = response.headers['set-cookie']
    if (cookie) {
      // Handle the cookie here (e.g., save it in localStorage)
      console.log('Received cookie:', cookie)
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app')
