<template>
  <div>
    <div class="random-typer">
      <div class="show-result">
        <div class="border">Show Result</div>
        <div class="home-title">
          {{ example1 }}
        </div>
        <div class="home-title">
          {{ example2 }}
        </div>
      </div>

      <div class="edit-text">
        <div class="border">Edit Text</div>
        <div class="border"><input type="text" v-model="example1" /></div>
        <div class="border"><input type="text" v-model="example2" /></div>
      </div>

      <div
        class="run-panel"
        :class="{ disable: Object.keys(workingList).length > 0 }"
      >
        <div class="button" @click="runAll(12)">FPS 5</div>
        <div class="button" @click="runAll(12)">FPS 12</div>
        <div class="button" @click="runAll(25)">FPS 25</div>
        <div class="button" @click="runAll(50)">FPS 50</div>
        <div class="button" @click="runAll(100)">FPS 100</div>
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
      workingList: {},
      example1: "RANDOM TYPE EXAMPLE",
      example2: "改變文字和速度看特效變化"
    };
  },
  mounted() {
    this.animeText(25, "example1");
    this.animeText(25, "example2");
  },
  methods: {
    //jquery.shuffleLetters.js 的改造1
    runAll(fps) {
      this.animeText(fps, "example1");
      this.animeText(fps, "example2");
    },
    animeText(fps = 25, val, origin = "", pos = -1) {
      if (this.workingList[val] && !origin) {
        return;
      }
      if (pos === -1) {
        this.workingList[val] = true;
      }

      const vm = this;
      const source = origin || this[val].slice(0);
      const test = origin[pos];
      if (origin && !test) {
        this[val] = origin;
        this.workingList[val] = false;
        delete this.workingList[val];
        return;
      }
      if (!origin) {
        this[val] = "";
      } else {
        this[val] = this[val].slice(0, -1);
        this[val] += origin[pos];
      }
      if (origin[pos + 1]) {
        this[val] += this.randomChar(origin[pos + 1]);
      }

      setTimeout(function() {
        vm.animeText(fps, val, source, pos + 1);
      }, 1000 / fps);
    },
    //jquery.shuffleLetters.js 的改造2
    randomChar(ch) {
      let type = null;
      if (ch == " ") {
        type = "space";
      } else if (/[a-z]/.test(ch)) {
        type = "lowerLetter";
      } else if (/[A-Z]/.test(ch)) {
        type = "upperLetter";
      } else {
        type = "symbol";
      }
      var pool = " ";

      if (type == "lowerLetter") {
        pool = "abcdefghijklmnopqrstuvwxyz0123456789";
      } else if (type == "upperLetter") {
        pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      } else if (type == "symbol") {
        pool = ",.?/\\(^)![]{}*&^%$#'\"";
      }

      var arr = pool.split("");
      return arr[Math.floor(Math.random() * arr.length)];
    }
  }
};
</script>
<style scoped lang="scss">
.random-typer {
  margin: 0 auto;
  width: 85%;
  margin-top: 50px;

  .show-result {
    padding: 5px;
    box-shadow: 0 0 3px purple inset;
    height: 100px;
    .border {
      color: #e463f0;
      margin-bottom: 10px;
    }
    .home-title {
      font-size: 22px;
      margin-bottom: 30px;
      height: 0px;
      text-shadow: 0 0 3px #f200ff;
    }
  }
  .edit-text {
    padding: 5px;
    box-shadow: 0 0 3px blue inset;
    margin-top: 15px;
    .border {
      padding-top: 5px;
      color: #6371f0;
      font-size: 22px;
      margin-top: 5px;
      input {
        height: 50px;
        width: 350px;
        font-size: 20px;
        text-align: center;
        border: 1px solid #420080;
        background: #1a1547;
        color: white;
      }
    }
  }
  .run-panel {
    margin-top: 15px;
    padding: 5px;
    height: 55px;
    box-shadow: 0 0 3px green inset;
    display: flex;
    align-items: center;
    justify-content: center;

    .button {
      cursor: pointer;
      background: #76af76;
      border: 1px solid green;
      box-shadow: 0 0 3px green inset;
      width: 90px;
      height: 45px;
      line-height: 45px;
      font-weight: bold;
      text-align: center;
      color: #223d22;
      margin-right: 6px;
      &:hover {
        background: #65ca65;
      }
    }
    &.disable {
      cursor: wait;
      .button {
        background: #537453;
        cursor: wait;
      }
    }
  }
}
</style>
