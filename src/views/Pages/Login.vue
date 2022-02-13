<template>
  <div class="row">
    <div class="col-md-12">
      <Navbar />
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <Navtabs 
            v-bind:tab="'blogs'"/>
          <form @submit.prevent="submitLogin">
            <ul class="list-group">
              <li class="list-group-item d-flex justify-content-center">
                <h3>Login</h3>
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
  <Footer />
</template>

<script>
import Navbar from '@/components/Partials/Navbar'
import Navtabs from '@/components/Partials/Navtabs'
import Footer from '@/components/Partials/Footer'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  components: {
    Navbar,
    Navtabs,
    Footer
  },
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(['loginUser']),

    submitLogin() {
      this.loginUser(this.user)
    }
  }
}
</script>
