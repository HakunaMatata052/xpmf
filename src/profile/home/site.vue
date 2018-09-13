<template>
	<div id="site">
		<el-alert :closable="false" :title="'官方销售的西部数码主机系统会自动安装，无需手动一键安装；官方销售的阿里云主机购买请点击站点列表右侧的【网站安装】或【网站安装/迁移】进行自动安装。'" type="error">
			
		</el-alert>
		<br>
		<el-container>
		 <el-button type="danger">一键安装（官方购买主机无需一键安装）</el-button>
		  <el-button type="primary">去开通试用</el-button>
		 </el-container>
	</div>
</template>
<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>
<style>

</style>