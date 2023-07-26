<template>
  <div class="m-5">
    <SBForm :fetchUrl="formData.fetchUrl"  :title="formData.title" :url="formData.url" :method="formData.method" :fields="formData.fields"
             :axios="formData.axios" :ajax="formData.ajax" :call-back="setActiveUser">
      <template v-slot:header>
        <div class="row justify-content-between">
          <div class="col">{{ formData.title }}</div>
          <div class="col">
            <router-link :to="{name: formData.listRoute}" class="btn btn-primary btn-sm float-end">
              <i class="fas fa-angle-double-left me-2"></i> Back
            </router-link>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="col-12">
          <button type="submit" class="btn btn-primary mt-4 px-5">
            <span>{{ formData.method === 'put' ? 'Update' : 'Save' }}</span>
          </button>
        </div>
      </template>
    </SBForm>
  </div>
</template>

<script setup>

import {onMounted, onBeforeMount, ref} from "vue";

import SBForm from "../components/sb-form/SBForm.vue";
import apiService from "../services/apiService";
import {SelectField, StringField} from "../components/sb-form/models";

import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()

const options = [
  {id: 1, name: 'Active'},
  {id: 0, name: 'Inactive'}
]
const config = {value: 'id', display: 'name'}

const formData = ref({
  fields: {
    dose: new StringField({label: 'Dose', col: '6'}),
    status: new SelectField({label: 'Status', options: options, col: '6', config: config}),
  },
  title: 'Create Dose',
  url: '/doses',
  method: 'post',
  reset: true,
  ajax: null,
  axios: apiService,
  fetchUrl: `/doses/${route.params.id}`,
  listRoute: 'dataTable'
})
onBeforeMount(() => {
  if (route.params.id) {
    formData.value.ajax = `/doses/${route.params.id}`
  }
});
onMounted(() => {
  if (route.params.id) {
    formData.value.url = `${formData.value.url}/${route.params.id}`
    formData.value.method = 'put'
    formData.value.reset = true
    formData.value.title = "Update Dose"
  }
})

const setActiveUser = () => {
  router.push({name: formData.value.listRoute})
}
</script>
