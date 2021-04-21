<template>
  <div class="container mt-5">
      <div class="row text-center">
        <div class="col-md-2 pull-left">
          <span>Sort: </span>
          <select v-model="filters.activeSort" v-on:change="loadGalleryImages">
            <option v-for="(sort, index) in filters.availableSort" v-bind:value="sort" v-bind:key="index">{{ sort }}</option>
          </select>
        </div>
        <div class="col-md-2 pull-left">
          <span>Section: </span>
          <select v-model="filters.activeSection" v-on:change="loadGalleryImages">
            <option v-for="(section, index) in filters.availableSections" v-bind:value="section" v-bind:key="index">{{ section }}</option>
          </select>
        </div>
        <div class="col-md-2 pull-left">
          <span>Window: </span>
          <select v-model="filters.activeWindow" v-on:change="loadGalleryImages">
            <option v-for="(window, index) in filters.availableWindows" v-bind:value="window" v-bind:key="index">{{ window }}</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4" v-for="image in gallery.images"
             v-bind:key="image.id">
          <div class="card p-3">
            <div class="d-flex flex-row mb-3">
              <img v-bind:src="image.link" width="70">
              <div class="d-flex flex-column ml-2"><span>Stripe</span><span
                  class="text-black-50">Payment Services</span><span class="ratings"><i class="fa fa-star"></i><i
                  class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></span></div>
            </div>
            <h6 v-if="image.description">
              {{ image.description.substring(0, 30) + "..." }}
            </h6>
            <div class="d-flex justify-content-between install mt-3"><span>Installed 172 times</span><span
                class="text-primary">View&nbsp;<i class="fa fa-angle-right"></i></span></div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import store from '../store'
import {mapState} from "vuex";

export default {
  name: 'Gallery',
  data: function () {
    return initialState();
  },
  computed: mapState({
    loggedIn: state =>  state.user.loggedIn,
    gallery: state =>  state.gallery
  }),
  methods: {
    loadGalleryImages() {
      store.commit('loadGalleryImages', this.filters)
    }
  },
  mounted() {
    this.loadGalleryImages()
  }
}

function initialState() {
  return {
    filters: {
      availableSort: ['viral', 'top', 'time', 'rising'],
      availableSections: ['hot', 'top', 'user'],
      availableWindows: ['day', 'week', 'month', 'year', 'all'],
      activeSort: 'viral',
      activeSection: 'hot',
      activeWindow: 'day',
      currentPage: 1,
      showViral: false,
      showMature: false,
      albumPreviews: false
    },
    style_grid: true,
  }
}

</script>