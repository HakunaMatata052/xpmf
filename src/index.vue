<template>
	<div id="home">
		<el-container style="height: 100%;">
			<!--<el-header>Header</el-header>-->
			<el-aside width="200px">
				<el-menu router default-active="1" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" style="height: 100%;">
					<el-menu-item index="/home">
						<i class="el-icon-menu"></i>
						<span slot="title">我的产品</span>
					</el-menu-item>
					<el-menu-item index="/favaorite">
						<i class="el-icon-menu"></i>
						<span slot="title">模板收藏夹</span>
					</el-menu-item>
				</el-menu>

			</el-aside>
			<el-container>
				<el-main>
					<router-view></router-view>
				</el-main>
				<el-footer>Powered by WJDH</el-footer>
			</el-container>
		</el-container>
	</div>
</template>
<script>

</script>
<style>
	html,
	body {
		padding: 0;
		margin: 0;
	}
	
	#home {
		height: 100%;
	}
	
	.el-main {
		background: #f1f4f5;
	}

</style>