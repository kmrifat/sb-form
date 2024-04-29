<template>
  <div class="vue-select-container">
    <div class="vue-select" ref="select">
      <input v-model="searchQuery" @keyup="() => debouncedSearch(searchQuery)" @click="showDropdown"
             class="vue-select-input"
             placeholder="Search...">
      <div v-show="isDropdownShow" class="vue-select-dropdown" id="lists-scroll">
        <ul v-if="items.length > 0" class="vue-select-options">
          <li v-for="item in items" :key="item.id" @click="selectItem(item)" class="vue-select-option">
            {{ item.name }}
          </li>
        </ul>
        <div v-if="!items.length && !loading" class="my-auto text-center py-5 fw-bold">
          No data found!
        </div>
        <div v-if="loading" class="vue-select-loading">Loading...</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue';
import AsyncSelectField from "../models/AsyncSelectField";

const emit = defineEmits(['update:modelValue', 'selectItem']);
const props = defineProps({
  axios: {
    type: Function,
    required: true,
  },
  fetchUrl: {
    type: String,
    required: true,
  },
  modelValue: String,
  fieldInfo: {
    type: AsyncSelectField,
    required: true,
    default: () => new AsyncSelectField()
  }
});

const searchQuery = ref('');
const selectedOption = ref(null);

const items = ref([]);
const meta = ref({});
let page = ref(1);

const isDropdownShow = ref(false);
const loading = ref(false);
let isFetching = ref(false);

const fetchItems = () => {
  loading.value = true;
  props.axios.get(`${props.fieldInfo.fetchUrl}?page=${page.value}&q=${searchQuery.value}`).then(({data}) => {
    if (!data.data.length) {
      items.value = [];
      return;
    }

    meta.value = data.meta;
    items.value = [...items.value, ...data.data];
    isFetching.value = false;
  }).catch(error => {
    console.error('Error fetching items:', error);
  }).finally(() => {
    loading.value = false;
  });
};

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

// Your search logic function
const handleSearch = (value) => {
  searchQuery.value = value
  page.value = 1
  items.value = []; // Clear previous search results
  fetchItems()
};

// Debounced search function with a delay of 500 milliseconds
const debouncedSearch = debounce(handleSearch, 500);

const selectItem = (item) => {
  emit('update:modelValue', item.id); // Emit event to update parent component
  emit('selectItem', item); // Emit event to update parent component
  selectedOption.value = item;
  searchQuery.value = item.name;
  isDropdownShow.value = false;
};

const showDropdown = () => {
  isDropdownShow.value = true;
};

const hideDropdown = () => {
  isDropdownShow.value = false;
};

const onScroll = () => {
  const scrollContainer = document.getElementById('lists-scroll');
  const scrollPosition = scrollContainer.clientHeight + scrollContainer.scrollTop;
  const divBottom = scrollContainer.scrollHeight;
  if (scrollPosition >= divBottom && !isFetching.value) {
    // Assuming you want to load more drugs when scrolling to the bottom
    if (items.value.length > 0 && page.value < meta.value.last_page) {
      isFetching.value = true;
      page.value++;
      fetchItems();
    }
  }
};

const handleClickOutside = (event) => {
  if (!event.target.closest('.vue-select-container')) {
    hideDropdown();
  }
};

onMounted(() => {
  fetchItems();
  const scrollContainer = document.getElementById('lists-scroll');
  scrollContainer.addEventListener('scroll', onScroll);
  document.addEventListener('click', handleClickOutside);
});

// Clean up the event listeners when the component is unmounted
onUnmounted(() => {
  const scrollContainer = document.getElementById('lists-scroll');
  if (scrollContainer) {
    scrollContainer.removeEventListener('scroll', onScroll);
  }
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.vue-select-container {
  position: relative;
}

.vue-select {
  position: relative;
  width: 100%;
}

.vue-select-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.vue-select-dropdown {
  position: absolute;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
  background-color: #fff;
  z-index: 1;
}

.vue-select-options {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.vue-select-option {
  padding: 8px;
  cursor: pointer;
}

.vue-select-option:hover {
  background-color: #f0f0f0;
}

.vue-select-loading {
  padding: 8px;
}
</style>

