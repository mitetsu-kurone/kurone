export default {
  testFirst: state => state.testKurone.kurone,
  testAll: state => state,
  // list and table source
  getTodoList: state => state.todoList,
  getNowTable: state => state.nowTable
};
