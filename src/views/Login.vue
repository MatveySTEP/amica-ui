<template>
  <form @submit.prevent="submit" class="form-signin">
    <div class="form-floating">
      <input v-model="username" class="form-control" id="floatingInput" placeholder="Name">
      <label for="floatingInput">Your name</label>
    </div>
    <div class="form-floating">
      <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
      <label for="floatingPassword">Password</label>
    </div>
    <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
  </form>
</template>

<script lang="ts">
import axios from "axios"
import {Router} from "vue-router";

export default {
  name: 'Login_one',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  mounted(this: { $router: Router }) {
    const authenticated = localStorage.getItem('token') != null
    if (authenticated) {
      this.$router.push('/home')
    }
  },
  methods: {
    async submit (this: { username: string, password: string, $router: Router }) {
      await axios.post('http://127.0.0.1:8100/v1/api/login', {
        name: this.username,
        password: this.password
      }).then(response => {
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("user", JSON.stringify(response.data.user))
        console.log(localStorage.getItem("user"))
        window.dispatchEvent(new CustomEvent('auth-token-changed', {
          detail: {
            token: localStorage.getItem('token')
          }
        }));

        this.$router.push('/')
      }).catch(error => {
        alert(error)
      })
    }
  }
}

</script>

<style scoped>

</style>
