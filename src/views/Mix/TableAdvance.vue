<template>
  <div>
    <div v-if="showDataWork" class="data-work">
      {{ todoList }}
    </div>
    <div class="top-button-bar">
      <span class="top-button add" @click="showDataWork = !showDataWork"
        >Data Work</span
      >
    </div>
    <div class="table">
      <div class="table-header">
        <div class="table-item">Index</div>
        <div class="table-item">Title</div>
        <div class="table-item">Card</div>
        <div class="table-item">CardID</div>
        <div class="table-item">TaskID</div>
        <div class="table-item">status</div>
        <div class="table-item large">content</div>
      </div>
      <template v-for="(table, index) in todoList" :key="index">
        <template v-for="card in table.card" :key="card.id">
          <div
            class="table-content"
            v-for="task in card.content"
            :key="task.id"
          >
            <div class="table-item">table{{ index }}</div>
            <div class="table-item">
              <input type="text" v-model="table.title" />
              <!-- {{ table.title }} -->
            </div>
            <div class="table-item">
              <input type="text" v-model="card.name" />
              <!-- {{ card.name }} -->
            </div>
            <div class="table-item">{{ card.id }}</div>
            <div class="table-item">{{ task.id }}</div>
            <div class="table-item">
              <!-- {{ task.status }} -->
              <select class="option" v-model="task.status">
                <option
                  v-for="option in options"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.text }}
                </option>
              </select>
            </div>
            <div class="table-item large">
              <input type="text" v-model="task.text" />
              <!-- {{ task.text }} -->
            </div>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      showDataWork: false,
      options: [
        { text: "none", value: "none" },
        { text: "fail", value: "fail" },
        { text: "done", value: "done" }
      ]
    };
  },
  computed: {
    ...mapGetters({
      todoList: "getTodoList"
    }),
    filteredList() {
      return this.todoList;
    }
  }
};
</script>

<style lang="scss" scoped>
input {
  color: #f8cdfa;
  background: none;
  border: 1px dotted purple;
  width: 80%;
  text-align: center;
  font-size: 18px;
}
.table {
  color: #f8cdfa;
  margin-top: 5px;
  border: 1px solid purple;
  width: 85%;
  .table-item {
    font-size: 18px;
    width: 100px;
    flex: 1 0 auto;
    height: 30px;
    line-height: 30px;
    box-shadow: 0 0 2px rgb(227, 78, 227) inset;
    &.large {
      width: 150px;
    }
    .option {
      background-color: #4a074a;
      color: #f8cdfa;
      font-size: 18px;
    }
  }
  .table-header {
    font-weight: bold;
    display: flex;
  }
  .table-content {
    cursor: crosshair;
    display: flex;
    align-items: center;
    transition: box-shadow 0.3s, background-color 0.3s;
    &:hover {
      box-shadow: 0 0 3px #e4a8e4 inset, 0 0 3px #e4a8e4 inset;
      background-color: #ff00ff33;
    }
  }
}
</style>
