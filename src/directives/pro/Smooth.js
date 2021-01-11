const idScroll = (target, id, e) => {
  e.preventDefault();
  target.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest"
  });
  history.pushState({ page: 1 }, "title 1", `#${id}`);
};

const Smooth = {
  inserted(e, b) {
    const rawID = e.getAttribute("href") || b.value;
    const dehashID = rawID.startsWith("#") ? rawID.slice(1) : rawID;
    const IDTargetEl = document.getElementById(dehashID);
    e.addEventListener("click", e => {
      idScroll(IDTargetEl, dehashID, e);
    });
  },
  unbind(e) {
    e.removeEventListener("click", () => {
      idScroll();
    });
  }
};

export default Smooth;
export { Smooth as mdbSmooth, Smooth };
