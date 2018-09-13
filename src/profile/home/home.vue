<template>
	<div>
		<el-tabs :value="path" type="card" @tab-click="handleClick">
			<el-tab-pane :label="item.name" v-for="item in tabs" :name="item.url"></el-tab-pane>
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
					name: '用户管理',
					url: "/home/site"
				}, {
					name: '用户管理2',
					url: "/home/template"
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
			this.path = this.$route.path
		}
	};
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
	
	.el-tabs__header {
		margin-bottom: 0;
	}
	
	.el-tabs__nav,
	.el-tabs__item,
	.el-tabs__header {
		border: 0!important;
	}
	
	.el-tabs__item.is-active {
		background: #fff;
	}
	
	.tab-content {
		padding: 20px;
		background: #fff;
	}
</style>