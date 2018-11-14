<template>
	<div class="tabs">
		<el-tabs v-model="path" @tab-click="handleClick">
			<el-tab-pane label="全部" name="100"></el-tab-pane>
			<el-tab-pane label="处理中" name="30"></el-tab-pane>
			<el-tab-pane label="已拒绝" name="40"></el-tab-pane>
			<el-tab-pane label="已完成" name="60"></el-tab-pane>
		</el-tabs>
		<div class="tab-content">
			<el-table :data="list" stripe style="width: 100%">
				<el-table-column prop="id" label="ID" width="80px" :key="Math.random()">
				</el-table-column>
				<el-table-column prop="username" label="用户名" width="300px" :key="Math.random()">
				</el-table-column>
				<el-table-column prop="amount" label="金额" width="100px" :key="Math.random()">
				</el-table-column>
				<el-table-column prop="creatime" label="提交时间" :key="Math.random()">
				</el-table-column>
				<el-table-column prop="updatetime" label="操作时间" :key="Math.random()">
				</el-table-column>
				<el-table-column prop="statusString" label="状态" width="200px" :key="Math.random()">
					<template slot-scope="scope">
						<el-tag>{{scope.row.statusString}}
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="200px" v-if="path==30">
					<template slot-scope="scope">
						<el-button type="primary" @click="handle(scope.row.id,'audit')">通过</el-button>
						<el-button type="danger" @click="handle(scope.row.id,'refuse')">拒绝</el-button>
					</template>
				</el-table-column>
			</el-table>
			<br />
			<el-pagination background layout="prev, pager, next" :current-page.sync="page" :page-size="size" :total="total" @current-change="pageFn" v-if="total!=0">
			</el-pagination>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				path: '100',
				page: 0,
				size: 0,
				total: 0
			};
		},
		created() {
			this.getList(100, 1);
		},
		methods: {
			getList(type, val) {
				var that = this;
				that.get_json(that.$store.state.api + 'admin/Invoice/status/' + type + '/page/' + val, function(data) {
					that.list = data.data;
					that.page = data.page;
					that.size = data.size;
					that.total = data.total;
				})
			},
			pageFn(val) {
				this.getList(this.path, val)
			},
			handleClick(tab, event) {
				this.path = tab.name;
				this.getList(tab.name, 1)
			},
			handle(id, status) {
				var that = this;
				that.put_json(that.$store.state.api + 'admin/Invoice/' + id + '/' + status, {}, function(data) {
					that.getList(that.path, that.page)
				})
			}
		}
	}
</script>

<style>
	.tabs {
		background-color: #fff;
		border-radius: 3px;
		-webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, .05);
		box-shadow: 0 1px 2px rgba(0, 0, 0, .05);
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