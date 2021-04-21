<template>
  <div></div>
</template>
<script>
import store from '../store'
export default {
  name: 'Logout',
  beforeRouteEnter(to, from, next) {
    store.commit('logout')
    next({name: 'Home'})
  }
}
</script>