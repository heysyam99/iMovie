import Vue from 'vue'
import VueRouter from 'vue-router'

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
      path: '/:type/:id',
      name: 'movie',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/Movie.vue'),
   },
   {
      path: '/:mode',
      name: 'suggestion',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/Suggestion.vue'),
   },
   {
      path: '/search/keyword/:keyword',
      name: 'search',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue'),
   },
]

const router = new VueRouter({
   routes,
})

export default router
