<template>
  <template v-if="mounted">
    <teleport :to="target">
      <div class="hint" :style="innerStyle">
        <span class="triangle" />
        <div class="content">
          {{ content }}
        </div>
      </div>
    </teleport>
  </template>
</template>

<script>
export default {
  mounted() {
    // 載入前就渲染出來會失敗
    this.mounted = true;
  },
  props: {
    target: {
      type: String,
      default: "body"
    },
    content: {
      type: String,
      default: "cat123"
    },
    innerStyle: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      mounted: false
    };
  }
};
</script>

<style lang="scss" scoped>
.hint {
  .triangle {
    position: absolute;
    width: 0px;
    height: 0px;
    line-height: 0px; /*为了防止ie下出现题型*/
    border-bottom: 7px solid #dea4f7;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    left: 3px;
    top: -7px;
  }
  position: absolute;
  pointer-events: none;
  top: 0;
  left: 0;
  min-width: 100px;
  padding: 0 10px;
  white-space: nowrap;
  height: 50px;
  line-height: 50px;
  border: 1px solid purple;
  background: #dea4f7;
  color: purple;
  z-index: 5;
}

@media (max-width: 600px) {
  .teleport-content {
    top: 50%;
  }
}
</style>
