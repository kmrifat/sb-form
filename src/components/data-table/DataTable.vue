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
        <table class="table align-middle">
          <thead>
          <tr>
            <th>#</th>
            <th v-for="column in columns">
              <a href="#" class="dataTable-sorter">{{ column.label }}</a>
            </th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="(value, index) in data" :key="index">
            <td>{{ getRowNumber(index) }}.</td>
            <td v-for="column in columns">
              <slot :name="column.field" :item="value">{{ value[column.field] }}</slot>
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
      page: 1
    }
  },
  methods: {
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
          url: `${url}/${item[target_key]}/`
        }).then(response => {
          this.data.splice(this.data.indexOf(item), 1)
          toastr.success(response.data.message, "Success")
        }).catch((error) => {
          toastr.error(error.response.data.message, `${error.response.status} ${error.response.statusText}`)
        })
      }
    },

    fetchData() {
      this.loading = true
      let searchable_column = this.columns.filter(element => element.searchable).map(element => element.field)
      console.log(searchable_column)
      this.axios.get(`${this.url}?searchable=${searchable_column}&q=${this.q}&limit=${this.per_page}&page=${this.page}`).then(response => {
        if ('data' in response.data) {
          this.paginationData = response.data
          this.data = response.data.data
          this.per_page = response.data.per_page
          this.showing = `Showing ${response.data.from} to ${response.data.to} of ${response.data.total}`
        } else {
          this.data = response.data
          this.per_page = null
          this.showing = `Showing ${response.data.length}`
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
</style>
