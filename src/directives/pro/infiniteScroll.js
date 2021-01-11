export default {
  inserted(el, binding) {
    if (el.style.overflowY === "scroll") {
      el.scrollableContainer = el;
      el.prevScrollPosition = el.scrollTop;
    } else {
      el.scrollableContainer = window;
      el.prevScrollPosition = window.scrollY;
    }

    el.handleScroll = () => {
      const rect = el.getBoundingClientRect();

      let condition;
      let scrollPosition;

      if (el.scrollableContainer === el) {
        condition = rect.height + el.scrollTop >= el.scrollHeight;
        scrollPosition = el.scrollTop;
      } else {
        condition = window.innerHeight >= rect.y + rect.height + 50;
        scrollPosition = window.scrollY;
      }

      if (scrollPosition < el.prevScrollPosition) return;

      if (condition) {
        el.prevScrollPosition = scrollPosition;
        binding.value();
      }
    };

    el.scrollableContainer.addEventListener("scroll", el.handleScroll);
  },
  unbind(el) {
    el.scrollableContainer.removeEventListener("scroll", el.handleScroll);
  }
};
