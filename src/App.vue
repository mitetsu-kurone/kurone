<template>
  <!-- <div class="header">
    header
  </div> -->
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
  <Header class="outer-header" />
  <div class="outer-content">
    <!-- <div class="side">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      side
    </div> -->
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  //color: #2c3e50;
  width: 1280px;
  height: calc(100vh - 20px);
  //border: 1px solid cyan;
  margin: 10px auto;
  //border: solid 1px red;
  border-radius: 5px;
  box-shadow: 0 0 4px #ea00ff;
}

.outer-header {
  //border: 1px solid red;
  height: 50px;
}
.outer-content {
  display: flex;
  height: calc(100vh - 70px);
  .side {
    width: 280px;
    //border: 1px solid blue;
  }
  .inner {
    width: 1000px;
    //border: 1px solid green;
  }
}
.tran-effect-home-enter-active,
.tran-effect-home-leave-active {
  transition: all 0.3s ease;
}
.tran-effect-home-enter-from,
.tran-effect-home-leave-to {
  opacity: 0;
  //transform: translateX(30px);
}
</style>
