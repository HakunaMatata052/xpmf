// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue'
import router from './routers'
import vueResource from 'vue-resource'
import ElementUI from 'element-ui';
import store from './store';
import base from './utils';

Vue.use(base);
Vue.use(ElementUI);
Vue.use(VueRouter)
Vue.use(vueResource);
//Vue.config.debug = false;
//Vue.http.options.emulateJSON = true;

//Vue.http.options.headers = {
//'Authorization':'Bearer '+ store.state.token
//};

const vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
