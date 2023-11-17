<template>
  <div class="m-sm-3 m-md-5">
    <DataTable :title="tableData.title" :url="tableData.url" :axios="tableData.axios" ref="dataTable"
               :columns="tableData.columns">
      <template v-slot:tableHeader>
        <div class="row justify-content-between">
          <div class="col">{{ tableData.title }}</div>
          <div class="col">
            <router-link to="" class="btn btn-primary btn-sm float-end">
              <i class="fa fa-plus-square me-2"></i> {{ tableData.createTitle }}
            </router-link>
          </div>
        </div>
      </template>

      <template v-slot:status="{item}">
        <td>{{ item.status ? "Active" : "Inactive" }}</td>
      </template>

      <template v-slot:actions="{item}">
        <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
          <router-link to="" class="btn btn-primary cs-action-btn">
            <i class="far fa-edit me-2"></i> <span>Edit</span>
          </router-link>
          <button
              @click="$refs.dataTable.deleteRow(item, 'Are you sure')"
              class="btn btn-danger cs-action-btn">
            <i class="far fa-trash-alt me-2"></i>
            <span>Delete</span>
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
  columns: [
    {label: 'Invoice ID', field: 'invoice_id', searchable: true, sortable: true},
    {label: 'Date', field: 'invoice_date', searchable: true, sortable: true},
    {label: 'Doctor', field: 'doctor.user.name', searchable: true, sortable: true},
    {label: 'Patient', field: 'patient.user.name', searchable: true, sortable: true},
    {label: 'Total quantity', field: 'total_quantity', searchable: true, sortable: true},
    {label: 'Discount', field: 'discount', searchable: true, sortable: true},
    {label: 'Grand total', field: 'grand_total', searchable: true, sortable: true},
    {label: 'Status', field: 'status', searchable: true, sortable: true},
    {label: 'Actions', field: 'actions'}
  ],
  title: 'Invoice List',
  url: '/invoices',
  axios: apiService,
  createRoute: 'createInvoice',
  createTitle: 'Create Invoice'
})



</script>
