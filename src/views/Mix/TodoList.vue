<template>
  <div>
    <!-- <h1>This is TodoList page</h1> -->
    <div v-if="showDataWork">
      mode: {{ mode }},movingIndex: {{ movingIndex }},startPos:{{
        startPos
      }},movingPos:{{ movingPos }},
      <hr />
      {{ todoList }}
      <hr />
    </div>
    <div class="top-button-bar">
      <span class="top-button add" @click="showDataWork = !showDataWork"
        >Data Work</span
      >
      <span class="top-button add" @click="addTable()">Add Table</span>
      <span class="top-button add" @click="addCard()">Add Card</span>
      <span
        class="top-button"
        :class="{ current: mode === 'move' }"
        @click="changeMode('move')"
        >Move Card</span
      >
      <span
        class="top-button"
        :class="{ current: mode === 'movetask' }"
        @click="changeMode('movetask')"
        >Move Task</span
      >
      <span
        class="top-button"
        :class="{ current: mode === 'edit' }"
        @click="changeMode('edit')"
        >Edit mode</span
      >
      <span
        class="top-button"
        :class="{ current: mode === 'work' }"
        @click="changeMode('work')"
        >Work mode</span
      >
      <span
        class="top-button"
        :class="{ current: mode === 'delete' }"
        @click="changeMode('delete')"
        >Delete mode</span
      >
    </div>
    <div class="todolist">
      <div class="table-tab">
        <div v-for="(table, index) in todoList" :key="index">
          <div
            v-if="mode === 'edit'"
            class="table-child delete-btn"
            :class="{ current: nowTable === index }"
          >
            <input type="text" v-model="table.title" />
          </div>
          <div
            v-else-if="mode === 'delete'"
            class="table-child delete-btn"
            :class="{ current: nowTable === index }"
            @click="deleteTable(index)"
          >
            {{ table.title }}
          </div>
          <!-- <div v-else>{{ listContent.name }}</div> -->
          <div
            v-else
            @click="actionSetTable(index)"
            class="table-child"
            :class="{ current: nowTable === index }"
          >
            {{ table.title }}
          </div>
        </div>
      </div>
      <div class="list-outer" ref="listouter">
        <transition-group name="anime-card" tag="div">
          <div
            v-for="(listContent, index) in todoList[nowTable].card"
            :key="'card_' + listContent.id"
          >
            <div
              v-if="mode === 'move'"
              class="list move-mode"
              :ref="'mainlist_' + index"
              draggable="true"
              @touchstart.prevent="event => touchStart(event, index)"
              @touchmove.prevent="touchMove"
              @touchend.prevent="moveEnd"
              @dragstart="event => moveStart(event, index)"
              @drag="newMove"
              @dragend="moveEnd"
              @dragover.prevent
              :style="
                tranPos(index === movingIndex ? movingPos : listContent.pos)
              "
            ></div>
            <div
              v-if="mode === 'move'"
              class="true-list-line"
              :style="
                tranPos(index === movingIndex ? movingPos : listContent.pos)
              "
            ></div>
            <div
              class="true-list-board"
              :class="{ move: mode === 'move' }"
              :style="tranPos(listContent.pos)"
            >
              <div class="card-title">
                <div v-if="mode === 'edit'">
                  <input type="text" v-model="listContent.name" />
                </div>
                <div
                  v-else-if="mode === 'delete'"
                  class="delete-btn"
                  @click="deleteCard(index)"
                >
                  {{ listContent.name }}
                </div>
                <div v-else>{{ listContent.name }}</div>
              </div>
              <div class="card-content" :class="{ fixHeight: mode === 'edit' }">
                <draggable
                  v-if="mode === 'movetask'"
                  v-model="listContent.content"
                  group="listContent"
                  item-key="id"
                >
                  <template #item="{element}">
                    <div class="move-mode">
                      <div :class="element.status">
                        {{ element.text }}
                      </div>
                    </div>
                  </template>
                </draggable>
                <div v-if="mode === 'edit'" class="edit-mode">
                  <transition-group name="anime-card" tag="div">
                    <div
                      v-for="ele in listContent.content"
                      :key="ele.id"
                      :class="ele.status"
                    >
                      <input type="text" v-model="ele.text" />
                    </div>
                  </transition-group>
                </div>
                <div
                  v-if="mode === 'work' || mode === 'move'"
                  class="work-mode"
                >
                  <div
                    v-for="(ele, indexContent) in listContent.content"
                    :key="ele.id"
                  >
                    <div
                      :class="ele.status"
                      @click="switchStatus(index, indexContent)"
                    >
                      {{ ele.text }}
                    </div>
                  </div>
                </div>

                <div v-if="mode === 'delete'" class="delete-mode">
                  <transition-group name="anime-card" tag="div">
                    <div
                      v-for="(ele, indexContent) in listContent.content"
                      :key="ele.id"
                    >
                      <div
                        :class="ele.status"
                        @click="deleteTask(index, indexContent)"
                      >
                        {{ ele.text }}
                      </div>
                    </div>
                  </transition-group>
                </div>
              </div>
              <div
                class="add-task"
                :key="'add-task-' + index"
                v-if="mode === 'edit'"
                @click="addTask(index)"
              >
                Add Task
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { mapActions, mapGetters } from "vuex";
import _ from "lodash";

