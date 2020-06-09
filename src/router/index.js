import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
   {
      path: '/',
      component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
   },
   {
      path: '/home',
      name: 'Home',
      component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
   },
   {
      path: '/movie/:id',
      name: 'movie',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/Movie.vue'),
   },
]

const router = new VueRouter({
   routes,
})

export default router
