import Vue from 'vue';
import VueRouter from 'vue-router';

var Index = r => require.ensure([], () => r(require('./index.vue')), 'index');

var Home = r => require.ensure([], () => r(require('./profile/home/home.vue')), 'home');
var Site = r => require.ensure([], () => r(require('./profile/home/site.vue')), 'site');
var Template = r => require.ensure([], () => r(require('./profile/home/template.vue')), 'template');

var Favaorite = r => require.ensure([], () => r(require('./profile/favaorite/index.vue')), 'favaorite');

var Login = r => require.ensure([], () => r(require('./login/login.vue')), 'login');

Vue.use(VueRouter);
const router = new VueRouter({
	mode: 'hash', //hash 打包需要使用hash 无#： history
	routes: [{ //前台路由配置
		path: '/',
		component: Index,
		redirect: '/home',
		meta: {
			title: '首页'
		},
		children: [{ //前台路由配置
			path: '/home',
			component: Home,
			redirect: '/home/site',
			meta: {
				title: '站点'
			},
			children: [{
				path: 'site',
				component: Site,
				//redirect: 'site',
				meta: {
					title: '站点'
				},
			}, {
				path: 'template',
				component: Template,
				//redirect: 'template',
				meta: {
					title: '模板'
				},
			}]
		}, {
			path: '/favaorite',
			component: Favaorite,
			meta: {
				title: '模板收藏夹'
			},
		}]
	}, {
		path: '/login',
		component: Login
	}]
})

router.beforeEach((to, from, next) => {
	if(to.meta.title) {
		document.title = to.meta.title+'-个人中心'
	}
	next();
});

router.afterEach(route => {

})
export default router