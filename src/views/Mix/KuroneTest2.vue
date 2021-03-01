<template>
  <div class="kurone-test">
    <h1>This is an about kurone vue3 test2</h1>
    testFirst:{{ testFirst }}<br />
    testAll:{{ testAll }}<br />
    暫時紀錄 預定項目等 <br />
    glitch filter來源：https://codepen.io/ktaftaf/pen/pbLOWg

    <hr />
    <div @click="plusFunc(1)">+1</div>
    <div @click="plusFunc(9)">+9</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      count: {}
    };
  },
  computed: {
    ...mapGetters(["testFirst", "testAll"])
  },
  methods: {
    ...mapActions(["kuroneSlash"]),
    plusFunc(val) {
      this.kuroneSlash(val);
    }
  }
};
</script>

<style lang="scss">
.kurone-test {
  color: blue;
}
</style>
