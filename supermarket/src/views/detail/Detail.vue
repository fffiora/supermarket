<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" 
            :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
      <detail-bottom-bar @addCart="addToCart"/>
      <back-top @click.native="backClick" v-show="isShowBackTop"/>
      <toast message="哈哈哈"/>
  </div>
</template>


<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'

import BackTop from 'components/content/backTop/BackTop'
import Scroll from "components/common/scroll/Scroll"
import GoodsList from "components/content/goods/GoodsList"
import Toast from "components/common/toast/Toast.vue";

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail"
import { debounce } from '@/common/utils';

import { mapActions } from 'vuex'

  export default {
    name: "Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      BackTop,
      Toast
     
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        itemParams: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY:null,
        currentIndex:0,
        isShowBackTop:false,
        message: '',
        show: false,

      }
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid
      // console.log(this.$route.params);
      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // 2.1.获取顶部的图片轮播数据
        console.log(res);
        const data = res.result;
        this.topImages = data.itemInfo.topImages

        // 2.2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //2.3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        //2.4.保存商品的详情数据
        this.detailInfo = data.detailInfo

        //2.5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 2.6.获取评论数据
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0] || {};
        }
        // 使用防抖函数，避免函数调用多次
        this.getThemeTopY = debounce(() => {
          this.themeTopYs = []
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.param.$el.offsetTop);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
          this.themeTopYs.push(Number.MAX_VALUE)
          console.log(this.themeTopYs);
        })
        // 图片没有被计算在内，导致值不对
        // this.$nextTick(() => {
        //   this.themeTopYs = []
        //   this.themeTopYs.push(0);
        //   this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        //   console.log(this.themeTopYs);
        // })
        
      }),
      //3.请求推荐数据,然后把数据recommends保存起来
      getRecommend().then(res => {
        console.log(res);
        this.recommends = res.data.list;
      });
    },

    mounted(){
      
    },
  
  
    methods:{
      // 映射
      ...mapActions(['addCart']),

      imageLoad() {
        console.log('detailImage');
        this.$refs.scroll.refresh();
        // 监听y的方法的使用
        this.getThemeTopY()
      },

      titleClick(index){
        //获取详情页导航栏的index
        console.log(index);
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
      },
      contentScroll(position){
        // console.log(position);
        
        // 1.获取y值
        const positionY = -position.y
        let length = this.themeTopYs.length
        for(let i = 0; i<length-1; i++){
          if(this.currentIndex !== i && (positionY>this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])){
            // console.log(i);
            this.currentIndex = i 
          this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        // this.isShowBackTop = -position.y > BACK_POSITION
        this.isShowBackTop = (-position.y) > 1000
      },
      backClick(){
        //500毫秒内回到顶部
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      addToCart(){
        // 1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.newPrice
        product.iid = this.iid
        product.realPrice = this.goods.realPrice;
        // 2.将商品添加到购物车里
        // 不要用这种方法，修改Vuex相关信息要用mutations
        // this.$store.cartList.push(product)
        // this.$store.commit('addCart',product)

        // this.addCart是调用自己的方法，但是自己没有方法，所以使用映射
        this.addCart(product).then(res => {
        /*  this.show = true;
          this.message = res;

          setTimeout(() => {
            this.show = false;
            this.message = '';
          }, 1500)*/
          this.$toast.show(res, 2000);

        })

        //调用vuex里的actions方法
        // this.$store.dispatch('addCart', product).then(res => {
        //   console.log(res);
        // })
      }
      

    }
  }
</script>

<style scoped>
  #detail {
    height: 100vh;
    background-color: #fff;
    position: relative;
    z-index: 1;
    /* 隐藏底部边框 */
    overflow: hidden;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 104px);
  }

</style>

