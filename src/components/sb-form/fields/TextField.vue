<template>
  <div :class="fieldInfo.col ? 'col-'+fieldInfo.col : 'col-12'">
    <label class="form-label">{{ fieldInfo.label }} {{ fieldInfo.required ? '*' : '' }}</label>
    <textarea class="form-control"
              :class="fieldInfo.error ? 'is-invalid': ''"
              :value="modelValue"
              @input="$emit('update:modelValue', $event.target.value);fieldInfo.error = false"
              :placeholder="fieldInfo.placeholder ? fieldInfo.placeholder : fieldInfo.label"
    ></textarea>
    <div class="invalid-feedback">
      {{ fieldInfo.error ? fieldInfo.error[0] : '' }}
    </div>
  </div>
</template>

<script>
import {TextField} from "../models";

export default {
  name: "InputField",
  // props: ['modelValue', 'fieldInfo'],
  props: {
    modelValue: {},
    fieldInfo: {
      type: TextField,
      required: true,
      default: new TextField()
    }
  },
  emits: ['update:modelValue'],
}
</script>

<style scoped>

</style>
