import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

export default new vuex.Store({
  state: {
    userinfo: {},
    siteinfo: {},
    loading: true,
    dialogbind:false,
    status: {
      0: '程序发生错误！',
      440: '账号或密码错误！',
      401: '没有权限！',
      403: '拒绝访问！',
      404: '没有找到相关信息！',
      409: '用户名已存在',
      500: '程序发生错误！'
    },
    login: {
      token: '',
      role: '',
      expires: ''
    },
    pay: {
      amount: ''
    },
    refresh_token: process.env.API_ROOT+'/api/token/refresh', // 刷新token
    api:  process.env.API_ROOT+'/api/',
    pic: 'http://117.34.112.244:9009/',
    wxpay: 'http://117.34.112.244:9006/',
    alipay: '',
    domain: '',
    notice: true
  },
  mutations: {
    domainURI (url) {
	  var durl = /http:\/\/([^\/]+)\//i;
      var domain = url.match(durl)
      return domain[1]
    }
  }
})
