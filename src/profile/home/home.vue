<template>
	<div class="tabs">
		<el-tabs v-model="path" @tab-click="handleClick">
			<el-tab-pane :label="item.name" v-for="item in tabs" :name="item.url" :key="item.id"></el-tab-pane>
		</el-tabs>
		<div class="tab-content">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			path: '',
			tabs: [{
				name: '站点',
				url: "/home/site"
			}, {
				name: '模板',
				url: "/home/template"
			}, {
				name: '授权',
				url: "/home/business"
			}, {
				name: '空间',
				url: "/home/host"
			}, {
				name: '域名',
				url: "/home/domain"
			}, {
				name: '无忧',
				url: "/home/wuyou"
			}, {
				name: '服务',
				url: "/home/service"
			}]
		};
	},
	methods: {
		handleClick(tab, event) {
			//console.log(tab, event);
			this.jump(tab.name);
		},
		jump(url) {
			this.$router.push({
				path: url
			})
		}
	},
	mounted() {
		this.path = this.$route.path;
		this.$router.afterEach(route => {
			this.path = this.$route.path;
		})
	}
};
</script>
<style>
.tabs {
  background-color: #fff;
  border-radius: 3px;
  -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.tabs .el-tabs__item {
  height: 61px;
  line-height: 61px;
  width: 120px;
  text-align: center;
  font-size: 16px;
}

.tabs .el-tabs__nav-next,
.tabs .el-tabs__nav-prev {
  line-height: 70px;
  padding: 0 10px;
}

.tabs .el-tabs__nav-wrap::after {
  height: 1px;
  background: #eee;
}

.tabs .el-tabs__header {
  margin-bottom: 0;
}
.tabs .tab-content {
  padding: 20px;
}
</style>