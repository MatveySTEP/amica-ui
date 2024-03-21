<template>
  <form @submit.prevent="submit">
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

export default {
  name: 'Login_one',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async submit (this: { username: string, password: string }) {
      await axios.post('http://127.0.0.1:8100/v1/api/login', {
        name: this.username,
        password: this.password
      }, { withCredentials: true }).then(response => {
        alert('Вы успешно вошли')
        alert(response.data.token)
        localStorage.setItem("token", response.data.token)
      }).catch(error => {
        alert(error)
      })
    }
  }
}

</script>

<style scoped>

</style>
