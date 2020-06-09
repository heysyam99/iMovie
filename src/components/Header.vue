<template>
   <div>
      <nav>
         <div class="container">
            <ul>
               <li>
                  <a href="#">HOME</a>
               </li>
               <li>
                  <a href="#">TOP</a>
               </li>
               <li>
                  <a href="#">LOL</a>
               </li>
               <li>
                  <a href="#">Item 4</a>
               </li>
               <li>
                  <a href="#">SEARCH</a>
               </li>
            </ul>
         </div>
      </nav>
      <header>
         <div class="container">
            <h1 class="text-center text-white text-uppercase">Theater in your home</h1>
            <h4 class="text-center text-white text-uppercase">Review, Rating</h4>
         </div>
      </header>
   </div>
</template>

<script>
export default {
   name: 'Header',
   props: {
      msg: String,
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

nav li:last-child {
   padding-right: 0;
}

nav a {
   color: #fff;
   text-decoration: none;
   transition: all 0.3s;
}

nav a:hover {
   color: #ddd;
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
   background: radial-gradient(circle, rgba(9, 9, 121, 1) 18%, rgba(2, 0, 36, 1) 95%);
   padding: 10em 0 8em;
   z-index: 2;
}

header h1 {
   font-size: 4em;
}

ul {
   list-style-type: none;
   padding: 0;
}
li {
   display: inline-block;
   margin: 0 10px;
}
a {
   color: #42b983;
}
</style>
