export default {
  inserted(el, binding) {
    el.intersect = {
      visible: false,
      container: window
    };

    if (
      el.parentNode.style.overflowY === "scroll" ||
      (el.parentNode.style.overflowY === "auto" && binding.arg === "container")
    )
      el.intersect.container = el.parentNode;

    el.intersect.isVisible = () => {
      let visible = false;
      const { y, height } = el.getBoundingClientRect();

      if (el.intersect.container === window) {
        visible = y < window.innerHeight && y + height > 0;
      } else {
        const parent = el.parentNode;
        const {
          y: parentY,
          height: parentHeight
        } = parent.getBoundingClientRect();
        visible = parentHeight + parentY >= y && y + height >= parentY;
      }

      return visible;
    };

    el.intersect.callback = () => {
      let condition = el.intersect.isVisible();

      if (condition) {
        !el.intersect.visible && binding.value();
        el.intersect.visible = true;
        if (binding.modifiers.once)
          el.intersect.container.removeEventListener(
            "scroll",
            el.intersect.callback
          );
      } else {
        el.intersect.visible = false;
      }
    };

    if (binding.modifiers.start) el.intersect.callback();

    el.intersect.container.addEventListener("scroll", el.intersect.callback);
  },
  unbind(el) {
    el.intersect.container.removeEventListener("scroll", el.intersect.callback);
  }
};
