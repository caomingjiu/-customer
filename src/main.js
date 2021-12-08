import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import global_ from '@/util/Global'
Vue.prototype.GLOBAL = global_

import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'Go9rFdpWHQq4fkdyTMjEVlEI4wWXQcvF',
})

import 'ant-design-vue/dist/antd.css'
import Antd from 'ant-design-vue'
Vue.use(Antd)
// axios
import axios from 'axios'
Vue.prototype.$axios = axios

import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

Vue.config.productionTip = false

Vue.use(Element)

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
