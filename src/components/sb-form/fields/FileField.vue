<template>
  <div :class="fieldInfo.col ? 'col-'+fieldInfo.col : 'col-12'" class="file-filed">
    <label class="form-label mt-3 mb-0">{{ fieldInfo.label }} {{ fieldInfo.required ? '*' : '' }}</label>
    <div class="card shadow-none mt-3" @click="toggleModal">
      <div class="card-body p-1" v-if="modelValue">
        <div class="preview img-thumbnail" :style="'background-image:url('+modelValue+')'"></div>
        <button type="button" @click="removeSelectedFile" class="remove-btn btn btn-danger btn-sm rounded-circle position-absolute">
          &#128473;
        </button>
      </div>

      <div class="align-items-center card-body d-flex text-center" v-else>
        <i class="fas fa-cloud-upload fa-6x"></i>
        <p class="card-text">Click to upload or select file from File Manager.</p>
      </div>
    </div>
<!--    <button class="btn btn-danger btn-sm rounded-0 reset-field" @click="removeSelectedFile" v-if="modelValue">Remove
    </button>-->
    <div :class="fieldInfo.error ? 'is-invalid': ''"></div>
    <div class="invalid-feedback">
      {{ fieldInfo.error ? fieldInfo.error[0] : '' }}
    </div>
  </div>


  <div class="offcanvas offcanvas-end w-50" tabindex="-1"
       :id="'fileOffCanvas'+fieldInfo.label.replace(/ /g,'')"
       aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header">
      <ul class="nav nav-tabs w-100" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button type="button" class="nav-link" :class="show_files ? 'active' : ''"
                  @click="show_files = true">
            Your Files
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button type="button" class="nav-link" :class="!show_files ? 'active' : ''"
                  @click="show_files = false">
            <i class="fas fa-cloud-upload"></i> Upload File
          </button>
        </li>
      </ul>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>

    <div class="offcanvas-body" v-if="show_files">
      <form @submit.prevent="getFiles">
        <div class="input-group mb-3">
          <input v-model="search" type="text" class="form-control" placeholder="Search...">
          <button class="btn btn-secondary" type="submit" id="button-addon2">Search</button>
        </div>
      </form>
      <div class="d-flex align-content-start flex-wrap">
        <div v-for="file in file_list" @click="selectFile(file)" class="card file-card m-2"
             :class="{'selected': modelValue === file.path}">
          <img :src="file.thumbnail" class="rounded w-100 h-100" :alt="file.name">
          <p class="file-name py-2 rounded">{{ file.name }}</p>
          <span @click.stop="removeFile(file.id)" class="close btn btn-danger btn-sm rounded-circle close"> &#128473;</span>
        </div>

        <div v-if="!file_list.length" class="d-flex justify-content-center w-100">
          <div class="p-2">
            <h1 class="text-black-50">No File Found</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="offcanvas-body" v-else>
      <Dropzone call_back="addFile" :axios="axios"/>
    </div>

  </div>

</template>

<script>

import Dropzone from "../../dropzone/Dropzone.vue";
import {Offcanvas} from "bootstrap"

export default {
  name: "FileField",
  props: {
    axios: {
      type: Function
    },
    modelValue: {},
    fieldInfo: {}
  },
  emits: ['update:modelValue'],
  components: {
    Dropzone
  },
  data() {
    return {
      search: '',
      show_files: true,
      file_type: '',
      file_list: []
    }
  },
  methods: {
    toggleModal() {
      let fileOffCanvas = new Offcanvas(document.getElementById('fileOffCanvas' + this.fieldInfo.label.replace(/ /g, '')))
      fileOffCanvas.toggle()
    },
    selectFile(file) {
      this.file_type = file.type
      this.$emit('update:modelValue', file.path)
    },
    removeFile(id) {
      const result = confirm("Are you sure you want to delete this item?");
      if (result) {
        this.axios.delete(`/files-delete/${id}`).then(({data}) => {
          // Check if the file.id exists in the file_list
          const index = this.file_list.findIndex(item => item.id === id);
          if (index !== -1) {
            // Remove the item from the array
            this.file_list = this.file_list.filter((_, i) => i !== index);
          }
        }).catch(error => {
          throw error
        })
      }
    },
    removeSelectedFile() {
      this.$emit('update:modelValue', null)
    },
    addFile(file_manager) {
      this.file_list.push(file_manager);
    },
    getFiles() {
      this.axios.get('/files', {params: {search: this.search}}).then(({data}) => {
        this.file_list = data
      }).catch(error => {
        throw error
      })
    }
  },
  mounted() {
    this.getFiles();
  }
}
</script>

<style lang="scss" scoped>

.file-filed {
  .card {
    width: 12rem;
    height: 12rem;

    .card-body {
      .preview {
        height: 11.4rem;
        width: 100%;
        background-repeat: no-repeat;
        background-origin: inherit;
        background-size: cover;
      }
      .remove-btn {
        top: -8px;
        right: -8px;
      }
    }

    .card-text {
      font-size: 10px;
    }
  }

  margin-bottom: 15px;
  position: relative;

  .reset-field {
    position: absolute;
    bottom: 0;
  }

  .file-extension {
    display: flex;
    justify-content: center;
  }
}

.file-card {
  height: 10rem;
  width: 10rem;
  cursor: pointer;

  .file-name {
    position: absolute;
    bottom: 0;
    text-align: center;
    background: rgb(0, 0, 0);
    background: rgba(0, 0, 0, 0.5);
    color: #f1f1f1;
    width: 100%;
    margin-bottom: 0 !important;
  }

  &.selected {
    border: 4px solid red;
  }

  .close {
    position: absolute;
    top: -10px;
    right: -10px;
    z-index: 100;
  }

  .file-extension {
    display: flex;
    justify-content: center;
  }
}


</style>
