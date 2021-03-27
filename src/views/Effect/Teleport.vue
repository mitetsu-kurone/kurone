<template>
  <div>
    <div class="text-info">
      <div class="border">Trigger Click</div>
      Teleport to here :傳送到按鈕下面<br />
      Teleport Mask :傳送到body，並遮罩特效<br />
    </div>
    <div class="top-button-bar">
      <span
        class="teleport-target top-button add"
        @click="teleportBody2 = !teleportBody2"
        >Teleport to here</span
      >
      <span class="top-button add" @click="teleportBody = true"
        >Teleport Mask</span
      >
    </div>
    <div class="text-info">
      <div class="border">Hover Hint</div>
      ※以下演示用純teleport來實現hover在ⓘ位置的時候，顯示對應位置的hint<br />
      ※手機版有效果(但手機的hover必須直接點)，故pc板會比較有感覺<br />
      ※注意這裡沒有解決所有適應問題，只解決了部分我感興趣的問題<br />
    </div>
    <div class="demo line1">
      <div class="info">
        ⓘ
        <div class="hint hint1"></div>
      </div>

      teleport test line1
    </div>
    <div class="demo line2">
      <div class="info">
        ⓘ
        <div class="hint hint2"></div>
      </div>
      teleport test line2
    </div>
    <div class="demo line3">
      <div class="info">
        ⓘ
        <div class="hint hint3"></div>
      </div>
      teleport test line3
    </div>
    <div class="demo line4">
      <div class="info">
        ⓘ
        <div class="hint hint4"></div>
      </div>
      teleport test line4
    </div>
    <TeleHint :target="'.hint1'" :content="'Let show the amazing hint 1'" />
    <TeleHint :target="'.hint2'" :content="'transition ths hint 2'" />
    <TeleHint :target="'.hint3'" :content="'just ths same effect hint 3'" />
    <TeleHint :target="'.hint4'" :content="'final the hint 4'" />
    <transition name="fade">
      <div v-if="teleportBody2">
        <TeleHint
          :innerStyle="{ top: '43px', left: '55px' }"
          :target="'.teleport-target'"
          :content="'the content of teleport here'"
        />
      </div>
    </transition>
    <div class="teleport">
      <teleport to="body">
        <transition name="fade">
          <div class="teleport-mask" v-if="teleportBody">
            <div class="teleport-content" @click="teleportBody = false">
              WARNING! click here to unlock!
            </div>
          </div>
        </transition>
      </teleport>
    </div>
  </div>
</template>

<script>
import TeleHint from "@/components/TeleHint.vue";
export default {
  components: {
    TeleHint
  },
  data() {
    return {
      teleportBody: false,
      teleportBody2: false
    };
  }
};
</script>

<style lang="scss" scoped>
.text-info {
  .border {
    text-align: center;
    color: #e463f0;
    margin-bottom: 10px;
    font-size: 22px;
  }
  box-shadow: 0 0 6px purple inset;
  padding: 5px;
  color: #b884b8;
  text-align: left;
  margin: 5px 0;
}
.demo {
  display: flex;
  position: relative;
  border: 1px solid purple;
  background: black;
  margin-bottom: 35px;
  height: 50px;
  line-height: 50px;
  .info {
    position: relative;
    margin: 0 10px;
    color: #df7cdf;
    cursor: help;
    .hint {
      position: relative;
      opacity: 0;
      z-index: 3;
      transition: opacity 0.5s;
    }
    &:hover {
      .hint {
        opacity: 1;
      }
    }
  }
  &.line1:hover {
    .line1a {
      display: block;
    }
  }
  .line1a {
    position: relative;
    display: none;
  }
}
.teleport-target {
  position: relative;
}
.teleport-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #ff000026;
}
.teleport-content {
  position: absolute;
  top: 30%;
  transform: translate(0, -50%);
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-shadow: 0 0 5px red;
  cursor: pointer;
  text-align: center;
  background: purple;
  box-shadow: 0 0 30px #ab2c2c inset, 0 0 30px #ab2c2c;
  border-radius: 8px;
}
@media (max-width: 600px) {
  .teleport-content {
    top: 50%;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
