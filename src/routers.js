import Vue from 'vue';
import VueRouter from 'vue-router';

var Index = r => require.ensure([], () => r(require('./index.vue')), 'index');

var Home = r => require.ensure([], () => r(require('./profile/home/home.vue')), 'home');
var Site = r => require.ensure([], () => r(require('./profile/home/site.vue')), 'site');
var Template = r => require.ensure([], () => r(require('./profile/home/template.vue')), 'template');

var Favaorite = r => require.ensure([], () => r(require('./profile/favaorite/index.vue')), 'favaorite');

var Caseapply = r => require.ensure([], () => r(require('./profile/caseapply/index.vue')), 'caseapply');

var Finance = r => require.ensure([], () => r(require('./profile/finance/index.vue')), 'finance');
var Info = r => require.ensure([], () => r(require('./profile/finance/info.vue')), 'info');
var Record = r => require.ensure([], () => r(require('./profile/finance/record.vue')), 'record');
var Dounorder = r => require.ensure([], () => r(require('./profile/finance/dounorder.vue')), 'dounorder');

var Login = r => require.ensure([], () => r(require('./login/login.vue')), 'login');

Vue.use(VueRouter);
const router = new VueRouter({
	mode: 'hash', //hash 打包需要使用hash 无#： history
	routes: [{
			path: '*',
			component: Index,
			redirect: '/',
		},
		{ //前台路由配置
			path: '/',
			component: Index,
			redirect: '/home',
			meta: {
				title: '首页'
			},
			children: [{ //前台路由配置
				path: 'home',
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
				path: 'favaorite',
				component: Favaorite,
				meta: {
					title: '模板收藏夹'
				},
			}, {
				path: 'caseapply',
				component: Caseapply,
				meta: {
					title: '案例申请'
				}
			},{ 
				path: 'finance',
				component: Finance,
				redirect: '/finance/info',
				meta: {
					title: '财务中心'
				},
				children: [{
					path: 'info',
					component: Info,
					//redirect: 'site',
					meta: {
						title: '账户信息'
					},
				},{
					path: 'record',
					component: Record,
					//redirect: 'site',
					meta: {
						title: '消费记录'
					},
				},{
					path: 'dounorder',
					component: Dounorder,
					//redirect: 'site',
					meta: {
						title: '未完成订单'
					},
				}]
			}]
		}, {
			path: 'login',
			component: Login
		}
	]
})

router.beforeEach((to, from, next) => {
	if(to.meta.title) {
		document.title = to.meta.title + '-个人中心'
	}
	next();
});

router.afterEach(route => {

})
export default router