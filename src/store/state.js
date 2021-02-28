export default {
  // for test
  testKurone: {
    kurone: 123,
    mod: 0
  },
  // list and table source
  nextCardIndex: 4,
  nextTaskIndex: 13,
  nowTable: 0,
  todoList: [
    {
      title: "testPlugin",
      card: [
        {
          name: "testDrag",
          id: 0,
          pos: {
            top: 24,
            left: 208
          },
          content: [
            { text: "vueresize", id: 0, status: "fail" },
            { text: "vue3resize", id: 0, status: "none" },
            { text: "vue3FullDrag", id: 1, status: "fail" },
            { text: "vuedraggable", id: 2, status: "done" }
          ]
        },
        {
          name: "testMess",
          id: 1,
          pos: {
            top: 79,
            left: 587
          },
          content: [
            { text: "lodash", id: 3, status: "done" },
            { text: "vuex", id: 4, status: "done" },
            { text: "vuewaypoint", id: 5, status: "none" }
          ]
        }
      ]
    },
    {
      title: "plan",
      card: [
        {
          name: "glitch",
          id: 2,
          pos: {
            top: 240,
            left: 96
          },
          content: [
            { text: "filter1", id: 6, status: "done" },
            { text: "filter2", id: 7, status: "none" },
            { text: "css1", id: 8, status: "fail" },
            { text: "css2", id: 9, status: "none" }
          ]
        },
        {
          name: "trick",
          id: 3,
          pos: {
            top: 177,
            left: 570
          },
          content: [
            { text: "shadowScroll", id: 10, status: "none" },
            { text: "rgbDisplay", id: 11, status: "none" },
            { text: "moveDisplay", id: 12, status: "none" }
          ]
        }
      ]
    }
  ]
};
