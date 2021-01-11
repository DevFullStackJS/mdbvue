<template>
  <component
    :is="tag"
    :class="className"
    :style="style"
    @mouseleave="handleMouseleave"
  >
    <ul v-if="items" :class="ulClass" class="text-center">
      <li v-for="(item, i) in items" :key="i">
        <transition
          enter-active-class="animated enterBtnFixed"
          leave-active-class="animated leaveBtnFixed"
        >
          <mdb-btn
            v-if="show"
            tag="a"
            floating
            :size="item.size"
            :color="item.color"
            :icon="item.icon"
            :fad="item.fad"
            :far="item.far || item.regular"
            :fal="item.fal || item.light"
            :fab="item.fab || item.brands"
            :href="item.href"
            @click="handleItemClick($event, item)"
          ></mdb-btn>
        </transition>
      </li>
    </ul>
    <ul v-else :class="ulClass">
      <slot></slot>
    </ul>
    <mdb-btn
      tag="a"
      floating
      :size="size"
      :color="color"
      @click="handleClick"
      @mouseenter.native="handleMouseenter"
    >
      <mdb-icon
        :icon="icon"
        :fad="fad"
        :far="far || regular"
        :fal="fal || light"
        :fab="fab || brands"
      />
    </mdb-btn>
  </component>
</template>

<script>
import mdbBtn from "../../Components/Button";
import mdbIcon from "../../Content/Fa";

const BtnFixed = {
  components: {
    mdbBtn,
    mdbIcon
  },
  props: {
    tag: {
      type: String,
      default: "div"
    },
    items: [Array],
    color: {
      type: String,
      default: "red"
    },
    size: {
      type: String
    },
    icon: {
      type: String,
      default: "pencil"
    },
    right: {
      type: Number
    },
    bottom: {
      type: Number
    },
    left: {
      type: Number
    },
    top: {
      type: Number
    },
    far: {
      type: Boolean,
      default: false
    },
    regular: {
      type: Boolean,
      default: false
    },
    fal: {
      type: Boolean,
      default: false
    },
    light: {
      type: Boolean,
      default: false
    },
    fab: {
      type: Boolean,
      default: false
    },
    fad: {
      type: Boolean,
      default: false
    },
    brands: {
      type: Boolean,
      default: false
    },
    trigger: {
      type: String,
      default: "hover"
    }
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    handleClick() {
      if (this.trigger === "click") {
        this.show = !this.show;
      }
    },
    handleItemClick(e, item) {
      if (item.event) this.$emit(item.event, e);
    },
    handleMouseenter() {
      if (this.trigger === "hover") {
        this.show = true;
      }
    },
    handleMouseleave() {
      if (this.trigger === "hover") {
        this.show = false;
      }
    }
  },
  computed: {
    className() {
      // return ["fixed-action-btn"];
      return "mdb-fixed-btn";
    },
    ulClass() {
      return ["list-unstyled"];
    },
    style() {
      const vertical = this.top !== undefined ? 'top' : 'bottom';
      const horizontal = this.left !== undefined ? 'left' : 'right';
      const style = {};
      style[vertical] = this[vertical] + 'px';
      style[horizontal] = this[horizontal] + 'px'
      return style;
    }
  }
};

export default BtnFixed;
export { BtnFixed as mdbBtnFixed };
</script>

<style scoped>
.mdb-fixed-btn {
  position: fixed;
}

.mdb-fixed-btn ul {
  position: relative;
}

@keyframes enterBtnFixed {
  from {
    opacity: 0;
    transform: scale(0.4) translateY(40px);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.enterBtnFixed {
  animation-name: enterBtnFixed;
  animation-duration: 0.3s;
}

@keyframes leaveBtnFixed {
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.4) translateY(40px);
  }
}

.leaveBtnFixed {
  animation-name: leaveBtnFixed;
  animation-duration: 0.3s;
}
</style>
