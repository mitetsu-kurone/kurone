<template>
  <div class="sidebar">
    <router-link
      class="router home"
      :class="{
        current: $route.name === 'homepage',
        mobileanime: mobileAnimating
      }"
      to="/"
      >Home</router-link
    >
    <router-link
      class="router"
      :class="{
        current: $route.name === 'profile',
        mobileanime: mobileAnimating
      }"
      to="/profile"
      >Profile</router-link
    >
    <div class="group" v-for="(group, index) in struct" :key="'group-' + index">
      <div
        class="group-title"
        :class="{
          mobilegroupanime:
            group.content.find(val => $route.name === val.routerName) &&
            mobileAnimating
        }"
      >
        {{ group.groupName }}
      </div>
      <router-link
        v-for="(item, indexContent) in group.content"
        :key="indexContent"
        class="router"
        :class="{
          current: $route.name === item.routerName,
          mobileanime: mobileAnimating
        }"
        :to="item.routerPath"
        >{{ item.displayName }}</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  watch: {
    $route() {
      clearTimeout(this.timer);
      this.mobileAnimating = true;
      this.timer = setTimeout(() => {
        this.mobileAnimating = false;
      }, 1000);
    }
  },
  data() {
    return {
      timer: "",
      mobileAnimating: false,
      struct: [
        {
          groupName: "Mix Trick",
          content: [
            {
              displayName: "todoList",
              routerPath: "/mix/todoList",
              routerName: "todoList"
            },
            {
              displayName: "tableAdvance",
              routerPath: "/mix/tableAdvance",
              routerName: "tableAdvance"
            }
          ]
        },
        {
          groupName: "Effect Trick",
          content: [
            {
              displayName: "randomTyper",
              routerPath: "/effect/randomTyper",
              routerName: "randomTyper"
            },
            {
              displayName: "scrollShadow",
              routerPath: "/effect/scrollShadow",
              routerName: "scrollShadow"
            },
            {
              displayName: "linkList",
              routerPath: "/effect/linkList",
              routerName: "linkList"
            },
            {
              displayName: "teleport",
              routerPath: "/effect/teleport",
              routerName: "teleport"
            }
          ]
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;

  filter: url(#glitchonce);
  .router {
    height: 35px;
    line-height: 35px;
    text-decoration: none;
    box-shadow: 0 0 2px #8a7a8a inset;
    // 顏色吃到內建的 沒事不要直接用router-link
    color: white;
    text-shadow: 0 0 8px #0400ff;
    cursor: pointer;
    background: linear-gradient(to right, purple 0%, #170f17 100%);
    &.home {
      font-weight: bold;
    }
    &.current {
      box-shadow: 0 0 5px cyan inset;
    }
  }
  .group {
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 2px #9500ff inset;
    .group-title {
      color: #a997a9;
      text-shadow: 1px 1px 3px purple;
      font-weight: bold;
      box-shadow: 0 0 2px #fcc7fc inset;
      // background: linear-gradient(to right, #3c033c 0%, #b371b3 100%);
    }

    .router {
      &.current {
        box-shadow: 0 0 5px cyan inset;
      }
    }
  }
}
// 為了不影響手機的hover，直接採用切分
// 這邊只是粗略地拿600px當分界，比較嚴謹的狀況的話，就必須使用手機偵測函數
@media (min-width: 601px) {
  .sidebar {
    .router {
      &:hover {
        box-shadow: 0 0 5px purple inset;
        text-shadow: 0 0 8px red;
        filter: url(#glitchhover);
        color: #5f155f;
        background: radial-gradient(ellipse at center, #dab3b3, #e99de9);
      }
    }
    .group {
      &:hover {
        box-shadow: 0 0 2px red inset;
        .group-title {
          filter: url(#glitchhover);
        }
      }
      .router {
        &:hover {
          box-shadow: none;
          filter: url(#glitchhover);
          color: #5f155f;
          background: radial-gradient(ellipse at center, #dab3b3, #e99de9);
        }
      }
    }
  }
}
@media (max-width: 600px) {
  .sidebar {
    cursor: default;
    .router {
      &.current {
        box-shadow: 0 0 5px cyan inset;
        text-shadow: 0 0 8px red;
        color: #5f155f;
        background: radial-gradient(ellipse at center, #dab3b3, #e99de9);
        &.mobileanime {
          filter: url(#glitchextra);
        }
      }
    }
    .group {
      .group-title {
        &.mobilegroupanime {
          filter: url(#glitchextra);
        }
      }

      .router {
        &.current {
          box-shadow: 0 0 5px cyan inset;
          color: #5f155f;
          text-shadow: 0 0 8px red;
          background: radial-gradient(ellipse at center, #dab3b3, #e99de9);
          &.mobileanime {
            filter: url(#glitchextra);
          }
        }
      }
    }
  }
}
</style>
