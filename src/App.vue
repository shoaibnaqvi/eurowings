<template>
  <div>
    <Header />
    <div class="page-content">
      <router-view/>
    </div>
    <Footer />
  </div>
</template>
<script>
import Header from './views/Header'
import Footer from './views/Footer'

export default {
  name: '',
  components: {
    Header,
    Footer
  }
}
</script>