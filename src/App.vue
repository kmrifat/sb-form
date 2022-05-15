<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import SBForm from "./components/sb-form/SBForm.vue";
import {ref} from "vue";
import apiService from "./services/apiService";

const fields = ref({
  name: {
    label: 'Full Name'
  },
  email: {
    label: 'Email Address'
  },
  photo: {
    label: 'Photo',
    type: 'file_field'
  }
})


</script>

<template>
  <h1>Testing and build my first ever vue component library</h1>
  <div class="px-4"></div>
  <SBForm title="User Registration Form" :axios="apiService" :fields="fields" url="/api/users"/>
</template>

<style>

</style>
