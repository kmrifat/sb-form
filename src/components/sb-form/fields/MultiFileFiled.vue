<template>
  <div :class="fieldInfo.col ? 'col-'+fieldInfo.col : 'col-12'" class="file-filed mb-3 position-relative">
    <label class="form-label mt-3 mb-0">{{ fieldInfo.label }} {{ fieldInfo.required ? '*' : '' }}</label>
    <div class="card shadow-none mt-3 border-0 flex-row gap-3">
      <div class="card-body p-0">
        <div class="image-container d-flex flex-wrap align-items-center gap-3">
          <div v-for="(file, index) in selectedFiles" :key="index" class="position-relative">
            <div class="preview w-192 img-thumbnail" :style="'background-image:url('+file+')'"></div>
            <button type="button" @click="removeSelectedFile(index)"
                    class="remove-btn btn btn-danger btn-sm rounded-circle position-absolute">
              X
            </button>
          </div>
          <div
              class="border card-body d-flex flex-column flex-grow-0 flex-shrink-0 justify-content-center rounded text-center w-192"
              type="button" @click="toggleModal">
            <i class="fas fa-cloud-upload fa-6x"></i>
            <p class="card-text">Click to upload or select files from File Manager.</p>
          </div>
        </div>
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

    <div class="offcanvas-body" v-if="show_files">
      <form @submit.prevent="getFiles">
        <div class="input-group mb-3">
          <input v-model="search" type="text" class="form-control" placeholder="Search...">
          <button class="btn btn-secondary" type="submit" id="button-addon2">Search</button>
        </div>
      </form>
      <div class="d-flex align-content-start flex-wrap">
        <div v-for="file in file_list" @click="toggleFileSelection(file)"
             class="card file-card w-192 m-2 overflow-hidden"
             :class="{'selected': isFileSelected(file.thumbnail)}">
          <div class="dropdown end-0 pe-2 pt-2 position-absolute">
            <div @click.stop class="dropdown-toggle bg-white p-1 rounded-pill h4 m-0 fw-bold" type="button"
                 data-bs-toggle="dropdown" aria-expanded="false">
              &vellip;
            </div>
            <ul class="dropdown-menu">
              <li>
                <a @click.stop.prevent="getInfo(file)" class="dropdown-item text-info" href="#" data-bs-toggle="modal"
                   data-bs-target="#photoInfoModal">Info</a>
              </li>
              <li>
                <a @click.prevent="toggleFileSelection(file)" class="dropdown-item text-dark" href="#"
                   title="Press ctrl & click">Select</a>
              </li>
              <li>
                <a @click.prevent="removeFile(file.id)" class="dropdown-item close text-danger" href="#">Delete</a>
              </li>
            </ul>
          </div>
          <img :src="file.thumbnail" class="w-100 h-100" :alt="file.name">
          <p class="bottom-0 file-name mb-0 position-absolute text-center w-100 py-2">{{ file.name }}</p>
        </div>
        <div v-if="hasMore" class="d-flex justify-content-center w-100">
          <button type="button" class="btn btn-success btn-sm" @click="loadMore()">Load more</button>
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

  <!--Info Modal -->
  <div class="modal fade" id="photoInfoModal" tabindex="-1" aria-labelledby="photoInfoModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body" v-if="selectFileDetails.name">
          <div>File Name : <b>{{ selectFileDetails.name }}</b></div>
          <div>File Type : <b>{{ selectFileDetails.type }}</b></div>
          <div>File Size : <b>{{ selectFileDetails.size }}</b></div>
          <img :src="selectFileDetails.path" class="img-thumbnail w-100 mt-3" alt="">
        </div>
        <div class="modal-footer pt-0 border-0">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

import Dropzone from "../../dropzone/Dropzone.vue";
import {Offcanvas} from "bootstrap"

export default {
  name      : "MultiFileFiled",
  props     : {
    axios       : {
      type: Function
    },
    'modelValue': {
      type: Array
    },
    fieldInfo   : {}
  },
  emits     : ['update:modelValue'],
  components: {
    Dropzone
  },
  data() {
    return {
      search           : '',
      page             : 1,
      limit            : 15,
      hasMore          : true,
      show_files       : true,
      file_type        : '',
      file_list        : [],
      selectedFiles    : [],
      selectFileDetails: {}
    }
  },
  methods: {
    loadMore(){
      this.page++
      this.getFiles();
    },
    getInfo(file) {
      this.selectFileDetails = file
    },
    toggleFileSelection(file) {
      if (this.isCtrlPressed()) {
        this.selectedFiles.includes(file.thumbnail)
            ? this.selectedFiles = this.selectedFiles.filter(path => path !== file.thumbnail)
            : this.selectedFiles.push(file.thumbnail);
      } else {
        this.selectedFiles = [file.thumbnail];
      }
      this.$emit('update:modelValue', this.selectedFiles)
    },
    isFileSelected(id) {
      if (typeof this.selectedFiles == 'string') {
        return;
      }
      return this.selectedFiles.some(file => file === id);
    },
    isCtrlPressed() {
      return window.event.ctrlKey || window.event.metaKey; // metaKey for Command key on macOS
    },
    toggleModal() {
      let fileOffCanvas = new Offcanvas(document.getElementById('fileOffCanvas' + this.fieldInfo.label.replace(/ /g, '')))
      fileOffCanvas.toggle()
    },
    removeFile(id) {
      const result = confirm("Are you sure you want to delete this item?");
      if (result) {
        this.axios.delete(`/file-delete/${id}`).then(({data}) => {
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
      const params = {
        page: this.page,
        search: this.search,
        per_page: this.limit
      }
      this.axios.get('/files', {params: params}).then(({data}) => {
        if ('data' in data) {
          this.file_list = [...this.file_list, ...data.data]
          this.hasMore = data.current_page < data.last_page;
        } else {
          this.file_list = data
        }
      }).catch(error => {
        throw error
      })
    }
  },
  watch  : {
    'modelValue'() {
      this.selectedFiles = this.modelValue
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
    .card-body {
      .preview {
        background-repeat : no-repeat;
        background-origin : inherit;
        background-size   : cover;
      }

      .remove-btn {
        top   : -8px;
        right : -8px;
      }
    }

    .card-text {
      font-size : 10px;
    }
  }
}

.file-card {
  cursor : pointer;

  .file-name {
    background : rgba(0, 0, 0, 0.5);
    color      : #f1f1f1;
  }

  &.selected {
    border : 4px solid red;
  }

  .file-extension {
    display         : flex;
    justify-content : center;
  }

  .dropdown-toggle::after {
    display : none;
  }
}

.w-192 {
  width  : 192px;
  height : 192px;
}

@media (max-width: 575px) {
  .offcanvas.w-50 {
    width : 100% !important;
  }
}

</style>
