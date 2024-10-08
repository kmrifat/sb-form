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

    <div v-if="isLoading" class="overlay" id="overlay"></div>
    <div v-if="isLoading" class="spinner-border fixed-center" style="width: 4rem; height: 4rem; z-index: 9999;"
         role="status">
    </div>
  </form>
</template>

<script>

import StringField from "./fields/StringField.vue";
import PasswordField from "./fields/PasswordField.vue";
import TextField from "./fields/TextField.vue";
import SelectField from "./fields/SelectField.vue";
import AsyncSelectField from "./fields/AsyncSelectField.vue";
import FileField from "./fields/FileField.vue";
import MultiFileFiled from "./fields/MultiFileFiled.vue";
import DateField from "./fields/DateField.vue";
import MultiSelectField from "./fields/MultiSelectField.vue";
import HiddenField from "./fields/HiddenField.vue";
import RadioField from "./fields/RadioField.vue";
import CheckboxField from "./fields/CheckboxField.vue";
import toastr from 'toastr';
import CustomField from "./fields/CustomField.vue";


export default {
  name: "SbForm",
  components: {
    string: StringField,
    password: PasswordField,
    text_field: TextField,
    select_field: SelectField,
    async_select_field: AsyncSelectField,
    multiselect_field: MultiSelectField,
    file_field: FileField,
    multi_file_field: MultiFileFiled,
    date_field: DateField,
    hidden_field: HiddenField,
    radio_field: RadioField,
    checkbox_field: CheckboxField,
    custom_field: CustomField
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
      type: Function,
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
    fetchUrl: {
      type: String,
      required: false
    },
    axios: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      models: {},
      isLoading: false
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
    if (this.fetchUrl) {
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
      this.isLoading = true
      await this.axios(this.config).then(response => {
        if (this.callBack) {
          this.callBack(response)
          // this.$parent[this.callBack](response.data);
        }
        if (this.resetForm) {
          this.setModelValue()
        }
        toastr.success(response.data.message)
      }).catch(error => {
        try {
          toastr.error(error.response.data.message)
        } catch (e) {
          throw error
        }
        switch (error.response.status) {
          case 422:
            console.log(error.response.data)
            this.setValidationError(error.response.data.errors)
            break
          default:
            console.log(error.response)
            break
        }
        throw error
      }).finally(() => {
        this.isLoading = false
      })
    },
    setValidationError(error_data) {
      // console.error(error_data)
      for (let error in error_data) {
        this.fields[error]['error'] = error_data[error]
      }
      // console.log(this.fields)
    },

    /**
     * Fetch From Ajax
     * is a feature to preset the field value and enable two way binding of ajax data
     * It's used for data edit from AJAX
     * @returns {Promise<void>}
     */
    async fetchFromAjax() {
      await this.axios.get(this.fetchUrl).then(({data}) => {
        let resData
        if ('data' in data) {
          resData = data.data;
        } else {
          resData = data
        }
        for (let field in this.fields) {
          this.fields[field].value = resData[field]
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
      console.log('here')
      try {
        Object.entries(this.fields).map((value) => {
          this.models[value[0]] = (value[1].value || value[1].value === 0) ? value[1].value : ''
        })
      } catch (e) {
        console.error(e)
      }

    }
  }
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black */
  z-index: 9998; /* Ensure the overlay appears above other elements */
}

.fixed-center {
  position: fixed;
  top: 50%;
  left: 50%;
}
</style>
