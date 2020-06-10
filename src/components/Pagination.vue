<template>
  <vue-ads-pagination
    :total-items="dataSource.length"
    :max-visible-pages="5"
    :items-per-page="20"
    :page="page"
    :loading="loading"
    @page-change="pageChange"
    @range-change="rangeChange"
  ></vue-ads-pagination>
</template>

<script>
import "@fortawesome/fontawesome-free/css/all.css";
import "vue-ads-pagination/dist/vue-ads-pagination.css";

import VueAdsPagination from "vue-ads-pagination";

export default {
  name: "Pagination",

  components: {
    VueAdsPagination
  },

  props: {
    dataSource: { type: Array, default: () => [] }
  },

  data() {
    return {
      loading: false,
      page: 0
    };
  },

  methods: {
    pageChange(page) {
      this.page = page;
      this.$emit("pageChange", page);
    },

    rangeChange(start, end) {
      this.$emit("rangeChange", start, end);
    }
  }
};
</script>
