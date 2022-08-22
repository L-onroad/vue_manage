import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/less/index.less'

// 引入router
import router from './router'
// 使用vuex
import store from './store'
import './api/mock'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.prototype.$axios = axios

new Vue({
  el:'#app',
  render: h => h(App),
  router,
  store,
  created() {
    this.$store.commit("addMenu", router);
  }
  // beforeCreate(){
  //   //创建全局事件
  //   Vue.prototype.$bus = this
  // }
})