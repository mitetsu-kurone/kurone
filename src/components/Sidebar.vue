<template>
  <div class="sidebar">
    <router-link class="router home" to="/">Home</router-link>
    <router-link class="router" to="/profile">Profile</router-link>
    <div class="group">
      <div class="group-title">Mix area</div>
      <router-link class="router" to="/mix/todoList">todoList</router-link>
      <router-link class="router" to="/mix/tableAdvance">
        tableAdvance
      </router-link>
      <router-link class="router" to="/mix/kuroneTest">kuroneTest</router-link>
      <router-link class="router" to="/mix/kuroneTest2">
        kuroneTest2
      </router-link>
    </div>
    <div class="group">
      <div class="group-title">Effect area</div>
      <router-link class="router" to="/effect/fakeTransition">
        fakeTransition
      </router-link>
      <router-link class="router" to="/effect/scrollShadow">
        scrollShadow
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar"
};
</script>

<style scoped lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  cursor: pointer;

  .router {
    height: 35px;
    line-height: 35px;
    text-decoration: none;
    border: 1px solid purple;
    color: cyan;
    background: linear-gradient(to right, purple 0%, #c462c4 100%);
    &.home {
      font-weight: bold;
    }
    &:hover {
      border: 1px solid rgb(9, 0, 128);
      background: radial-gradient(ellipse at center, rgb(128, 0, 0), #e99de9);
    }
  }
  .group {
    display: flex;
    flex-direction: column;
    border: 1px solid blue;
    .group-title {
      color: cyan;
      font-weight: bold;
      background: linear-gradient(to right, #3c033c 0%, #b371b3 100%);
    }
    &:hover {
      border: 1px solid red;
      .group-title {
        background: radial-gradient(ellipse at center, purple, #c462c4);
      }
    }
    .router {
      &:hover {
        border: 1px solid purple;
        background: radial-gradient(ellipse at center, rgb(128, 0, 0), #c462c4);
      }
    }
  }
}
</style>
