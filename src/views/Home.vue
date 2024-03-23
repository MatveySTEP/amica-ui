<template>
  <h1>Привет, {{ user.name }}</h1>
  <h3 v-if="user.role === 'teacher'">Ваши курсы:</h3>
  <h3 v-if="user.role === 'client'">Купленные курсы:</h3>
  <br>
  <div>
    <div class="row">
      <div class="card col-sm mx-2" v-for="course in courses">
        <div class="card-body">
          <div class="card-title"><h5>{{ course.Name }}</h5></div>
          <div class="card-text">{{ course.Desc }}</div>
          <a href="#" class="btn btn-primary mt-3">Перейти</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'HomePage',
  data() {
    return {
      courses: []
    }
  },
  computed: {
    user() {
      return JSON.parse(localStorage.getItem("user"))
    }
  },
  mounted () {
    axios.get("http://127.0.0.1:8100/v1/api/courses", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    }).then(res => {
      this.courses = res.data
    })
    const authenticated = localStorage.getItem('token') != null
    if (!authenticated) {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

</style>
