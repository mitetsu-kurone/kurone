<template>
  <div>
    <h1>This is Profile page</h1>
    <transition name="fade" mode="out-in">
      <div v-if="!glitch" @click="glitch = true" class="profile">
        <div class="photo" />
        <div class="right">
          name: 美鉄クロネ<br />
          type: unknown<br />
          side: 守序正義
        </div>
      </div>
      <div v-else @click="glitch = false" class="profile">
        <div class="photo glitch" />
        <div class="right glitch">
          name: ミテツ黒音<br />
          type: glitch bug<br />
          side: 混亂邪惡
        </div>
      </div>
    </transition>
    <div v-if="!glitch" class="detail">
      <div class="title">Other Detail</div>
      <hr />
      <div class="content">
        身高：147cm<br />
        體重：43kg<br />
        特技：強化改造<br />
        固有能力：不協調雷達<br />
      </div>
    </div>
    <div v-else class="detail">
      <div class="title">Other Detail</div>
      <hr />
      <div class="content">
        身高：147-23i cm<br />
        體重：-43+43i kg<br />
        特技：???改造<br />
        固有能力：???雷達<br />
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      glitch: false
    };
  }
};
</script>
<style scoped lang="scss">
.profile {
  margin-left: 50px;
  display: flex;

  .photo {
    background-image: url("~@/assets/alter/Scr01891.jpg");
    background-size: contain;
    width: 120px;
    height: 120px;
    border: 1px solid red;
    &.glitch {
      background-image: url("~@/assets/alter/Scr01889.jpg");
    }
  }
  .right {
    color: cyan;
    width: 280px;
    border: 1px solid red;
    font-size: 25px;
    &.glitch {
      color: red;
    }
  }
}
.detail {
  margin-left: 50px;
  text-align: left;
  width: 60%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
