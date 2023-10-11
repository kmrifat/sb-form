<template>
  <div :class="fieldInfo.col ? 'col-'+fieldInfo.col : 'col-12'">
    <label class="form-label pe-2">{{ fieldInfo.label }} {{ fieldInfo.required ? '*' : '' }}</label>
    <br>
    <div v-for="(option, index) in fieldInfo.options" class="form-check"
         :class="{'form-check-inline': fieldInfo.inline === true}">
      <input class="form-check-input"
             :value="option.value"
             :checked="isSelected(option.value)"
             @change="setModel($event);fieldInfo.error = false"
             type="radio"
             :name="fieldInfo.name"
             :id="`${fieldInfo.name}-${index}`">
      <label class="form-check-label"
             :for="`${fieldInfo.name}-${index}`">
        {{ option.label }}
      </label>
    </div>
    <div class="invalid-feedback">
      {{ fieldInfo.error ? fieldInfo.error[0] : '' }}
    </div>
  </div>
</template>

<script>

import RadioField from "../models/RadioField";

export default {
  name: "RadioField",
  props: {
    axios: {
      type: Function
    },
    modelValue: {},
    fieldInfo: {
      type: RadioField,
      required: true,
      default: () => new RadioField()
    }
  },
  emits: ['update:modelValue'],
  methods: {
    isSelected(value) {
      return this.modelValue === value
    },
    setModel($event) {
      this.$emit('update:modelValue', $event.target.value)
    }
  },
}
</script>

<style scoped>

</style>

