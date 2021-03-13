<template>
  <div>
    <div class="link-list">
      <div class="show-result">
        <div class="border">Show Result</div>
        <div class="intro">
          由於這個要秀漂亮畫面或特效也是轉回Array才方便，那不如直接給原始結果比較實際<br />
          現在的array和object秀畫面便利性和變化性遠比link結構更強，故只是滿足好奇心的製作<br />
          演示效果有限，有興趣可以直接開原始碼看怎麼操作資料<br />
          PS:本區並沒有資料偵錯，你用預期外操作一定會錯，請不要挑戰他，若不能跑了請重整<br />
        </div>
        <div class="title">Node結構</div>
        <div class="data-work">{{ nodeList }}</div>

        <div class="title">Node轉陣列</div>
        <div class="data-work">{{ viewStatus }}</div>
        <div class="title">原始輸入</div>
        <div class="data-work">{{ nowSource }}</div>
      </div>

      <div class="edit-text">
        <div class="border">Edit Source</div>
        <div class="border"><input type="text" v-model="source" /></div>
        <div class="group">
          <div class="block">
            <div class="border">Filter Source</div>
            <div class="border"><input type="text" v-model="filter" /></div>
          </div>
          <div class="block">
            <div class="border">Position</div>
            <div class="border"><input type="text" v-model="pos" /></div>
          </div>
          <div class="block">
            <div class="border">Value</div>
            <div class="border"><input type="text" v-model="value" /></div>
          </div>
        </div>
      </div>

      <div class="run-panel">
        <div class="button" @click="initSource">初始化Node</div>
        <div
          class="button"
          :class="{ disable: viewStatus.length <= 1 }"
          @click="filterSource"
        >
          包含filter的移除
        </div>
        <div class="button" @click="addData">新增對應位置</div>
        <div class="button" @click="editData">編輯對應位置</div>
        <div
          class="button"
          :class="{ disable: viewStatus.length <= 1 }"
          @click="removeData"
        >
          刪除對應位置
        </div>
      </div>
    </div>
  </div>
</template>
<script>
class Node {
  constructor(value) {
    this.data = value;
    this.next = null;
  }
}

