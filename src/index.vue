<template>
	<div id="home">
		<el-header class="header" height="66px">
			<div class="logo">
				<img src="./assets/images/header-logo.png" :alt="$store.state.siteinfo.seoTitle" />
			</div>
			<div class="nav">
				<a href="/">首页</a>
				<a href="/quick">快速建站</a>
				<a href="/template">模板</a>
				<a href="/case">案例</a>
				<a href="/download">下载</a>
				<a href="//a.wxbtoe.com/">帮助</a>
				<a href="/case">案例</a>
			</div>
			<div class="nav-right">
				<a href="javascript:;" @click="jump_router('/info')"><img :src="$store.state.userinfo.fullpathAvatar||'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA+ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOC0xMS0wN1QwOTozOToyNyswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTgtMTEtMDdUMDk6Mzk6NTYrMDg6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTgtMTEtMDdUMDk6Mzk6NTYrMDg6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA4MTc0QkIxRTIyRTExRThCMzgwRDk5RDdEQjUzRENBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA4MTc0QkIyRTIyRTExRThCMzgwRDk5RDdEQjUzRENBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDgxNzRCQUZFMjJFMTFFOEIzODBEOTlEN0RCNTNEQ0EiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDgxNzRCQjBFMjJFMTFFOEIzODBEOTlEN0RCNTNEQ0EiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5uut5+AAAAEElEQVR42mL8//8/A0CAAQAJAQL/abyQ8AAAAABJRU5ErkJggg=='" width="30" height="30" class="avatar">{{$store.state.userinfo.username}}</a>
				<a href="javascript:;" @click="jump_router('/process')">工单</a>
				<a href="javascript:;" class="logout" @click="logout"><i class="iconfont icon-tuichu"></i>退出</a>
			</div>

		</el-header>
		<el-container class="container">
			<!--<el-header>Header</el-header>-->
			<el-aside width="auto">
				<el-menu router :default-active="active" text-color="#333" active-text-color="#ee3231" class="sideleft" :collapse="Iscollapse">
					<el-menu-item index="/info" v-if="consumer||agent">
						<i class="iconfont icon-z-user"></i>
						<span slot="title">个人设置</span>
					</el-menu-item>
					<el-menu-item index="/home/site" v-if="consumer||agent">
						<i class="iconfont icon-chanpin"></i>
						<span slot="title">我的产品</span>
					</el-menu-item>
					<el-menu-item index="/favaorite" v-if="consumer||agent">
						<i class="iconfont icon-shoucang"></i>
						<span slot="title">模板收藏夹</span>
					</el-menu-item>
					<el-menu-item index="/process" v-if="consumer||agent">
						<i class="iconfont icon-kefu"></i>
						<span slot="title">客服工单</span>
					</el-menu-item>
					<el-menu-item index="/caseapply" v-if="consumer||agent">
						<i class="iconfont icon-gongwenbao"></i>
						<span slot="title">案例申请</span>
					</el-menu-item>
					<el-menu-item index="/finance" v-if="consumer||agent">
						<i class="iconfont icon-caiwujiesuan"></i>
						<span slot="title">财务中心</span>
					</el-menu-item>
					<el-menu-item index="/finance/dounorder" v-if="consumer||agent">
						<i class="iconfont icon-dingdan"></i>
						<span slot="title">未完成订单</span>
					</el-menu-item>

					<!-- 管理员菜单 -->
					<el-menu-item index="/admin/config" v-if="admin">
						<i class="iconfont icon-setting"></i>
						<span slot="title">网站设置</span>
					</el-menu-item>

					<el-submenu index="/admin/content" v-if="admin">
						<template slot="title">
							<i class="iconfont icon-content"></i>
							<span slot="title">文章管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="/admin/category">
								<i class="iconfont icon-menu"></i>
								<span slot="title">新闻栏目</span>
							</el-menu-item>
							<el-menu-item index="/admin/content">
								<i class="iconfont icon-content"></i>
								<span slot="title">新闻内容</span>
							</el-menu-item>
							<el-menu-item index="/admin/about">
								<i class="iconfont icon-content"></i>
								<span slot="title">关于我们</span>
							</el-menu-item>
							<el-menu-item index="/admin/links">
								<i class="iconfont icon-links"></i>
								<span slot="title">友情链接</span>
							</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="/admin/template" v-if="admin">
						<template slot="title">
							<i class="iconfont icon-mobanguanli"></i>
							<span slot="title">模板管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="/admin/template">
								<i class="iconfont icon-mobanguanli"></i>
								<span slot="title">模板列表</span>
							</el-menu-item>
							<el-menu-item index="/admin/template_category">
								<i class="iconfont icon-leibieguanli"></i>
								<span slot="title">模板类别</span>
							</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-menu-item index="/admin/case" v-if="admin">
						<i class="iconfont icon-gongwenbao"></i>
						<span slot="title">案例管理</span>
					</el-menu-item>

					<el-menu-item index="/admin/user" v-if="admin">
						<i class="iconfont icon-z-user"></i>
						<span slot="title">会员管理</span>
					</el-menu-item>
					<el-menu-item index="/admin/process" v-if="admin">
						<i class="iconfont icon-kefu"></i>
						<span slot="title">工单管理</span>
					</el-menu-item>
					<el-menu-item index="/admin/host" v-if="admin">
						<i class="iconfont icon-yun"></i>
						<span slot="title">空间管理</span>
					</el-menu-item>
					<el-menu-item index="/admin/finance" v-if="admin">
						<i class="iconfont icon-fapiao"></i>
						<span slot="title">发票管理</span>
					</el-menu-item>
				</el-menu>

			</el-aside>
			<el-container>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
		<el-footer class="footer">
			<div class="footer">
				<div class="foot-header">
					<div class="center clearfix">
						<ul class="foot-h-l clearfix">
							<li>
								<h4>产品相关</h4>
								<a href="" target="_blank">全部模板</a>
								<a href="" target="_blank">推荐用户</a>
							</li>
							<li>
								<h4>服务支持</h4>
								<a href="" target="_blank">相关教程</a>
								<a href="" target="_blank">常见问题</a>
							</li>
							<li>
								<h4>关于我们</h4>
								<a href="" target="_blank">了解我们</a>
								<a href="" target="_blank">功能介绍</a>
							</li>
							<li>
								<h4>关注我们</h4>
								<div class="clearfix">
									<a href="" target="_blank"><i class="iconfont icon-weibo"></i></a>
									<a href=""><i class="iconfont icon-tubiao215"></i></a>
									<a href="" target="_blank"><i class="iconfont icon-wechat"></i></a>
								</div>
							</li>
						</ul>
						<div class="foot-h-r">
							<p class="title">{{$store.state.siteinfo.phone}}</p>
							<p class="subtitle">周一至周五：9:00-18:00</p>
							<a :href="'http://wpa.qq.com/msgrd?V=1&uin='+$store.state.siteinfo.qq+'&Site=xpmof.com&Menu=no'" target="_blank" class="service">24小时在线客服</a>
						</div>
						<div class="clearfix"></div>
					</div>
				</div>
				<div class="foot-bot">
					<p>{{$store.state.siteinfo.copyRight}} {{$store.state.siteinfo.provider}}</p>
				</div>
			</div>
		</el-footer>
	</div>