export default {
  components: {
    draggable
  },
  mounted() {},
  data() {
    return {
      showDataWork: false,
      mode: "move",
      movingIndex: null,
      // nowTable: 0,
      // nextCardIndex: 4,
      // nextTaskIndex: 13,
      // todoList: [
      //   {
      //     title: "testPlugin",
      //     card: [
      //       {
      //         name: "testDrag",
      //         id: 0,
      //         pos: {
      //           top: 24,
      //           left: 208
      //         },
      //         content: [
      //           { text: "vueresize", id: 0, status: "fail" },
      //           { text: "vue3resize", id: 0, status: "none" },
      //           { text: "vue3FullDrag", id: 1, status: "fail" },
      //           { text: "vuedraggable", id: 2, status: "done" }
      //         ]
      //       },
      //       {
      //         name: "testMess",
      //         id: 1,
      //         pos: {
      //           top: 79,
      //           left: 587
      //         },
      //         content: [
      //           { text: "lodash", id: 3, status: "done" },
      //           { text: "vuex", id: 4, status: "done" },
      //           { text: "vuewaypoint", id: 5, status: "none" }
      //         ]
      //       }
      //     ]
      //   },
      //   {
      //     title: "plan",
      //     card: [
      //       {
      //         name: "glitch",
      //         id: 2,
      //         pos: {
      //           top: 240,
      //           left: 96
      //         },
      //         content: [
      //           { text: "filter1", id: 6, status: "done" },
      //           { text: "filter2", id: 7, status: "none" },
      //           { text: "css1", id: 8, status: "fail" },
      //           { text: "css2", id: 9, status: "none" }
      //         ]
      //       },
      //       {
      //         name: "trick",
      //         id: 3,
      //         pos: {
      //           top: 177,
      //           left: 570
      //         },
      //         content: [
      //           { text: "shadowScroll", id: 10, status: "none" },
      //           { text: "rgbDisplay", id: 11, status: "none" },
      //           { text: "moveDisplay", id: 12, status: "none" }
      //         ]
      //       }
      //     ]
      //   }
      // ],
      dragging: false,
      startPos: {
        top: 0,
        left: 0
      },
      movingPos: {
        top: 0,
        left: 0
      }
    };
  },
  computed: {
    ...mapGetters({
      todoList: "getTodoList",
      nowTable: "getNowTable"
    })
  },
  methods: {
    ...mapActions([
      "actionAddTable",
      "actionAddCard",
      "actionAddTask",
      "actionDeleteTable",
      "actionSetTable"
    ]),
    // 能直接更動的就先不弄action
    addTable() {
      this.actionAddTable();
      // const taskCount = this.todoList.length;
      // this.todoList.push({
      //   title: "work" + (taskCount + 1),
      //   card: []
      // });
      // this.nowTable = taskCount;
      // this.addCard();
    },
    addCard() {
      this.actionAddCard();
      // const id = this.nextCardIndex;
      // const cardCount = this.todoList[this.nowTable].card.length;
      // this.todoList[this.nowTable].card.push({
      //   name: "card" + (cardCount + 1),
      //   id,
      //   pos: {
      //     top: 0,
      //     left: 0
      //   },
      //   content: []
      // });
      // this.addTask(cardCount);
      // this.nextCardIndex += 1;
    },
    addTask(index) {
      this.actionAddTask(index);
      // const id = this.nextTaskIndex;
      // const leng = this.todoList[this.nowTable].card[index].content.length + 1;
      // this.todoList[this.nowTable].card[index].content.push({
      //   text: "new task" + leng,
      //   id,
      //   status: "none"
      // });
      // this.nextTaskIndex += 1;
    },
    switchStatus(cardIndex, taskIndex) {
      const statusTran = {
        none: "done",
        done: "fail",
        fail: "none"
      };
      const target = this.todoList[this.nowTable].card[cardIndex].content[
        taskIndex
      ];
      target.status = statusTran[target.status];
    },
    deleteTask(cardIndex, taskIndex) {
      const target = this.todoList[this.nowTable].card[cardIndex];
      // target.content = target.content.filter(
      //   (val, index) => index !== taskIndex
      // );
      target.content.splice(taskIndex, 1);
    },
    deleteCard(cardIndex) {
      const target = this.todoList[this.nowTable];
      //target.card = target.card.filter((val, index) => index !== cardIndex);
      target.card.splice(cardIndex, 1);
    },
    deleteTable(tableIndex) {
      if (this.todoList.length === 1) {
        alert("只剩下一個工作表不可刪除");
        return;
      }
      this.actionDeleteTable(tableIndex);
      // this.todoList.splice(tableIndex, 1);
      // this.nowTable = 0;
    },
    tranPos(source) {
      return {
        top: source.top + "px",
        left: source.left + "px"
      };
    },
    changeMode(mode) {
      this.mode = mode;
    },
    touchStart(event, index = null) {
      this.moveStart(event.touches[0], index);
    },
    touchMove: _.throttle(
      function(event) {
        this.moveList(event.touches[0]);
      },
      150 // time
    ),
    moveStart(event, index = null) {
      if (index !== null) {
        this.movingPos = {
          ...this.todoList[this.nowTable].card[index].pos
        };
        this.movingIndex = index;
      }

      this.dragging = true;
      this.startPos = {
        left: event.clientX,
        top: event.clientY
      };
    },
    newMove: _.throttle(
      function(event) {
        this.moveList(event);
      },
      150 // time
    ),
    moveList(event) {
      if (this.dragging === false) {
        return;
      }
      if (!event.clientX && !event.clientY) {
        return;
      }
      const { listouter } = this.$refs;
      let { clientHeight: outerHeight, clientWidth: outerWidth } = listouter;
      let { clientHeight: innerHeight, clientWidth: innerWidth } = this.$refs[
        "mainlist_" + this.movingIndex
      ];
      const testTop = this.movingPos.top + event.clientY - this.startPos.top;

      if (testTop >= 0 && testTop < outerHeight - innerHeight) {
        this.movingPos.top = testTop;
      }
      if (testTop < 0) {
        this.movingPos.top = 0;
      }
      if (testTop > outerHeight - innerHeight) {
        this.movingPos.top = outerHeight - innerHeight;
      }
      const testLeft = this.movingPos.left + event.clientX - this.startPos.left;
      if (testLeft >= 0 && testLeft < outerWidth - innerWidth) {
        this.movingPos.left = testLeft;
      }
      if (testLeft < 0) {
        this.movingPos.left = 0;
      }
      if (testLeft > outerWidth - innerWidth) {
        this.movingPos.left = outerWidth - innerWidth;
      }
      this.moveStart(event);
    },
    moveEnd() {
      this.todoList[this.nowTable].card[this.movingIndex].pos = {
        top: this.movingPos.top,
        left: this.movingPos.left
      };
      this.dragging = false;
      this.movingIndex = null;
    }
  }
};
</script>

