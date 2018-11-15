/* eslint-disable camelcase */
import Vue from 'vue'
import VueRouter from 'vue-router'

var Index = r => require.ensure([], () => r(require('./index.vue')), 'index')

// 用户
var Home = r => require.ensure([], () => r(require('./profile/home/home.vue')), 'home')
var Site = r => require.ensure([], () => r(require('./profile/home/site.vue')), 'site')
var Template = r => require.ensure([], () => r(require('./profile/home/template.vue')), 'template')
var Host = r => require.ensure([], () => r(require('./profile/home/host.vue')), 'host')
var Business = r => require.ensure([], () => r(require('./profile/home/business.vue')), 'business')
var Domain = r => require.ensure([], () => r(require('./profile/home/domain.vue')), 'domain')
var Wuyou = r => require.ensure([], () => r(require('./profile/home/wuyou.vue')), 'wuyou')
var Service = r => require.ensure([], () => r(require('./profile/home/service.vue')), 'service')
var Favaorite = r => require.ensure([], () => r(require('./profile/favaorite/index.vue')), 'favaorite')
var Caseapply = r => require.ensure([], () => r(require('./profile/caseapply/index.vue')), 'caseapply')
var Finance = r => require.ensure([], () => r(require('./profile/finance/index.vue')), 'finance')
var Record = r => require.ensure([], () => r(require('./profile/finance/record.vue')), 'record')
var Dounorder = r => require.ensure([], () => r(require('./profile/finance/dounorder.vue')), 'dounorder')
var Doinvoice_apply = r => require.ensure([], () => r(require('./profile/finance/doinvoice_apply.vue')), 'doinvoice_apply')
var Invoice_record = r => require.ensure([], () => r(require('./profile/finance/invoice_record.vue')), 'invoice_record')
var Info = r => require.ensure([], () => r(require('./profile/info/index.vue')), 'info')
var Process = r => require.ensure([], () => r(require('./profile/process/index.vue')), 'process')
var Recharge = r => require.ensure([], () => r(require('./profile/finance/recharge/index.vue')), 'recharge')
var Pay = r => require.ensure([], () => r(require('./profile/finance/recharge/pay.vue')), 'pay')

// 管理员
var admin_template = r => require.ensure([], () => r(require('./admin/template/index.vue')), 'admin_template')
var template_category = r => require.ensure([], () => r(require('./admin/template_category/index.vue')), 'template_category')
var admin_case = r => require.ensure([], () => r(require('./admin/case/index.vue')), 'admin_case')
var content = r => require.ensure([], () => r(require('./admin/content/index.vue')), 'content')
var category = r => require.ensure([], () => r(require('./admin/category/index.vue')), 'category')
var config = r => require.ensure([], () => r(require('./admin/config/index.vue')), 'config')
var user = r => require.ensure([], () => r(require('./admin/user/index.vue')), 'user')
var admin_process = r => require.ensure([], () => r(require('./admin/process/index.vue')), 'admin_process')
var admin_host = r => require.ensure([], () => r(require('./admin/host/index.vue')), 'admin_host')
var links = r => require.ensure([], () => r(require('./admin/links/index.vue')), 'links')
var admin_finance = r => require.ensure([], () => r(require('./admin/finance/index.vue')), 'admin_finance')

