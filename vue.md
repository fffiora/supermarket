views里的组件：
<tem>
<div id="xxx">
<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
<div/>
</tem>

2.属性and方法
<tab-control :titles="['流行', '新款', '精选']"/>
左边的titles是在TabControl里props的一个数组，右边的是给的东西，根据给多少给什么来定义
<goods-list :goods="showGoods"/>
左边的goods是在GoodList里面props的一个数组，showGoods是在Home里面定义的一个方法
@tabClick = "tabClick"右边是home里面的方法，左边是TabControl里的

3.home.js的请求：
http://152.136.185.210:7878/api/m5/home/data?type=sell&page=1
export function getHomeGoods(type,page){
  return request({
    url:'/home/data',
    params:{
      type,
      page
    } 
  })
}
4.props数组
外面往里面传数据用props接收。内部发生事件往外面传用this.$emit('tabClick',index)
      goods:{
        type:Array,
        default() {
          return []
        }
      }，
      props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    goods:Array
5.goodsItem里一行显示两个图片
.goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    //空隙不均等分给padding
    padding: 2px;
  }
  然后去goodsListItem里给
  .goods-item {
    width: 50%;
  }
  6.mounted(安装，挂载)
  组件安装完之后调用
  
  7.backTop
  把事件发出去
  backClick()｛
  this.$emit('backClick')
  }
  native监听组件点击
  <back-top @click.native="backClick"/>
  
  8.debounce
  this.debounce(this.$refs.scroll.refresh()这样是传入返回值，去掉refresh后面的括号才是传入函数)
  
  9.$el
  无法直接获取组件的offsetTop，但是可以通过$el获取
  所有的组件都有一个属性$el：用于获取组件中的元素(tem里的div啥的)
  this.$refs.tabControl.$el.offsetTop
  这个方法能有效监听offsetTop的高度，但如果有图片没加载完，就会影响到最终结果
  加载最慢的是轮播图，所以我们给在homeSwiper轮播图进行监听
  @load='swiperImageLoad',再把方法传出去this.$emit('swiperImageLoad')
  
  10.导航栏固定
  因为给下面都设置better-scroll，所以导航栏不需要给他脱标
  也可以保持固定
  
  11.跳转到详情页detail
  在router的index添加：
  const Detail = () =>import('../views/detail/Detail')
  {
  path:'/detail/:iid',
  components:Detail
  }
  然后去GoodsListItem添加@click="itemClick"和
  itemClick(){
  this.$router.push('/detail'+this.goodsItem.iid)
  }
  最后去Detail添加
  data(){
  return{
  iid:null
  }
  }和
  created(){
  this.iid = this.$route.params.iid
  }
  12.关于导航栏和插槽(detail)
  <tem>
  <div>
  因为要用插槽，所以不用单标签
  <nav-bar>
  <div slot="center">
  <div v-for="(item,index) in titles">{{items}}</div>
  </div>
  </nav-bar>
  </div>
  <tem>
  data(){
  return{
  titles:['xx','xxx','xxxx'],
  currentIndex:0
  }
}

.title{
display:flex
}
.title-item{
flex:1
}
13.detail请求
  export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}
然后去导入import {getDetail} from "network/detail"
  
14.在detail使用轮播图
在DetailSwiper里面设置参数
<swiper class="detail-swiper">
    <swiper-item v-for="item in topImages" :key="item">
      <img :src="item" alt="">
    </swiper-item>
</swiper>
  props: {
    topImages: {
      type:Array,
      default(){
        return[]
      }
    }
  }
  
  15.判断是否为空对象
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
  
  
  
  
  
  
  
  
  
  
  