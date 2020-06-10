<template>
   <div id="app">
      <section class="main-layout">
         <header class="main-layout-header">
            <Header />
         </header>
         <main class="main-layout-content">
            <router-view />
         </main>
      </section>
   </div>
</template>

<script>
import Header from '@/components/Header'

export default {
   components: {
      Header,
   },
}
</script>

<style>
#app {
   font-family: Avenir, Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   color: #2c3e50;
}

#nav {
   padding: 30px;
}

#nav a {
   font-weight: bold;
   color: #2c3e50;
}

#nav a.router-link-exact-active {
   color: #42b983;
}

.main-layout {
   display: -webkit-box;
   display: -ms-flexbox;
   display: flex;
   -webkit-box-flex: 1;
   -ms-flex: auto;
   flex: auto;
   -webkit-box-orient: vertical;
   -webkit-box-direction: normal;
   -ms-flex-direction: column;
   flex-direction: column;
   min-height: 0;
   background: #fff;
   height: 100%;
}

.main-layout * {
   -webkit-box-sizing: border-box;
   box-sizing: border-box;
}

.main-layout.main-layout-has-sider {
   -webkit-box-orient: horizontal;
   -webkit-box-direction: normal;
   -ms-flex-direction: row;
   flex-direction: row;
}

.main-layout-sider {
   position: relative;
   min-width: 0;
   -webkit-transition: all 0.2s;
   transition: all 0.2s;
}

.main-layout-header {
   -webkit-box-flex: 0;
   -ms-flex: 0 1 auto;
   flex: 0 1 auto;
}

.main-layout-content {
   min-height: 120px;
   -ms-flex: 1 1 auto;
   flex: 1 1 auto;
}

a {
   text-decoration: none;
   background-color: transparent;
}

#section {
   background: #fff;
   padding: 5em 0;
}
#section p {
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
