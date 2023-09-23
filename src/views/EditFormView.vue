<template>
  <h1>Testing and build my first ever vue component library</h1>
  <div class="px-4"></div>
  <SBForm :axios="axios" title="Edit Form" fetch-url="/medical-documents/1" :fields="fields"></SBForm>
</template>

<script>
import SBForm from "../components/sb-form/SBForm.vue";
import apiService from "../services/apiService";
import {
  DateField,
  MultiFileFiled,
  StringField
} from "../components/sb-form/models";

export default {
  name: "EditFormView",
  components: {
    SBForm
  },
  data: () => ({
    axios: apiService,
    fields: {
      name: new StringField({label: 'Name', col: '4'}),
      date: new DateField({label: 'Date', col: '4'}),
      files: new MultiFileFiled({label: 'Files', col: '12'}),
    }
  })
}
</script>

<style scoped>

</style>
