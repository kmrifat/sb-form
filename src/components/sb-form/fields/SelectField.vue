<template>
  <div :class="fieldInfo.col ? 'col-'+fieldInfo.col : 'col-12'">
    <label class="form-label">{{ fieldInfo.label }} {{ fieldInfo.required ? '*' : '' }}</label>
    <select :value="modelValue" @change="setModel($event);fieldInfo.error = false"
            :class="fieldInfo.error ? 'is-invalid': ''"
            class="form-select">
      <option value="">Select One</option>
      <option v-for="option in fieldInfo.options"
              :value="fieldInfo.config.value ? option[fieldInfo.config.value] : option">
        {{ fieldInfo.config.display ? option[fieldInfo.config.display] : option }}
      </option>
    </select>
    <div v-if="fieldInfo.config.help" class="form-text">{{ fieldInfo.config.help }}</div>

    <div class="invalid-feedback">
      {{ fieldInfo.error ? fieldInfo.error[0] : '' }}
    </div>
  </div>
</template>

<script>

import SelectField from "../models/SelectField";

export default {
  name: "SelectField",
  // props: ['modelValue', 'fieldInfo', 'axios'],
  props: {
    modelValue: {},
    fieldInfo: {
      type: SelectField,
      required: true,
      default: () => new SelectField()
    }
  },
  emits: ['update:modelValue'],
  methods: {
    setModel($event) {
      this.$emit('update:modelValue', $event.target.value)
    },
    fetchOptionData() {
      this.axios.get(this.fieldInfo.fetchUrl).then(response => {
        this.fieldInfo.options = response.data
      })
    },
  },
  mounted() {
    if (this.fieldInfo.fetchUrl) this.fetchOptionData()
  }
}
</script>

<style scoped>

</style>
