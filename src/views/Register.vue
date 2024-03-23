<template>
  <form @submit.prevent="submit" class="form-signin w-100 m-auto">
    <div class="form-floating">
      <input v-model="username" class="form-control" placeholder="Name" required>
      <label for="floatingInput">Your name</label>
    </div>
    <div class="form-floating">
      <input v-model="password" class="form-control" placeholder="Password">
      <label for="floatingPassword">Password</label>
    </div>
    <button class="btn btn-primary w-100 py-2" type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
import axios from "axios"
import {Router} from "vue-router";

export default {
  name: 'Register_one',
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
      await axios.post('http://127.0.0.1:8100/v1/api/register', {
        name: this.username,
        password: this.password
      }).then(response => {
        this.$router.push('/login')
      }).catch(error => {
        alert(error)
      })
    }
  }
}

</script>

<style scoped>

</style>
