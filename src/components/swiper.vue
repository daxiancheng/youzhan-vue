<template>
  <!-- Slider main container -->
  <div class="swiper-container">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
      <!-- Slides -->
      <div class="swiper-slide" v-for="(list,index) in lists">
        <a class="js-no-follow" :href="list.clickUrl">
          <img class="goods-main-photo fadeIn" :src="list.img" />
        </a>
      </div>
    </div>
    <!-- If we need pagination -->
    <div class="swiper-pagination"></div>

    <!-- If we need navigation buttons -->
    <!-- <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>-->

    <!-- If we need scrollbar -->
    <!-- <div class="swiper-scrollbar"></div> -->
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
export default {
  name: "swiper",
  props: {
    lists: {
      type: Array
    }
  },
  methods: {
    init() {
      new Swiper(".swiper-container", {
        // Optional parameters
        // direction: "vertical",
        loop: true,

        // If we need pagination
        pagination: {
          el: ".swiper-pagination"
        },
        autoplay: {
          delay: 3000
        }

        // Navigation arrows
        // navigation: {
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev"
        // }

        // And if we need scrollbar
        // scrollbar: {
        //   el: ".swiper-scrollbar"
        // }
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped>
.swiper-wrapper img {
  width: 100%;
  height: 100%;
}
/* .swiper-container {
    width: 375px;
    height: 180px;
} */
</style>
