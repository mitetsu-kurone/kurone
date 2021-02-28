export default {
  kuroneSlash({ commit }, val) {
    commit("kuroneFix", val);
  },
  actionAddTable({ commit, dispatch }) {
    commit("addTable");
    dispatch("actionAddCard");
  },
  actionAddCard({ commit, state, dispatch }) {
    const cardCount = state.todoList[state.nowTable].card.length;
    commit("addCard");
    dispatch("actionAddTask", cardCount);
  },
  actionAddTask({ commit }, index) {
    commit("addTask", index);
  },
  actionDeleteTable({ commit }, index) {
    commit("deleteTable", index);
  },
  actionSetTable({ commit }, index) {
    commit("setTable", index);
  }
};
