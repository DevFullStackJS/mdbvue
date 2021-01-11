export default {
  inserted(el, binding) {
    const { modifiers, arg } = binding;
    el.eventElement =
      arg === "window" ? window : arg === "document" ? document : el;

    const keymap = Object.keys(binding.value).map(set => {
      const keys = set.split("+");
      const combination = {
        hotkey: set,
        key: "",
        altKey: false,
        ctrlKey: false,
        metaKey: false
      };

      keys.forEach(key => {
        if (key === "ctrl") combination.ctrlKey = true;
        else if (key === "alt") combination.altKey = true;
        else if (key === "meta") combination.metaKey = true;
        else combination.key = key;
      });

      return combination;
    });

    el.hotkeyHandler = e => {
      modifiers.prevent && e.preventDefault();
      modifiers.stop && e.stopPropagation();

      const { key, altKey, ctrlKey, metaKey } = e;

      for (let i = 0; i < keymap.length; i++) {
        const keyCombination = keymap[i];
        if (
          keyCombination.key.toLowerCase() === key.toLowerCase() &&
          keyCombination.altKey === altKey &&
          keyCombination.ctrlKey === ctrlKey &&
          keyCombination.metaKey === metaKey
        ) {
          binding.value[keyCombination.hotkey]();
        }
      }
    };

    el.eventElement.addEventListener("keydown", el.hotkeyHandler);
  },

  unbind(el) {
    el.eventElement.removeEventListener("keydown", el.hotkeyHandler);
  }
};
