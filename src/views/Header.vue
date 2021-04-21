<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link class="navbar-brand" :to="{name: 'Home'}">Navbar</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link :to="{ name: 'Home', params: { }}" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Gallery', params: { }}" class="nav-link">Gallery</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="!loggedIn" :to="{ name: 'Login', params: { }}" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="loggedIn" :to="{ name: 'Logout', params: { }}" class="nav-link">Logout</router-link>
          </li>
        </ul>
        <div v-if="loggedIn" class="nav-item pull-right text-white">
          <span>
            Logged in as: {{ accountUsername }}
          </span>
        </div>
      </div>
    </nav>
  </header>
</template>
<script>
import { mapState } from 'vuex'
import '../plugins/bootstrap-vue'
import 'jquery'

export default {
  computed: mapState({
    loggedIn: state =>  state.user.loggedIn,
    accountUsername: state => state.user.accountUsername,
    accountId: state => state.user.accountId
  }),
}
</script>