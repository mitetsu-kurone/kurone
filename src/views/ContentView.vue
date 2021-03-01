<template>
  <router-view v-slot="{ Component }">
    <transition name="tran-effect" mode="out-in">
      <component class="router-view" :is="Component" />
    </transition>
  </router-view>
</template>

<script>
export default {
  //name: "ContentView"
};
</script>

<style lang="scss">
.router-view {
  overflow: auto;
  border-radius: 0 0 5px 0;
  padding: 5px;
}
.tran-effect-enter-active,
.tran-effect-leave-active {
  transition: all 0.3s ease;
}
.tran-effect-enter-from,
.tran-effect-leave-to {
  opacity: 0;
}
</style>
