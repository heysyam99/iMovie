<template>
   <section id="section">
      <div class="container">
         <div class="d-flex">
            <h2>{{ $route.params.mode.charAt(0).toUpperCase() + $route.params.mode.slice(1) }}</h2>
            <Pagination @rangeChange="rangeChanged" :dataSource="movieSuggestion" />
         </div>
         <div class="row movie-list">
            <div v-if="!suggestionLoaded" class="spinner-grow" role="status">
               <span class="sr-only">Loading...</span>
            </div>
            <template v-if="suggestionLoaded">
               <div
                  class="col-lg-3 col-md-4 col-sm-6 col-xs1-8 col-xs-12"
                  v-for="(movie, idx) in movieSuggestion"
                  :key="movie.id"
               >
                  <div class="item" v-if="idx >= startRange && idx <= endRange">
                     <div class="status">
                        <div class="rating" v-if="movie.vote_average !== 0">
                           {{ movieRating(movie.vote_average) }}
                        </div>
                     </div>
                     <a class="poster" @click="posterClick(movie)">
                        <img :src="getPosterURL(movie.poster_path)" />
                     </a>
                     <a class="name">{{ movie.title }}</a>
                  </div>
               </div>
            </template>
         </div>
      </div>
   </section>
</template>

<script>
import API from '../../api'

import Pagination from '../components/Pagination'

export default {
   components: {
      Pagination,
   },

   data() {
      return {
         movieSuggestion: [],
         suggestionLoaded: false,
         startRange: 0,
         endRange: 19,
      }
   },

   watch: {
      $route(to) {
         this.movieSuggestion = []
         this.startRange = 0
         this.endRange = 19
         if (to.path === '/suggestion') {
            this.loadDiscovery()
            return
         }
         this.loadTrending()
      },
   },

   mounted() {
      if (this.$route.params.mode === 'suggestion') {
         this.loadDiscovery()
      } else {
         this.loadTrending()
      }
   },

   computed: {
      movieRating() {
         return (rating) => rating.toFixed(1)
      },
   },

   methods: {
      getPosterURL(path) {
         return `https://image.tmdb.org/t/p/original/${path}`
      },

      posterClick({ id, media_type }) {
         this.$router.push({ path: `/${media_type ? media_type : 'movie'}/${id}` })
      },

      rangeChanged(start, end) {
         this.startRange = start
         this.endRange = end - 1
      },

      loadDiscovery() {
         this.suggestionLoaded = false
         for (let i = 0; i < 20; i++) {
            API.get('discover/movie', {
               language: 'en-US',
               sort_by: 'popularity.desc',
               include_adult: false,
               include_video: false,
               page: i + 1,
            }).then(({ status, data }) => {
               if (status === 200) {
                  data.results.forEach((res) => {
                     this.movieSuggestion.push(res)
                  })
               }

               if (i === 19) {
                  this.suggestionLoaded = true
               }
            })
         }
      },

      loadTrending() {
         this.suggestionLoaded = false
         for (let i = 0; i < 20; i++) {
            API.get('trending/all/day', {
               language: 'en-US',
               sort_by: 'popularity.desc',
               include_adult: false,
               include_video: false,
               page: i + 1,
            }).then(({ status, data }) => {
               if (status === 200) {
                  data.results.forEach((res) => {
                     this.movieSuggestion.push(res)
                  })
               }

               if (i === 19) {
                  this.suggestionLoaded = true
               }
            })
         }
      },
   },
}
</script>
