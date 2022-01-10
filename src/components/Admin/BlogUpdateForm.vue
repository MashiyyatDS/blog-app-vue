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
                  <textarea cols="30" rows="8" class="form-control" 
                  placeholder="Enter project description..."
                  v-model="getBlog.content"></textarea>
                </div>
              </li>
              <li class="list-group-item">
                <div class="form-check">
                  <input class="form-check-input" 
                    type="checkbox"
                    v-model="getBlog.isNsfw">
                  <label class="form-check-label" for="defaultCheck1">
                    Set NSFW content
                  </label>
                </div>
              </li>
              <li class="list-group-item">
                <div class="mb-3 p-1">
                  <label for="formFile" class="form-label">Blog image: </label>
                  <input class="form-control" type="file" @change="handleFile">
                </div>
              </li>
              <li class="list-group-item">
                <div class="chip-container">
                  <div class="chip" v-for="(chip, i) of chips" :key="chip.label">
                    {{chip}}
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
            <button type="submit" class="btn btn-primary">Save</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'BlogUpdateForm',
  data() {
    return {
      chips: [],
      currentChip: ''
    }
  },
  computed: {
    ...mapGetters(['getBlog'])
  },
  methods: {
    ...mapActions(['updateBlog']),

    submitBlog() {
      const payload = {
        id: this.getBlog.id,
        blog: this.getBlog
      }
      this.updateBlog(payload)
    }, 

    saveChip() {
      this.chips.push(this.currentChip)
      this.currentChip = ""
    },

    deleteChip(i) {
      this.chips.splice(i, 1)
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