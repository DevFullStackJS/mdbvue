export default {
  inserted(el, binding) {
    el.copyToClipboard = () => {
      const textarea = document.createElement("textarea");
      textarea.value = binding.value;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    };
    el.addEventListener("click", el.copyToClipboard);
  },

  unbind(el) {
    el.removeEventListener("click", el.copyToClipboard);
  }
};
