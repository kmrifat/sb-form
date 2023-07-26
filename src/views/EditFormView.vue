<template>
  <h1>Testing and build my first ever vue component library</h1>
  <div class="px-4"></div>
  <SBForm :axios="axios" title="Edit Form" fetch-url="/todo/1" :fields="fields"></SBForm>
</template>

<script>
import SBForm from "../components/sb-form/SBForm.vue";
import apiService from "../services/apiService";
import {CheckboxField, StringField} from "../components/sb-form/models";

export default {
  name: "EditFormView",
  components: {
    SBForm
  },
  data: () => ({
    axios: apiService,
    fields: {
      title: new StringField({label: 'Title'}),
      status: new CheckboxField({label: 'Status'})
    }
  })
}
</script>

<style scoped>

</style>