<template>
  <h1>Добавить курс</h1>

  <div class="card">
    <div class="card-body">
      <div class="form-group mt-3">
        <label for="name" class="form-label">Название</label>
        <input type="text" v-model="name" name="name" class="form-control">
      </div>
      <div class="form-group mt-3">
        <textarea id="desc" v-model="desc" class="form-control" rows="5" placeholder="Описание"></textarea>
      </div>
      <div class="form-group mt-3">
        <label for="price" class="form-label">Цена</label>
        <input type="number" name="price" v-model="price" class="form-control">
      </div>
      <div class="form-group mt-3">
        <label class="form-label" for="duration">Длительность</label>
        <select class="form-control" v-model="duration" name="duration" id="duration">
          <option value="week">Неделя</option>
          <option value="month">Месяц</option>
          <option value="half_year">Полгода</option>
          <option value="year">Год</option>
        </select>
      </div>
      <div class="form-group mt-3">
        <button class="btn btn-success" v-on:click="createCourse">Создать</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'CreateCoursePage',
  data() {
    return {
      name: "",
      desc: "",
      price: 0,
      duration: "week"
    };
  },
  computed: {
    user() {
      return JSON.parse(localStorage.getItem("user"))
    },
  },
  methods: {
    createCourse() {
      axios.post("http://127.0.0.1:8100/v1/api/courses/create", {
        name: this.name,
        desc: this.desc,
        price: this.price,
        duration: this.duration
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      }).then(res => {
        this.$router.push('/')
      }).catch(err => {
        console.error(err)
        alert(err)
      })
    }
  },
  mounted() {
    if (this.user.role === 'client') {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
