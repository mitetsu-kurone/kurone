<template>
  <div>
    <h1>Profile</h1>
    <transition name="fade" mode="out-in">
      <div v-if="!glitch" @click="glitch = true" class="profile">
        <div class="photo" />
        <div class="right">
          ID: 美鉄クロネ<br />
          type: glitch<br />
          Alignment: 守序中立
        </div>
      </div>
      <div v-else @click="glitch = false" class="profile">
        <div class="photo glitch" />
        <div class="right glitch">
          ID: ミテツ黒音<br />
          type: glitch bug<br />
          Alignment: 混亂邪惡
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
        特技：<span class="glitch1"></span>改造<br />
        固有能力：<span class="glitch2"></span>雷達<br />
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
    border: 1px solid purple;
    &.glitch {
      border: 1px solid red;
      background-image: url("~@/assets/alter/Scr01889.jpg");
    }
  }
  .right {
    color: cyan;
    width: 280px;
    border: 1px solid purple;
    font-size: 25px;
    &.glitch {
      border: 1px solid red;
      color: red;
    }
  }
}
.detail {
  margin-left: 50px;
  text-align: left;
  width: 60%;
  .content {
    .glitch1 {
      &:before {
        content: "???";
      }
      &:hover:before {
        content: "黑科技";
      }
      &:hover {
        filter: url(#glitchhover);
      }
    }
    .glitch2 {
      &:before {
        content: "???";
      }
      &:hover:before {
        content: "精神衰弱";
      }
      &:hover {
        filter: url(#glitchhover);
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
