<template>
  <swiper>
    <swiper-item v-for="banner in banners">
      <a :href="banner.link">
        <img :src="banner.image" alt="" @load="imageLoadFinished">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banners: Array
  },
  data() {
    return {
      isLoad: false
    }
  },
  methods: {
    imageLoadFinished() {
      if (!this.isLoad) {
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  }
}
</script>

<style scoped>

</style>