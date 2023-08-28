<template>
  <div class="col-12 file-filed">
    <label class="form-label mt-3 mb-0">{{ fieldInfo.label }} {{ fieldInfo.required ? '*' : '' }}</label>
    <div class="card shadow-none mt-3">
      <div class="card-body p-1" v-if="selectedFiles.length">
        <div class="image-container">
          <div v-for="(file, index) in selectedFiles" :key="index" class="image-item border">
            <div v-if="isImageFile(file.type)" class="preview" :style="'background-image:url('+file.path+')'"></div>
            <h3 v-else class="file-extension my-auto">{{ getFileExtension(file.path) }}</h3>
            <button type="button" @click="removeSelectedFile(index)" class="remove-btn btn btn-danger btn-sm rounded-0">Remove</button>
          </div>
        </div>
      </div>

      <div class="card-body" @click="toggleModal">
        <i class="fas fa-cloud-upload fa-6x"></i>
        <p class="card-text">Click to upload or select files from File Manager.</p>
      </div>
    </div>
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

    <div class="offcanvas-body">
      <form @submit.prevent="getFiles">
        <div class="input-group mb-3">
          <input v-model="search" type="text" class="form-control" placeholder="Search...">
          <button class="btn btn-secondary" type="submit" id="button-addon2">Search</button>
        </div>
      </form>
      <div class="d-flex align-content-start flex-wrap" v-if="show_files">
        <div v-for="file in file_list" @click="toggleFileSelection(file)" class="card file-card m-2"
             :class="{'selected': isFileSelected(file.id)}">
             <a @click.stop="getInfo(file)" class="text-secondary fw-500" href="#">Info</a>
             <a @click.stop="toggleFileSelection(file)"  class="text-secondary fw-500" href="#">Select</a>
          <img v-if="isImageFile(file.type)" :src="file.thumbnail" class="img-fluid" :alt="file.name">
          <h3 v-else class="file-extension my-auto">{{ getFileExtension(file.name) }}</h3>
          <p class="file-name">{{ file.name }}</p>
          <span @click.stop="removeFile(file.id)" class="close btn btn-danger btn-sm close">&times;</span>
        </div>

        <div v-if="!file_list.length" class="d-flex justify-content-center w-100">
          <div class="p-2">
            <h1 class="text-black-50">No File Found</h1>
          </div>
        </div>
      </div>
      <div v-if="selectFileDetails.name">
        File name: {{selectFileDetails.name}}<br>
        <a target="_blank" :href="selectFileDetails.path" download="">Path</a>
      </div>
      <div v-else>
        <Dropzone call_back="addFile" :axios="axios"/>
      </div>
    </div>


  </div>

</template>

<script>

import Dropzone from "../../dropzone/Dropzone.vue";
import {Offcanvas} from "bootstrap"

export default {
  name: "MultiFileFiled",
  props: {
    axios: {
      type: Function
    },
    'modelValue': {
      type: Array
    },
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
      file_list: [],
      selectedFiles: [],
      selectFileDetails: {}
    }
  },
  methods: {
    getInfo(file){
      this.selectFileDetails = file
    },
    toggleFileSelection(file) {
      if (this.isCtrlPressed()) {
        this.selectedFiles.includes(file)
            ? this.selectedFiles = this.selectedFiles.filter(path => path !== file)
            : this.selectedFiles.push(file);
      } else {
        this.selectedFiles = [file];
      }
      this.$emit('update:modelValue', this.selectedFiles)
    },
    isFileSelected(id) {
      return this.selectedFiles.some(file => file.id === id);
    },
    isCtrlPressed() {
      return window.event.ctrlKey || window.event.metaKey; // metaKey for Command key on macOS
    },
    isImageFile(type) {
      return type.startsWith('image/');
    },
    getFileExtension(filename) {
      return filename.split('.').pop().toUpperCase();
    },
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
    removeSelectedFile(index) {
      this.selectedFiles = this.selectedFiles.filter((_, i) => i !== index);
      this.$emit('update:modelValue', this.selectedFiles)
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
    width: 100%;
    height: auto;

    .card-body {
      .image-container {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      .image-item {
        position: relative;
        width: 100px; /* Adjust width as needed */
        height: 100px; /* Adjust height as needed */
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .preview {
        height: 80px;
        width: 100%;
        background-repeat: no-repeat;
        background-origin: inherit;
        background-size: cover;
      }

      .remove-btn {
        margin-top: 5px;
      }
    }

    .card-text {
      font-size: 10px;
    }
  }

  margin-bottom: 15px;
  position: relative;
}


.file-card {
  height: 10rem;
  width: 10rem;
  overflow: hidden;
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
    top: 2px;
    right: 2px;
    z-index: 100;
  }

  .file-extension {
    display: flex;
    justify-content: center;
  }
}


</style>
