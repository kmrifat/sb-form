<template>
  <h1>Testing and build my first ever vue component library</h1>
  <div class="px-4"></div>
  <SBForm title="User Registration Form" :axios="axios" :fields="fields" url="/api/users"/>
</template>

<script>
import SBForm from "../components/sb-form/SBForm.vue";
import apiService from "../services/apiService";

export default {
  name: "FormView",
  components: {
    SBForm
  },
  data: () => ({
    axios: apiService,
    fields: {
      name: {
        label: 'Full Name'
      },
      email: {
        label: 'Email Address'
      },
      password: {
        label: 'Password',
        type: 'password'
      },
      photo: {
        label: 'Photo',
        type: 'file_field'
      }
    }
  })
}
</script>

<style scoped>

</style>