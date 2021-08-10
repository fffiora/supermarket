<template>
  <div class="wrapper" ref='wrapper'>
    <div class="content">
    <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name:'Scroll',
    props:{
        probeType:{
            // type类型首字母大写
            type:Number,
            default:0
        },
        pullUpLoad:{
          type:Boolean,
          default:false
        }
    },
    data(){
        return{
            Scroll:null
        }
    },
    mounted() {
      // 1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        // 这里click设置为true，则<div @click></div>有效
        // 但是<button>的click事件，无论有没有这个click:true都有效
        click: true,
        //实时监听:0是默认值拒绝监听，1也是拒绝，
        //2是当鼠标挪到页面之外即使还滚动但还是拒绝监听，3是任何情况都监听
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
        
      })

      // 2.监听滚动的位置,scroll是名称，使用时@scroll='一个方法名',
      if(this.probeType === 2 || this.probeType === 3){
        this.scroll.on('scroll', (position) => {
        // console.log(position);
        this.$emit('scroll', position)
      })
      }

      // 3.监听上拉事件
      if(this.pullUpLoad){
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
        console.log("拉到底了");
      //   setTimeout(() => {
      //   this.scroll.finishPullUp();
      // }, 2000);
    })
     
      }
    },
    methods: {
      // 返回函数：可以设置点击某个按钮，返回到顶部或任意位置
      scrollTo(x, y, time=1000) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      // 加载新内容
      refresh() {
        // console.log('加载新内容');
        this.scroll && this.scroll.refresh()
      }
    }
  }


</script>
<style scoped>
/* .wrapper{
    padding-top: 44px;
} */
</style>