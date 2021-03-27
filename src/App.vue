<template>
  <svg
    style="position: absolute; width: 0; height: 0;"
    width="0"
    height="0"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    class="svg-sprite"
  >
    <defs>
      <filter id="glitchhover">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.000001 0.000001"
          numOctaves="1"
          result="warp"
          seed="1"
        >
          <animate
            attributeName="baseFrequency"
            calcMode="linear"
            values="0.000001 0.000001;0.02 0.5;0.000001 0.000001;0.000001 0.000001;0.002 0.4;0.000001 0.000001;0.000001 0.000001"
            keyTimes="0;0.05;0.1;0.65;0.70;0.75;1"
            dur="2s"
            repeatCount="indefinite"
          />
        </feTurbulence>
        <feDisplacementMap
          xChannelSelector="R"
          yChannelSelector="G"
          scale="30"
          in="SourceGraphic"
          in2="warp"
        ></feDisplacementMap>
      </filter>
    </defs>
  </svg>
  <svg
    style="position: absolute; width: 0; height: 0;"
    width="0"
    height="0"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    class="svg-sprite"
  >
    <defs>
      <filter id="glitchonce">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.000001 0.000001"
          numOctaves="1"
          result="warp"
          seed="1"
        >
          <animate
            attributeName="baseFrequency"
            calcMode="linear"
            values="0.02 0.5;0.000001 0.000001;0.000001 0.000001;0.002 0.4;0.000001 0.000001;0.000001 0.000001"
            keyTimes="0;0.05;0.65;0.70;0.75;1"
            dur="1s"
            repeatCount="1"
          />
        </feTurbulence>
        <feDisplacementMap
          xChannelSelector="R"
          yChannelSelector="G"
          scale="30"
          in="SourceGraphic"
          in2="warp"
        ></feDisplacementMap>
      </filter>
    </defs>
  </svg>
  <svg
    style="position: absolute; width: 0; height: 0;"
    width="0"
    height="0"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    class="svg-sprite"
  >
    <defs>
      <filter id="glitchextra">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.02 0.5"
          numOctaves="1"
          result="warp"
          seed="1"
        >
          <animate
            attributeName="baseFrequency"
            calcMode="linear"
            values="0.02 0.5;0.000001 0.000001;0.000001 0.000001"
            keyTimes="0;0.15;1"
            dur="0.5s"
            repeatCount="indefinite"
          />
        </feTurbulence>
        <feDisplacementMap
          xChannelSelector="R"
          yChannelSelector="G"
          scale="30"
          in="SourceGraphic"
          in2="warp"
        ></feDisplacementMap>
      </filter>
    </defs>
  </svg>
  <Header @click="smartDirect()" class="outer-header" />
  <div
    class="home-outer-content"
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend="touchEnd"
  >
    <Sidebar class="home-side-content" :class="{ mobileside: mobileSideBar }" />
    <router-view class="home-inner-content" />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";
import _ from "lodash";

export default {
  name: "Home",
  data() {
    return {
      preventItem: {
        "list move-mode": true,
        "table-item": true,
        fail: true,
        none: true,
        done: true
      },
      recordX: -1,
      recordY: -1,
      mobileSideBar: false
    };
  },
  components: {
    Header,
    Sidebar
  },
  methods: {
    smartDirect() {
      if (this.mobileSideBar) {
        this.mobileSideBar = false;
        return;
      }
      if (this.$route.name === "homepage") {
        this.mobileSideBar = !this.mobileSideBar;
      } else {
        this.$router.push("/");
      }
    },
    touchStart(event) {
      if (
        event.target.tagName === "INPUT" ||
        this.preventItem[event.target.className]
      ) {
        // 維持-1，在這個前提end會直接被排掉
        return;
      }
      this.recordX = event.touches[0].clientX;
      this.recordY = event.touches[0].clientY;
      // if (this.recordX < 50) {
      //   event.preventDefault();
      // }
    },
    // 無論原生事件有沒有觸發，滑動必觸發
    touchMove: _.throttle(
      function(event) {
        // 這邊會看到-1，簡單來說會有殘餘滑動
        if (this.recordX < 100 && event.cancelable) {
          event.preventDefault();
          event.stopPropagation();
        }
        const xMoving = event.touches[0].pageX;
        const yMoving = event.touches[0].pageY;
        //左右滑狀態，把預設event取消
        if (
          Math.abs(this.recordX - xMoving) > Math.abs(this.recordY - yMoving)
        ) {
          if (event.cancelable) {
            event.preventDefault();
            event.stopPropagation();
          }
        }
      },
      150 // time
    ),
    touchEnd(event) {
      if (this.recordX === -1) {
        return;
      }
      const diff = event.changedTouches[0].clientX - this.recordX;

      if (!this.mobileSideBar && diff > 100) {
        this.mobileSideBar = true;
      }
      if (this.mobileSideBar && diff < -100) {
        this.mobileSideBar = false;
      }
      this.recordX = -1;
      this.recordY = -1;
    }
  }
};
</script>

