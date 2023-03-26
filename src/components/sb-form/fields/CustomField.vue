<template>
  <div :class="fieldInfo.col ? 'col-'+fieldInfo.col : 'col-12'">
    <component :is="fieldInfo.component"
               :value="modelValue"
               @input="$emit('update:modelValue', $event.target.value)"
    ></component>
  </div>
</template>

<script>
import {CustomField, VueComponentProp} from "../models";

export default {
  name: "CustomField",
  props: {
    modelValue: {},
    fieldInfo: {
      type: CustomField,
      required: true,
      default: () => new CustomField(),
      validator: (value) => {
        return !!value.component && VueComponentProp.validator(value.component);
      },
    }
  },
  emits: ['update:modelValue'],
  computed: {
    model: {
      get() {
        return this.modelValue;
      },
      set(newValue) {
        console.log('ads')
        this.$emit('update:myProp', newValue);
      },
    },
  },
}
</script>

<style scoped>

</style>