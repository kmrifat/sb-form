<template>
  <DataTable title="Hello Table" url="/doctor" table-classes="table-bordered" :columns="columns" :axios="axios">

  </DataTable>
</template>

<script>
import DataTable from "../components/data-table/DataTable";
import apiService from "../services/apiService";

export default {
  name: "TableView",
  components: {
    DataTable
  },
  data: () => ({
    axios: apiService,
    columns: [
      {label: 'Name', field: 'title', searchable: true}
    ]
  })
}
</script>

<style scoped>

</style>