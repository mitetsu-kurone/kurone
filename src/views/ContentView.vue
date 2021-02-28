<template>
  <router-view v-slot="{ Component }">
    <transition name="tran-effect" mode="out-in">
      <component class="router-view" :is="Component" />
    </transition>
  </router-view>
</template>

<script>
export default {
  //name: "MixHeader"
};
</script>

<style lang="scss">
.router-view {
  border-radius: 0 0 5px 0;
  //box-shadow: 0 0 5px rgb(187, 114, 187) inset;
  padding: 5px;
}
.tran-effect-enter-active,
.tran-effect-leave-active {
  transition: all 0.3s ease;
}
.tran-effect-enter-from,
.tran-effect-leave-to {
  opacity: 0;
  //transform: translateX(30px);
}
// .tran-effect-move {
//   transition: transform 0.8s ease;
// }
</style>
