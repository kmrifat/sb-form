<template>
  <h1>Testing and build my first ever vue component library</h1>
  <div class="px-4"></div>
  <SBForm title="User Registration Form" :axios="axios" :fields="fields" url="/api/users"/>
</template>

<script>
import SBForm from "../components/sb-form/SBForm.vue";
import apiService from "../services/apiService";
import {
  CheckboxField, CustomField,
  EmailField,
  FileFiled, MultiFileFiled,
  PasswordField, RadioField,
  SelectField,
  StringField, TextField
} from "../components/sb-form/models";
import Rifat from "./Rifat.vue";

export default {
  name: "FormView",
  components: {
    SBForm
  },
  data: () => ({
    axios: apiService,
    fields: {
      radio: new RadioField({
        label: 'Radio',
        inline: true,
        name:'radio',
        options: [
          {value: 1, label: 'Active'},
          {value: 0, label: 'Inactive'}
        ],
        value: 1,
      }),
      name: new StringField({label: 'Full Name', value: 'Rifat'}),
      email: new EmailField({label: 'Email Address'}),
      password: new PasswordField({label: 'Password'}),
      photo: new FileFiled({label: 'Photo'}),
      multi_photo: new MultiFileFiled({label: 'Multi Photo'}),
      gender: new SelectField({
        label: 'Gender',
        options: [{id: 1, name: 'Rifat'}],
        config: {value: 'id', display: 'name'},
        value: 1
      }),
      multi_checkbox: new CheckboxField({
        label: 'Multiple Check Box',
        inline: true,
        options: [
          {label: 'Hello 1', value: 1},
          {label: 'Hello 2', value: 2},
          {label: 'hello 3', value: 3}
        ],
        value: [1, 2]
      }),
      single_checkbox: new CheckboxField({
        label: 'Single Checkbox',
        option: {
          value: 'active', label: 'Active'
        },
        value:'active',
      }),
      rifat: new CustomField({
        component: Rifat,
        value: 'Rifat'
      })
    }
  })
}
</script>

<style scoped>

</style>
