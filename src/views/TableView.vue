<template>
  <DataTable :title="tableData.title" :url="tableData.url" :axios="tableData.axios" ref="dataTable"
             :columns="tableData.columns">
    <template v-slot:tableHeader>
      <div class="row justify-content-between">
        <div class="col">{{ tableData.title }}</div>
        <div class="col">
<!--          <router-link :to="{name:tableData.createRoute}" class="btn btn-primary btn-sm float-end">-->
<!--            <i class="fa fa-plus-square me-2"></i> {{ tableData.createTitle }}-->
<!--          </router-link>-->
        </div>
      </div>
    </template>

    <template v-slot:status="{item}">
      <td>{{ item.status ? "Active" : "Inactive" }}</td>
    </template>

    <template v-slot:actions="{item}">
      <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
        <router-link :to="{name: 'edit-form', params: {id: item.id}}" class="btn btn-primary">
          <i class="far fa-edit me-2"></i> Edit
        </router-link>
        <button
            @click="$refs.dataTable.deleteRow(item, 'Are you sure')"
            class="btn btn-danger">
          <i class="far fa-trash-alt me-2"></i>
          Delete
        </button>
      </div>
    </template>
  </DataTable>
</template>


<script setup>
import {ref} from "vue";
import apiService from "../services/apiService";
import DataTable from "../components/data-table/DataTable";

const tableData = ref({
  columns: [
    {label: 'Dose', field: 'dose', searchable: true},
    {label: 'Status', field: 'status', searchable: true},
    {label: 'Actions', field: 'actions'}
  ],
  title: 'Dose List',
  url: '/doses',
  axios: apiService,
  createRoute: 'createDose',
  createTitle: 'Create Dose'
})

</script>
