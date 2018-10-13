import Vue from 'vue';
import VueRouter from 'vue-router';

var Index = r => require.ensure([], () => r(require('./index.vue')), 'index');

var Home = r => require.ensure([], () => r(require('./profile/home/home.vue')), 'home');
var Site = r => require.ensure([], () => r(require('./profile/home/site.vue')), 'site');
var Template = r => require.ensure([], () => r(require('./profile/home/template.vue')), 'template');
var Host = r => require.ensure([], () => r(require('./profile/home/host.vue')), 'host');
var Domain = r => require.ensure([], () => r(require('./profile/home/domain.vue')), 'domain');
var Wuyou = r => require.ensure([], () => r(require('./profile/home/wuyou.vue')), 'wuyou');
var Service = r => require.ensure([], () => r(require('./profile/home/service.vue')), 'service');
var Favaorite = r => require.ensure([], () => r(require('./profile/favaorite/index.vue')), 'favaorite');
var Caseapply = r => require.ensure([], () => r(require('./profile/caseapply/index.vue')), 'caseapply');
var Finance = r => require.ensure([], () => r(require('./profile/finance/index.vue')), 'finance');
var Record = r => require.ensure([], () => r(require('./profile/finance/record.vue')), 'record');
var Dounorder = r => require.ensure([], () => r(require('./profile/finance/dounorder.vue')), 'dounorder');
var Doinvoice_apply = r => require.ensure([], () => r(require('./profile/finance/doinvoice_apply.vue')), 'doinvoice_apply');
var Invoice_record = r => require.ensure([], () => r(require('./profile/finance/invoice_record.vue')), 'invoice_record');
var Info = r => require.ensure([], () => r(require('./profile/info/index.vue')), 'info');
var Process = r => require.ensure([], () => r(require('./profile/process/index.vue')), 'process');
var Login = r => require.ensure([], () => r(require('./login/login.vue')), 'login');

var admin_template = r => require.ensure([], () => r(require('./admin/template/index.vue')), 'admin_template');
var template_category = r => require.ensure([], () => r(require('./admin/template_category/index.vue')), 'template_category');


Vue.use(VueRouter);
const router = new VueRouter({
	mode: 'hash', //hash 打包需要使用hash 无#： history
	routes: [{
			path: '*',
			component: Index,
			redirect: '/home/site',
		},
		{ //前台路由配置
			path: '/',
			component: Index,
			redirect: '/home/site',
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
				}, {
					path: 'host',
					component: Host,
					//redirect: 'template',
					meta: {
						title: '空间'
					},
				}, {
					path: 'domain',
					component: Domain,
					//redirect: 'template',
					meta: {
						title: '域名'
					},
				}, {
					path: 'wuyou',
					component: Wuyou,
					//redirect: 'template',
					meta: {
						title: '无忧'
					},
				}, {
					path: 'service',
					component: Service,
					//redirect: 'template',
					meta: {
						title: '服务'
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
			}, {
				path: 'finance',
				component: Finance,
				redirect: '/finance/record',
				meta: {
					title: '财务中心'
				},
				children: [{
					path: 'record',
					component: Record,
					//redirect: 'site',
					meta: {
						title: '消费记录'
					},
				}, {
					path: 'dounorder',
					component: Dounorder,
					//redirect: 'site',
					meta: {
						title: '未完成订单'
					},
				}, {
					path: 'doinvoice_apply',
					component: Doinvoice_apply,
					//redirect: 'site',
					meta: {
						title: '申请发票'
					},
				}, {
					path: 'invoice_record',
					component: Invoice_record,
					//redirect: 'site',
					meta: {
						title: '开票记录'
					},
				}]
			}, {
				path: 'info',
				component: Info,
				//redirect: 'site',
				meta: {
					title: '账户信息'
				},
			}, {
				path: 'process',
				component: Process,
				//redirect: 'site',
				meta: {
					title: '客服工单'
				},
			}, {
				path: '/admin/template',
				component: admin_template,
				//redirect: 'site',
				meta: {
					title: '模板列表'
				},
			}
			, {
				path: '/admin/template_category',
				component: template_category,
				//redirect: 'site',
				meta: {
					title: '模板类别'
				},
			}
			
			]
		}, {
			path: '/login',
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