import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import JobListings from '../views/JobListings.vue'
import JobDetail from '../views/JobDetail.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: JobListings },
  { path: '/jobs/:id', component: JobDetail }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
