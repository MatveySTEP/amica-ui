import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

 axios.defaults.withCredentials = true // Include cookies in requests

axios.interceptors.response.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app')
