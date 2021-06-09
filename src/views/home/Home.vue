<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center" >购物街</div></nav-bar>

    <scroll
        class="content"
        ref="scroll"
        :probeType="3"
        @scroll="contentScroll"
        :pullUpLoad="true"
        @pullingUp="loadMore">
      <home-swiper :banners="banners"/>
      <home-recommend-view :recommends="recommends"/>
      <home-feature-view/>
      <tab-control class="tab-control" :titles="['流行','新款','精选']" @titleClick="titleClick"/>
      <goods-list :goods="goodType"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isBottom"/>

  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper"
import HomeRecommendView from "./childComps/HomeRecommendView"
import HomeFeatureView from "./childComps/HomeFeatureView"

import NavBar from "components/common/navbar/NavBar"
import TabControl from "components/content/tabControl/TabControl"
import GoodsList from "components/content/goods/GoodsList"
import BackTop from "components/content/backTop/BackTop"

import Scroll from "components/common/scroll/Scroll";

import {getHomeMultiData,getHomeGoodsData} from "network/home"

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      dKeywords: [],
      keywords: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentGoodsType: 'pop',
      isBottom: false,
    }
  },
  components: {
    HomeRecommendView,
    NavBar,
    HomeSwiper,
    HomeFeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  computed: {
    goodType() {
      return this.goods[this.currentGoodsType].list
    }
  },
  created() {
    this.getHomeMultiData()

    this.getHomeGoodsData('pop')
    this.getHomeGoodsData('new')
    this.getHomeGoodsData('sell')
  },
  methods: {
    getHomeMultiData() {
      getHomeMultiData().then(res => {
        this.banners = res.data.data.banner.list
        this.dKeywords= res.data.data.dKeyword.list
        this.keywords = res.data.data.keywords.list
        this.recommends = res.data.data.recommend.list
      })
    },
    getHomeGoodsData(type) {
      let page = this.goods[type].page + 1
      getHomeGoodsData(type,page).then(res => {
        this.goods[type].list.push(...res.data.data.list)
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
      })
    },
    titleClick(index) {
      if(index === 0){
        this.currentGoodsType = 'pop'
      }else if(index === 1) {
        this.currentGoodsType = 'new'
      }else {
        this.currentGoodsType = 'sell'
      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0,0,500)
    },
    contentScroll(position) {
      this.isBottom = position.y < -2350
    },
    loadMore() {
      this.$refs.scroll.scroll.refresh()
      this.getHomeGoodsData(this.currentGoodsType)
    }
  }
}
</script>

<style scoped>

  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /*.content {*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/
</style>
