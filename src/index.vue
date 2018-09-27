<template>
	<div id="home">
		<el-header class="header" height="66px">
			<div class="logo">
				<img src="./assets/images/header-logo.png" alt="" />
			</div>
			<div class="nav">
				<a href="">导航</a>
				<a href="">导航</a>
				<a href="">导航</a>
				<a href="">导航</a>
			</div>
			<a href="" class="logout"><i class="iconfont icon-tuichu"></i>退出</a>
		</el-header>
		<el-container class="container">
			<!--<el-header>Header</el-header>-->
			<el-aside width="240px">
				<el-menu router default-active="1" text-color="#333" active-text-color="#ee3231" class="sideleft">
					<el-menu-item index="/home">
						<i class="el-icon-menu"></i>
						<span slot="title">我的产品</span>
					</el-menu-item>
					<el-menu-item index="/favaorite">
						<i class="el-icon-star-off"></i>
						<span slot="title">模板收藏夹</span>
					</el-menu-item>
					<el-menu-item index="/process">
						<i class="el-icon-service"></i>
						<span slot="title">客服工单</span>
					</el-menu-item>
					<el-menu-item index="/caseapply">
						<i class="el-icon-goods"></i>
						<span slot="title">案例申请</span>
					</el-menu-item>
					<el-menu-item index="/finance">
						<i class="el-icon-printer"></i>
						<span slot="title">财务中心</span>
					</el-menu-item>
					
					<el-menu-item index="/finance/dounorder">
						<i class="el-icon-printer"></i>
						<span slot="title">未完成订单</span>
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
								<a href="" target="_blank">全部产品</a>
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
							<p class="title">400-0599-360</p>
							<p class="subtitle">周一至周五：9:00-18:00</p>
							<a href="#" class="service">24小时在线客服</a>
						</div>
						<div class="clearfix"></div>
					</div>
				</div>
				<div class="foot-bot">
					<p>OPYRIGHT (C) 2018 BTOE. ALL RIGHTS RESERVED 陕ICP备05010374号</p>
				</div>
			</div>
		</el-footer>
	</div>
</template>
<script>
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
	
	.header .nav a {
		color: #fff;
		padding: 0 20px;
		line-height: 66px;
	}
	
	.header .nav a:hover {
		background: #f6aa26;
	}
	
	.header .logout {
		height: 66px;
		line-height: 66px;
		background: #f6aa26;
		padding: 0 20px;
		color: #fff;
		align-self: flex-end
	}
	.header .logout i{
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
		-webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, .05);
		box-shadow: 0 1px 2px rgba(0, 0, 0, .05);
		border-radius: 3px;
		border: 0;
	}
	
	.sideleft span {
		font-size: 16px;
	}
	
	.sideleft .el-menu-item {
		margin-bottom: 10px;
	}
	
	.sideleft .el-menu-item:focus,
	.sideleft .el-menu-item:hover {
		background: #fff9f1;
	}
	
	.el-main {
		padding-top: 0;
	}
	
	.footer {padding: 0;}
	
	.foot-header {
		background-color: #fff;
		border-bottom: 1px solid #f1f1f1
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
		text-align: right
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