<template>
  <div class="kurone-test">
    <h1>This is an about kurone vue3 test</h1>
    all:{{ count }}<br />
    counter kurone: {{ count.kurone }}<br />
    counter default: {{ count.default }}
    <hr />
    <div @click="plusFunc(1)">[plus kurone]</div>
    <div @click="plusFunc(2)">[plus default]</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: {}
    };
  },
  methods: {
    plusFunc(val) {
      if (val === 1) {
        if (this.count.kurone) {
          this.count.kurone += 1;
        } else {
          this.count.kurone = 1;
        }
      } else {
        if (this.count.default) {
          this.count.default += 1;
        } else {
          this.count.default = 1;
        }
      }
    }
  }
};
</script>

<style lang="scss">
.kurone-test {
  color: blue;
}
</style>
