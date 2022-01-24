<template>
  <div class="modal fade" id="blogUpdateForm" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen-xxl-down">
      <form @submit.prevent="submitBlog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <ul class="list-group">
              <li class="list-group-item">
                <div class="mb-3">
                  <label class="form-label">Blog title: </label>
                  <input type="text" class="form-control"
                  placeholder="Enter project title..."
                  v-model="getBlog.title">
                </div>
              </li>
              <li class="list-group-item">
                <div class="mb-3">
                  <label class="form-label">Blog content: </label>
                  <Editor 
                    v-model="getBlog.content"
                    apiKey="5sc2pkiw2b4eoyo0xa9dp0dcaf9n73v4hkzbgt3ug78ykkc4"
                    :init="{
                      height: 300,
                      menubar: false,
                      plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                      ],
                      toolbar:
                        'undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help'
                    }"/>
                </div>
              </li>
              <li class="list-group-item">
                <div class="d-flex">
                  <div class="col-6 p-1">
                    <label for="formFile" class="form-label">Blog image: </label>
                    <input class="form-control" type="file" @change="handleFile">
                  </div>
                  <div class="col-6 p-1">
                    <label for="formFile" class="form-label">Blog category: </label>
                    <select class="form-select" aria-label="Default select example" v-model="getBlog.category">
                      <option value="blog">Blog</option>
                      <option value="artwork">Artwork</option>
                    </select>
                  </div>
                </div>
              </li>
              <li class="list-group-item">
                <div class="chip-container">
                  <div class="chip" v-for="(chip, i) of getBlogTags" :key="chip.label">
                    {{chip.tag}}
                    <i class="fa fa-times" @click="deleteChip(i)"></i>
                  </div>
                </div>
                <div class="mb-3">
                  <label class="form-label">Tags: </label>
                  <input v-model="currentChip" @keypress.prevent.enter="saveChip" class="form-control" placeholder="Enter project tags">
                </div>
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Editor from '@tinymce/tinymce-vue'

export default {
  name: 'BlogUpdateForm',
  components: {
    Editor
  },
  data() {
    return {
      currentChip: ''
    }
  },
  computed: {
    ...mapGetters(['getBlog', 'getBlogTags'])
  },
  methods: {
    ...mapActions(['updateBlog']),

    submitBlog() {
      let mapTags = this.getBlogTags.map(tag => tag.tag)
      const payload = {
        blog: this.getBlog,
        tags: mapTags
      }
      // console.log(payload)
      this.updateBlog(payload)
    }, 

    saveChip() {
      if(this.currentChip != "") {
        this.getBlogTags.push({ tag: this.currentChip })
        this.currentChip = ""
      }
    },

    deleteChip(i) {
      this.getBlogTags.splice(i, 1)
    }
  }
}
</script>

<style scoped>
.chip-container {
  min-height: 34px;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}
.chip-container .chip {
  margin: 4px;
  background: #e0e0e0;
  padding: 5px 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  align-items: center;
}
.chip-container .chip i {
  cursor: pointer;
  opacity: 0.56;
  margin-left: 8px;
}
</style>