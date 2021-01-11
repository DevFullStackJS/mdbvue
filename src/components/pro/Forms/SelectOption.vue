<template>
  <li :class="className" @click="select" tabindex="0" @keydown.enter.stop="select" @keydown.space.stop="select" class="option" role="option" :aria-selected="active" :aria-disabled="disabled" @mouseover="hover = true" @mouseleave="hover = false">
    <input tabindex="-1" v-if="multiple && !optgroup" type="checkbox" class="form-check-input" :checked="active && !disabled" :disabled="disabled"/>
    <label v-if="multiple" :data-value="value" class="form-check-label"></label>
    <img v-if="icon" :src="icon" :data-value="value" :alt="alt" class="rounded-circle" />
    <span class="filtrable" :data-value="value">
      <slot></slot>
      <p v-if="secondaryText" class="m-0 p-0 dark-grey-text">{{secondaryText}}</p>
    </span>
       
  </li>
</template>

<script>
const SelectOption = {
  name: 'SelectOption',
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number]
    },
    secondaryText: {
      type: String
    },
    icon: {
      type: String
    },
    alt: {
      type: String,
      default: "Option icon"
    },
    active: {
      type: Boolean,
      default: false
    },
    selectAll: {
      type: Boolean,
      default: false
    },
    optgroup: {
      type: Boolean,
      default: false
    },
    color: String
  },
  data() {
    return {
      hover: false
    }
  },
  computed: {
    className() {
      const colors = ['danger', 'warning', 'success', 'info', 'default', 'secondary', 'primary', 'elegant', 'stylish', 'unique', 'special'];
      return [
        this.disabled && 'disabled',
        this.active && !this.disabled && 'active',
        this.optgroup && 'optgroup',
        (this.hover || this.active ) ? colors.indexOf(this.color) === -1 ? this.color : `${this.color}-color` : '',
        (this.hover || this.active ) && this.color ? 'white-text ' : '',
        this.color && 'select-colorful-option'
      ];
    }
  },
  methods: {
    select() {
      if (this.selectAll) {
        this.$emit('allSelect');
      } else {
        this.$emit('select', this.value, this.$slots.default[0].text);
      }
    },
  }
};

export default SelectOption;
export { SelectOption as mdbSelectOption };
</script>

<style scoped>
label {
  float: left;
  margin-left: 10px;
  margin-top: -6px;
  margin-bottom: 0;
}

.option:focus {
  outline: none;
  background-color: #f5f5f5;
}

.dropdown-content li.active {
  background-color: #eee;
}

.dropdown-content li:hover {
  background-color: #f5f5f5;
}

.filtrable {
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;
  white-space: nowrap;
  vertical-align: middle;
}

.white-text span {
  color: white;
}

.colorful-select li:hover .form-check-input[type="checkbox"]:not(:checked)+label:before, label.btn input[type="checkbox"]:checked+label:before {
  border-color: white;
}

.colorful-select .form-check-input[type="checkbox"]:checked+label:before, label.btn input[type="checkbox"]:checked+label:before {
  border-right: 2px solid white;
  border-bottom: 2px solid white;
}

.colorful-select .filtrable {
  box-shadow: none!important;
  -webkit-box-shadow: none!important;
}

.select-colorful-option {
  transition: background-color 0.4s linear;
}


</style>

