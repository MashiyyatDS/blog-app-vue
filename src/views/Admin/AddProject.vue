<template>
  <div>
    <Offcanvas/>
    <div class="row">
      <div class="col-lg-3">
        <Sidebar/>
      </div>
      <div class="col-lg-9 col-md-12 mt-2">
        <nav class="navbar d-flex justify-content-in-between p-1">
          <h5><i class="fa fa-chevron-right"></i> Admin Panel</h5>
          <button class="btn-sm btn btn-outline-primary d-lg-none d-sm-block d-xs-block ms-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop">
            <i class="fa fa-bars"></i>
          </button>
        </nav>

        <div class="m-1">
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <router-link to="/admin/projects" class="nav-link">
                <i class="fa fa-list"></i> Projects
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/admin/add-project" class="nav-link active">
                <i class="fa fa-plus"></i> Add project
              </router-link>
            </li>
          </ul>
        </div>

        <div class="m-1">
          <form @submit.prevent="submitProject">
            <ul class="list-group mb-5">
              <li class="list-group-item">
                <div class="mb-3">
                  <label class="form-label">Title: </label>
                  <input 
                    type="text" class="form-control" placeholder="Enter project title..." 
                    v-model="newProject.title"
                    :class="{ 'is-invalid' : projectErrors.title }">
                </div>
              </li>
              <li class="list-group-item">
                <div class="mb-3">
                  <label class="form-label">Description: </label>
                  <textarea 
                    cols="30" rows="10" class="form-control" 
                    v-model="newProject.description"
                    :class="{ 'is-invalid' : projectErrors.description }">
                  </textarea>
                    <!-- <Editor 
                      v-model="newProject.description"
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
                <div class="mb-3">
                  <label class="form-label">Demo link: </label>
                  <input 
                    type="text" class="form-control" placeholder="Enter project demo link..." 
                    v-model="newProject.link"
                    :class="{ 'is-invalid' : projectErrors.link }">
                </div>
              </li>
              <li class="list-group-item">
                <div class="mb-3">
                  <label class="form-label">Repository: </label>
                  <input 
                    type="text" class="form-control" placeholder="Enter project repository..." 
                    v-model="newProject.repository"
                    :class="{ 'is-invalid' : projectErrors.repository }">
                </div>
              </li>
              <li class="list-group-item">
                <div class="mb-3 p-1">
                  <label for="formFile" class="form-label">Project image: </label>
                  <input 
                    class="form-control" type="file" 
                    @change="handleFile"
                    :class="{ 'is-invalid' : projectErrors.image }">
                </div>
              </li>
              <li class="list-group-item">
                <div class="chip-container">
                  <div class="chip" v-for="(chip, i) of newProject.tags" :key="chip.label">
                    {{chip}}
                    <i class="fa fa-times" @click="deleteChip(i)"></i>
                  </div>
                </div>
                <div class="mb-3">
                  <label class="form-label">Tags: </label>
                  <input v-model="currentChip" @keypress.prevent.enter="saveChip" class="form-control" placeholder="Enter project tags">
                </div>
              </li>
              <li class="list-group-item">
                <div class="col-6 d-grid">
                  <button class="btn btn-primary" type="submit"><i class="fa fa-save"></i> Save project</button>
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
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "AddProject",
  components: {
    Offcanvas, 
    Sidebar, 
    // Editor
  },
  data() {
    return {
      chips: [],
      currentChip: '',
      file: {}
    }
  },
  computed: {
    ...mapGetters([
      'newProject',
      'projectErrors'
      ])
  },
  methods: {
    ...mapActions(['addProject']),

    saveChip() {
      if(this.currentChip != '') {
        this.newProject.tags.push(this.currentChip)
        this.currentChip = ''
      }
    },

    deleteChip(index) {
      this.newProject.tags.splice(index, 1)
    },

    handleFile(e) {
      this.newProject.image = e.target.files[0]
    },

    submitProject() {
      this.addProject(this.newProject)
    },
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