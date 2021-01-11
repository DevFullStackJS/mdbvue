<template>
  <div ref="popper" :style="wrapperStyle">
    <transition
      @enter="enter"
      @leave="leave"
      @before-enter="beforeEnter"
      @after-leave="afterLeave"
      @after-enter="afterEnter"
    >
      <div
        class="dropdown-content select-dropdown"
        ref="options"
        v-show="show"
        role="listbox"
        :aria-multiselectable="multiple"
        :id="id"
      >
        <div ref="wrapper" class="select-inner-wrapper">
          <div class="search-wrap" v-if="search">
            <mdb-input
              ref="search"
              class="search mt-0"
              inputClass="px-0"
              :placeholder="searchPlaceholder"
              v-model="searchInput"
              @input="searchValue"
              @keydown.native.down="$emit('focusOption', $event)"
              @keydown.native.enter="$emit('focusOption', $event)"
            />
          </div>
          <p
            v-if="search && typeof result === 'number' && result === 0"
            class="text-muted pl-2"
          >
            <small>{{ resultText }}</small>
          </p>
          <ul
            :class="optionsClass"
            class="mb-0"
            :style="optionsStyle"
            ref="optionList"
          >
            <slot></slot>
          </ul>
          <slot name="footer"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import mdbInput from "../../Forms/Input";
import Popper from "popper.js";

