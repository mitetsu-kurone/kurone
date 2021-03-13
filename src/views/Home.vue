<template>
  <div class="home">
    <div class="home-title" @click="animeText('topTitle')">
      {{ topTitle }}
    </div>

    <div class="intro-title" @click="animeText('title')">
      {{ title }}
    </div>
    <div class="intro">
      我是美鉄クロネ(mitetsu kurone)，這裡是VTB，不是VTB<br />
      ...喔抱歉，是Vue Test Backroom,不是Virtual youTuBer<br />
      <br />
      這裡不存在會動又會講話的3D模組，也不會有日文語音和直播，只有象徵性形象頭圖和設定，設定僅供參考，若需通靈請僅用於滿足自我妄想，勿造成他人困擾。<br />
      <!-- 只會整理存放和改造自己有興趣的各種素材，故原則上只會因為我有新的個人慾望想要滿足的時候，才會有新增項目<br /> -->
      特效怎麼做的自己直接整份co回家看研究比較快，原始碼都公開的，也整理過<br />
      注意：存在大量濫用的box-shadow，但我覺得還要更多<br />
      <br />
      轉貼自由只是更新時間未定，不保證下一次什麼時候更新，也不保證哪個新項目預定什麼時候完成<br />
      <!-- 因為不是很重要，想想就不擺在可視首頁了，沒錯，你只有看源碼的時候才會留意到這段話 -->
      <!-- 基本禮貌原則也不用提了，會遵守就會遵守，是引用就說引用，沒什麼大不了的<br />
      抄了又硬說成自創我自然沒辦法阻止你，但commit時間擺在那，被翻到來源的話，我想尷尬的還是你<br /> -->
      所有改造素材基底均取自網路，僅供個人自我滿足的實驗，無營利行為<br />
    </div>
    <div class="log-area">
      <div class="log-title" @click="animeText('logTitle')">
        {{ logTitle }}
      </div>
      <div
        class="log-content"
        v-for="(data, index) in log"
        :key="'log-' + index"
      >
        <div class="date">{{ data.date }}</div>
        <div class="content">
          {{ data.content }}
        </div>
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
      topTitle: "Cogito, ergo sum --1637, René Descartes",
      title: "INTRODUCTION",
      logTitle: "History Note",
      log: [
        {
          date: "2021-3-7",
          content: "randomType, scrollView追加"
        },
        {
          date: "2021-3-1",
          content: "更改VTB簡稱的縮寫"
        },
        {
          date: "2021-2-24",
          content: "mix todolist完成"
        },
        {
          date: "2020-10-26",
          content: "紀錄一個開始的時間"
        }
      ]
    };
  },
  mounted() {
    this.animeText("topTitle");
    this.animeText("title");
    this.animeText("logTitle");
  },
  methods: {
    //jquery.shuffleLetters.js 的改造1
    animeText(val, origin = "", pos = -1) {
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
        vm.animeText(val, source, pos + 1);
      }, 1000 / 25);
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
.home-title {
  font-size: 22px;
  margin-bottom: 30px;
  height: 40px;
  text-shadow: 0 0 3px #f200ff;
  cursor: crosshair;
}
.intro-title {
  color: #e9fafa;
  height: 40px;
  font-size: 27px;
  text-shadow: 0 0 3px cyan;
  cursor: crosshair;
}
.intro {
  width: 70%;
  color: #e9fafa;
  margin: 0 auto;
  padding: 4px;
  box-shadow: 0 0 7px cyan inset;
  margin-bottom: 10px;
}
.log-area {
  width: 70%;
  margin: 0 auto;
  color: #f9c8c8;
  .log-title {
    font-size: 20px;
    height: 30px;
    cursor: crosshair;
  }
  .log-content {
    box-shadow: 0 0 3px red inset;
    display: flex;
    overflow: hidden;
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-all;
    align-items: center;
    .date {
      flex: 0 1 auto;
      width: 140px;
      padding: 3px;
    }
    .content {
      border-left: 1px solid purple;
      width: 150px;
      flex: 1 1 auto;
      padding: 3px;
    }
  }
}
</style>
