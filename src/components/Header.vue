<template>
  <div class="header">
    <div class="text-magic" data-word="Fextel VTB ( Vue Test Board )">
      <div class="white"></div>
      <div class="white"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped lang="scss">
.header {
  background: purple;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  position: relative;
}
.text-magic {
  //position: absolute;
  // top: 50%;
  // left: 50%;
  //transform: translate(-50%, -50%) scale(3);
  content: attr(data-word);
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 25px;
  color: white;
  // color: transparent;
}
.white {
  //border: 1px solid red;
  position: absolute;

  width: 100%;
  height: 2px;
  background: purple;
  z-index: 4;
  animation: whiteMove 5s ease-out 1;
}

.text-magic::before {
  margin-left: 30px;
  content: attr(data-word);
  position: absolute;
  color: red;
  top: 0;
  left: 0px;
  height: 50px;
  animation: move 0.95s 3;
}
.text-magic::after {
  margin-left: 30px;
  content: attr(data-word);
  position: absolute;
  top: 0;
  left: -1px;
  height: 50px;
  color: rgba(255, 255, 255, 0.8);
  overflow: hidden;
  z-index: 3;
  color: cyan;
  filter: contrast(200%);
  text-shadow: -1px 0 0 cyan;
  mix-blend-mode: lighten;
  animation: move 1.1s 3 0.2s;
}
.text-magic:hover .white {
  animation: whiteMove 5s ease-out infinite;
}
.text-magic:hover::before {
  margin-left: 30px;
  content: attr(data-word);
  position: absolute;
  top: 0;
  left: 0px;
  height: 50px;
  color: red;
  overflow: hidden;
  z-index: 2;
  filter: contrast(200%);
  text-shadow: 1px 0 0 red;
  animation: move 0.95s infinite;
}

.text-magic:hover::after {
  margin-left: 30px;
  content: attr(data-word);
  position: absolute;
  top: 0;
  left: -1px;
  height: 50px;
  color: rgba(255, 255, 255, 0.8);
  overflow: hidden;
  z-index: 3;
  color: cyan;
  filter: contrast(200%);
  text-shadow: -1px 0 0 cyan;
  mix-blend-mode: lighten;
  animation: move 1.1s infinite 0.2s;
}

@keyframes whiteMove {
  9% {
    top: 38px;
  }
  14% {
    top: 8px;
  }
  18% {
    top: 42px;
  }
  22% {
    top: 1px;
  }
  32% {
    top: 32px;
  }
  34% {
    top: 12px;
  }
  40% {
    top: 26px;
  }
  43% {
    top: 7px;
  }
  44% {
    top: 0px;
  }
  99% {
    top: 0px;
  }
}

@keyframes move {
  10% {
    top: -0.4px;
    left: -1.1px;
  }
  20% {
    top: 0.4px;
    left: -0.2px;
  }
  30% {
    left: 0.5px;
  }
  40% {
    top: -0.3px;
    left: -0.7px;
  }
  50% {
    left: 0.2px;
  }
  60% {
    top: 1.8px;
    left: -1.2px;
  }
  70% {
    top: -1px;
    left: 0.1px;
  }
  80% {
    top: -0.4px;
    left: -0.9px;
  }
  90% {
    left: 1.2px;
  }
  99% {
    left: -1.2px;
  }
  100% {
    left: 0;
    display: none;
  }
}
</style>
