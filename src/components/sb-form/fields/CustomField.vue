<template>
  <div :class="fieldInfo.col ? 'col-'+fieldInfo.col : 'col-12'">
    <component :is="fieldInfo.component" v-model="model"></component>
  </div>
</template>

<script>
import {CustomField, VueComponentProp} from "../models";

export default {
  name: "CustomField",
  props: {
    modelValue: {
      type: [String, Array],
      default: ''
    },
    fieldInfo: {
      type: CustomField,
      required: true,
      default: () => new CustomField(),
      validator: (value) => {
        return !!value.component && VueComponentProp.validator(value.component);
      },
    }
  },
  computed: {
    model: {
      get() {
        return this.fieldInfo.value;
      },
      set(newValue) {
        this.$emit('update:fieldInfo.value', new CustomField({
          component: this.fieldInfo.component,
          value: newValue,
        }));
      },
    },
  },
}
</script>

<style scoped>

</style>