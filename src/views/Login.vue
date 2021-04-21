<template>
  <div class="page-content login-page container">
    <div class="wrapper fadeInDown">
      <div id="formContent">
        <a v-if="!loggedIn" v-bind:href="'https://api.imgur.com/oauth2/authorize?response_type=token&client_id=' + client_id"
           class="btn btn-primary"> Login with Imgur OAuth2 API </a>
        <div v-if="loggedIn">
          Welcome to our app
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from '../store'
import {mapState} from "vuex";

export default {
  name: 'login',
  data: function () {
    return {
      client_id: process.env.VUE_APP_IMGUR_CLIENT_ID
    }
  },
  mounted() {
    if(this.$route.hash !== ''){
      console.log(this.$route)
      const parsedParams = {};
      this.$route.hash.split('&')
          .map(part => part.replace(/#/, ''))
          .forEach(param => {
            const parts = param.split('=');
            parsedParams[parts[0]] = parts[1];
          });
      if(parsedParams.access_token) {
        store.commit('login', parsedParams)
      }
    }
  },
  computed: mapState({
    loggedIn: state =>  state.user.loggedIn
  }),
}
</script>