<template>
  <component :is="outerTag" :class="outerClasses">
    <component
      :is="tag"
      :class="wrapperClasses"
      :style="wrapperStyles"
      v-mdb-click-outside.mousedown="away"
    >
      <span :class="caretClasses">{{ toggle ? "▲" : "▼" }}</span>
      <mdb-select-input
        ref="input"
        @mousedown.native.left="toggleOptions"
        @blur="blur"
        @active="focused = $event"
        @keydown.native.stop="handleKeydown"
        :iconClass="iconClass"
        :labelClass="labelClass"
        :disabled="disabled"
        :text="inputText"
        :value="inputValue"
        :validation="wasValidated"
        :valid="valid"
        :validFeedback="validFeedback"
        :invalidFeedback="invalidFeedback"
        :placeholder="placeholder"
        :label="label"
        :icon="icon"
        :far="far"
        :fab="fab"
        :fal="fal"
        :search="search"
        :toggle="toggle"
        :name="name"
        :required="required"
        :bg="bg"
        :id="id"
        :aria-owns="id"
      />
      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <span
          v-if="resetBtn && !toggle && selectedItems.length > 0"
          class="close-btn"
        >
          <mdb-btn
            @click.native.stop="reset"
            class="p-0 m-0"
            flat
            :class="this.focused && 'text-primary'"
            icon="times"
            size="sm"
          ></mdb-btn>
        </span>
      </transition>
      <keep-alive>
        <mdb-select-options
          :top="top"
          :appendToBody="appendToBody"
          :multiple="multiple"
          :show="toggle"
          :scroll="scroll"
          :maxHeight="maxHeight"
          :resultText="resultText"
          :icon="icon"
          :outline="outline"
          :bg="bg"
          :search="search"
          :searchPlaceholder="searchPlaceholder"
          :flipOnScroll="flipOnScroll"
          :disableFilter="disableFilter"
          @close="toggle = false"
          class="collapse-item"
          @focusOption="focusOption"
          @search="$emit('search', $event)"
          :id="id"
        >
          <mdb-select-option
            v-if="multiple && selectAll"
            :multiple="multiple"
            :color="color"
            selectAll
            @allSelect="allSelect"
            :active="selectAllState"
            >{{ selectAllPlaceholder }}</mdb-select-option
          >
          <mdb-select-option
            v-for="(option, index) in data"
            ref="option"
            @select="getSelectedOption"
            @keydown.native.prevent="navigateOptions($event, option)"
            :multiple="multiple"
            :value="option.value"
            :secondary-text="option.secondaryText"
            :disabled="option.disabled"
            :active="option.selected"
            :icon="option.icon"
            :optgroup="option.optgroup"
            :color="color"
            :key="index"
            >{{ option.text }}</mdb-select-option
          >
          <slot></slot>
          <template #footer><slot name="footer"></slot></template>
        </mdb-select-options>
      </keep-alive>
    </component>
  </component>
</template>

<script>
import mdbSelectInput from "./SelectInput";
import mdbSelectOptions from "./SelectOptions";
import mdbSelectOption from "./SelectOption";
import mdbBtn from "../../Components/Button";
import mdbClickOutside from "../../../directives/clickOutside";

