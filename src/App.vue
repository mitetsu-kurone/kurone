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
  <Header class="outer-header" />
  <div class="outer-content">
    <Sidebar class="side" />
    <router-view class="inner" />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: "Home",
  components: {
    Header,
    Sidebar
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
  width: 1280px;
  min-height: 750px;
  height: calc(100vh - 20px);
  overflow-y: auto;
  margin: 10px auto;
  border-radius: 5px;
  box-shadow: 0 0 4px #ea00ff;
}

// 裡面共用的bar
.top-button-bar {
  height: 30px;
  display: flex;
  align-items: center;
  .top-button {
    color: white;
    padding: 2px;
    cursor: pointer;
    border: 1px solid #821a82;
    background: #6a076a;
    margin-right: 3px;
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
.outer-content {
  display: flex;
  height: calc(100vh - 70px);
  .side {
    width: 280px;
    min-height: 750px;
  }
  .inner {
    width: 1000px;
    min-height: 750px;
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

::-webkit-scrollbar {
  width: 3px;
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
</style>
