<template>
  <div class="card" v-if="course">
    <div class="card-body">
      <div class="card-title"><h1>{{ toUpperCase(course.Name) }}</h1></div>
      <div class="card-subtitle" style="color: darkgray">
        <p v-if="course.Duration === 'week'">Неделя</p>
        <p v-if="course.Duration === 'month'">Месяц</p>
        <p v-if="course.Duration === 'half_year'">Полгода</p>
        <p v-if="course.Duration === 'year'">Год</p>
      </div>
      <div class="card-text">{{ course.Desc }}</div>
      <br>
      <div class="price">
        <p v-if="!isTeacher && !isPurchased">
          ${{ roundUpToTwoDecimals(course.Price) }}
        </p>
        <p v-else-if="!isTeacher" style="font-size: 24px">
          Вы записаны на этот курс
        </p>
      </div>
      <button v-if="!isTeacher && !isPurchased" class="btn btn-success" v-on:click="purchaseCourse">Купить</button>
    </div>
  </div>
  <div class="card mt-3">
    <div class="card-body">
      <div class="card-title">
        <h4>Отзывы</h4>
      </div>
      <div v-if="feedbacks.length > 0" v-for="feedback in feedbacks" :key="feedback.ID">
        <hr>
        <b style="font-size: 18px">{{ toUpperCase(feedback.Student.name) }}</b>
        <br>
        <p style="display: inline" v-for="_ in feedback.Rating">★</p>
        <p>{{ feedback.Message }}</p>
      </div>
      <div v-else>
        Пока никто не оставил отзывов, будьте первым!
      </div>
      <div v-if="!isTeacher && isPurchased" class="mt-5">
        <div class="form-group">
          <label class="form-label" for="rating">Оценка</label>
          <select class="form-control" name="rating" id="rating" v-model="rating">
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div class="form-group mt-3">
          <textarea v-model="message" class="form-control" name="feedback" id="feedback" cols="30" rows="5" placeholder="Сообщение"></textarea>
        </div>
        <div class="form-group mt-3">
          <button class="btn btn-secondary" :disabled="message.length === 0" v-on:click="leaveFeedback">Оставить отзыв</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {toUpperCase} from "uri-js/dist/esnext/util";

export default {
  name: 'CoursePage',
  data() {
    return {
      course: null,
      isPurchased: false,
      feedbacks: [],
      rating: 5,
      message: ""
    };
  },
  computed: {
    user() {
      return JSON.parse(localStorage.getItem("user"))
    },
    isTeacher() {
      return this.user?.role === 'teacher'
    },
  },
  methods: {
    toUpperCase,
    roundUpToTwoDecimals(number) {
      return Math.round(number * 100) / 100;
    },
    async fetchCourse() {
      const {data} = await axios.get("http://127.0.0.1:8100/v1/api/courses/" + this.$route.params.course, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
      this.course = data;
    },
    async fetchFeedbacks() {
      const {data} = await axios.get("http://localhost:8100/v1/api/feedback/" + this.$route.params.course, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
      this.feedbacks = data;
    },
    async isPurchasedCourse(id) {
      const {data} = await axios.get("http://127.0.0.1:8100/v1/api/courses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
      this.isPurchased = data.some(obj => obj.hasOwnProperty('ID') && obj.ID == id);
    },
    purchaseCourse() {
      axios.post("http://127.0.0.1:8100/v1/api/courses/buy/" + this.course.ID, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      }).then(res => {
        alert("Вы успешно купили курс!!!")
        this.isPurchasedCourse(this.course.ID)
      }).catch(() => {
        alert("пизда")
      })
    },
    leaveFeedback() {
      if (this.message == "") {
        return
      }
      axios.post("http://127.0.0.1:8100/v1/api/feedback/create/" + this.course.ID, {
        rating: this.rating * 1,
        message: this.message
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      }).then(res => {
        this.fetchFeedbacks()
      }).catch(err => {
        if (err.response.status === 409) {
          alert("вы уже оставили отзыв")
        }
      })
    }
  },
  mounted() {
    this.fetchCourse();
    this.isPurchasedCourse(this.$route.params.course);
    this.fetchFeedbacks()
  }
}
</script>

<style scoped>
.price {
  font-size: 50px;
  font-weight: bold;
  color: #26aa00;
  font-family: -apple-system,sans-serif;
}
</style>
