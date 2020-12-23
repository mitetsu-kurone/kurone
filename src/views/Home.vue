<template>
  <div class="home">
    <div class="home-title">mitetsu kurone's show area</div>

    <div class="intro">
      ＩＮＴＲＯＤＵＣＴＩＯＮ<br />
      我是美鉄クロネ，這裏是VTB，不是VTB<br />
      ...喔抱歉，是Vue Test Board,不是Virtual TuBer<br />
      <br />
      這裡不存在會動又會講話的3D模組，也不會有日文語音，只有象徵性頭圖和設定<br />
      只會整理存放和改造自己有興趣的各種素材<br />
      特效怎麼做的自己直接整份co回家看研究比較快，原始碼都公開的<br />
      所有特效素材均取自網路，無營利行為<br />
    </div>
    <div class="log-area">
      <div class="log-title">
        update history
      </div>
      <div
        class="log-content"
        v-for="(data, index) in log"
        :key="'log-' + index"
      >
        <div class="date">{{ data.date }}</div>
        <div class="content">{{ data.content }}</div>
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
      log: [
        {
          date: "2020-12-03",
          content: "vuex build and update package"
        },
        {
          date: "2020-11-22",
          content: "first design and add log page"
        },
        {
          date: "2020-10-26",
          content: "build project and test push"
        }
      ]
    };
  }
};
</script>
<style scoped lang="scss">
.home-title {
  font-size: 22px;
  margin-bottom: 30px;
}
.intro {
  width: 70%;
  margin: 0 auto;
  border: 1px solid cyan;
  margin-bottom: 10px;
}
.log-area {
  width: 70%;
  margin: 0 auto;
  .log-title {
    border: 1px solid red;
  }
  .log-content {
    border: 1px solid red;
    display: flex;
    .date {
      border: 1px solid purple;
      width: 200px;
    }
    .content {
      flex: 1 0 auto;
      border: 1px solid purple;
    }
  }
}
</style>
