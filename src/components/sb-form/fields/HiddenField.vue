<template>

</template>

<script>
import {HiddenField} from "../models";

export default {
  name: "HiddenField",
  props: {
    fieldInfo: {
      type: HiddenField,
      required: true,
      default: new HiddenField()
    }
  }
}
</script>

<style scoped>

</style>
