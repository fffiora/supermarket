<template>
    <div class="bottom-bar">
        <div class="check-content">
            <check-goods-btn 
            :isSelected="isSelectAllGoods" 
            class="check-button"
            @click.native="handleSelectAllGoods"/>
            <span>全选</span>
        </div>
        <div class="all-price">
            合计: ￥{{totalPrice}}
        </div>
        <div class="have-the-bill" @click="calcClick">
            买单:{{totalNum}}
        </div>
    </div>
</template>

<script>
import CheckGoodsBtn from '@/components/content/checkGoodsBtn/CheckGoodsBtn';


// import {debounce} from '@/common/utils';

import { mapGetters } from 'vuex';

export default {
    name: 'CartBottomBar',
    components: {
        CheckGoodsBtn
    },
    computed: {
        ...mapGetters(['cartList','cartList.length']),
        totalPrice() {
            return this.cartList
            .filter(item =>  item.isSelected)
            .reduce((prev,curr) => {
            return prev + curr.realPrice * curr.num
            }, 0).toFixed(2);
        },
        totalNum() {
            return this.cartList
            .filter(item => item.isSelected)
            .reduce((prev,curr) => {
                return prev + curr.num;
            }, 0)
        },
        isSelectAllGoods() {
            // 当购物车为空时，关闭全选按钮
            if(this.cartList.length === 0) return false
            //去找没有被选中的，如果有，则返回true，然后再取反，返回false
            return !this.cartList.find(item => !item.isSelected)
        }
    },
    methods:{
       handleSelectAllGoods() {
           if(this.isSelectAllGoods){//全部选中
           this.cartList.map(item => item.isSelected = false)
           }else{//部分或不选中
               this.cartList.map(item => item.isSelected =true)
           }
       },
       calcClick() {
           if(!this.isSelectAllGoods) {
               this.$toast.show('请选择购买的商品', 2000)
           }
       }

    }
     
}
</script>

<style scoped>
.bottom-bar {
    position: relative;
    display: flex;
    height: 40px;
    background-color: #eee;
    line-height: 40px;
}
.check-content{
    display: flex;
    /* line-height: 40px; */
    align-items: center;
    width: 60px;
}
.check-button{
    width: 20px;
    height: 20px;
    /* 不给行高的话点完按钮，会自动下移 */
    line-height: 20px;
    margin-left: 8px;
}
.all-price{
    margin-left: 20px;
    flex:1;
}
.have-the-bill{
    width: 90px;
    background-color: pink;
    text-align: center;
    color: #fff;
}

</style>
