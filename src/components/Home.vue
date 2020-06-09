<template>
   <section id="about">
      <div class="container">
         <div class="d-flex">
            <h2>Suggestion</h2>
            <a style="line-height: 40px; margin-left:10px">See All</a>
         </div>
         <div class="row movie-list">
            <div v-if="!suggestionLoaded" class="spinner-grow" role="status">
               <span class="sr-only">Loading...</span>
            </div>
            <div
               class="col-lg-3 col-md-4 col-sm-6 col-xs1-8 col-xs-12"
               v-for="movie in movieSuggestion.results"
               :key="movie.id"
            >
               <div class="item">
                  <div class="status">
                     <div class="rating" v-if="movie.vote_average !== 0">
                        {{ movieRating(movie.vote_average) }}
                     </div>
                  </div>
                  <a class="poster" @click="posterClick()">
                     <img :src="getPosterURL(movie.poster_path)" />
                  </a>
                  <a class="name">{{ movie.title }}</a>
               </div>
            </div>
         </div>
      </div>
      <div class="container" style="margin-top: 35px">
         <div class="d-flex">
            <h2>Trending</h2>
            <a style="line-height: 40px; margin-left:10px">See All</a>
         </div>
         <div class="row movie-list">
            <div
               class="col-lg-3 col-md-4 col-sm-6 col-xs1-8 col-xs-12"
               v-for="trend in trendingSuggestion.results"
               :key="trend.id"
            >
               <div class="item">
                  <div class="status">
                     <div class="rating">{{ movieRating(trend.vote_average) }}</div>
                  </div>
                  <a href class="poster">
                     <img :src="getPosterURL(trend.poster_path)" />
                  </a>
                  <a href class="name">{{ trend.title }}</a>
               </div>
            </div>
         </div>
      </div>
   </section>
</template>

<script>
import API from '../../api'

export default {
   data() {
      return {
         movieSuggestion: [],
         tvSuggestion: [],
         trendingSuggestion: [],
         suggestionLoaded: false,
      }
   },

   beforeMount() {
      API.get('discover', 'movie', {
         language: 'en-US',
         sort_by: 'popularity.desc',
         include_adult: false,
         include_video: true,
         page: 1,
      }).then(({ status, data }) => {
         if (status === 200) {
            this.movieSuggestion = data
            this.suggestionLoaded = true
         }
      })

      API.get('trending', 'all', {}, 'day').then(({ status, data }) => {
         if (status === 200) {
            this.trendingSuggestion = data
         }
      })
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

      posterClick() {
         this.$router.push({ name: 'movie' })
      },
   },
}
</script>

<style scoped>
a {
   text-decoration: none;
   background-color: transparent;
}

#about {
   background: #fff;
   padding: 5em 0;
}
#about p {
   line-height: 2em;
   font-size: 1.4em;
   margin: 0;
   color: #222;
}

.row {
   margin-left: -10px;
   margin-right: -10px;
}

.movie-list .item {
   position: relative;
   margin: 10px 0;
   width: 200px;
}

.movie-list .item .poster:before {
   transition: top 0.5s ease 0s, left 0.5s ease 0s, right 0.5s ease 0s, bottom 0.5s ease 0s,
      opacity 0.5s ease-out;
   opacity: 0;
   background: rgba(0, 0, 0, 0.3);
   position: absolute;
   top: 0;
   left: 0;
   bottom: 0;
   right: 0;
   content: '';
}

.movie-list .item .poster img {
   width: 100%;
   height: 100%;
}

.movie-list .item .poster {
   -webkit-border-radius: 2.5px;
   -khtml-border-radius: 2.5px;
   -moz-border-radius: 2.5px;
   -ms-border-radius: 2.5px;
   -o-border-radius: 2.5px;
   border-radius: 2.5px;
   overflow: hidden;
   position: relative;
   display: block;
   height: 210px;
}

.movie-list .item .status {
   position: absolute;
   top: 3px;
   right: 3px;
   z-index: 1;
   color: #fff;
   font-weight: 700;
}

.movie-list .item .status .rating {
   background: #00acc1;
   color: #fff;
}

.movie-list .item .status > div {
   font-size: 0.85rem;
   float: left;
   padding: 3px 5px;
   -webkit-border-radius: 2px;
   -khtml-border-radius: 2px;
   -moz-border-radius: 2px;
   -ms-border-radius: 2px;
   -o-border-radius: 2px;
   border-radius: 2px;
}

.movie-list .item .name {
   position: absolute;
   right: 0;
   bottom: 0;
   left: 0;
   padding: 5px;
   color: #fff;
   text-align: center;
   font-weight: 400;
   font-size: 1rem;
}

@media screen and (min-width: 1599px) {
   .movie-list .item .poster {
      height: 240px !important;
   }
}

@media screen and (min-width: 767px) {
   .movie-list .item .poster {
      height: 200px !important;
   }
}

@media screen and (min-width: 700px) {
   .movie-list .item .poster {
      height: 240px !important;
   }
}
</style>
