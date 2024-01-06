<template>
  <div class="card mb-4">
    <div v-if="title" class="card-header">
      <slot name="tableHeader">
        {{ title }}
      </slot>
    </div>
    <div class="card-body" v-if="!loading">
      <form @submit.prevent="fetchData" class="d-flex justify-content-between sb-datatable">
        <div class="per-page-select">
          <label>
            <select v-model="per_page" class="form-select" @change="fetchData">
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
            entries per page
          </label>
        </div>
        <div class="top-search">
          <input class="form-control" v-model="q" placeholder="Search..." type="text">
        </div>
      </form>
      <div class="table-responsive">
        <table class="table table-striped dataTable" :class="tableClasses">
          <thead>
          <tr>
            <th>#</th>
            <th
                v-for="column in columns"
                :key="column.field"
                @click="sort(column)"
                :class="{
                  sorting: column.sortable,
                  sorting_asc: sortField === column.field && sortOrder === 'asc',
                  sorting_desc: sortField === column.field && sortOrder === 'desc'
                }">
              {{ column.label }}
            </th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="(value, index) in data" :key="index">
            <td>{{ getRowNumber(index) }}.</td>
            <td v-for="column in columns">
              <slot :name="column.field" :item="value">{{ getValue(value, column.field) }}</slot>
            </td>
          </tr>

          </tbody>
        </table>
        <div class="d-flex justify-content-between table-bottom">
          <div class="dataTable-info">{{ showing }}</div>

          <Pagination :data="paginationData" :limit="3" align="right" @pagination-change-page="getResults"/>
        </div>
      </div>
    </div>

    <div v-else class="card-body">
      <div class="loader">
        <h1>
          Loading
          <span class="loader__dot">.</span>
          <span class="loader__dot">.</span>
          <span class="loader__dot">.</span>
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import toastr from "toastr";
import LaravelVuePagination from "laravel-vue-pagination";

export default {
  name: "DateTable",
  props: {
    title: String,
    url: String,
    columns: {
      type: Array,
      required: true
    },
    axios: {
      type: Function,
      required: true
    },
    tableClasses: {
      type: String,
      default: 'align-middle'
    }
  },
  components: {
    'Pagination': LaravelVuePagination
  },
  data() {
    return {
      loading: true,
      data: [],
      paginationData: [],
      q: '',
      per_page: 20,
      showing: "",
      page: 1,
      sortField: null,
      sortColumn: null,
      sortOrder: 'asc', // or 'desc' for descending order
    }
  },
  methods: {
    getValue(item, field) {
      if (!item) {
        return ''; // Return an empty string if the item is null
      }

      const fields = field.split('.'); // Split the dot-separated field into an array
      let value = item;

      for (const f of fields) {
        if (value && value.hasOwnProperty(f)) {
          value = value[f];
        } else {
          value = '';
          break;
        }
      }

      return value;
    },
    getRowNumber(index) {
      return (this.page - 1) * this.per_page + index + 1
    },
    getResults($event) {
      this.page = $event
      this.fetchData()
    },
    deleteRow(item, args) {
      let message = args.message == undefined ? 'Are you sure ?' : args.message
      let url = args.url == undefined ? `${this.url}` : args.url
      let target_key = args.target_key == undefined ? 'id' : args.target_key
      let method = args.method == undefined ? 'delete' : args.method
      let ask = confirm(message)
      if (ask) {
        this.axios({
          method: method,
          url: `${url}/${item[target_key]}`
        }).then(response => {
          this.data.splice(this.data.indexOf(item), 1)
          toastr.success(response.data.message, "Success")
        }).catch((error) => {
          toastr.error(error.response.data.message, `${error.response.status} ${error.response.statusText}`)
        })
      }
    },

    getQuery() {
      let query = '?page=' + this.page
      query += '&limit=' + this.per_page
      if (this.sortColumn) query += `&sort=${this.sortOrder === 'desc' ? '-' : ''}${this.sortColumn}`
      if (this.q) query += `&search=${this.q}`
      return query
    },

    sort(column) {
      if (!column.sortable) {
        return;
      }

      this.sortField = column.field;
      let sortColumn = column.sort_column ? column.sort_column : column.field;

      if (this.sortColumn === sortColumn) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = sortColumn;
        this.sortOrder = 'asc';
      }
      this.fetchData()
    },

    fetchData() {
      this.loading = true
      this.axios.get(`${this.url}${this.getQuery()}`).then(({data}) => {
        if ('data' in data) {
          this.data = data.data;
          const paginationData = 'meta' in data ? data.meta : data;
          this.per_page = paginationData.per_page;
          this.paginationData = paginationData;
          this.showing = `Showing from ${paginationData.from || (this.data.length > 0 ? 1 : 0)} to ${paginationData.to || this.data.length} out of ${paginationData.total || this.data.length}`;
        } else {
          this.data = data;
          this.showing = `Showing from ${this.data.length > 0 ? 1 : 0} to ${this.data.length} out of ${this.data.length}`;
        }

      }).catch(error => {
        toastr.error(error.response.data.message, `${error.response.status} ${error.response.statusText}`)
        console.error(error.response)
      }).finally(this.loading = false)
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>
<style>

</style>
<style lang="scss">

@keyframes blink {
  50% {
    color: transparent
  }
}

.loader__dot {
  animation: 1s blink infinite
}

.loader__dot:nth-child(2) {
  animation-delay: 250ms
}

.loader__dot:nth-child(3) {
  animation-delay: 500ms
}

table.dataTable {
  thead > tr > th.sorting,
  thead > tr > th.sorting_asc,
  thead > tr > th.sorting_desc,
  thead > tr > td.sorting {
    cursor: pointer;
    position: relative;
    padding-right: 26px;

    &:before,
    &:after {
      position: absolute;
      display: block;
      opacity: 0.125;
      right: 10px;
      line-height: 9px;
      font-size: 0.8em;
    }
  }

  thead > tr > th.sorting:before,
  thead > tr > th.sorting:after,
  thead > tr > th.sorting_asc:before,
  thead > tr > th.sorting_asc:after,
  thead > tr > th.sorting_desc:before,
  thead > tr > th.sorting_desc:after {
    bottom: 50%;
    content: "▲";
    content: "▲" / "";
  }

  thead > tr > th.sorting:after,
  thead > tr > th.sorting_asc:after,
  thead > tr > th.sorting_desc:after {
    top: 50%;
    content: "▼";
    content: "▼" / "";
  }

  thead > tr > th.sorting_asc:before,
  thead > tr > th.sorting_desc:after {
    opacity: 0.6;
  }
}

</style>
