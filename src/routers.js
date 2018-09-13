import Vue from 'vue';
import VueRouter from 'vue-router';

var Index = r => require.ensure([], () => r(require('./index.vue')), 'index');

var Home = r => require.ensure([], () => r(require('./profile/home/home.vue')), 'home');
var Site = r => require.ensure([], () => r(require('./profile/home/site.vue')), 'site');
var Template = r => require.ensure([], () => r(require('./profile/home/template.vue')), 'template');


var Favaorite = r => require.ensure([], () => r(require('./profile/favaorite/index.vue')), 'favaorite');

Vue.use(VueRouter);
const router = new VueRouter({
	mode: 'hash', //hash 打包需要使用hash 无#： history
	routes: [{ //前台路由配置
		path: '/',
		component: Index,
		redirect: '/home',
		children: [{ //前台路由配置
			path: '/home',
			component: Home,
			redirect: '/home/site',
			children: [{
				path: 'site',
				component: Site,
				//redirect: 'site',
			}, {
				path: 'template',
				component: Template,
				//redirect: 'template',
			}]
		},{
		path:'/favaorite',
		component:Favaorite
	}]
	}]
})

router.beforeEach((to, from, next) => {
	console.log(`路由到：${to.path}`)
	next();
});

router.afterEach(route => {

})
export default router