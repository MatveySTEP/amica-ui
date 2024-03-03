<template>
  <form @submit.prevent="submit">
    <div class="form-floating">
      <input v-model="data.name" class="form-control" placeholder="Name" required>
      <label for="floatingInput">Your name</label>
    </div>
    <div class="form-floating">
      <input v-model="data.password" class="form-control" placeholder="Password">
      <label for="floatingPassword">Password</label>
    </div>
    <button class="btn btn-primary w-100 py-2" type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
import { reactive } from 'vue'

export default {
  name: 'Register_one',
  setup () {
    const data = reactive({
      name: '',
      password: ''
    })
    const submit = async () => {
      await fetch ('http://127.0.0.1:8100/v1/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
    }
    return {
      data,
      submit
    }
  }
}

</script>

<style scoped>

</style>
