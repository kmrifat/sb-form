<template>
  <h1>Testing and build my first ever vue component library</h1>
  <div class="px-4"></div>
  <SBForm title="User Registration Form" :axios="axios" :fields="fields" url="/api/users"/>
</template>

<script>
import SBForm from "../components/sb-form/SBForm.vue";
import apiService from "../services/apiService";
import {
  CheckboxField,
  EmailField,
  FileFiled,
  PasswordField,
  SelectField,
  StringField
} from "../components/sb-form/models";

export default {
  name: "FormView",
  components: {
    SBForm
  },
  data: () => ({
    axios: apiService,
    fields: {
      name: new StringField({label: 'Full Name', value: 'Rifat'}),
      email: new EmailField({label: 'Email Address'}),
      password: new PasswordField({label: 'Password'}),
      photo: new FileFiled({label: 'Photo'}),
      gender: new SelectField({
        label: 'Gender',
        options: [{id: 1, name: 'Rifat'}],
        config: {value: 'id', display: 'name'},
        value: 1
      }),
      checkbox: new CheckboxField({
        label: 'Check Box',
        inline: true,
        options: [
          {label: 'Hello 1', value: 1},
          {label: 'Hello 2', value: 2},
          {label: 'hello 3', value: 3}
        ],
        value: [1, 2]
      })
    }
  })
}
</script>

<style scoped>

</style>