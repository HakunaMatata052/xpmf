import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

export default new vuex.Store({
  state: {
    userinfo: {},
    siteinfo: {},
    loading: true,
    dialogbind: false,
    status: {
      0: '程序发生错误！',
      400: "",
      401: '没有权限！',
      403: '拒绝访问！',
      404: '没有找到相关信息！',
      409: '用户名已存在！',
      440: '账号或密码错误！',
      450: '旧密码不正确！',
      500: '程序发生错误！',
      550: "操作失败"
    },
    callbackUrl: '/',
    login: {
      token: '',
      role: '',
      expires: ''
    },
    pay: {
      amount: ''
    },
    refresh_token: process.env.API_ROOT + '/api/token/refresh', // 刷新token
    api: process.env.API_ROOT + '/api/',
    pic: process.env.API_ROOT + '/',
    wxpay: '//wxpay.xpmof.com/',
    alipay: '',
    domain: '',
    notice: true,
    num: 0,
  },
  mutations: {
    domainURI(url) {
      var durl = /http:\/\/([^\/]+)\//i;
      var domain = url.match(durl)
      return domain[1]
    }
  }
})
