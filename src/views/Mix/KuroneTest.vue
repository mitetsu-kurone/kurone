<template>
  <div class="kurone-test">
    <h1>This is an about kurone vue3 test</h1>
    all:{{ count }}<br />
    counter kurone: {{ count.kurone }}<br />
    counter default: {{ count.default }}
    <hr />
    <div @click="plusFunc(1)">[plus kurone]</div>
    <div @click="plusFunc(2)">[plus default]</div>
    <div @click="testNodeBase()">[testNode]</div>
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
      count: {}
    };
  },
  methods: {
    testNodeBase() {
      const baseData = ["cat", "dog", "cat2", "cat3", "dog", "dog"];
      const link = this.createLinkData(baseData);
      const linkFix = this.fixLinkData(link);
      this.displayNode(linkFix);
      const linkTroll = this.addedInPos(linkFix, 2, "good cat");

      this.displayNode(linkTroll);
    },
    addedInPos(list, index, value) {
      const listR = list;
      let flag = listR;

      let flagIndex = 0;
      while (flag && flag.data) {
        console.log(flagIndex, flag);
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
    fixLinkData(list) {
      const listR = list;
      let flag = listR;
      let safeFlag = null;
      while (flag && flag.data) {
        console.log(flag, listR);
        if (flag.data === "dog") {
          if (flag.next) {
            flag.data = flag.next.data;
            flag.next = flag.next.next;
          }
        } else {
          safeFlag = flag;
        }

        // if (flag.next.data === "dog" && flag.next.next === null) {
        //   flag.next = null;
        // }
        flag = flag.next;
      }
      if (safeFlag.next.data === "dog") {
        safeFlag.next = null;
      }

      console.log(safeFlag);
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
    displayNode(list) {
      let listR = list;
      const display = [];
      while (listR && listR.data) {
        display.push(listR.data);
        listR = listR.next;
      }
      console.log(display);
    },
    plusFunc(val) {
      if (val === 1) {
        if (this.count.kurone) {
          this.count.kurone += 1;
        } else {
          this.count.kurone = 1;
        }
      } else {
        if (this.count.default) {
          this.count.default += 1;
        } else {
          this.count.default = 1;
        }
      }
    }
  }
};
</script>

<style lang="scss">
.kurone-test {
  color: blue;
}
</style>
