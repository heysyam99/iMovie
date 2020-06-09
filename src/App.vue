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
import Header from "@/components/Header";

export default {
  components: {
    Header
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
</style>
