<template>
  <div class="modal fade" id="projectUpdateForm" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen-xxl-down">
      <form action="">
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
                  <input type="text" class="form-control" v-model="editProject.title"
                  placeholder="Enter project title...">
                </div>
              </li>
              <li class="list-group-item">
                <div class="mb-3">
                  <label class="form-label">Project description: </label>
                  <textarea cols="30" rows="8" class="form-control" 
                  placeholder="Enter project description..."></textarea>
                </div>
              </li>
              <li class="list-group-item">
                <div class="row">
                  <div class="col-6 p-1">
                    <label class="form-label">Demo link: </label>
                    <input type="text" class="form-control" 
                    placeholder="Enter project title...">
                  </div>
                  <div class="col-6 p-1">
                    <label class="form-label">Repository: </label>
                    <input type="text" class="form-control" 
                    placeholder="Enter project title...">
                  </div>
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
export default {
  name: 'ProjectUpdateForm',
  props: ['editProject']
}
</script>