export default {
  data() {
    return {
      nodeList: null,
      filter: "dog",
      source: "cat,dog1,dog2,cat2,cat3,dog3,dog4",
      nowSource: "",
      safeFlag: null,
      pos: 0,
      value: "good cat"
    };
  },
  mounted() {
    this.initSource();
  },
  computed: {
    viewStatus() {
      let flag = this.nodeList;
      const display = [];
      while (flag && flag.data) {
        display.push(flag.data);
        flag = flag.next;
      }
      return display;
    }
  },
  // 這邊比較偏資料運作，我就不刪console.log了
  methods: {
    initSource() {
      const baseData = this.source.split(",");
      this.nodeList = this.createLinkData(baseData);
      this.nowSource = baseData;
    },
    testNodeBase() {
      const baseData = this.source.split(",");
      const link = this.createLinkData(baseData);
      const linkFix = this.filterSource(link);
      const linkTroll = this.addedInPos(linkFix, 2, "good cat");
      this.displayNode(linkTroll);
    },
    addData() {
      this.addedInPos(Number(this.pos), this.value);
    },
    editData() {
      this.editInPos(Number(this.pos), this.value);
    },
    removeData() {
      if (this.viewStatus.length <= 1) {
        return;
      }
      this.removeInPos(Number(this.pos));
    },
    addedInPos(index, value) {
      if (index === -1) {
        let newNode = new Node(value);
        newNode.next = this.nodeList;
        this.nodeList = newNode;
        return;
      }
      const listR = this.nodeList;
      let flag = listR;
      let flagIndex = 0;
      while (flag && flag.data) {
        // console.log(flagIndex, flag);
        if (flagIndex === index) {
          const beforePart = flag;
          const afterPart = flag.next;
          beforePart.next = new Node(value);
          if (afterPart) {
            beforePart.next.next = afterPart;
          }
        }

        flagIndex += 1;
        flag = flag.next;
      }
      return listR;
    },
    editInPos(index, value) {
      const listR = this.nodeList;
      let flag = listR;
      let flagIndex = 0;
      while (flag && flag.data) {
        if (flagIndex === index) {
          flag.data = value;
        }

        flagIndex += 1;
        flag = flag.next;
      }
      return listR;
    },
    removeInPos(index) {
      const listR = this.nodeList;
      let flag = listR;
      let flagIndex = 0;
      let safeFlag = null;
      while (flag && flag.data) {
        if (flagIndex === index) {
          if (flag.next) {
            flag.data = flag.next.data;
            flag.next = flag.next.next;
          } else {
            safeFlag.next = null;
            flag = flag.next;
          }
        } else {
          safeFlag = flag;
          flag = flag.next;
        }

        flagIndex += 1;
      }
      return listR;
    },
    filterSource() {
      if (this.viewStatus.length <= 1) {
        return;
      }
      const listR = this.nodeList;
      const filterTarget = this.filter;
      let flag = listR;
      let safeFlag = null;
      while (flag && flag.data) {
        //console.log(flag, listR);
        if (flag.data.indexOf(filterTarget) >= 0) {
          if (flag.next) {
            flag.data = flag.next.data;
            flag.next = flag.next.next;
          } else {
            // 只剩一個的話不能再砍，砍了就不叫Node了
            if (safeFlag) {
              safeFlag.next = null;
            }

            flag = flag.next;
          }
        } else {
          safeFlag = flag;
          flag = flag.next;
        }
      }
      this.safeFlag = safeFlag;
      return listR;
    },
    createLinkData(arrayData) {
      let list = new Node("");
      let flag = list;
      arrayData.forEach(val => {
        flag.next = new Node(val);
        flag = flag.next;
      });
      return list.next;
    },
    // for debug
    displayNode(list) {
      let listR = list;
      const display = [];
      while (listR && listR.data) {
        display.push(listR.data);
        listR = listR.next;
      }
      console.log(display);
    }
  }
};
</script>
<style scoped lang="scss">
.link-list {
  margin: 0 auto;
  width: 85%;
  margin-top: 50px;

  .intro {
    padding: 3px;
    color: #db8cdb;
    border: 1px dotted purple;
    box-shadow: 0 0 2px #db8cdb;
    margin-bottom: 5px;
  }
  .title {
    color: #8d63e7;
  }
  //overwrite
  .data-work {
    height: auto;
  }

  .show-result {
    padding: 5px;
    box-shadow: 0 0 3px purple inset;
    min-height: 50px;
    .border {
      color: #e463f0;
      margin-bottom: 10px;
      font-size: 22px;
    }
    .home-title {
      font-size: 22px;
      margin-bottom: 30px;
      min-height: 50px;
      text-shadow: 0 0 3px #f200ff;
    }
  }
  .edit-text {
    padding: 5px 5px 15px 5px;
    box-shadow: 0 0 3px blue inset;
    margin-top: 15px;
    .group {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }
    .border {
      padding-top: 5px;
      color: #6371f0;
      font-size: 22px;
      margin-top: 5px;
      input {
        height: 50px;
        width: 80%;
        font-size: 20px;
        text-align: center;
        border: 1px solid #004180;
        background: #19172b;
        color: white;
      }
    }
  }
  .run-panel {
    margin-top: 15px;
    padding: 5px;
    min-height: 55px;
    box-shadow: 0 0 3px green inset;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    .button {
      flex: 1 0 auto;
      cursor: pointer;
      background: #76af76;
      border: 1px solid green;
      box-shadow: 0 0 3px green inset;
      min-width: 120px;
      height: 45px;
      line-height: 45px;
      font-weight: bold;
      margin-bottom: 5px;
      text-align: center;
      white-space: nowrap;
      color: #223d22;
      margin-right: 6px;
      &:hover {
        background: #65ca65;
      }
      &.disable {
        background: #537453;
        cursor: not-allowed;
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
@media (max-width: 600px) {
  .main .display {
    margin-right: 20px;
  }
  .content {
    height: 400px;
    width: 250px;
    .scroll-shadow {
      width: 250px;
    }
  }
  .edit-text {
    .group {
      .block {
        width: 150px;
        flex: 1 0 auto;
      }
    }
  }
}
</style>
