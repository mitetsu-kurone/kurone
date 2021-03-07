export default {
  // for test
  testKurone: {
    kurone: 123,
    mod: 0
  },
  // list and table source
  nextCardIndex: 4,
  nextTaskIndex: 14,
  nowTable: 0,
  todoList: [
    {
      title: "testPlugin",
      card: [
        {
          name: "testDrag",
          id: 0,
          pos: {
            top: 12,
            left: 24
          },
          content: [
            { text: "vueresize", id: 0, status: "fail" },
            { text: "vue3resize", id: 1, status: "none" },
            { text: "vue3FullDrag", id: 2, status: "fail" },
            { text: "vuedraggable", id: 3, status: "done" }
          ]
        },
        {
          name: "testMess",
          id: 1,
          pos: {
            top: 317,
            left: 99
          },
          content: [
            { text: "lodash", id: 4, status: "done" },
            { text: "vuex", id: 5, status: "done" },
            { text: "vuewaypoint", id: 6, status: "none" }
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
            { text: "filter1", id: 7, status: "done" },
            { text: "filter2", id: 8, status: "none" },
            { text: "css1", id: 9, status: "fail" },
            { text: "css2", id: 10, status: "none" }
          ]
        },
        {
          name: "trick",
          id: 3,
          pos: {
            top: 16,
            left: 90
          },
          content: [
            { text: "shadowScroll", id: 11, status: "none" },
            { text: "rgbDisplay", id: 12, status: "none" },
            { text: "moveDisplay", id: 13, status: "none" }
          ]
        }
      ]
    }
  ]
};
