<template>
  <div :class="fieldInfo.col ? 'col-'+fieldInfo.col : 'col-12'">
    <label class="form-label">{{ fieldInfo.label }} {{ fieldInfo.required ? '*' : '' }} </label>
    <input
        class="form-control"
        :class="fieldInfo.error ? 'is-invalid': ''"
        :value="modelValue"
        :type="fieldInfo.filedType"
        @input="$emit('update:modelValue', $event.target.value);fieldInfo.error = false"
        :placeholder="fieldInfo.placeholder ? fieldInfo.placeholder : fieldInfo.label"
    />
    <div class="invalid-feedback">
      {{ fieldInfo.error ? fieldInfo.error[0] : '' }}
    </div>
  </div>

</template>

<script>
import {StringField} from "../models";

export default {
  name: "StringField",
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    fieldInfo: {
      type: StringField,
      required: true,
      default: () => new StringField()
    }
  },
  // ['modelValue', 'fieldInfo']
  emits: ['update:modelValue'],
  mounted() {
    console.log(this.fieldInfo.label)
  }
}
</script>

<style scoped>

</style>
