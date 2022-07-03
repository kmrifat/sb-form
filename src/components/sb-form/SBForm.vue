<template>
  <form class="card" @submit.prevent="submit">
    <div v-if="title" class="card-header">
      <slot name="header">
        {{ title }}
      </slot>
    </div>
    <div class="card-body row">
      <slot name="fields-before"></slot>
      <template v-for="(field, key) of fields">
        <component :is="field.type ? field.type : 'string'" v-model="models[key]" :fieldInfo="field"
                   :axios="axios"
                   class="mb-1"/>
      </template>
      <slot name="fields-after"></slot>
    </div>
    <div class="card-footer">
      <slot name="footer">
        <button class="btn btn-primary float-end" type="submit">Submit</button>
      </slot>
    </div>
  </form>
</template>

<script>

import StringField from "./fields/StringField.vue";
import PasswordField from "./fields/PasswordField.vue";
import TextField from "./fields/TextField.vue";
import SelectField from "./fields/SelectField.vue";
import FileField from "./fields/FileField.vue";
import DateField from "./fields/DateField.vue";
import MultiSelectField from "./fields/MultiSelectField.vue";
import HiddenField from "./fields/HiddenField.vue";
import toastr from 'toastr';


export default {
  name: "SbForm",
  components: {
    string: StringField,
    password: PasswordField,
    text_field: TextField,
    select_field: SelectField,
    multiselect_field: MultiSelectField,
    file_field: FileField,
    date_field: DateField,
    hidden_field: HiddenField
  },
  props: {
    title: String,
    fields: Object,
    url: String,
    resetForm: {
      type: Boolean,
      default: true
    },
    callBack: {
      type: String,
      required: false
    },
    method: {
      type: String,
      default: 'post',
      validator: (value) => [
        'post',
        'put',
        'delete'
      ]
    },
    ajax: {
      type: String,
      required: false
    },
    axios: {
      type: Function
    }
  },
  data() {
    return {
      models: {},
    }
  },
  computed: {
    config() {
      return {
        method: this.method,
        data: this.models,
        url: this.url,
      }
    }
  },
  mounted() {
    this.setModelValue()
    // Fetch data from ajax if ajax props is not null
    if (this.ajax) {
      this.fetchFromAjax()
    }
  },
  methods: {
    /**
     * This method will submit to the backend with @models data
     * It will also support @callBack from the props
     * and the form reset can be enable or disable by the @resetForm props
     */
    async submit() {
      console.log(this.axios().baseURL)
      await this.axios(this.config).then(response => {
        if (this.callBack) {
          this.$parent[this.callBack](response.data);
        }
        if (this.resetForm) {
          this.setModelValue()
        }
        console.log(response)
        toastr.success(response.data.message, `${response.status} ${response.statusText}`)
      }).catch(error => {
        toastr.error(error.response.data.message, `${error.response.status} ${error.response.statusText}`)
        switch (error.response.status) {
          case 422:
            console.log(error.response.data)
            this.setValidationError(error.response.data.errors)
            break
          default:
            console.log(error.response)
            break
        }
      })
    },
    setValidationError(error_data) {
      console.log(error_data)
      for (let error in error_data) {
        this.fields[error]['error'] = error_data[error]
      }
      console.log(this.fields)
    },

    /**
     * Fetch From Ajax
     * is a feature to preset the field value and enable two way binding of ajax data
     * It's used for data edit from AJAX
     * @returns {Promise<void>}
     */
    async fetchFromAjax() {
      await this.axios.get(this.ajax).then(response => {
        for (let field in this.fields) {
          this.fields[field].value = response.data[field]
        }
      }).finally(() => {
        this.setModelValue()
      })
    },

    /**
     * Do not touch it
     * ======================
     * This method will generate model object from the empty models object of current state
     * This models will need to submit the form
     */
    setModelValue() {
      try {
        Object.entries(this.fields).map((value) => {
          this.models[value[0]] = value[1].value ? value[1].value : ''
        })
      } catch (e) {
        console.error(e)
      }

    }
  }
}
</script>

<style scoped>

</style>
