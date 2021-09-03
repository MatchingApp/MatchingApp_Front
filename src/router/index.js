import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/AddCandidate',
    name: 'AddCandidate',
    component: () => import('../views/AddCandidate/AddCandidate.vue')
  },
  {
    path: '/Search',
    name: 'Search',
    component: () => import('../views/Search/Search.vue')
  },
  {
    path: '/AllCandidates',
    name: 'AllCandidates',
    component: () => import('../views/AllCandidates/AllCandidates.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
