<template>
  <div class="col-12 file-filed">
    <label class="form-label mt-3 mb-0">{{ fieldInfo.label }} {{ fieldInfo.required ? '*' : '' }}</label>
    <div class="card shadow-none mt-3" @click="toggleModal">
      <div class="card-body p-1" v-if="modelValue">
        <div class="preview" :style="'background-image:url('+modelValue+')'"></div>
      </div>

      <div class="card-body" v-else>
        <i class="fas fa-cloud-upload fa-6x"></i>
        <p class="card-text">Click to upload or select file from File Manager.</p>
      </div>
    </div>
    <button class="btn btn-danger btn-sm rounded-0 reset-field" @click="removeSelectedFile" v-if="modelValue">Remove
    </button>
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
      <div class="d-flex align-content-start flex-wrap" v-if="show_files">
        <div v-for="file in file_list" @click="selectFile(file)" class="card file-card m-2"
             :class="modelValue == file.path ? 'selected' : ''">
          <img :src="file.thumbnail" class="img-fluid" alt="">
          <p class="file-name">{{ file.name }}</p>
        </div>

        <div v-if="!file_list.length" class="d-flex justify-content-center w-100">
          <div class="p-2">
            <h1 class="text-black-50">No File Found</h1>
          </div>
        </div>
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
      show_files: true,
      file_list: []
    }
  },
  methods: {
    toggleModal() {
      let fileOffCanvas = new Offcanvas(document.getElementById('fileOffCanvas' + this.fieldInfo.label.replace(/ /g, '')))
      fileOffCanvas.toggle()
    },
    selectFile(file) {
      this.$emit('update:modelValue', file.thumbnail)
    },
    removeSelectedFile() {
      this.$emit('update:modelValue', null)
    },
    addFile(file_manager) {
      this.file_list.push(file_manager);
    }
  },
  mounted() {
    this.axios.get('/files').then(({data}) => {
      this.file_list = data
    }).catch(error => {
      throw error
    })
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
}


</style>
