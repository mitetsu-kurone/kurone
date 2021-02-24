<template>
  <div>
    <h1>This is TodoList page</h1>
    <div v-if="showDataWork">
      {{ startPos }}{{ listStyleOrigin }} {{ listStyleEnd }}
      <hr />
      movingIndex: {{ movingIndex }} mode: {{ mode }}
      {{ todoList }}
      <hr />
    </div>
    <!-- <span class="mode-status">Status: {{ mode }} Mode</span> -->
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
            @click="nowTable = index"
            class="table-child"
            :class="{ current: nowTable === index }"
          >
            {{ table.title }}
          </div>
        </div>
      </div>
      <div class="list-outer" ref="listouter">
        <template
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
            @dragStart="event => moveStart(event, index)"
            @drag="newMove"
            @dragEnd="moveEnd"
            @dragover.prevent
            :style="
              tranPos(index === movingIndex ? listStyleOrigin : listContent.pos)
            "
          ></div>
          <div
            v-if="mode === 'move'"
            class="true-list-line"
            :style="
              tranPos(index === movingIndex ? listStyleOrigin : listContent.pos)
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
                    v-for="(ele, indexContent) in listContent.content"
                    :key="indexContent"
                    :class="ele.status"
                  >
                    <input type="text" v-model="ele.text" />
                  </div>
                  <!-- <div
                    class="add-task"
                    :key="'add-task-' + index"
                    @click="addTask(index)"
                  >
                    Add Task
                  </div> -->
                </transition-group>
              </div>
              <div v-if="mode === 'work' || mode === 'move'" class="work-mode">
                <div
                  v-for="(ele, indexContent) in listContent.content"
                  :key="indexContent"
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
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
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
      nowTable: 0,
      nextCardIndex: 4,
      nextTaskIndex: 12,
      todoList: [
        {
          title: "work1",
          card: [
            {
              name: "card1",
              id: 0,
              pos: {
                top: 24,
                left: 208
              },
              content: [
                { text: "taska1", id: 0, status: "none" },
                { text: "taska2", id: 1, status: "fail" },
                { text: "taska3", id: 2, status: "done" }
              ]
            },
            {
              name: "card2",
              id: 1,
              pos: {
                top: 79,
                left: 587
              },
              content: [
                { text: "taskb1", id: 3, status: "done" },
                { text: "taskb2", id: 4, status: "fail" },
                { text: "taskb3", id: 5, status: "none" }
              ]
            }
          ]
        },
        {
          title: "work2",
          card: [
            {
              name: "card99",
              id: 2,
              pos: {
                top: 240,
                left: 96
              },
              content: [
                { text: "task91", id: 6, status: "none" },
                { text: "task02", id: 7, status: "none" },
                { text: "task993", id: 8, status: "fail" }
              ]
            },
            {
              name: "card992",
              id: 3,
              pos: {
                top: 177,
                left: 570
              },
              content: [
                { text: "taskb01", id: 9, status: "done" },
                { text: "taskb02", id: 10, status: "done" },
                { text: "task9b3", id: 11, status: "done" }
              ]
            }
          ]
        }
      ],
      dragging: false,
      listStyleOrigin2: {
        top: 60,
        left: 60
      },
      startPos: {
        top: 0,
        left: 0
      },
      listStyleOrigin: {
        top: 0,
        left: 0
      },
      listStyleEnd: {
        top: 0,
        left: 0
      }
    };
  },
  computed: {
    //...mapGetters(["testFirst", "testAll"])
  },
  methods: {
    //...mapActions(["kuroneSlash"]),
    addTable() {
      const taskCount = this.todoList.length;
      this.todoList.push({
        title: "work" + (taskCount + 1),
        card: []
      });
      this.nowTable = taskCount;
      this.addCard();
    },
    addCard() {
      const id = this.nextCardIndex;
      const cardCount = this.todoList[this.nowTable].card.length;
      this.todoList[this.nowTable].card.push({
        name: "card" + (cardCount + 1),
        id,
        pos: {
          top: 0,
          left: 0
        },
        content: []
      });
      this.addTask(cardCount);
      this.nextCardIndex += 1;
    },
    addTask(index) {
      const id = this.nextTaskIndex;
      //console.log(index, this.todoList[this.nowTable].card[index].content);
      const leng = this.todoList[this.nowTable].card[index].content.length + 1;
      this.todoList[this.nowTable].card[index].content.push({
        text: "new task" + leng,
        id,
        status: "none"
      });
      this.nextTaskIndex += 1;
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
      this.todoList.splice(tableIndex, 1);
      this.nowTable = 0;
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
        this.listStyleOrigin = {
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
    // newMove2(event) {
    //   console.log("newmoove");
    //   const vm = this;
    //   _.throttle(() => {
    //     console.log("test2");
    //     vm.moveList(event);
    //   }, 500);
    // },
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
      const testTop =
        this.listStyleOrigin.top + event.clientY - this.startPos.top;

      if (testTop >= 0 && testTop < outerHeight - innerHeight) {
        this.listStyleOrigin.top = testTop;
      }
      if (testTop < 0) {
        this.listStyleOrigin.top = 0;
      }
      if (testTop > outerHeight - innerHeight) {
        this.listStyleOrigin.top = outerHeight - innerHeight;
      }
      const testLeft =
        this.listStyleOrigin.left + event.clientX - this.startPos.left;
      if (testLeft >= 0 && testLeft < outerWidth - innerWidth) {
        this.listStyleOrigin.left = testLeft;
      }
      if (testLeft < 0) {
        this.listStyleOrigin.left = 0;
      }
      if (testLeft > outerWidth - innerWidth) {
        this.listStyleOrigin.left = outerWidth - innerWidth;
      }
      this.moveStart(event);
    },
    moveEnd() {
      this.todoList[this.nowTable].card[this.movingIndex].pos = {
        top: this.listStyleOrigin.top,
        left: this.listStyleOrigin.left
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
  color: rgb(237, 157, 224);
}
.top-button {
  color: white;
  padding: 2px;
  cursor: pointer;
  border: 1px solid #821a82;
  background: rgb(106, 7, 106);
  margin-right: 3px;
  &:hover {
    border: 1px solid transparent;
    box-shadow: 0px 0px 7px #e39ed5 inset, 0px 0px 4px #eec5e4;
  }
  &.current {
    color: #f7d0ed;
    border: 1px solid #e36dc5;
    background: rgb(169, 47, 134);
  }

  &.add {
    background: #072179;
    border: 1px solid #1e5ea2;
    color: #9ee9e9;
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

      //background: pink;
    }
    .true-list,
    .true-list-board {
      //padding: 4px;

      position: absolute;
      color: purple;
      height: 200px;
      width: 170px;
      border: 1px solid #dc56ba;
      box-shadow: 1px 1px 4px #eec5e4, 0px 0px 5px #c255b4 inset;
      background: #dfbeed;

      text-align: left;
      &.move {
        transition: left 0.1s, top 0.1s;
      }
      .card-title {
        background: #cf7cf2;
        box-shadow: 0px 0px 5px purple inset;
        //margin-bottom: 3px;
        text-align: center;
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
          radial-gradient(#b32ba880, transparent 70%) bottom;
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
        .work-mode,
        .move-mode,
        .edit-mode,
        .delete-mode {
          font-size: 15px;
          line-height: 15px;
          white-space: nowrap;
          overflow: hidden;
          .done,
          .fail,
          .none {
            padding: 2px 2px;
          }
          .fail {
            color: red;
            &::before {
              font-size: 24px;
              line-height: 15px;
              content: "☒";
            }
          }
          .done {
            color: green;
            &::before {
              font-size: 24px;
              line-height: 15px;
              content: "☑";
            }
          }
          .none {
            color: blue;
            &::before {
              font-size: 24px;
              line-height: 15px;
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
// vue transition
// .anime-card-item,
// .add-card-item {
//   transition: all 1s;
//   //display: inline-block;
// }
// .anime-card-enter, .anime-card-leave-to
// /* .list-complete-leave-active for below version 2.1.8 */ {
//   opacity: 0;
//   //transform: translateX(30px);
// }
// .anime-card-leave-active {
//   position: absolute;
// }
.anime-card-item {
  //display: inline-block;
  // margin-right: 10px;
}
.anime-card-enter-active,
.anime-card-leave-active {
  transition: all 1s ease;
}
.anime-card-enter-from,
.anime-card-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.anime-card-move {
  transition: transform 0.8s ease;
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
</style>
