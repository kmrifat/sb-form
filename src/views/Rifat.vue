<!-- MultiSelect.vue -->
<template>
  <div>
    <select class="form-control" multiple v-model="selectedValues">
      <option v-for="(option, index) in ['asdf','rrr','6789']"
              :key="index"
              :value="option.value">
        {{ option}}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    }
  },
  computed: {
    selectedValues: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit('update:value', newValue);
      },
    },
  },
};
</script>
