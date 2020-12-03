<template>
  <!-- <div class="header">
    header
  </div> -->
  <Header class="outer-header" />
  <div class="outer-content">
    <!-- <div class="side">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      side
    </div> -->
    <Sidebar class="side" />
    <router-view class="inner" />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: "Home",
  components: {
    Header,
    Sidebar
  }
};
</script>

<style lang="scss">
body {
  overscroll-behavior-y: none;
  margin: 0px;
  padding: 0px;
  background: black;
  color: white;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  //color: #2c3e50;
  width: 1280px;
  height: calc(100vh - 20px);
  //border: 1px solid cyan;
  margin: 10px auto;
}

.outer-header {
  border: 1px solid red;
  height: 50px;
}
.outer-content {
  display: flex;
  height: calc(100vh - 70px);
  .side {
    width: 280px;
    border: 1px solid blue;
  }
  .inner {
    width: 1000px;
    border: 1px solid green;
  }
}
</style>
