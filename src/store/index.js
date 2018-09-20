import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

export default new vuex.Store({
	state: {
		login:'https://jsonblob.com/api/jsonBlob/5011de83-bbf5-11e8-b599-33aeb0ff2350',
		site:'/apis/DoitHandler',
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