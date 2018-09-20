<template>
	<div>
		<el-tabs v-model="path" type="card" @tab-click="handleClick">
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
					name: '站点',
					url: "/home/site"
				}, {
					name: '模板',
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