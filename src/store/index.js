import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

export default new vuex.Store({
	state: {
		status:{
			403:'密码错误！',
			401:'没有权限操作！'
		},
		api:'http://192.168.0.101:9001/api/',
		site:'http://192.168.0.101:9001/api/',
		token:"57373A7E05CB44079B2F12C14A5E83A9",
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