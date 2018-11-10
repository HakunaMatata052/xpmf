import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

export default new vuex.Store({
	state: {
		status:{
			0:'程序发生错误！',
			440:'账号或密码错误！',
			401:'没有权限！',
			403:'拒绝访问！',
			500:'程序发生错误！'
		},
		login:{
			token:'',
			role:'',
			expires:''
		},
		pay:{
			amount:''
		},
		refresh_token:'http://192.168.0.115:9001/api/token/refresh',   //刷新token
		api:'http://192.168.0.115:9001/api/',
		pic:'http://192.168.0.115:9009/',
		domain: "阿斯达",
		notice: true,
	},
	mutations: {
		domainURI(url) {
			var durl = /http:\/\/([^\/]+)\//i;
			var domain = url.match(durl);
			return domain[1];
		}
	}
})