// 公用
var Login = r => require.ensure([], () => r(require('./login/login.vue')), 'login')
var Register = r => require.ensure([], () => r(require('./login/register.vue')), 'register')
var page404 = r => require.ensure([], () => r(require('./errorpage/404.vue')), 'page404')
var page403 = r => require.ensure([], () => r(require('./errorpage/403.vue')), 'page403')

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'hash', // hash 打包需要使用hash 无#： history
  routes: [{
    path: '*',
    component: Index,
    redirect: '404'
  },
  { // 前台路由配置
    path: '/',
    component: Index,
    redirect: '/home/site',
    meta: {
      title: '首页'
    },
    children: [{ // 前台路由配置
      path: 'home',
      component: Home,
      redirect: '/home/site',
      meta: {
        title: '站点'
      },
      children: [{
        path: 'site',
        component: Site,
        // redirect: 'site',
        meta: {
          title: '站点'
        },
        children: [{
          path: '/bind/template/:id',
          name: 'Template',
          component: Template,
          meta: {
            title: '模板'
          }
        }, {
          path: '/bind/business/:id',
          name: 'Business',
          component: Business,
          meta: {
            title: '授权'
          }
        }, {
          path: '/bind/host/:id',
          name: 'Host',
          component: Host,
          meta: {
            title: '空间'
          }
        }, {
          path: '/bind/domain/:id',
          name: 'Domain',
          component: Domain,
          meta: {
            title: '域名'
          }
        }, {
          path: '/bind/wuyou/:id',
          name: 'Wuyou',
          component: Wuyou,
          meta: {
            title: '无忧'
          }
        }, {
          path: '/bind/service/:id',
          name: 'Service',
          component: Service,
          meta: {
            title: '服务'
          }
        }

        ]
      }, {
        path: 'template',
        component: Template,
        // redirect: 'template',
        meta: {
          title: '模板'
        }
      }, {
        path: 'business',
        component: Business,
        // redirect: 'template',
        meta: {
          title: '授权'
        }
      }, {
        path: 'host',
        component: Host,
        // redirect: 'template',
        meta: {
          title: '空间'
        }
      }, {
        path: 'domain',
        component: Domain,
        // redirect: 'template',
        meta: {
          title: '域名'
        }
      }, {
        path: 'wuyou',
        component: Wuyou,
        // redirect: 'template',
        meta: {
          title: '无忧'
        }
      }, {
        path: 'service',
        component: Service,
        // redirect: 'template',
        meta: {
          title: '服务'
        }
      }]
    }, {
      path: 'favaorite',
      component: Favaorite,
      meta: {
        title: '模板收藏夹'
      }
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
        // redirect: 'site',
        meta: {
          title: '消费记录'
        }
      }, {
        path: 'dounorder',
        component: Dounorder,
        // redirect: 'site',
        meta: {
          title: '未完成订单'
        }
      }, {
        path: 'recharge',
        component: Recharge,
        // redirect: 'site',
        meta: {
          title: '充值'
        }
      }, {
        path: '/pay/:id',
        name: 'Pay',
        component: Pay,
        // redirect: 'site',
        meta: {
          title: '支付'
        }
      }, {
        path: 'pay',
        component: Pay,
        // redirect: 'site',
        meta: {
          title: '支付'
        }
      }, {
        path: 'doinvoice_apply',
        component: Doinvoice_apply,
        // redirect: 'site',
        meta: {
          title: '申请发票'
        }
      }, {
        path: 'invoice_record',
        component: Invoice_record,
        // redirect: 'site',
        meta: {
          title: '开票记录'
        }
      }]
    }, {
      path: 'info',
      component: Info,
      // redirect: 'site',
      meta: {
        title: '账户信息'
      }
    }, {
      path: 'process',
      component: Process,
      // redirect: 'site',
      meta: {
        title: '客服工单'
      }
    }, {
      path: '/admin/template',
      component: admin_template,
      // redirect: 'site',
      meta: {
        title: '模板列表'
      }
    }, {
      path: '/admin/template_category',
      component: template_category,
      // redirect: 'site',
      meta: {
        title: '模板类别'
      }
    }, {
      path: '/admin/case',
      component: admin_case,
      // redirect: 'site',
      meta: {
        title: '案例管理'
      }
    }, {
      path: '/admin/config',
      component: config,
      // redirect: 'site',
      meta: {
        title: '网站设置'
      }
    }, {
      path: '/admin/content',
      component: content,
      // redirect: 'site',
      meta: {
        title: '文章管理'
      }
    }, {
      path: '/admin/category',
      component: category,
      // redirect: 'site',
      meta: {
        title: '栏目管理'
      }
    }, {
      path: '/admin/user',
      component: user,
      // redirect: 'site',
      meta: {
        title: '会员管理'
      }
    }, {
      path: '/admin/process',
      component: admin_process,
      // redirect: 'site',
      meta: {
        title: '工单管理'
      }
    }, {
      path: '/admin/links',
      component: links,
      // redirect: 'site',
      meta: {
        title: '友情链接'
      }
    }, {
      path: '/admin/host',
      component: admin_host,
      // redirect: 'site',
      meta: {
        title: '空间管理'
      }
    },

    {
      path: '/admin/finance',
      component: admin_finance,
      // redirect: 'site',
      meta: {
        title: '财务管理'
      }
    }
    ]
  }, {
    path: '/login',
    component: Login,
    meta: {
      title: '登陆'
    }
  }, {
    path: '/register',
    component: Register,
    meta: {
      title: '注册'
    }
  },

  {
    path: '/404',
    component: page404,
    // redirect: 'site',
    meta: {
      title: '未找到页面'
    }
  },

  {
    path: '/403',
    component: page403,
    // redirect: 'site',
    meta: {
      title: '未找到页面'
    }
  }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + '-新派魔方'
	}
  next();
})

router.afterEach(route => {
	window.scrollTo(0, 0);
})
export default router
