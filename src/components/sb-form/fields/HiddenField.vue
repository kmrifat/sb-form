<template>

</template>

<script>
import {HiddenFields} from "../models";

export default {
  name: "HiddenField",
  props: {
    fieldInfo: {
      type: HiddenFields,
      required: true,
      default: new HiddenFields()
    }
  }
}
</script>

<style scoped>

</style>
