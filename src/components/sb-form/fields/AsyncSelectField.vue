<template>
  <vselect
      :options="options"
      :filterable="false"
      :label="label"
      :reduce="reduce"
      :placeholder="placeholder"
      v-model="selectedValue"
      @open="onOpen"
      @close="onClose"
      @search="handleSearch"
      :multiple="isMultiple"
      @option:selected="optionSelected"
      ref="dropdownRef"
  >
    <template v-slot:option="option">
      {{ formatLabel(option) }}
    </template>
    <template #list-footer>
      <li v-show="hasNextPage" ref="load" class="loader">
        Loading more options...
      </li>
    </template>
  </vselect>
</template>

<script setup>
import {computed, inject, nextTick, ref, watch} from "vue";
import vselect from "vue-select";
import "vue-select/dist/vue-select.css";
import AsyncSelectField from "../models/AsyncSelectField";

const paginated = ref([])
const emit = defineEmits([
  'update:modelValue'
]);
const props = defineProps({
  additionalOption: {
    type: Array,
    default: []
  },
  modelValue: {
    required: true
  },
  fieldInfo: {
    type: AsyncSelectField,
    required: true,
    default: () => new AsyncSelectField()
  },
  limit: {
    type: Number,
    default: 20,
    required: false
  },
  label: {
    type: String,
    default: "name"
  },
  placeholder: {
    type: String,
    default: "Please search or select"
  },
  searchKey: {
    type: String,
    default: "q"
  },
  additionalQuery: {
    type: Object,
    default: {}
  },
  formatLabel: {
    type: Function,
    default: (option) => option.name
  },
  optionSelected: {
    type: Function,
    default: () => {
    }
  },
  reduce: {
    default: name => name.id
  },
  axios: {
    type: Function,
    required: true,
  },
  isMultiple: {
    default: false,
    type: Boolean,
  }
})
const observer = new IntersectionObserver(entries => infiniteScroll(entries))
const page = ref(0)
const load = ref(null)
const dropdownRef = ref(null)
const query = ref('')
const hasNextPage = ref(true);
const parentUl = ref(null);
let position = 0;

const getQuery = (firstPage = false) => {
  const additionalQuery = props.additionalQuery;
  let paramsQuery = `?page=${!firstPage ? page.value : 1}&offset=${props.limit}`;

  if (additionalQuery && Object.keys(additionalQuery).length > 0) {
    let params = new URLSearchParams(props.additionalQuery);
    paramsQuery += `&${params.toString()}`
  }

  if (query.value && query.value !== '') {
    paramsQuery += `&${props.searchKey}=${query.value}`
  }

  return paramsQuery;
}

const selectedValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const options = computed(() => {
  if (props.additionalOption) {
    return [...props.additionalOption, ...paginated.value]
  }
  return paginated ? paginated.value : []
})

//watcher
watch(page, () => {
  handleAPICall(getQuery(), false)
})

watch(query, () => {
  handleAPICall(getQuery(true))
})

watch(selectedValue, (newValue, oldValue) => {
  if (oldValue !== null && newValue === null) {
    query.value = '';
  }
})

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const fetchOptionsDebounced = debounce((query) => {
}, 300); // Adjust delay (in milliseconds) as needed

const handleSearch = (value) => {
  query.value = value;
  fetchOptionsDebounced(value);
};

const clear = () => {
  paginated.value = [];
  page.value = 0;
  hasNextPage.value = true;
};

const onOpen = async () => {
  if (query.value !== '' && query.value.length && !selectedValue.value) {
    query.value = '';
  }

  if (hasNextPage.value) {
    await nextTick()
    observer.observe(load.value)
  }
}
const onClose = () => {
  observer.disconnect()
}

const handleAPICall = (paramsQuery, refreshOption = true) => {
  props.axios.get(`${props.fieldInfo.fetchUrl}${paramsQuery}`).then(res => {
    if (!res.data) {
      return;
    }

    page.value = res.data.meta.current_page ?? 1;
    hasNextPage.value = res.data.meta.current_page !== res.data.meta.last_page;

    if (refreshOption) {
      paginated.value = res.data.data
      return;
    }

    paginated.value = [
      ...paginated.value,
      ...res.data.data
    ];
  }).finally(() => {
    parentUl.value.scrollTop = position;
  })
}

const infiniteScroll = async ([{isIntersecting, target}]) => {
  if (!isIntersecting) {
    return;
  }

  page.value++;
  await nextTick();
  if (target) {
    parentUl.value = target.offsetParent;
    position = target.offsetParent.scrollTop;
  }
}

defineExpose({
  dropdownRef,
  clear
})
</script>
