import { 
    ADD_TO_CART, 
    ADD_TO_COUNTER
} from './constant';

export default {
    [ADD_TO_CART](state,payload){
        // 添加新商品默认选中
        payload.isSelected = true
        state.cartList.push(payload);
    },
    [ADD_TO_COUNTER](state, payload){
        payload.num ++ ;
    }
}