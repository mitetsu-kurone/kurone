<template>
  <div class="kurone-test">
    <h1>This is an about kurone vue3 test2</h1>
    vue3的資料測試實驗區<br />
    testFirst:{{ testFirst }}<br />
    testAll:{{ testAll }}<br />

    暫時紀錄 預定項目等 <br />
    glitch filter來源：https://codepen.io/ktaftaf/pen/pbLOWg 預定項目<br />
    1.glitch new design<br />
    2.tableAdvance another<br />
    3?.出處二次整理後呈現在頁面<br />

    EFFECT<br />
    RGB SHOW(單獨，無法套用)<br />
    MOVE TRICK<br />

    GLITCH AREA<br />
    評估中<br />
    1.TITLE 2.BUTTON 3.ANIMA
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
