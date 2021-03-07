<template>
  <div :class="{ glitchstyle: glitch }">
    <div class="profile-card main-border">
      <div class="title main">Profile Card</div>
      <transition name="fade" mode="out-in">
        <div v-if="!glitch" @click="glitch = true" class="profile">
          <div class="photo" />
          <div class="right main-border">
            ID: 美鉄クロネ<br />
            type: glitch<br />
            Faction: 守序中立
          </div>
        </div>
        <div v-else @click="glitch = false" class="profile">
          <div class="photo glitch" />
          <div class="right main-border glitch">
            ID: ミテツ黒音<br />
            type: glitch bug<br />
            Faction: 混亂邪惡
          </div>
        </div>
      </transition>
      <transition name="fade" mode="out-in">
        <div v-if="!glitch" class="detail main-border">
          <div class="title">Detail info</div>
          <div class="content">
            身高：147cm<br />
            體重：43kg<br />
            特技：強化改造<br />
            階級：Anti-Ruler<br />
          </div>
          <div class="title">固有能力</div>
          <div class="content">
            不協和感知：A++<br />
            心眼(偽)：EX<br />
            對精神力：A+<br />
            幸運：C-<br />
            真理信念加護：A<br />
          </div>
        </div>
        <div v-else class="detail main-border">
          <div class="title">Detail info</div>
          <div class="content">
            身高：147-23i cm<br />
            體重：-43+43i kg<br />
            特技：<span class="glitch1"></span><br />
            階級：Berserker<br />
          </div>
          <div class="title">固有能力</div>
          <div class="content">
            <span class="glitch2"></span>感知：EX++<br />
            心眼(偽)：B<br />
            對精神力：C-<br />
            幸運：F-<br />
            SILENT MAGIC：E--~EX++<br />
          </div>
        </div>
      </transition>
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
.glitchstyle {
  .profile-card {
    &.main-border,
    .main-border {
      box-shadow: 0 0 20px #cc3447 inset, 3px 3px 15px #711f71;
    }
    .title {
      color: black;
      font-weight: bold;
      text-shadow: 0 0 3px #cc3447, 0 0 3px #cc3447, 0 0 6px #cc3447;
    }
  }
  .profile {
    .photo {
      box-shadow: 0 0 35px #cc3447 inset, 3px 3px 15px #711f71;
      // background-image: url("~@/assets/alter/Scr01889.jpg");
    }
    .right {
      color: #cc3447;
      text-shadow: 2px 2px 4px #c10000;
    }
  }
  .detail {
    color: #a77575;
  }
}
.profile-card {
  user-select: none;
  cursor: crosshair;
  transition: color 0.5s ease 0.5s, box-shadow 0.5s ease 0.5s,
    text-shadow 0.5s ease 0.5s;
  &.main-border,
  .main-border {
    box-shadow: 0 0 20px #c571c5 inset, 3px 3px 15px #823b44;
  }
  margin: 50px 0 0 50px;
  width: 410px;
  padding: 30px;
  height: 620px;
  .title {
    color: black;
    font-weight: bold;
    text-shadow: 0 0 3px #c571c5, 0 0 3px #c571c5, 0 0 6px #c571c5;
    &.main {
      transition: text-shadow 0.5s ease 0.5s;
      font-size: 35px;
      padding: 15px 0 22px 0;
    }
  }
}
.profile {
  display: flex;
  flex-wrap: wrap;

  .photo {
    transition: color 0.5s ease 0.5s, box-shadow 0.5s ease 0.5s,
      text-shadow 0.5s ease 0.5s;
    background-image: url("~@/assets/alter/Scr01891.jpg");
    background-size: contain;
    width: 120px;
    height: 120px;
    flex: 0 0 auto;
    box-shadow: 0 0 25px #9d18dc inset, 3px 3px 15px #823b44;
    &.glitch {
      background-image: url("~@/assets/alter/Scr01889.jpg");
    }
  }
  .right {
    transition: color 0.5s ease 0.5s, box-shadow 0.5s ease 0.5s,
      text-shadow 0.5s ease 0.5s;
    color: #c479e2;
    text-shadow: 2px 2px 4px #c10000;
    width: 280px;
    flex: 1 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 23px;
  }
}
.detail {
  transition: color 0.5s ease 0.5s, box-shadow 0.5s ease 0.5s,
    text-shadow 0.5s ease 0.5s;
  color: #bd92ce;
  text-shadow: 2px 2px 4px #ff2945;
  margin-top: 15px;
  text-align: left;
  padding: 10px;
  .title {
    transition: text-shadow 0.5s ease 0.5s;
    padding: 5px 5px 5px 12px;
    font-size: 25px;
  }
  .content {
    box-shadow: 0 0 17px #4c4a40;
    padding: 7px;
    .glitch1 {
      &:before {
        content: "？？？？";
      }
      &:hover:before {
        content: "精神污染";
      }
      &:hover {
        filter: url(#glitchhover);
      }
    }
    .glitch2 {
      &:before {
        content: "？？？？？？";
      }
      &:hover:before {
        content: "精神崩壞死線";
      }
      &:hover {
        filter: url(#glitchhover);
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: color 0.5s ease 0.5s, box-shadow 0.5s ease 0.5s,
    text-shadow 0.5s ease 0.5s, opacity 0.5s;
  // transition: opacity 0.5s;
  filter: url(#glitchextra);
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
@media (max-width: 600px) {
  .profile-card {
    width: 80%;
    height: auto;
    margin: 5px auto;
  }
  .profile {
    .right {
      width: auto;
    }
  }
}
</style>
