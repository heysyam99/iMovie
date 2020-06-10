<template>
  <section id="section">
    <div class="container">
      <div class="d-flex">
        <h2>Suggestion</h2>
        <a style="line-height: 40px; margin-left:10px" @click="seeAll('suggestion')">See All</a>
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
              <div
                class="rating"
                v-if="movie.vote_average !== 0"
              >{{ movieRating(movie.vote_average) }}</div>
            </div>
            <a class="poster" @click="posterClick(movie)">
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
        <a style="line-height: 40px; margin-left:10px" @click="seeAll('trending')">See All</a>
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
            <a class="poster" @click="posterClick(trend)">
              <img :src="getPosterURL(trend.poster_path)" />
            </a>
            <a class="name">{{ trend.title }}</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import API from "../../api";

export default {
  data() {
    return {
      movieSuggestion: [],
      tvSuggestion: [],
      trendingSuggestion: [],
      suggestionLoaded: false
    };
  },

  beforeMount() {
    API.get("discover/movie", {
      language: "en-US",
      sort_by: "popularity.desc",
      include_adult: false,
      include_video: false,
      page: 1
    }).then(({ status, data }) => {
      if (status === 200) {
        this.movieSuggestion = data;
        this.suggestionLoaded = true;
      }
    });

    API.get("trending/all/day", {}).then(({ status, data }) => {
      if (status === 200) {
        this.trendingSuggestion = data;
      }
    });
  },

  computed: {
    movieRating() {
      return rating => rating.toFixed(1);
    }
  },

  methods: {
    getPosterURL(path) {
      return `https://image.tmdb.org/t/p/original/${path}`;
    },

    posterClick({ id, media_type }) {
      this.$router.push({
        path: `/${media_type ? media_type : "movie"}/${id}`
      });
    },

    seeAll(type) {
      if (type === "suggestion") {
        this.$router.push({ path: `suggestion` });
      } else {
        this.$router.push({ path: `trending` });
      }
    }
  }
};
</script>
