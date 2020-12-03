export default {
  kuroneFix(state, val) {
    if (val) {
      state.testKurone.kurone += val;
    } else {
      state.testKurone.kurone += 1;
    }
    if (state.testKurone.kurone % 5 === 0) {
      state.testKurone.mod += 1;
    }
  }
};
