<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control" v-show="isTabFixed"/>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
    <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>

    <recommend-view :recommends="recommends"/>
     <feature-view/>
     <!-- 这里是titles -->
     <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick" 
                   ref="tabControl2" />
     <goods-list :goods="showGoods"/>
    </scroll>
     <!-- ul>li{列表$}*10 -->
     <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView.vue'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from'components/content/TabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'
  import {debounce} from "common/utils"
  // 当方法多的时候使用此格式更佳
  import {
    getHomeMultidata,
    getHomeGoods
  } from "network/home";


  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      getHomeGoods,
      GoodsList,
      Scroll,
      BackTop,
      debounce
    },
    data() {
      // 如果不设置return，则下面的函数执行完，数据会被回收
      return {
        banners: [],
        recommends: [],
        goods:{
          'pop':{page: 0, list: []},
          'new':{page: 0, list: []},
          'sell':{page: 0, list: []}
        },
        // 这里没加的话就只能存数据的索引值0123
        currentType: 'pop',
        isShowBackTop:false,
        tabOffsetTop:0,
        isTabFixed: false

      }
    },
    computed:{
      showGoods(){
        // return goods[this.currentType].list
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 1.请求多个数据,必须写this,否则还是用上面import引入的函数
      this.getHomeMultidata()
      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
      
    },
    mounted(){
      // 1.获取tabControl的offsetTop
      // $el用于获取组件中的元素
      // console.log(this.$refs.tabControl.$el.offsetTop);
    },
     methods: {
      /**
       * 事件监听相关的方法
       */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
            //case后面必须跟空格
          case 2:
            this.currentType = 'sell'
            break;
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backClick(){
        //500毫秒内回到顶部
        this.$refs.scroll.scrollTo(0, 0)
      },
      // tabOffsetTop在这里
      swiperImageLoad(){
        this.$refs.scroll.refresh()
      },
      contentScroll(position) {
        // 1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000
        // 2.决定tabControl是否吸顶（positon：fixed）
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
        this.isTabFixed = (-position.y) >this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
        // 加载(刷新)新内容
        this.$refs.scroll.refresh()
      },
      


      // 网络请求相关方法
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          // this.result = res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
      })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // for(let n in res.data.list){
          //   this.goods[type].list.push(n)
          // }
          // console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
 #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
    /* background-color: #fff; */
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  


  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 44px;
    left: 0;
    right: 0;
  }
    .tab-control {
     position: relative;
     z-index: 9;
   }
    /* height: calc(100% - 93px); */
    /* margin-top: 44px; */

</style>