const Select = {
  name: "Select",
  components: {
    mdbSelectInput,
    mdbSelectOptions,
    mdbSelectOption,
    mdbBtn
  },
  props: {
    tag: {
      type: String,
      default: "div"
    },
    options: {
      type: Array
    },
    selectAll: {
      type: Boolean,
      default: false
    },
    selectAllPlaceholder: {
      type: String,
      default: "Select all"
    },
    color: {
      type: String
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    search: {
      type: Boolean,
      default: false
    },
    searchPlaceholder: {
      type: String,
      default: "Search here..."
    },
    wrapperClass: {
      type: String
    },
    wrapperStyle: {
      type: String
    },
    caretClass: {
      type: String
    },
    caretStyle: {
      type: String
    },
    getValue: {
      type: Function
    },
    limitPlaceholder: {
      type: String,
      default: "options selected"
    },
    value: {
      type: Array
    },
    validation: {
      type: Boolean
    },
    customValidation: {
      type: Boolean
    },
    isValid: {
      type: Boolean
    },
    validFeedback: {
      type: [String, Boolean],
      default: false
    },
    invalidFeedback: {
      type: [String, Boolean],
      default: false
    },
    outline: {
      type: Boolean
    },
    label: {
      type: String,
      default: ""
    },
    labelClass: {
      type: String
    },
    outerClass: {
      type: String
    },
    outerTag: {
      type: String,
      default: "div"
    },
    placeholder: {
      type: String
    },
    icon: String,
    iconClass: {
      type: String
    },
    far: Boolean,
    fab: Boolean,
    fal: Boolean,
    bg: Boolean,
    scroll: {
      type: Boolean,
      default: true
    },
    visibleOptions: {
      type: Number,
      default: 4
    },
    flipOnScroll: {
      type: Boolean,
      default: true
    },
    resultText: {
      type: String,
      default: "No results"
    },
    show: {
      type: Boolean
    },
    resetBtn: {
      type: Boolean,
      default: false
    },
    name: String,
    required: Boolean,
    disableFilter: {
      type: Boolean,
      default: false
    },
    top: {
      type: Boolean,
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      toggle: false,
      inputValue: null,
      inputText: "",
      selectAllState: false,
      preselectedIndex: 0,
      defaultIndex: 0,
      defaultMultiIndexes: [],
      valid: false,
      wasValidated: false,
      activeOption: null,
      focused: false,
      selectedItems: [],
      id: ""
    };
  },
  computed: {
    data() {
      return this.options || this.value;
    },
    wrapperClasses() {
      return [
        "select-wrapper md-form",
        this.color ? "colorful-select" : "",
        this.outline && "md-outline",
        this.wrapperClass
      ];
    },
    wrapperStyles() {
      return this.wrapperStyle;
    },
    caretClasses() {
      return [
        "caret",
        "pr-2",
        this.disabled ? "disabled" : "",
        this.caretClass,
        this.focused ? "active" : ""
      ];
    },
    caretStyles() {
      return this.caretStyle;
    },

    multiTexts() {
      return this.data
        .filter(option => option.selected)
        .map(option => option.text);
    },

    multiValues() {
      return this.data
        .filter(option => option.selected)
        .map(option => option.value);
    },
    outerClasses() {
      return [
        "select-outer",
        this.outline && "select-outline",
        this.outerClass
      ];
    },
    maxHeight() {
      const secondary = this.data.find(el => el.secondaryText);
      let height = 36;
      if (secondary) height = 56;
      return this.visibleOptions * height + "px";
    }
  },
  methods: {
    setSelected() {
      this.selectedItems = this.data
        .map((option, i) => {
          option.index = i;
          return option;
        })
        .filter(option => option.selected)
        .map(option => option.index);
    },
    toggleOptions() {
      if (this.disabled) return;

      this.toggle = !this.toggle;
    },
    checkDefaultData() {
      if (!this.multiple) {
        const [index] = this.selectedItems;

        this.defaultIndex = index > -1 ? index : -1;

        return;
      }
      if (this.data.length === 0) return;
      this.data.forEach((option, index) => {
        if (option.selected === true) {
          this.defaultMultiIndexes.push(index);
        }
      });
    },
    renderInput() {
      this.setSelected();

      if (this.selectedItems.length === 0) {
        this.inputValue = null;
        this.inputText = "";
        return;
      }
      if (this.data.length === 0) return;
      if (this.multiple) {
        if (this.multiValues.length === 0) {
          this.selectFirstAvailableOption();
        }
        this.checkAllSelected();
        this.checkNumberOfSelected();
        this.inputValue = this.multiValues;
      } else {
        this.selectFirstAvailableOption();
        this.inputValue = this.data.find(x => x.selected === true).value;
        this.inputText = this.data.find(x => x.selected === true).text;
      }
    },
    selectFirstAvailableOption() {
      if (this.multiple) {
        if (typeof this.data.find(x => x.selected === true) == "undefined") {
          this.data[this.preselectedIndex].selected = true;
        }
      } else {
        let checkPreselected = false;
        this.data.forEach((option, index) => {
          if (option.selected === true) {
            checkPreselected = true;
            this.preselectedIndex = index;
          }
        });
        if (checkPreselected === false) {
          if (this.label) return;
          this.preselectedIndex = 0;
          this.data[this.preselectedIndex].selected = true;
          this.$set(
            this.data,
            this.preselectedIndex,
            this.data[this.preselectedIndex]
          );
        }
      }
    },
    checkAllSelected() {
      let checkAllSelected = true;
      this.data.forEach(option => {
        if (option.disabled) return;
        if (option.selected !== true) {
          checkAllSelected = false;
        }
      });
      if (checkAllSelected === true) {
        this.selectAllState = true;
      } else {
        this.selectAllState = false;
      }
    },
    checkNumberOfSelected() {
      if (this.multiValues.length > 4) {
        this.inputText = this.multiValues.length + " " + this.limitPlaceholder;
      } else {
        this.inputText = this.multiTexts;
      }
    },
    getSelectedOption(value, text) {
      if (this.multiple) {
        this.data.forEach(option => {
          if (option.selected && option.disabled) {
            option.selected = false;
          }
        });
        let currentOption = this.data.find(x => x.value === value);
        let currentOptionIndex = this.data.findIndex(x => x.value === value);
        let currentOptionObject = this.data[currentOptionIndex];

        if (currentOption.selected) {
          currentOptionObject.selected = false;
        } else {
          currentOptionObject.selected = true;
        }

        this.renderInput();
        this.update();
      } else {
        this.data.forEach(option => {
          option.selected = false;
        });
        this.$set(
          this.data.find(x => x.value === value),
          "selected",
          true
        );
        this.inputValue = value;
        this.inputText = text;

        this.update();

        this.away();
      }
    },
    allSelect() {
      if (this.selectAllState) {
        this.data.forEach(option => {
          option.selected = false;
        });
        this.selectAllState = false;
      } else {
        this.data.forEach(option => {
          if (option.disabled === true) {
            option.selected = false;
            return;
          }
          option.selected = true;
        });
        this.selectAllState = true;
      }

      this.checkNumberOfSelected();
      this.inputValue = this.multiValues;
      this.update();
    },
    away() {
      if (this.toggle) {
        this.toggle = false;
      }
    },
    update() {
      this.data.push({ x: false });
      this.data.pop();
      if (this.wasValidated) this.validate();
    },
    emitData() {
      if (this.multiple) {
        this.$emit("getValue", this.multiValues, this.multiTexts);
        this.$emit("change", this.multiValues, this.multiTexts);
      } else {
        this.$emit("getValue", this.inputValue, this.inputText);
        this.$emit("change", this.inputValue, this.inputText);
      }
    },
    reset() {
      if (this.multiple) {
        this.data.forEach((option, index) => {
          if (this.defaultMultiIndexes.includes(index)) {
            option.selected = true;
          } else {
            option.selected = false;
          }
        });

        this.selectAllState = false;

        this.checkNumberOfSelected();

        this.inputValue = this.multiValues;

        this.update();
      } else if (this.selectedItems.length > 0) {
        let index;

        if (this.defaultIndex !== -1) {
          index = this.defaultIndex;

          this.data[index].selected = true;
        } else {
          index = this.selectedItems[0];

          this.data[index].selected = false;
        }

        this.$set(this.data, index, this.data[index]);

        this.renderInput();

        this.update();

        this.validate();
      }

      this.setSelected();

      this.wasValidated = false;
    },
    validate() {
      if (this.validation) {
        if (this.selectedItems.length === 0) {
          this.valid = false;
          this.wasValidated = true;

          return;
        }

        if (this.multiple) {
          for (let x of this.data) {
            if (x.selected === true && x.disabled === true) {
              this.valid = false;
              break;
            }
            this.valid = true;
          }
        } else if (this.data.find(x => x.selected === true).disabled === true) {
          this.valid = false;
        } else {
          this.valid = true;
        }
        this.wasValidated = true;
      }
      if (this.customValidation) {
        if (this.isValid) {
          this.valid = true;
        } else {
          this.valid = false;
        }
        this.wasValidated = true;
      }
    },
    changeSelected(direction) {
      let next;

      if (direction === "start" || direction === "end") {
        next = direction === "start" ? 0 : this.data.length - 1;
      } else {
        let current = this.activeOption;

        if (current === -1) {
          next = 0;
        } else {
          next = current + direction;

          next =
            next > this.data.length - 1
              ? 0
              : next < 0
              ? this.data.length - 1
              : next;
        }
      }

      this.activeOption = next;

      if (this.toggle) {
        this.$refs.option[next].$el.focus();
      } else {
        const selectedOption = this.data[next];

        this.getSelectedOption(selectedOption.value, selectedOption.text);
      }
    },
    handleKeydown(e) {
      this.activeOption =
        this.selectedItems.length > 0 ? this.selectedItems[0] : -1;

      const active = this.activeOption > 0 ? this.activeOption : 0;

      switch (e.keyCode) {
        case 13:
          this.toggle = true;

          this.$refs.option[active].$el.focus();

          break;

        case 40:
          if ((e.altKey && !this.disabled && !this.toggle) || this.multiple) {
            this.toggle = true;

            this.$refs.option[active].$el.focus();
          } else {
            e.preventDefault();
            this.changeSelected(1);
          }
          break;

        case 38:
          if (e.altKey && this.toggle) {
            this.toggle = false;
            e.preventDefault();
          } else this.changeSelected(-1);

          break;

        case 27:
          this.toggle = false;
          break;

        case 36:
          this.changeSelected("start");
          break;
        case 35:
          this.changeSelected("end");
          break;
      }

      this.$emit("focus", e);
    },
    blur(e) {
      this.$emit("blur", e);
    },

    navigateOptions(e) {
      switch (e.keyCode) {
        case 40:
          this.changeSelected(1);
          break;
        case 38:
          this.changeSelected(-1);
          break;
        case 27:
          this.toggle = false;
          this.$refs.input.$refs.input.$refs.input.focus();
          break;
        case 36:
          this.changeSelected("start");
          break;
        case 35:
          this.changeSelected("end");
          break;
      }
    },
    focusOption() {
      this.$refs.option[0].$el.focus();
    }
  },
  created() {
    this.setSelected();

    this.checkDefaultData();

    this.renderInput();
  },
  mounted() {

    this.id = `mdb-select-${Math.floor(Math.random()*1000000)}`
    // set selected items

    if (this.show) {
      this.toggle = this.show;
    }

    // check active option (first selected) - later add watchers for changing values

    this.activeOption =
      this.selectedItems.length > 0 ? this.selectedItems[0] : 0;
  },
  watch: {
    options() {
      this.renderInput();
    },
    value() {
      this.renderInput();
      if (this.wasValidated) this.validate();
    },
    data() {
      this.setSelected();
      this.emitData();
    },
    isValid() {
      this.validate();
    },
    show(value) {
      this.toggle = value;
    },
    toggle(value) {
      this.$emit("toggleSelect", value);
    }
  },
  directives: { mdbClickOutside }
};

export default Select;
export { Select as mdbSelect };
</script>

<style scoped>
.collapse-item {
  position: absolute;
  top: 0;
  z-index: 9999;
  width: 100%;
}
.select-wrapper + label.active {
  font-size: 0.8rem;
}
.md-outline.select-wrapper + label {
  top: 1.35em !important;
  font-size: 14px;
}
.md-outline.select-wrapper + label.active {
  top: 0.5em !important;
  font-size: 11px;
  z-index: 2 !important;
}

.select-wrapper span.caret.active {
  color: #4285f4;
}

.select-wrapper span.caret {
  z-index: 2;
}

.close-btn {
  position: absolute;
  top: 9px;
  right: 20px;
  transition: all 0.2s ease-out;
}

.close-btn:hover {
  transform: scale(1.2);
}

.option-focus {
  background-color: blue;
}
</style>

<style>
.select-outer .colorful-select .select-dropdown {
  padding: 0;
}
.select-outer + label:not(.mdb-main-label) {
  position: absolute;
  top: 7px;
  font-size: 0.8rem;
}

.select-wrapper i {
  color: inherit;
}

.select-dropdown input {
  text-overflow: ellipsis !important;
}

.select-dropdown label {
  text-overflow: ellipsis;
  display: inline-block;
  overflow: hidden;
  max-width: 300px;
  white-space: nowrap;
  vertical-align: middle;
}

.select-dropdown.is-valid {
  background-position: center right calc(2.1875rem) !important;
}

.select-dropdown.is-valid input {
  border-color: #28a745 !important;
}

.select-dropdown.is-invalid {
  background-position: center right calc(2.1875rem) !important;
}

.select-dropdown.is-invalid input {
  border-color: #dc3545 !important;
}
</style>
