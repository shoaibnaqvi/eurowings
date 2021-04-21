<template>
  <div class="position-relative overflow-hidden text-left">
    <div class="text-right p-2">
      <button class="btn btn-primary pull-right" id="mobile-filter" v-on:click="showHideFilters">Filter</button>
    </div>
    <section id="sidebar" class="filters">
      <div class="border-bottom pb-2 ml-2">
        <h4 id="burgundy">Filters</h4>
      </div>
      <div class="py-2 border-bottom ml-3">
        <h6 class="font-weight-bold">Section</h6>
        <div class="orange">
          <font size="5">-</font>
        </div>
        <div class="col-lg-12">
          <input type="radio"
                 v-model="filters.activeSection"
                 v-on:change="applyFilter"
                 value="hot">
          <label>Hot</label>
        </div>
        <div class="col-lg-12">
          <input type="radio"
                 v-model="filters.activeSection"
                 v-on:change="applyFilter"
                 value="top">
          <label>Top</label>
        </div>
        <div class="col-lg-12">
          <input type="radio"
                 v-model="filters.activeSection"
                 v-on:change="applyFilter"
                 value="user">
          <label>User</label>
        </div>
      </div>
      <div class="py-2 border-bottom ml-3">
        <h6 class="font-weight-bold">Sort</h6>
        <div class="orange">
          <font size="5">-</font>
        </div>
        <div class="col-lg-12">
          <input type="radio"
                 v-model="filters.activeSort"
                 v-on:change="applyFilter"
                 value="viral">
          <label>Viral</label>
        </div>
        <div class="col-lg-12">
          <input type="radio"
                 v-model="filters.activeSort"
                 v-on:change="applyFilter"
                 value="top">
          <label>Top</label>
        </div>
        <div class="col-lg-12">
          <input type="radio"
                 v-model="filters.activeSort"
                 v-on:change="applyFilter"
                 value="time">
          <label>Time</label>
        </div>
        <div class="col-lg-12">
          <input type="radio"
                 v-model="filters.activeSort"
                 v-on:change="applyFilter"
                 value="rising">
          <label>Rising</label>
        </div>
      </div>
      <div class="py-2 border-bottom ml-3">
        <h6 class="font-weight-bold">Window</h6>
        <div class="orange">
          <font size="5">-</font>
        </div>
        <div class="col-lg-12">
          <input type="radio"
                 v-model="filters.activeWindow"
                 v-on:change="applyFilter"
                 value="day">
          <label>Day</label>
        </div>
        <div class="col-lg-12">
          <input type="radio"
                 v-model="filters.activeWindow"
                 v-on:change="applyFilter"
                 value="week">
          <label>Week</label>
        </div>
        <div class="col-lg-12">
          <input type="radio"
                 v-model="filters.activeWindow"
                 v-on:change="applyFilter"
                 value="month">
          <label>Month</label>
        </div>
        <div class="col-lg-12">
          <input type="radio"
                 v-model="filters.activeWindow"
                 v-on:change="applyFilter"
                 value="year">
          <label>Year</label>
        </div>
        <div class="col-lg-12">
          <input type="radio"
                 v-model="filters.activeWindow"
                 v-on:change="applyFilter"
                 value="all">
          <label>All</label>
        </div>
      </div>
      <div class="py-2 border-bottom ml-3">
        <h6 class="font-weight-bold">Other</h6>
        <div class="orange">
          <font size="5">-</font>
        </div>
        <div class="col-lg-12">
          <input type="checkbox" v-model="filters.showViral"
                 v-on:change="applyFilter">
          <label>Show Viral</label>
        </div>
        <div class="col-lg-12">
          <input type="checkbox" v-model="filters.showMature"
                 v-on:change="applyFilter">
          <label>Show Mature</label>
        </div>
        <div class="col-lg-12">
          <input type="checkbox" v-model="filters.albumPreviews"
                 v-on:change="applyFilter">
          <label>Album preview</label>
        </div>
      </div>
    </section>
    <section id="products">
      <div class="eq-cols">
        <div class="px-lg-5">
          <div class="border-bottom pb-2 mb-2 pl-2 pt-2">
            <h4>
              <span class="pull-left">Gallery</span>
            </h4>
          </div>
          <div class="row">
            <!-- Gallery item -->
            <div class="col-xl-3 col-lg-4 col-md-6 mb-4 col-container" v-for="(image, index) in gallery.images"
                 v-bind:id="'image-' + index"
                 v-bind:key="index">
              <ImageItem :image="image"></ImageItem>
            </div>
            <!-- End -->

          </div>
          <div class="row text-center" v-if="gallery.loading">
            <div class="col-md-12 p-5 text-center">
              Loading......
            </div>
          </div>
          <div class="py-5 text-center" v-if="!gallery.loading">
            <a href="javascript:void(0)" v-on:click="nextPage" class="btn btn-dark px-5 py-3 text-uppercase">Show me more</a>
          </div>
        </div>
      </div>

    </section>
  </div>
</template>

<script>
import store from '../store'
import {mapState} from "vuex";
import ImageItem from './ImageItem'
import jQuery from 'jquery'

export default {
  name: 'Gallery',
  data: function () {
    return initialState();
  },
  components: {
    ImageItem
  },
  computed: mapState({
    loggedIn: state => state.user.loggedIn,
    gallery: state => state.gallery
  }),
  methods: {
    loadGalleryImages() {
      store.dispatch('loadGalleryImages', this.filters)
    },
    applyFilter() {
      this.filters.currentPage = 1
      this.loadGalleryImages()
    },
    nextPage() {
      this.filters.currentPage += 1
      this.loadGalleryImages()
    },
    showHideFilters() {
      jQuery('#sidebar').toggle()
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