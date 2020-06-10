<template>
   <div>
      <nav>
         <div class="container">
            <ul :class="currentMovie && 'overlay'" class="text-center">
               <li>
                  <router-link to="/home">HOME</router-link>
               </li>
               <li>
                  <router-link to="/suggestion">SUGGESTION</router-link>
               </li>
               <li>
                  <router-link to="/trending">TRENDING</router-link>
               </li>
               <li>
                  <div class="wrap">
                     <div class="search">
                        <input
                           v-on:keyup.enter="search()"
                           type="text"
                           class="searchTerm"
                           placeholder="What are you looking for?"
                           ref="searchTerm"
                        />
                        <button class="searchButton" @click="search()">
                           <i class="fa fa-search"></i>
                        </button>
                     </div>
                  </div>
               </li>
            </ul>
         </div>
      </nav>
      <header
         class="header"
         :style="[
            currentMovie === null || currentMovie === undefined
               ? {
                    background:
                       'radial-gradient(circle, rgba(9, 9, 121, 1) 18%, rgba(2, 0, 36, 1) 95%)',
                 }
               : getBG(),
         ]"
      >
         <div class="container" v-if="currentMovie === null || currentMovie === undefined">
            <h1 v-if="$route.name !== 'search'" class="text-center text-white text-uppercase">
               Theater in your home
            </h1>
            <h2 v-if="$route.name == 'search'" class="text-center text-white text-uppercase">
               {{ 'Searching for ' + $route.params.keyword }}
            </h2>
            <h4
               v-if="!$route.params.mode && $route.name !== 'search'"
               class="text-center text-white "
            >
               Review, Rating, and Rock!!
            </h4>
            <h4 v-if="$route.params.mode === 'suggestion'" class="text-center text-white ">
               We got your back!
            </h4>
            <h4 v-if="$route.params.mode === 'trending'" class="text-center text-white ">
               Trend's anywhere, everywhere.
            </h4>
         </div>
      </header>
   </div>
</template>

<script>
import API from '../../api'

export default {
   name: 'Header',
   data() {
      return {
         currentMode: null,
         currentID: null,
         currentMovie: [],
         currentBg: {},
      }
   },

   watch: {
      $route({ params }) {
         this.currentMode = params?.type ? params.type : null
         this.currentID = params?.id ? params.id : null
         if (!params?.type || params?.keyword) {
            this.currentMovie = null
         }
      },

      currentMode(newValue) {
         API.get(`${newValue}/${this.currentID}`).then(({ status, data }) => {
            if (status === 200) {
               this.currentMovie = data
            }
         })
      },
   },

   methods: {
      getBG() {
         return {
            background: `url(https://image.tmdb.org/t/p/original/${this.currentMovie?.backdrop_path})`,
         }
      },

      search() {
         this.$router.push({ path: `/search/keyword/${this.$refs.searchTerm.value}` })
         this.$refs.searchTerm.value = ''
      },
   },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Montserrat:400);
@import url(http://weloveiconfonts.com/api/?family=fontawesome);
[class*='fontawesome-']:before {
   font-family: 'FontAwesome', sans-serif;
}

* {
   box-sizing: border-box;
}
*:before,
*:after {
   box-sizing: border-box;
}

body {
   background: #222;
   margin: 0;
   font-family: 'Montserrat', sans-serif;
   font-size: 16px;
   color: #fff;
}

.container {
   max-width: 60em;
   min-width: 45em;
   margin: 0 auto;
   padding: 0 2em;
}

nav {
   position: relative;
   width: 100%;
   margin: 0 auto;
   top: 0;
   z-index: 3;
}

nav ul {
   padding: 0;
   margin: 0;
   list-style-type: none;
   float: right;
}

nav li {
   display: inline-block;
   padding: 2em;
   text-align: center;
   transition: all 0.2s;
}

nav a {
   color: #fff;
   text-decoration: none;
   transition: all 0.3s;
}

nav a:hover {
   color: #ddd;
}

.overlay {
   background: rgba(0, 0, 0, 0.6);
}

.overlay > li {
   padding: 1.3em !important;
}

#icon {
   display: inline-block;
   padding-top: 0.7em;
   font-size: 2em;
   font-weight: 700;
   text-transform: uppercase;
}

header {
   position: relative;
   padding: 10em 0 8em;
   z-index: 2;
}

header h1 {
   font-size: 4em;
}

ul {
   list-style-type: none;
   padding: 0;
   width: 100%;
}

li {
   display: inline-block;
   margin: 0 10px;
}

a {
   color: #42b983;
}

.search {
   width: 100%;
   position: relative;
   display: flex;
}

.searchTerm {
   width: 100%;
   border: 3px solid #00b4cc;
   border-right: none;
   padding: 5px;
   height: 36px;
   border-radius: 5px 0 0 5px;
   outline: none;
   color: #9dbfaf;
}

.searchTerm:focus {
   color: #32acc1;
}

.searchButton {
   width: 40px;
   height: 36px;
   border: 1px solid #32acc1;
   background: #32acc1;
   text-align: center;
   color: #fff;
   border-radius: 0 5px 5px 0;
   cursor: pointer;
   font-size: 20px;
}
</style>
