<template>
  <div class="bg-white rounded shadow-sm col" data-toggle="modal"  :data-target="'#image-modal-' + image.id">
    <div class="media-card" v-lazyload>
      <img v-if="image.mp4 == undefined" :data-url="image.link"
           v-bind:alt="image.title"
           onerror="this.onerror=null; this.src='/404.jpg'"
           class="img-fluid card-img-top">
      <video v-if="image.mp4 != undefined" controls class="img-fluid card-img-top">
        <source :data-url="image.mp4" type="video/mp4">
      </video>
    </div>
    <div class="p-4">
      <h5>
        <a href="javascript:void(0)" class="text-dark">{{ image.title }}</a>
      </h5>
      <div class="border-bottom pt-2 mt-2">
        <h4>Description: </h4>
        <p v-if="image.description" class="text-break">{{ image.description.substring(0, 30) + '...' }}</p>
      </div>
      <div class="d-flex align-items-center justify-content-between rounded-pill bg-light px-3 py-2 mt-4">
        <p class="small mb-0">
          <i class="fa fa-picture-o mr-2"></i>
          <span class="font-weight-bold">Viewed <font color="#8b0000" size="3">{{ image.views }}</font> times</span>
        </p>
      </div>
    </div>
    <div class="modal fade" v-bind:id="'image-modal-' + image.id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Title: {{ image.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" v-lazyload>
            <img v-if="image.mp4 == undefined" :data-url="image.link"
                 v-bind:alt="image.title"
                 onerror="this.onerror=null; this.src='/404.jpg'"
                 class="img-fluid w-100">
            <video v-if="image.mp4 != undefined" controls class="w-100">
              <source :data-url="image.mp4" type="video/mp4">
            </video>
            <div class="border-bottom pt-2 mt-2">
              <h4>Description: </h4>
              <p class="text-break">{{ image.description }}</p>
            </div>
            <div class="border-bottom pt-2 mt-2">
              <h4>Statistics: </h4>
              <span class="font-weight-bold">Views <font color="#8b0000" size="3">{{  image.views }}</font></span> |
              <span class="font-weight-bold">Up Votes: <font color="#8b0000" size="3">{{ image.ups }}</font></span> |
              <span class="font-weight-bold">Down Votes: <font color="#8b0000" size="3">{{ image.downs }}</font></span> |
              <span class="font-weight-bold">Score: <font color="#8b0000" size="3">{{ image.score }}</font></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LazyLoadDirective from "../directives/LazyLoadDirective";

export default {
  name: 'ImageItem',
  props: {
    image: Object,
  },
  directives: {
    LazyLoadDirective
  }
}
</script>