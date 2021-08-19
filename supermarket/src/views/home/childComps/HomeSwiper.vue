<template>
    <swiper>
      <swiper-item v-for=" (item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
  
</template>

<script>
import {Swiper ,SwiperItem} from 'components/common/swiper'
export default {
  name:'HomeSwiper',
  data() {
    return {
      isLoad:false
    }
  },
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    Swiper,
    SwiperItem
  },
  methods: {
      imageLoad(){
        //让当前方法只加载一次，减少服务器压力
        if(!this.isLoad){
        this.$emit('swiperImageLoad')
        //调用完函数这次给他改成true，当下次实现imageLoad方法时，!this.isLoad就等于false了
        this.isLoad = true
      }
    }
  },
}
</script>

<style  scoped>
</style>