const SelectOptions = {
  name: "SelectOptions",
  data() {
    return {
      options: [],
      searchInput: "",
      result: null,
      flipped: false,
      popperJS: null,
      popperOptions: {
        placement: this.top ? "top" : "bottom",
        eventsEnabled: false,
        modifiers: {
          offset: {
            offset: "0, 0"
          },
          flip: {
            boundriesElement: "viewport"
          }
        }
      }
    };
  },
  components: {
    mdbInput
  },
  props: {
    search: {
      type: Boolean,
      default: false
    },
    searchPlaceholder: {
      type: String
    },
    show: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: false
    },
    bg: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String
    },
    flipOnScroll: {
      type: Boolean,
      default: false
    },
    scroll: {
      type: Boolean,
      default: false
    },
    maxHeight: {
      type: String
    },
    resultText: {
      type: String
    },
    disableFilter: {
      type: Boolean,
      default: false
    },
    multiple: Boolean,
    id: String,
    top: {
      type: Boolean,
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    wrapperStyle() {
      return this.icon
        ? this.outline
          ? `margin-left: 33px; width: calc(100% - 33px)`
          : `margin-left: 40px; width: calc(100% - 40px)`
        : "";
    },
    optionsClass() {
      return this.scroll ? "options-container scrollbar-grey thin" : "";
    },
    optionsStyle() {
      return this.scroll ? `max-height: ${this.maxHeight}` : "";
    }
  },
  mounted() {
    window.addEventListener("keyup", this.close);

    let offset = this.bg ? "0, 48px" : "0, 12px";

    if (!this.outline) this.popperOptions.modifiers.offset.offset = offset;
    this.popperOptions.onUpdate = this.setFlipped;
    this.popperOptions.onCreate = this.setFlipped;
    if (this.flipOnScroll) this.popperOptions.eventsEnabled = true;

    if (this.search) {
      this.options = this.$refs.options.querySelectorAll("li");
    }

    if (this.appendToBody && !this.multiple) {
      const [body] = document.getElementsByTagName("body");
      body.appendChild(this.$el);

      this.calculatePosition();

      window.addEventListener("resize", this.calculatePosition);
    }
  },
  updated() {
    if (this.search && this.show) {
      this.options = this.$refs.options.querySelectorAll("li");
    }
  },
  beforeDestroy() {
    if (this.popperJS) this.popperJS.destroy();
    window.removeEventListener("keyup", this.close);

    if (this.appendToBody && !this.multiple) {
      window.removeEventListener("resize", this.calculatePosition);
    }
  },
  methods: {
    calculatePosition() {
      const parent = this.$parent.$el.getBoundingClientRect();

      const icon = this.icon ? (this.outline ? 33 : 40) : 0;
      const outline = this.outline ? 40 : 0;

      this.$el.style.top = parent.y + window.scrollY + outline + "px";
      this.$el.style.left = parent.x + window.scrollX + "px";
      this.$el.style.width = parent.width - icon + "px";
    },
    close(e) {
      if (this.show && e.keyCode === 27) {
        this.$emit("close");
      }
    },
    beforeEnter(el) {
      this.$nextTick(() => {
        const translation =
          (this.flipped && !this.top) || (this.top && !this.flipped)
            ? 100
            : -100;
        this.$refs.wrapper.style.transitionDuration = "0s";
        this.$refs.wrapper.style.transform = `translateY(${translation}%)`;
        el.style.opacity = 0;
      });
    },
    enter(el) {
      setTimeout(() => {
        this.$refs.wrapper.style.transitionDuration = "0.3s";
        el.style.opacity = 1;
        this.$refs.wrapper.style.transform = "translateY(0%)";
      }, 0);
    },
    afterEnter() {
      //Neccessary update to resolve a conflict between Popper.js positioning and css styling
      if (this.outline && (this.flipped || this.top)) this.updatePopper();
    },
    leave(el) {
      const translation =
        (this.flipped && !this.top) || (this.top && !this.flipped) ? 100 : -100;
      this.$refs.wrapper.style.transform = `translateY(${translation}%)`;
      el.style.opacity = 0;
    },
    afterLeave() {
      if (!this.search) return;
      //Clearing the search field
      if (!this.disableFilter) {
        this.searchInput = "";
        this.searchValue("");
      }
    },
    setFlipped(data) {
      this.flipped = data.flipped;
      if ((data.flipped && !this.top) || (!data.flipped && this.top)) {
        const offset = this.outline
          ? this.appendToBody
            ? "-50px"
            : "0px"
          : "46px";

        const margin = this.outline && !this.appendToBody ? "52px" : "0px";
        this.$refs.options.style.top = offset;
        this.$refs.options.style.marginBottom = margin;
      }
    },

    updatePopper() {
      if (this.appendToBody && !this.multiple) this.calculatePosition();

      this.popperJS ? this.popperJS.update() : this.createPopper();
      setTimeout(() => {
        if (this.search && this.show) this.$refs.search.focus();
      }, 10);
    },

    searchValue(value) {
      this.$emit("search", value);
      if (this.disableFilter) return;

      let result = 0;

      this.options.forEach(function(option) {
        let optionValue = option
          .getElementsByTagName("span")[0]
          .innerText.toLowerCase();

        if (optionValue.includes(value.toLowerCase())) {
          option.style.display = "block";
          result++;
        } else {
          option.style.display = "none";
        }
      });

      this.result = result;

      this.updatePopper();
    },

    createPopper() {
      this.popperJS = new Popper(
        this.$refs.popper,
        this.$refs.options,
        this.popperOptions
      );
    }
  },
  watch: {
    show(value) {
      if (value) {
        this.updatePopper();
      }
    },
    options(value, previous) {
      if (!this.show || value.length === previous.length) return;

      this.$nextTick(this.updatePopper);
    }
  }
};

export default SelectOptions;
export { SelectOptions as mdbSelectDropdown };
</script>

<style scoped>
.dropdown-content {
  display: block;
  width: 100%;
  overflow-y: hidden;
  transition-property: height, opacity;
  transition-timing-function: linear;
  transition-duration: 0.3s;
  background-color: transparent !important;
}

.dropdown-content .search-wrap {
  display: block;
  padding: 1rem 0 0;
  margin: 0 0.7rem;
}

.scrollbar-grey::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  border-radius: 10px;
}

.scrollbar-grey::-webkit-scrollbar {
  width: 12px;
  background-color: #f5f5f5;
}

.scrollbar-grey::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #9e9e9e;
}

.thin::-webkit-scrollbar {
  width: 4px;
}

.options-container {
  overflow-y: scroll;
}

.select-inner-wrapper {
  transition-property: height, transform;
  transition-timing-function: linear;
  transition-duration: 0.3s;
  overflow-y: hidden;
  background-color: white;
}
</style>
