//import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import './plugins/bootstrap-vue'
import router from './router'
import store from './store'
import VueSession from 'vue-session'
import './middleware/requireAuth'
import './middleware/hideForAuthenticatedUsers'

require('dotenv').config()

Vue.config.productionTip = false

var options = {
  persist: true
}
Vue.use(VueSession, options)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')