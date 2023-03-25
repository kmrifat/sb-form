<template>
  <div :class="fieldInfo.col ? 'col-'+fieldInfo.col : 'col-12'">
    <label for="" v-if="fieldInfo.label" class="form-label">{{ fieldInfo.label }}</label>
    <br v-if="fieldInfo.label">
    <div v-for="(option, index) in fieldInfo.options" class="form-check"
         :class="{'form-check-inline': fieldInfo.inline === true}">
      <input class="form-check-input"
             :value="option.value" :checked="isSelected(option.value)" @change="updateSelected($event.target.value)"
             type="checkbox" :id="`${option.value}${index}`">
      <label class="form-check-label" :for="`${option.value}${index}`">{{ option.label }}</label>
    </div>
  </div>

</template>

<script>
import {CheckboxField} from "../models";

export default {
  name: "CheckboxField",
  props: {
    'modelValue': {
      type: Array,
      default: () => []
    },
    fieldInfo: {
      type: CheckboxField,
      required: true,
      default: () => new CheckboxField()
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
    }
  },

}
</script>

<style scoped>

</style>