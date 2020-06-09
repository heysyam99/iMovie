<template>
  <div class="container">
    <div class="row mt-5">
      <div class="w-100">
        <div class="info">
          <div class="row">
            <div class="thumbnail col-md-3">
              <img :src="getPosterURL(movieData.poster_path)" />
            </div>
            <div class="col-md-19 col-lg-8" style="text-align: left">
              <div>
                <h1>{{ movieData.title }}</h1>
              </div>
              <div>
                <span>
                  <span class="rating">Rating :</span>
                  <b style="margin-left: 10px">{{ movieRating(movieData.vote_average) }}</b>
                </span>
                <span style="margin-left: 5px">
                  <i class="fa fas-clock-o"></i>
                  <b style="margin-left: 5px">{{ movieData.runtime + ' min /episode' }}</b>
                </span>
              </div>
              <div>
                <span>
                  <span>Genre :</span>
                  <b
                    style="margin-left: 10px"
                    v-for="genre in movieData.genres.slice(0, 3)"
                    :key="genre.name"
                  >{{ genre.name }}</b>
                </span>
              </div>
              <div>
                <span>
                  <span>Stars :</span>
                  <b
                    style="margin-left: 10px"
                    v-for="star in movieCaster.slice(0, 3)"
                    :key="star.name"
                  >{{ star.name }}</b>
                  <br />
                  <b
                    v-for="(star, idx) in movieCaster.slice(4, 7)"
                    :key="star.name"
                    :style="{ 'margin-left': idx !== 0 && '10px' }"
                  >{{ star.name }}</b>
                </span>
              </div>
              <div>
                <span>
                  <span>Language :</span>
                  <b style="margin-left: 10px">{{ movieData.original_language.toUpperCase() }}</b>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "../../api.js";

export default {
  data() {
    return {
      movieData: [],
      movieCaster: []
    };
  },

  mounted() {
    const { id } = this.$route.params;

    API.get(`movie/${id}`).then(({ status, data }) => {
      if (status === 200) {
        console.log(data);
        this.movieData = data;
      }
    });

    API.get(`movie/${id}/credits`).then(({ status, data: { cast } }) => {
      if (status === 200) {
        this.movieCaster = cast;
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
    }
  }
};
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
  -webkit-border-radius: 3px;
  -khtml-border-radius: 3px;
  -moz-border-radius: 3px;
  -ms-border-radius: 3px;
  -o-border-radius: 3px;
  border-radius: 3px;
}

.thumbnail {
  height: 280px;
  width: 280px;
}

.rating {
  color: #fbb829;
  font-weight: 700;
}
</style>
