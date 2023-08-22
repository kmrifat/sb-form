<template>
  <div class="m-5">
    <DataTable :title="tableData.title" :url="tableData.url" :axios="tableData.axios" ref="dataTable"
               :columns="tableData.columns">
      <template v-slot:tableHeader>
        <div class="row justify-content-between">
          <div class="col">{{ tableData.title }}</div>
          <div class="col">
          </div>
        </div>
      </template>

      <!--            <template v-slot:status="{item}">-->
      <!--                <td>{{ item.status ? "Active" : "Inactive" }}</td>-->
      <!--            </template>-->

      <template v-slot:actions="{item}">
        <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
          <button
              @click="$refs.dataTable.deleteRow(item, 'Are you sure')"
              class="btn btn-danger">
            <i class="far fa-trash-alt me-2"></i>
            Delete
          </button>
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script setup>
import {ref} from "vue";
import DataTable from "../components/data-table/DataTable";
import apiService from "../services/apiService";

const tableData = ref({
// <td>{{ data.title }}</td>
// <td>{{ data.user?.name }}</td>
// <td>{{ data.user?.email }}</td>
// <td>{{ data.user?.phone }}</td>
// <td>{{ data.user?.address }}</td>
// <td>{{ data.department?.name }}</td>
  columns: [
    {label: 'Title', field: 'title', searchable: true},
    {label: "Name", field: "user.name", searchable: true},
    {label: 'Email', field: 'user.email', searchable: true},
    {label: 'Phone', field: 'user.phone', searchable: true},
    {label: 'Address', field: 'user.address', searchable: true},
    {label: 'Department', field: 'department.name', searchable: true},
    {label: 'Actions', field: 'actions'}
  ],
  title: 'Doctor List',
  url: '/doctor',
  axios: apiService,
  createRoute: 'createDoctor',
  createTitle: 'Create Doctor'
})

</script>
