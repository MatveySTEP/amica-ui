<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
  <div class="container-fluid">
    <router-link to="/" class="navbar-brand">Home</router-link>
    <div>
      <ul class="navbar-nav me-auto mb-2 mb-md-0">
        <li v-if="!this.authenticated && !this.authenticated2" class="nav-item">
          <router-link to="/login" class="nav-link">Войти</router-link>
        </li>
        <li v-if="!this.authenticated && !this.authenticated2" class="nav-item">
          <router-link to="/register" class="nav-link">Зарегистрироваться</router-link>
        </li>
        <li v-if="this.authenticated || this.authenticated2">
          <button class="btn btn-secondary" v-on:click="logout">Выйти</button>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
import {computed, ref, watch} from "vue";
import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Nav',
  data() {
    return {
      authenticated2: false
    }
  },
  computed: {
    authenticated: () => {
      return localStorage.getItem('token') != null;
    }
  },
  mounted() {
    window.addEventListener('auth-token-changed', (event) => {
      this.authenticated2 = event.detail.token != null;
    });
  },
  methods: {
    logout() {
      localStorage.removeItem("token")
      window.dispatchEvent(new CustomEvent('auth-token-changed', {
        detail: {
          token: null
        }
      }));

      this.$router.push('/login')
    }
  }
}
</script>
