import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// eslint-disable-next-line camelcase
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Course from "@/views/Course.vue";
import Courses from "@/views/Courses.vue";
import CreateCourse from "@/views/CreateCourse.vue";

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Home },
  { path: '/courses', component: Courses },
  { path: '/courses/create', component: CreateCourse },
  { path: '/courses/:course', component: Course },
  { path: '/login', component: Login },
  { path: '/register', component: Register }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