</template>
<script>
export default {
	data() {
		return {
			active: "/home/site",
			username: "",
			admin: false,
			consumer: false,
			agent: false,
			Iscollapse: false
		};
	},
	methods: {
		logout() {
			localStorage.clear();
			this.$store.state.userinfo = {};
			this.$router.push({
				path: "/login"
			});
		}
	},
	created() {
		var that = this;
		that.active = that.$route.path;
		that.$router.afterEach(route => {
			that.active = that.$route.path;
		});

		var role = localStorage.getItem("role");
		that.username = localStorage.getItem("username");
		if (role == "Admin") {
			that.admin = true;
		} else if (role == "Consumer") {
			that.consumer = true;
		} else if (role == "Agent") {
			that.consumer = true;
			that.agent = true;
		}
	},
	beforeCreate() {
		var that = this;
		if (that.$store.state.userinfo.username == null) {
			that.get_json(that.$store.state.api + "/user/mine", function (data) {
				that.$store.state.userinfo = data;
			});
		}
		if (that.$store.state.siteinfo.seoTitle == null) {
			that.get_json(that.$store.state.api + "/SiteSetting", function (data) {
				that.$store.state.siteinfo = data;
			});
		}
	},
	mounted() {
		var that = this;
		var width = window.innerWidth;
		window.onresize = function () {
			width = window.innerWidth;
			console.log(width)
			if (width < 1199) {
				that.Iscollapse = true
			} else {
				that.Iscollapse = false
			}
		}
	}, destroyed() {
		window.onresize = null
	}
};
</script>
<style scoped>
#home {
  height: 100%;
}
.header {
  height: 66px;
  padding: 0;
  display: flex;
  align-content: center;
  /*background: -webkit-linear-gradient(left, #ee3231, #f6aa26);
		background: linear-gradient(left, #ee3231, #f6aa26);*/
  background: #ee3231;
}