<style lang="scss">
body {
  overscroll-behavior-y: none;
  margin: 0px;
  padding: 0px;
  background: black;
  color: white;
}
#app {
  font-family: "Microsoft JhengHei", "微軟正黑體", Avenir, Helvetica, Arial,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  overflow-y: auto;
  box-shadow: 0 0 4px #ea00ff;
}

// 裡面共用的bar
.top-button-bar {
  min-height: 30px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  white-space: nowrap;
  .top-button {
    color: white;
    padding: 2px;
    cursor: pointer;
    border: 1px solid #821a82;
    background: #6a076a;
    margin-right: 3px;
    margin-bottom: 3px;
    &:hover {
      border: 1px solid transparent;
      box-shadow: 0px 0px 7px #e39ed5 inset, 0px 0px 4px #eec5e4;
    }
    &.current {
      color: #f7d0ed;
      border: 1px solid #e36dc5;
      background: #a92f86;
    }

    &.add {
      background: #072179;
      border: 1px solid #1e5ea2;
      color: #9ee9e9;
    }
  }
}

.outer-header {
  height: 50px;
}
.home-outer-content {
  display: flex;
  .home-side-content {
    width: 280px;
  }
}
.tran-effect-home-enter-active,
.tran-effect-home-leave-active {
  transition: all 0.3s ease;
}
.tran-effect-home-enter-from,
.tran-effect-home-leave-to {
  opacity: 0;
}
.data-work {
  height: 300px;
  overflow-y: auto;
  border: 1px dotted blue;
  box-shadow: 0 0 3px #a8a8dd inset;
  margin-bottom: 10px;
  padding: 5px;
  color: #22c9c9;
  hr {
    border: 1px solid #89c4c466;
  }
}

// PC only
@media (min-width: 601px) {
  #app {
    min-height: 750px;
    height: calc(100vh - 20px);
    width: 1280px;
    margin: 10px auto;
    border-radius: 5px;
  }
  .home-outer-content {
    height: calc(100vh - 70px);
    .home-side-content {
      min-height: 750px;
    }
    .home-inner-content {
      width: 1000px;
      min-height: 750px;
    }
  }
  ::-webkit-scrollbar {
    width: 3px;
    height: 3px;
    background: #eec5e4b0;
    opacity: 0.3;
  }

  ::-webkit-scrollbar-button {
    display: none;
  }

  ::-webkit-scrollbar-piece {
    background: #e295cf96;
  }

  ::-webkit-scrollbar-thumb {
    background: #8d218d6e;
  }
}
// 不考慮PC600以下的狀況，這邊都當手機版
@media (max-width: 600px) {
  .home-outer-content {
    position: relative;
    // min-height: calc(100vh - 50px);
    height: calc(100vh - 50px);
    .home-side-content {
      // min-height: calc(100vh - 50px);
      height: calc(100vh - 50px);
      position: absolute;
      background: black;
      box-shadow: 2px 2px 15px #653e64;
      z-index: 9999;
      left: -290px;
      transition: left 0.5s;
      &.mobileside {
        left: 0px;
      }
    }
    .home-inner-content {
      // min-height: calc(100vh - 60px);
      height: calc(100vh - 60px);
      width: 100%;
    }
  }
  .top-button-bar {
    .top-button {
      flex: 1 0 100px;
    }
  }
  #app {
    width: 100%;
    margin: 0;
    height: 100vh;
    // border-radius: 0;
  }
}
</style>
