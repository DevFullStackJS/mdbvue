export default {
  inserted(el, binding) {
    let { x: blockX, y: blockY } = binding.modifiers;
    let blocked = binding.value === undefined ? true : binding.value;
    
    if (blockX === undefined && blockY === undefined) {
      blockX = true;
      blockY = true;
    }

    el.blockScroll = () => {
      const body = document.querySelector("body");
      if (blockY) {
        el.prevOverflowY = body.style.overflowY;
        body.style.overflowY = "hidden";
      }

      if (blockX) {
        el.prevOverflowX = body.style.overflowX;
        body.style.overflowX = "hidden";
      }
    };

    el.enableScroll = () => {
      const body = document.querySelector("body");

      if (blockY) body.style.overflowY = el.prevOverflowY;
      if (blockX) body.style.overflowX = el.prevOverflowX;
    };

    if (blocked) el.blockScroll();
  },
  update(el, binding) {
    if (binding.value === undefined) return;

    if (binding.value) el.blockScroll();
    else el.enableScroll();
  },
  unbind(el) {
    el.enableScroll();
  }
};
