<template>
  <div class="header">
    <div
      class="text-magic"
      data-word="クロネ の Vue Test Backroom"
      data-mobile="クロネ の V.T.B."
    >
      <div class="white"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style lang="scss" src="./keyframe.scss"></style>
<style lang="scss" scoped>
.header {
  border-radius: 5px 5px 0 0;
  background: #3c0a3c;
  color: white;
  text-shadow: 0 0 5px white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  position: relative;
  box-shadow: 0 0 5px black inset;
  white-space: nowrap;
}
.text-magic {
  content: attr(data-word);
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 25px;
  color: white;

  &::before {
    margin-left: 30px;
    content: attr(data-word);
    position: absolute;
    color: red;
    top: 0;
    left: 0px;
    height: 50px;
    animation: move 0.95s 3;
  }
  &::after {
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
  &:hover .white {
    animation: whitemove 5s ease-out infinite;
  }
  &:hover::before {
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

  &:hover::after {
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
  .white {
    position: absolute;
    top: 5px;
    left: 5px;
    width: 80%;
    height: 2px;
    background: #3c0a3c;
    z-index: 4;
    animation: whitemove 5s ease-out 1;
  }
  // color: transparent;
}
@media (max-width: 360px) {
  .text-magic {
    content: attr(data-mobile);
    &::before,
    &::after,
    &:hover::before,
    &:hover::after {
      content: attr(data-mobile);
    }
  }
}
</style>
