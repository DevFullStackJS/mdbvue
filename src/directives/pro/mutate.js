export default {
  inserted(el, binding) {
    let handler;
    let options;

    if (typeof binding.value === "function") {
      handler = binding.value;
      options = binding.modifiers;
    } else if (binding.value.handler) {
      handler = binding.value.handler;
      options = binding.value.options;
    }

    el.observer = new MutationObserver(handler);
    el.observer.observe(el, options);
  },
  unbind(el) {
    el.observer.disconnect();
  }
};
