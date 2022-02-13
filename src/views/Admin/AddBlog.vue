<template>
  <div>
    <Offcanvas/>
    <div class="row">
      <div class="col-lg-3">
        <Sidebar/>
      </div>
      <div class="col-lg-9 col-md-12 mt-2">
        <nav class="navbar d-flex justify-content-in-between p-1">
          <h3>Add blog</h3>
          <button class="btn btn-sm btn-outline-primary d-lg-none d-sm-block d-xs-block ms-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop">
            <i class="fa fa-bars"></i>
          </button>
        </nav>
        <!-- NAVBAR HERE -->
        <div class="p-3">
          <form action="" @submit.prevent="submitBlog">
            <ul class="list-group">
              <li class="list-group-item">
                <div class="mb-3">
                  <label class="form-label">Title: </label>
                  <input 
                    type="text" class="form-control" placeholder="Enter blog title..." 
                    v-model="newBlog.title"
                    :class="{ 'is-invalid' : blogErrors.title }">
                </div>
              </li>
              <li class="list-group-item">
                <div class="mb-3">
                  <label class="form-label">Content: </label>
                  <textarea 
                    cols="30" rows="8" class="form-control" 
                    v-model="newBlog.content"
                    :class="{ 'is-invalid' : blogErrors.title }">
                  </textarea>
                  <!-- <Editor 
                    v-model="newBlog.content"
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
                    }"/> -->
                </div>
              </li>
              <li class="list-group-item">
                <div class="row">
                  <div class="mb-3 col-6 p-1">
                    <label for="formFile" class="form-label">Blog image: </label>
                    <input 
                      class="form-control" type="file" 
                      @change="handleFile"
                      :class="{ 'is-invalid' : blogErrors.image }">
                  </div>
                  <div class="mb-3 col-6 p-1">
                    <label for="formFile" class="form-label">Blog category: </label>
                    <select class="form-select" aria-label="Default select example" v-model="newBlog.category">
                      <option value="blog">Blog</option>
                      <option value="artwork">Artwork</option>
                    </select>
                  </div>
                </div>
              </li>
              <li class="list-group-item">
                <div class="chip-container">
                  <div class="chip" v-for="(chip, i) of newBlog.tags" :key="chip.label">
                    {{chip}}
                    <i class="fa fa-times" @click="deleteChip(i)"></i>
                  </div>
                </div>
                <div class="mb-3">
                  <label class="form-label">Tags: </label>
                  <input v-model="currentChip" @keypress.prevent.enter="saveChip" class="form-control">
                </div>
              </li>
              <li class="list-group-item">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked  v-model="newBlog.isNsfw">
                  <label class="form-check-label" for="flexSwitchCheckChecked">Set NSFW content</label>
                </div>
              </li>
              <li class="list-group-item">
                <div class="col-6 d-grid">
                  <button class="btn btn-primary" type="submit"><i class="fa fa-save"></i> Save blog</button>
                </div>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Admin/Sidebar'
import Offcanvas from '@/components/Admin/Offcanvas'
// import Editor from '@tinymce/tinymce-vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AddBlog',
  components: {
    Sidebar, 
    Offcanvas, 
    // Editor
  },
  data() {
    return {
      currentChip: '',
      file: '',
    }
  },
  computed: {
    ...mapGetters([
      'newBlog',
      'blogErrors'])
  },
  methods: {
    ...mapActions(['addBlog']),

    saveChip() {
      if(this.currentChip != '') {
        this.newBlog.tags.push(this.currentChip)
        this.currentChip = ''
      }
    },

    deleteChip(index) {
      this.newBlog.tags.splice(index, 1)
    },

    handleFile(e) {
      this.newBlog.image = e.target.files[0]
    },

    submitBlog() {
      this.addBlog(this.newBlog)
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