<style lang="scss">
input {
  width: 60%;
  background: none;
  border: 1px dotted purple;
}
.mode-status {
  margin-right: 10px;
  color: #ed9de0;
}
.top-button-bar {
  height: 30px;
  display: flex;
  align-items: center;
  .top-button {
    color: white;
    padding: 2px;
    cursor: pointer;
    border: 1px solid #821a82;
    background: #6a076a;
    margin-right: 3px;
    &:hover {
      border: 1px solid transparent;
      box-shadow: 0px 0px 7px #e39ed5 inset, 0px 0px 4px #eec5e4;
    }
    &.current {
      color: #f7d0ed;
      border: 1px solid #e36dc5;
      background: #a92f86;
    }

    &.add {
      background: #072179;
      border: 1px solid #1e5ea2;
      color: #9ee9e9;
    }
  }
}

.todolist {
  display: flex;
  margin-top: 5px;
  .table-tab {
    background: #2b042b;
    border-left: 1px solid #5f1167;
    border-top: 1px solid #5f1167;
    border-bottom: 1px solid #5f1167;
    width: 15%;
    .table-child {
      transition: box-shadow 0.5s;
      cursor: pointer;
      background: #681968;
      height: 30px;
      line-height: 30px;
      color: #edd6f0;
      box-shadow: 0px 0px 1px #c487b5 inset;
      &.current {
        box-shadow: 0px 0px 4px #eec5e4 inset;
      }
      &.delete-btn {
        color: red;
        cursor: pointer;
      }
    }
    input {
      color: white;
      text-align: center;
    }
  }
  .list-outer {
    background: #1d0721;
    border: 1px solid #5f1167;
    height: 450px;
    width: 80%;
    //margin: 0 auto;
    position: relative;
    .move-mode {
      cursor: move;
    }
    .add-task {
      background: #a7b6ea;
      border: 1px solid #6b9bce;
      color: #1e5ea2;
      width: 70px;
      font-size: 15px;
      height: 18px;
      margin-top: 5px;
      margin-left: 5px;
      padding: 2px;
      text-align: center;
      cursor: pointer;
    }
    .list {
      z-index: 3;
      position: absolute;
      color: blue;
      height: 200px;
      width: 170px;
      border: 0px solid blue;
      &.highlight {
        border: 0px solid red;
      }
    }
    .true-list,
    .true-list-board {
      position: absolute;
      color: purple;
      height: 200px;
      width: 170px;
      //border: 1px solid #b63b97;
      box-shadow: 1px 1px 4px #eec5e4, 1px 1px 3px #7d2a68,
        0px 0px 5px #c255b4 inset;
      background: #dfbeed;
      text-align: left;
      &.move {
        transition: left 0.1s, top 0.1s;
      }
      .card-title {
        background: #cf7cf2;
        border: 1px solid purple;
        box-shadow: 0px 0px 5px purple inset;
        text-align: center;
        text-shadow: 1px 1px 2px purple;
        .delete-btn {
          cursor: pointer;
        }

        input {
          width: 90%;
          text-align: center;
        }
      }
      .card-content {
        height: 177px;
        overflow: auto;
        background: linear-gradient(#dfbeed 30%, rgba(255, 0, 255, 0)),
          linear-gradient(rgba(255, 255, 255, 0), #dfbeed 70%) bottom,
          radial-gradient(at top, #b32ba880, transparent 70%),
          radial-gradient(at bottom, #b32ba880, transparent 70%) bottom;
        background-repeat: no-repeat;
        background-size: 100% 40px, 100% 40px, 100% 14px, 100% 14px;
        background-attachment: local, local, scroll, scroll;
        box-shadow: 0 -5px 5px -5px #b32ba880 inset;

        &.fixHeight {
          height: 145px;
        }
        .work-mode,
        .delete-mode {
          cursor: pointer;
        }
        .delete-mode {
          color: red;
        }
        .work-mode,
        .move-mode,
        .edit-mode,
        .delete-mode {
          font-size: 15px;
          line-height: 24px;
          white-space: nowrap;
          overflow: hidden;
          //box-shadow: 0 0 3px purple;
          .done,
          .fail,
          .none {
            height: 20px;
            padding: 2px 2px;
          }
          .fail {
            box-shadow: 0 0 2px red inset;
            background-color: #e9bdbd88;

            &::before {
              //vertical-align: top;
              color: red;
              font-size: 24px;
              line-height: 0px;
              content: "☒";
            }
          }
          .done {
            box-shadow: 0 0 2px green inset;
            background-color: #bde9c088;
            &::before {
              color: green;
              font-size: 24px;
              line-height: 0px;
              content: "☑";
            }
          }
          .none {
            box-shadow: 0 0 2px blue inset;
            background-color: #c1bde988;
            &::before {
              color: blue;
              font-size: 24px;
              line-height: 0px;
              content: "☐";
            }
          }
        }
      }
    }
    .true-list-line {
      transition: left 0.1s, top 0.1s;
      position: absolute;
      height: 200px;
      width: 170px;
      border: 1px dotted purple;
      box-shadow: 0px 0px 2px #eec5e4;
    }
  }
}
.anime-card-enter-active,
.anime-card-leave-active {
  transition: all 0.5s ease;
}
.anime-card-enter-from,
.anime-card-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.anime-card-move {
  transition: transform 0.4s ease;
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
</style>
