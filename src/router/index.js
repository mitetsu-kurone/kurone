import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/profile",
    name: "profile",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile.vue")
  },
  {
    path: "/mix",
    redirect: "/mix/todoList",
    component: () =>
      import(/* webpackChunkName: "mix" */ "../views/Mix/Header"),
    children: [
      {
        path: "todoList",
        name: "todoList",
        component: () => import("@/views/Mix/TodoList")
      },
      {
        path: "tableAdvance",
        name: "tableAdvance",
        component: () => import("@/views/Mix/TableAdvance")
      },
      {
        path: "kuroneTest",
        name: "kuroneTest",
        component: () => import("@/views/Mix/KuroneTest")
      },
      {
        path: "kuroneTest2",
        name: "kuroneTest2",
        component: () => import("@/views/Mix/KuroneTest2")
      }
    ]
  },
  {
    path: "/effect",
    redirect: "/effect/fakeTransition",
    component: () =>
      import(/* webpackChunkName: "effect" */ "../views/Effect/Header"),
    children: [
      {
        path: "fakeTransition",
        name: "fakeTransition",
        component: () => import("@/views/Effect/FakeTransition")
      },
      {
        path: "scrollShadow",
        name: "scrollShadow",
        component: () => import("@/views/Effect/ScrollShadow")
      }
    ]
  },
  {
    path: "/:any(.*)*",
    name: "nomatch",
    beforeEnter: (to, from, next) => {
      next("/");
    }
  }
  // {
  //   path: "/test",
  //   name: "KuroneTest",
  //   component: () =>
  //     import(/* webpackChunkName: "test" */ "../views/KuroneTest.vue")
  // }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
