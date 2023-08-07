<template>
  <div @dragover.prevent @drop.prevent>
    <div class="dropzone" @drop="dropFile">
      <div class="dropzone_message">
        <h3>Drag and Drop File Here</h3>
        <p>Or</p>
        <label class="btn btn-primary" for="fileInput">Select File</label>
        <input type="file" id="fileInput" style="display: none" @change="select">
      </div>
    </div>
  </div>

  <div class="progress mt-5">
    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75"
         aria-valuemin="0" aria-valuemax="100" :style="'width:'+ progress +'%'"></div>
  </div>

</template>

<script>
// import store from "../../store";

export default {
  name: "Dropzone",
  props: {
    call_back: {
      type: String,
      required: false
    },
    axios: {
      required: true
    }
  },
  data() {
    return {
      file: null,
      chunks: [],
      uploaded: 0,
      chunk_size: 5242880
    };
  },

  watch: {
    chunks: {
      handler(n, o) {
        if (n.length > 0) {
          this.upload();
        }
      },
      deep: true,
    }
  },

  computed: {
    progress() {
      return Math.floor((this.uploaded * 100) / this.file?.size);
    },
    formData() {
      let formData = new FormData;
      formData.set('is_last', this.chunks.length === 1);
      formData.set('file', this.chunks[0], `${this.file.name}.part`);

      return formData;
    },
    config() {
      return {
        method: 'POST',
        data: this.formData,
        url: '/file-upload',
        headers: {
          'Content-Type': 'application/octet-stream',
          // 'Authorization': `Bearer Token` // TODO: token must be fixed
        },
        onUploadProgress: event => {
          console.log(this.chunks[0].size)
          this.uploaded += event.loaded;
        }
      };
    }
  },

  methods: {
    dropFile(event) {
      this.file = event.dataTransfer.files.item(0)
      this.uploaded = 0
      this.createChunks();
    },
    select(event) {
      this.file = event.target.files.item(0);
      this.uploaded = 0
      this.createChunks();
    },

    upload() {
      this.axios(this.config).then(response => {
        this.chunks.shift();
        if (response.data.is_finished) {
          this.resetData();
          if (this.call_back) {
            this.$parent[this.call_back](response.data.file_manager);
          }
          alert('File uploaded')
          // TODO: show notification that the file has been uploaded successfully
        }
      }).catch(error => {
        this.resetData()
      });
    },

    createChunks() {
      let size = this.chunk_size, chunks = Math.ceil(this.file.size / size);
      for (let i = 0; i < chunks; i++) {
        this.chunks.push(this.file.slice(
            i * size, Math.min(i * size + size, this.file.size), this.file.type
        ));
      }
    },

    resetData() {
      this.uploaded = 0
      this.file = null
      this.chunks = []
    }
  }
}
</script>

<style scoped lang="scss">
.dropzone {
  width: 100%;
  height: 50vh;
  border: 3px dashed lighten(black, 60%);
  border-radius: 7px;

  .dropzone_message {
    padding: 22vh 0;
    text-align: center;
  }
}

</style>
