<template>
  <div class="dataTables_length d-inline-block">
    <div class="d-flex">
      <label class="pt-2 pr-1">{{title}}:</label>
      <mdb-select @getValue="getOptionValue" wrapperClass="mdb-datatable-select" :options="options"></mdb-select>
    </div>
  </div>
</template>

<script>
import mdbSelect from '../Forms/Select';

const DatatableSelect = {
  name: "Datatable2Select",
  components: {
    mdbSelect
  },
  props: {
    entries: {
      type: Number,
      default: 10
    },
    options: {
      type: Array
    },
    title: {
      type: String,
      default: 'Rows per page'
    }
  },
  methods: {
    getOptionValue(value) {
      this.$emit('getValue', value);
    }
  }
};

export default DatatableSelect;
</script>