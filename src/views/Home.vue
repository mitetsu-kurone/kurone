<template>
  <div class="home">
    <div class="home-title">mitetsu kurone's show area</div>

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
          date: "2020-10-26",
          content: "build project and test push"
        },
        {
          date: "2020-11-22",
          content: "first design and add log page"
        },
        {
          date: "2020-12-03",
          content: "vuex build and update package"
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
