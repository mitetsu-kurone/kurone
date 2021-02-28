export default {
  kuroneFix(state, val) {
    if (val) {
      state.testKurone.kurone += val;
    } else {
      state.testKurone.kurone += 1;
    }
    if (state.testKurone.kurone % 5 === 0) {
      state.testKurone.mod += 1;
    }
  },
  addTable(state) {
    const taskCount = state.todoList.length;
    state.todoList.push({
      title: "work" + (taskCount + 1),
      card: []
    });
    state.nowTable = taskCount;
  },
  addCard(state) {
    const id = state.nextCardIndex;
    const cardCount = state.todoList[state.nowTable].card.length;
    state.todoList[state.nowTable].card.push({
      name: "card" + (cardCount + 1),
      id,
      pos: {
        top: 0,
        left: 0
      },
      content: []
    });
    state.nextCardIndex += 1;
  },
  addTask(state, index) {
    const id = state.nextTaskIndex;
    const leng = state.todoList[state.nowTable].card[index].content.length + 1;
    state.todoList[state.nowTable].card[index].content.push({
      text: "new task" + leng,
      id,
      status: "none"
    });
    state.nextTaskIndex += 1;
  },
  deleteTable(state, index) {
    if (state.todoList.length === 1) {
      return;
    }
    state.todoList.splice(index, 1);
    state.nowTable = 0;
  },
  setTable(state, index) {
    state.nowTable = index;
  }
};
