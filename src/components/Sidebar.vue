<template>
  <div class="sidebar">
    <router-link class="router home" to="/">Home</router-link>
    <router-link
      class="router"
      :class="{ current: $route.name === 'profile' }"
      to="/profile"
      >Profile</router-link
    >
    <div class="group">
      <div class="group-title">Mix Trick</div>
      <router-link
        class="router"
        :class="{ current: $route.name === 'todoList' }"
        to="/mix/todoList"
        >todoList</router-link
      >
      <router-link
        class="router"
        :class="{ current: $route.name === 'tableAdvance' }"
        to="/mix/tableAdvance"
      >
        tableAdvance
      </router-link>
      <!-- <router-link class="router" to="/mix/kuroneTest">kuroneTest</router-link>
      <router-link class="router" to="/mix/kuroneTest2">
        kuroneTest2
      </router-link> -->
    </div>
    <div class="group">
      <div class="group-title">Effect Trick</div>
      <router-link
        class="router"
        :class="{ current: $route.name === 'randomTyper' }"
        to="/effect/randomTyper"
      >
        randomTyper
      </router-link>
      <router-link
        class="router"
        :class="{ current: $route.name === 'scrollShadow' }"
        to="/effect/scrollShadow"
      >
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
  filter: url(#glitchonce);
  .router {
    height: 35px;
    line-height: 35px;
    text-decoration: none;
    box-shadow: 0 0 2px #8a7a8a inset;
    // 顏色吃到內建的 沒事不要直接用router-link
    color: white;
    text-shadow: 0 0 8px #0400ff;

    background: linear-gradient(to right, purple 0%, #170f17 100%);
    &.home {
      font-weight: bold;
    }
    &.current {
      box-shadow: 0 0 5px cyan inset;
    }
    &:hover {
      box-shadow: 0 0 5px purple inset;
      text-shadow: 0 0 8px red;
      filter: url(#glitchhover);
      color: #5f155f;
      background: radial-gradient(ellipse at center, #dab3b3, #e99de9);
    }
  }
  .group {
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 2px #9500ff inset;
    // border: 1px solid blue;
    .group-title {
      color: #a997a9;
      text-shadow: 1px 1px 3px purple;
      font-weight: bold;
      box-shadow: 0 0 2px #fcc7fc inset;
      // background: linear-gradient(to right, #3c033c 0%, #b371b3 100%);
    }
    &:hover {
      box-shadow: 0 0 2px red inset;
      .group-title {
        filter: url(#glitchhover);
      }
      // .group-title {
      //   color: #ffc4ee;
      //   background: radial-gradient(ellipse at center, purple, #c462c4);
      // }
    }
    .router {
      &.current {
        box-shadow: 0 0 5px cyan inset;
      }
      &:hover {
        box-shadow: none;
        filter: url(#glitchhover);
        color: #5f155f;
        background: radial-gradient(ellipse at center, #dab3b3, #e99de9);
      }
    }
  }
}
@media (max-width: 600px) {
  .sidebar {
    cursor: default;
  }
}
</style>
