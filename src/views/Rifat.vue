<template>
  <input
      type="text"
      :value="title"
      @input="$emit('update:title', $event.target.value)"
  />
</template>

<script>
export default {
  name: "Rifat",
  props: ['title'],
  emits: ['update:title']
}
</script>

<style scoped>

</style>