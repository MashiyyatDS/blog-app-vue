<template>
  <div>
    <Offcanvas/>
    <div class="row">
      <div class="col-lg-3">
        <Sidebar/>
      </div>
      <div class="col-lg-9 col-md-12">
        <Nav v-bind:title="'LOGIN'"/>
        <ul>
          <li>Current User: {{ this.currentUser }}</li>
          <li>Authenticated: {{ this.isAuthenticated }}</li>
        </ul>
        <div class="row mt-5">
          <div class="col-md-4 offset-md-4">
            <form @submit.prevent="submitLogin">
              <ul class="list-group">
                <li class="list-group-item">
                  <h1>Login</h1>
                </li>
                <li class="list-group-item">
                  <div class="mb-3">
                    <label class="form-label">Email address:</label>
                    <input type="email" 
                      class="form-control" 
                      placeholder="name@example.com" 
                      v-model="user.email">
                  </div>
                </li>
                <li class="list-group-item">
                  <div class="mb-3">
                    <label class="form-label">Password:</label>
                    <input type="password" 
                      class="form-control" 
                      placeholder="Enter your password..."
                      v-model="user.password">
                  </div>
                </li>
                <li class="list-group-item">
                  <div class="d-grid mt-3">
                    <button class="btn btn-outline-primary" type="submit">Login</button>
                  </div>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Partials/Sidebar'
import Offcanvas from '@/components/Partials/Offcanvas'
import Nav from '@/components/Partials/Nav'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Login',
  components: {
    Sidebar, Offcanvas, Nav
  },
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  created() {
    this.getCurrentUser()
  },
  computed: {
    ...mapGetters(['currentUser', 'isAuthenticated'])
  },
  methods: {
    ...mapActions(['loginUser', 'getCurrentUser']),

    submitLogin() {
      this.loginUser(this.user)
    }
  }
}
</script>
