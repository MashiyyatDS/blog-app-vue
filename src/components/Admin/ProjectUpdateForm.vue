<template>
  <div class="modal fade" id="projectUpdateForm" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen-xxl-down">
      <form @submit.prevent="submitEditForm">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <ul class="list-group">
              <li class="list-group-item">
                <div class="mb-3">
                  <label class="form-label">Project title: </label>
                  <input type="text" class="form-control" v-model="getProject.title"
                  placeholder="Enter project title...">
                </div>
              </li>
              <li class="list-group-item">
                <div class="mb-3">
                  <label class="form-label">Project description: </label>
                  <textarea cols="30" rows="8" class="form-control" 
                  placeholder="Enter project description..." v-model="getProject.description"></textarea>
                </div>
              </li>
              <li class="list-group-item">
                <div class="row">
                  <div class="col-6 p-1">
                    <label class="form-label">Demo link: </label>
                    <input type="text" class="form-control" 
                    placeholder="Enter project title..."
                      v-model="getProject.link">
                  </div>
                  <div class="col-6 p-1">
                    <label class="form-label">Repository: </label>
                    <input type="text" class="form-control" 
                    placeholder="Enter project title..."
                      v-model="getProject.repository">
                  </div>
                </div>
              </li>
              <li class="list-group-item">
                <div class="mb-3 p-1">
                  <label for="formFile" class="form-label">Project image: </label>
                  <input class="form-control" type="file" @change="handleFile">
                </div>
              </li>
              <li class="list-group-item">
                <div class="chip-container">
                  <div class="chip" v-for="(chip, i) of getProjectTags" :key="chip.label">
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

export default {
  name: 'ProjectUpdateForm',
  props: ['editProject'],
  computed: {
    ...mapGetters(['getProject', 'getProjectTags'])
  }, 
  data() {
    return {
      chips: [],
      currentChip: '',
    }
  },
  methods: {
    ...mapActions(['updateProject']),

    submitEditForm() {
      let filteredTags = this.getProjectTags.map(tag => tag.tag)
      const payload = {
        id: this.getProject.id,
        project: this.getProject,
        tags: filteredTags
      }
      console.log(payload)
      this.updateProject(payload)
    },

    saveChip() {
      if(this.currentChip != '') {
        this.getProjectTags.push({ tag: this.currentChip })
        this.currentChip = ''
      }
    },

    deleteChip(index) {
      this.getProjectTags.splice(index, 1)
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