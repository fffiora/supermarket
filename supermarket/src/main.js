import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueLazyload from 'vue-lazyload'
import store from './store'
// 导致toast，会默认导入toast里的index.js
import toast from 'components/common/toast'

Vue.config.productionTip = false

//添加事件总线对象
Vue.prototype.$bus = new Vue()
//安装toast插件
Vue.use(toast)

Vue.use(VueLazyload, {
  // error: './assets/common/placeholder.png',
  loading: require('./assets/img/common/loading.gif')
});

new Vue({
  render: h => h(App),
  router,
  store,
  toast
}).$mount('#app')
