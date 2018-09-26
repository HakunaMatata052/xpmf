<template>
	<div id="template">
		<el-row type="flex" justify="space-between">
			<el-col :span="8">
				<div class="img">
					<img src="../../assets/images/hamburger.png" alt="" />
				</div>
				<div class="info">
					<h3>电脑网站模板</h3>
					<p>编号 : metv2
						<br> 绑定域名 : shop.xajianzhan.com
						<br> 购买日期 : 2018-02-10</p>
				</div>
				<div class="btn-group"></div>
			</el-col>
			<el-col :span="8">
				<el-button type="primary">获取源码</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				currentDate: new Date()
			};
		}
	}
</script>

<style scoped>
	.img {
		width: 300px;
		height: 200px;
	}
	
	.img img {
		width: 100%;
		height: auto;
	}
</style>