<template>
  <section id="section">
    <div class="container">
      <div class="d-flex">
        <h2>Results</h2>
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
                <div
                  class="rating"
                  v-if="movie.vote_average !== 0 || movie.vote_average !== undefined"
                >{{ movieRating(movie.vote_average) }}</div>
              </div>
              <a class="poster" @click="posterClick(movie)">
                <img
                  v-if="movie.poster_path !== null || movie.poster_path !== undefined"
                  :src="getPosterURL(movie.poster_path)"
                />
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
import API from "../../api";

import Pagination from "../components/Pagination";

export default {
  name: "search",
  components: {
    Pagination
  },

  data() {
    return {
      movieSuggestion: [],
      suggestionLoaded: false,
      startRange: 0,
      endRange: 19
    };
  },

  watch: {
    "$route.params.keyword": function(newParam, oldParam) {
      if (newParam !== oldParam) {
        this.search();
      }
    }
  },

  mounted() {
    this.search();
  },

  computed: {
    movieRating() {
      return rating => rating.toFixed(1);
    }
  },

  methods: {
    getPosterURL(path) {
      if (path === undefined || path === null) return;
      return `https://image.tmdb.org/t/p/original/${path}`;
    },

    posterClick({ id, media_type }) {
      this.$router.push({
        path: `/${media_type ? media_type : "movie"}/${id}`
      });
    },

    search() {
      this.suggestionLoaded = false;
      this.movieSuggestion = [];

      API.get("search/multi", {
        query: this.$route.params.keyword,
        language: "en-US",
        include_adult: true,
        page: 1
      }).then(({ status, data }) => {
        if (status === 200) {
          if (data.total_pages === 1) {
            this.movieSuggestion = data.results;
          }

          for (let i = 0; i < data.total_pages - 1; i++) {
            this.fetchMovie(i + 1, results => {
              results.data.results.forEach(result => {
                this.movieSuggestion.push(result);
              });
            });
            if (i === data.total_pages - 2) {
              this.suggestionLoaded = true;
            }
          }
        }
      });
    },

    fetchMovie(currentPage, callback) {
      API.get("search/multi", {
        query: this.$route.params.keyword,
        language: "en-US",
        include_adult: false,
        page: currentPage
      }).then(res => {
        if (res.status === 200) {
          callback(res);
        }
      });
    },

    rangeChanged(start, end) {
      this.startRange = start;
      this.endRange = end - 1;
    }
  }
};
</script>
