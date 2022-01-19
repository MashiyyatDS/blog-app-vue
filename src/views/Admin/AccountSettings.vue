<template>
  <div>
    <Offcanvas/>
    <div class="row">
      <div class="col-lg-3">
        <Sidebar/>
      </div>
      <div class="col-lg-9 col-md-12 mt-2">
        <nav class="navbar d-flex justify-content-in-between p-1">
          <h3>Account Settings</h3>
          <button class="btn-sm btn btn-outline-primary d-lg-none d-sm-block d-xs-block ms-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop">
            <i class="fa fa-bars"></i>
          </button>
        </nav>
        <!-- NAVBAR HERE -->
        <div class="row mb-5">
          <form @submit.prevent="submitAccountForm">
            <ul class="list-group">
              <li class="list-group-item">
                <div class="row">
                  <div class="col-md-6 p-1">
                    <div class="mb-3">
                      <label>Firstname: </label>
                      <input type="text" class="form-control" v-model="currentUser.firstname">
                    </div>
                  </div>
                  <div class="col-md-6 p-1">
                    <div class="mb-3">
                      <label>Lastname: </label>
                      <input type="text" class="form-control" v-model="currentUser.lastname">
                    </div>
                  </div>
                </div>
              </li>
              <li class="list-group-item">
                <div class="col-md-12 p-1">
                  <div class="mb-3">
                    <label>Email: </label>
                    <input type="email" class="form-control" v-model="currentUser.email">
                  </div>
                </div>
              </li>
              <li class="list-group-item">
                <div class="col-6 d-grid">
                  <button class="btn btn-primary" type="submit"><i class="fa fa-save"></i> Save</button>
                </div>
              </li>
            </ul>
          </form>
        </div>

        <div class="row mb-5">
          <h4>Reset password</h4>
          <ul class="list-group">
            <li class="list-group-item">
              <div class="col-md-12 p-1">
                <div class="mb-3">
                  <label>New password: </label>
                  <input type="password" class="form-control" placeholder="Enter your new password">
                </div>
              </div>
            </li>
            <li class="list-group-item">
              <div class="col-md-12 p-1">
                <div class="mb-3">
                  <label>Password confirmation: </label>
                  <input type="password" class="form-control" placeholder="Re-Enter your new password">
                </div>
              </div>
            </li>
            <li class="list-group-item">
              <div class="col-6 d-grid">
                <button class="btn btn-primary"><i class="fa fa-save"></i> Save password</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Admin/Sidebar'
import Offcanvas from '@/components/Admin/Offcanvas'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AccountSettings',
  components: {
    Sidebar, Offcanvas
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    ...mapActions(['authenticateUser', 'updateUser']), 

    submitAccountForm() {
      this.updateUser(this.currentUser)
    }
  },
  created() {
    this.authenticateUser()
  }
}
</script>