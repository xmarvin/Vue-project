import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: '/instagram/1' },
    { path: '/:source', redirect: '/:source/1' },
    { path: '/:source/:page?', component: Home }
  ]
})
