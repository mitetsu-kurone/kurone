<template>
  <div>
    <div class="main">
      <div class="display">
        Display
        <div class="content">
          <div class="scroll-shadow">
            <div>CSS Scroll Shadow</div>
            <div class="bottom-flag">End of Scroll</div>
          </div>
        </div>
      </div>
      <div class="display">
        Why Work
        <div class="content working">
          <div class="scroll-shadow">
            <div>捲動到漸變途中確認覆蓋狀況</div>
            <div class="bottom-flag">End of Scroll</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  margin-top: 30px;
  display: flex;
  color: #d8acd3;

  .display {
    margin: 0 auto;
    font-size: 25px;
  }
}
.content {
  margin-top: 3px;
  font-size: 20px;
  height: 500px;
  width: 300px;
  overflow: auto;
  box-shadow: 0 0 3px #ce7ace inset, 0 0 3px #ce7ace inset;

  background: linear-gradient(black 30%, rgba(255, 0, 255, 0)),
    linear-gradient(rgba(255, 255, 255, 0), black 70%) bottom,
    radial-gradient(at top, #ac82a8, transparent 70%),
    radial-gradient(at bottom, #ac82a8, transparent 70%) bottom;
  background-repeat: no-repeat;
  background-size: 100% 50px, 100% 50px, 100% 25px, 100% 25px;
  background-attachment: local, local, scroll, scroll;
  .scroll-shadow {
    color: #ac82a8;
    padding-top: 15px;
    height: 900px;
    width: 300px;
    position: relative;
    .bottom-flag {
      position: absolute;
      bottom: 6px;
      width: 100%;
    }
  }
  &.working {
    background: linear-gradient(purple 30%, rgba(255, 0, 255, 0)),
      linear-gradient(rgba(255, 255, 255, 0), purple 70%) bottom,
      radial-gradient(at top, #ac82a8, transparent 70%),
      radial-gradient(at bottom, #ac82a8, transparent 70%) bottom;
    background-repeat: no-repeat;
    background-size: 100% 50px, 100% 50px, 100% 25px, 100% 25px;
    background-attachment: local, local, scroll, scroll;
  }
}
@media (max-width: 600px) {
  .main .display {
    margin-right: 20px;
  }
  .content {
    height: 400px;
    width: 250px;
    .scroll-shadow {
      width: 250px;
    }
  }
}
</style>
