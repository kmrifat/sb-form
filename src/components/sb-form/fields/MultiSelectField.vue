<template>
  <label class="form-label">{{ fieldInfo.label }} {{ fieldInfo.required ? '*' : '' }}</label>

  <div class="row selector">
    <div class="col-md-6">
      <div class="selector-available">
        <div class="card multiselect shadow-none">
          <div class="card-header">Available</div>
          <div class="card-search">
            <div class="input-group input-group-sm input-group-joined">
              <input v-model="searchText" class="form-control pe-0" type="text"
                     placeholder="Search Student">
              <span class="input-group-text"><i class="fas fa-search"></i></span>
            </div>
          </div>
          <div class="card-body">
            <select multiple v-model="availableOptions" class="form-select">
              <option v-for="(option, index) in filteredListItems" :key="index"
                      :value="getOptionValue(option,fieldInfo.config.value)">
                {{ getOptionDisplay(option, fieldInfo.config.display) }}
              </option>
            </select>
          </div>
          <div class="card-footer bg-transparent d-grid gap-2 col-6 mx-auto">
            <button class="btn btn-sm" @click="choseAll" type="button">
              Choose all <i class="mx-2 fas fa-arrow-circle-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="col">
      <ul class="selector-chooser">
        <li>
          <i @click="choseSelected" class="fas fa-arrow-circle-right"></i>
        </li>
        <li>
          <i @click="removeSelected" class="fas fa-arrow-circle-left"></i>
        </li>
      </ul>
    </div>
    <div class="col-md-5 p-0 m-0">
      <div class="selector-chosen">
        <div class="card multiselect shadow-none">
          <div class="card-header bg-primary text-white">Chosen</div>
          <div class="card-body">
            <select multiple v-model="chosenOptions" class="form-select">
              <option v-for="option in modelValue"
                      :value="getOptionValue(option, fieldInfo.config.value)">
                {{ getOptionDisplay(option, fieldInfo.config.display) }}
              </option>
            </select>
          </div>
          <div class="card-footer bg-transparent d-grid gap-2 col-6 mx-auto">
            <button class="btn btn-sm" @click="removeAll" type="button">
              <i class="mx-2 fas fa-arrow-circle-left"></i> Remove all
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "@/services/apiService";

export default {
  name: "MultiSelectField",
  props: {
    'modelValue': {
      type: Array
    },
    'fieldInfo': {
      default: {
        config: {}
      }
    },
    'axios': {}
  },
  emits: ['update:modelValue'],
  data() {
    return {
      searchText: '',
      availableOptions: [],
      chosenOptions: [],
      chosenData: []
    }
  },
  computed: {
    filteredListItems() {
      if (this.fieldInfo.options) {
        let selected_values = this.getAllValues(this.modelValue)
        let options = this.fieldInfo.options.filter((item) => {
          if (!selected_values.includes(this.getOptionValue(item, this.fieldInfo.config.value))) {
            return item
          }
        })

        if (this.searchText) {
          return options.filter((item) => {
            const display = this.getOptionDisplay(item, this.fieldInfo.config.display);
            return display && display.toLowerCase().includes(this.searchText.toLowerCase())
          })
        }
        return options
      }
      return this.fieldInfo.options
    },

  },
  methods: {
    getOptionDisplay(option, displayProperty) {
      return displayProperty(option) || ''
    },
    getOptionValue(option, valueProperty) {
      return valueProperty(option) || ''
    },
    getAllValues(options = []) {
      return options.map((item) => {
        return this.getOptionValue(item, this.fieldInfo.config.value)
      })
    },
    choseAll() {
      this.chosenData = [...this.modelValue, ...this.filteredListItems]
      this.$emit('update:modelValue', this.chosenData)
    },
    removeAll() {
      this.fieldInfo.options = [...this.modelValue, ...this.filteredListItems]
      this.$emit('update:modelValue', [])
    },
    choseSelected() {
      this.availableOptions.forEach((value, index) => {
        let data = this.fieldInfo.options.filter(el => this.getOptionValue(el, this.fieldInfo.config.value) === value)[0]
        this.modelValue.push(data)
      })
      this.availableOptions = []
      this.$emit('update:modelValue', this.modelValue)
    },
    removeSelected() {
      let itemToRemove = []
      this.modelValue.forEach(value => {
        if (this.chosenOptions.includes(this.getOptionValue(value, this.fieldInfo.config.value))) {
          itemToRemove.push(value)
        }
      })
      this.chosenOptions = []
      this.$emit('update:modelValue', this.modelValue.filter(a => !itemToRemove.includes(a)))
      itemToRemove = []
    },
    setModel($event) {
      console.log($event)
    },
    async fetchOptionData() {
      const response = this.axios.get(this.fieldInfo.ajax)
      await response.then(response => {
        if ('data' in response.data) {
          this.fieldInfo.options = response.data.data
        } else {
          this.fieldInfo.options = response.data
        }
      })
    },
  },
  async mounted() {
    if (this.fieldInfo.ajax) await this.fetchOptionData()
  }
}
</script>

<style scoped lang="scss">


</style>
