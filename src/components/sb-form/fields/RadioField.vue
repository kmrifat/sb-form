<template>
  <div :class="fieldInfo.col ? 'col-'+fieldInfo.col : 'col-12'">
    <label for="" v-if="fieldInfo.label" class="form-label">{{ fieldInfo.label }}</label>
    <br v-if="fieldInfo.label">
    <div class="form-check"
         :class="{'form-check-inline': fieldInfo.inline === true}">
      <input class="form-check-input"
             :id="`${fieldInfo.option?.value}`"
             :value="fieldInfo.option?.value"
             :checked="isSelected(fieldInfo.option?.value)"
             @change="updateSingleSelected($event.target?.value)"
             type="checkbox">
      <label class="form-check-label"
             :for="`${fieldInfo.option?.value}`">
        {{ fieldInfo.option?.label }}
      </label>
    </div>
  </div>

</template>

<script>
import {RadioField} from "../models";

export default {
  name: "RadioField",
  props: {
    'modelValue': {
      type: [String, Array],
      default: () => []
    },
    fieldInfo: {
      type: RadioField,
      required: true,
      default: () => new RadioField()
    }
  },
  emits: ['update:modelValue'],
  methods: {
    isSelected(value) {
      return this.modelValue.includes(value);
    },
    updateSelected(value) {
      const selectedSet = new Set(this.modelValue);
      if (selectedSet.has(value)) {
        selectedSet.delete(value);
      } else {
        selectedSet.add(value);
      }
      const selectedValues = [...selectedSet];
      this.$emit('update:modelValue', selectedValues);
    },

    updateSingleSelected(value) {
      let selectedValue = value
      if (value === this.modelValue) {
        selectedValue = ''
      }
      this.$emit('update:modelValue', selectedValue);
    }
  },

}
</script>

<style scoped>

</style>