.header .logo img {
  height: 66px;
  width: auto;
}

.header .nav {
  flex-grow: 1;
  display: flex;
}

.header a {
  color: #fff;
  padding: 0 30px;
  line-height: 66px;
  font-size: 16px;
  display: flex;
  align-items: center;
}
.header .avatar {
  margin-right: 10px;
  border-radius: 50%;
}
.header a:hover {
  background: #f6aa26;
}
.nav-right {
  display: flex;
  height: 66px;
  line-height: 66px;
}
.header .logout {
  height: 66px;
  line-height: 66px;
  background: #f6aa26;
  padding: 0 20px;
  color: #fff;
}

.header .logout i {
  margin-right: 5px;
}

.container {
  margin: 0 auto;
  padding: 50px 5%;
}

.sideleft {
  width: 240px;
  height: auto;
  float: left;
  background-color: #fff;
  padding: 20px 14px;
  -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 3px;
  border: 0;
}

.sideleft span {
  font-size: 16px;
}

.sideleft .el-menu-item:focus,
.sideleft .el-menu-item:hover {
  background: #fff9f1;
}

.sideleft .iconfont {
  margin-right: 10px;
  font-size: 20px;
}
.el-menu--collapse {
  width: 90px !important;
}

.el-main {
  padding-top: 0;
}

.footer {
  padding: 0;
}

.foot-header {
  background-color: #fff;
  border-bottom: 1px solid #f1f1f1;
}

.foot-header .center {
  margin: 0 auto;
  padding: 68px 5% 70px;
  border: hidden;
  -webkit-box-shadow: none;
  box-shadow: none;
  background-color: transparent;
}

.foot-h-l {
  width: 75%;
  float: left;
}

.foot-h-l li {
  border-right: 1px solid #e8e8e9;
  width: 12%;
  min-width: 150px;
  height: 100px;
  float: left;
  margin-right: 6%;
  padding-right: 6%;
}

.foot-h-l li:last-child {
  border-color: transparent;
}

.foot-h-l h4 {
  font-size: 16px;
  color: #3b3b3b;
  margin-bottom: 30px;
}

.foot-h-l li > a {
  font-size: 13px;
  color: #999;
  line-height: 26px;
  display: block;
}

.foot-h-l div a {
  text-align: center;
  padding-top: 8px;
  line-height: 30px;
  margin-right: 4%;
  border-radius: 20px;
  transition: all 0.3s ease 0s;
}

.foot-h-l div i {
  font-size: 20px;
  color: #acadae;
}

.foot-h-l div i:hover {
  color: #ee3231;
}

.foot-h-r {
  width: 25%;
  float: right;
  text-align: right;
}

.foot-h-r .title {
  font-size: 26px;
  font-weight: bold;
  color: #ee3231;
  text-align: right;
}

.foot-h-r .subtitle {
  font-size: 12px;
  color: #999;
  text-align: right;
}

.foot-h-r .service {
  display: inline-block;
  padding: 0 10%;
  height: 40px;
  line-height: 40px;
  color: #fff;
  text-align: center;
  font-size: 13px;
  background-color: #606265;
  margin-top: 20px;
}

.foot-bot {
  background: #fff;
}

.foot-bot p {
  width: 74%;
  margin: 0 auto;
  height: 56px;
  line-height: 56px;
  color: #6f6f6f;
  font-size: 12px;
  color: #999;
}
</style>