<template>
  <h1>Привет, {{ user.name }}</h1>
  <div v-if="user.role === 'teacher'">
    <router-link to="/courses/create" class="btn btn-success">Добавить курс</router-link>
    <br>
    <br>
    <h3 class="mt-4">Ваши курсы:</h3>
  </div>
  <div v-else>
    <router-link to="/courses" class="btn btn-primary">Все курсы</router-link>
    <br>
    <br>
    <h3 class="mt-4" v-if="user.role === 'client'">Купленные курсы:</h3>
  </div>
  <br>
  <div>
    <div class="row">
      <div class="card" style="width: 18rem" v-for="course in courses">
        <div class="card-body">
          <div class="card-title"><h3>{{ toUpperCase(course.Name) }}</h3></div>
          <div class="card-text">{{ strLimit(course.Desc, 100) }}</div>
          <router-link :to="'/courses/' + course.ID" class="btn btn-secondary my-2">Перейти</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {toUpperCase} from "uri-js/dist/esnext/util";

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
  },
  methods: {
    toUpperCase,
    strLimit(value, limit) {
      if (!value) return '';
      if (value.length <= limit) return value;
      return value.substring(0, limit) + '...';
    },
  }
}
</script>

<style scoped>

</style>
