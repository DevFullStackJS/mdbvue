export default {
  inserted(el, binding) {
    if (binding.arg === "start") {
      binding.value();
    }
    window.addEventListener("resize", binding.value);
  },

  unbind(el, binding) {
    window.removeEventListener("resize", binding.value);
  }
};
