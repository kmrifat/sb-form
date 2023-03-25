<template>
  <div :class="fieldInfo.col ? 'col-'+fieldInfo.col : 'col-12'">
    <label class="form-label">{{ fieldInfo.label }} {{ fieldInfo.required ? '*' : '' }} </label>
    <input
        class="form-control"
        :class="fieldInfo.error ? 'is-invalid': ''"
        :value="modelValue"
        type="date"
        @input="$emit('update:modelValue', $event.target.value);fieldInfo.error = false"
        :placeholder="fieldInfo.placeholder ? fieldInfo.placeholder : fieldInfo.label"
    />
    <div class="invalid-feedback">
      {{ fieldInfo.error ? fieldInfo.error[0] : '' }}
    </div>
  </div>
</template>

<script>
import {DateField} from "../models";

export default {
  name: "DateField",
  // props: ['modelValue', 'fieldInfo'],
  props: {
    modelValue: {},
    fieldInfo: {
      type: DateField,
      required: true,
      default: () => new DateField()
    }
  },
  emits: ['update:modelValue'],
}
</script>

<style scoped>

</style>
