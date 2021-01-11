<template>
  <component
    :is="tag"
    @click="handleClick"
    @keydown.delete="handleDeletePress"
    :class="classes"
  >
    <div
      v-for="chip of chipsList"
      :key="chip.id"
      :class="chipClasses"
      @click="wave"
    >
      {{ chip }}
      <i class="fas fa-times close" @click="handleCloseClick(chip)" />
    </div>
    <input
      class="input"
      type="text"
      :value="inputValue"
      @input="handleChange"
      @change="handleChange"
      @blur="onBlur"
      :placeholder="calculatePlaceholder"
      @keyup="handleKeyEvents"
    />
    <mdb-btn
      v-if="btn"
      flat
      icon="plus"
      icon-class="dark-grey-text"
      @click="addChip"
      class="add-chip-btn"
    ></mdb-btn>
  </component>
</template>

<script>
import waves from "../../../mixins/waves";
import mdbBtn from "../../Components/Button";

const ChipInput = {
  components: {
    mdbBtn
  },
  props: {
    tag: {
      type: String,
      default: "div"
    },
    chips: {
      type: [String, Array],
      default: () => []
    },
    placeholder: {
      type: String
    },
    secondaryPlaceholder: {
      type: String
    },
    chipColor: {
      type: String
    },
    chipText: {
      type: String
    },
    chipGradient: {
      type: String
    },
    chipSize: {
      type: String
    },
    waves: {
      type: Boolean,
      default: false
    },
    darkWaves: {
      type: Boolean,
      default: true
    },
    value: {
      type: Array
    },
    btn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      chipsList: [],
      inputValue: "",
      isTouched: false
    };
  },
  methods: {
    addChip() {
      if (this.chipsList.includes(this.inputValue) || this.inputValue === "") {
        this.inputValue = "";
        return;
      }

      this.chipsList.push(this.inputValue);
      this.inputValue = "";
      this.$emit("input", this.chipsList);
    },
    // focus behavior
    handleClick() {
      this.isTouched = true;
      this.$el.querySelector("input").focus();
    },
    onBlur() {
      this.isTouched = false;
    },
    // update inputValue on change
    handleChange(e) {
      this.inputValue = e.target.value;
    },
    // handle adding new Chips:
    handleKeyEvents(e) {
      if (e.which == 13) {
        if (/^ *$/.test(this.inputValue)) {
          this.inputValue = "";
          return;
        }
        this.addChip();
      }
    },
    // handle removal - by pressing "Backspace" or "Delete":
    handleDeletePress() {
      if (this.isReadyToDelete) {
        const array = this.chipsList;
        array.pop();
        this.chipList = array;
      }
    },
    // ... and by pressing the "close" button:
    handleCloseClick(chipName) {
      const array = this.chipsList;
      const index = array.indexOf(chipName);
      array.splice(index, 1);
      this.chipsList = array;
    }
  },
  mounted() {
    this.chipsList = this.value === undefined ? this.chips : this.value;
  },
  computed: {
    classes() {
      return ["chips", this.isTouched && "focus"];
    },
    chipClasses() {
      return [
        "chip",
        this.chipSize && "chip-" + this.chipSize,
        this.chipColor && this.chipColor,
        this.chipText && this.chipText + "-text",
        this.chipGradient && this.chipGradient + "-gradient",
        this.waves && "ripple-parent"
      ];
    },
    isReadyToDelete() {
      if (this.inputValue == "") {
        return true;
      }
      return false;
    },
    calculatePlaceholder() {
      let calculatedPlaceholder =
        !this.secondaryPlaceholder && this.placeholder
          ? this.placeholder
          : this.secondaryPlaceholder;
      let calculatedSecondaryPlaceholder =
        !this.placeholder && this.secondaryPlaceholder
          ? this.secondaryPlaceholder
          : this.placeholder;
      if (this.chipsList.length > 0) {
        return calculatedSecondaryPlaceholder;
      }
      return calculatedPlaceholder;
    }
  },
  watch: {
    value(value) {
      this.chipsList = value;
    }
  },
  mixins: [waves]
};

export default ChipInput;
export { ChipInput as mdbChipInput };
</script>

<style scoped>
.chips {
  position: relative;
}

.add-chip-btn {
  position: absolute;
  bottom: 10px;
  right: 0;
  background-color: #eceff1;
  border-radius: 50%;
  padding: 0;
  height: 40px;
  width: 40px !important;
}
</style>
