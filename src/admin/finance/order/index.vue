<template>
	<div class="tabs">
		<el-tabs v-model="path" @tab-click="handleClick">
			<el-tab-pane label="全部" name="100"></el-tab-pane>
			<el-tab-pane label="未完成" name="10"></el-tab-pane>
			<el-tab-pane label="已完成" name="80"></el-tab-pane>
		</el-tabs>
		<div class="tab-content">
			<el-table :data="list" stripe style="width: 100%">
				<el-table-column prop="orderNo" label="订单编号" width="190px" :key="Math.random()"  show-overflow-tooltip>
				</el-table-column>
				<el-table-column label="订单明细" :key="Math.random()"  show-overflow-tooltip>
                    <template slot-scope="scope">
					 <p v-for="item in scope.row.orderDetails" :key="item.id">
						{{item.targetTypeString}}：{{item.goodsName}}
					</p>
				</template>
				</el-table-column>
				<el-table-column prop="user.username" width="150px" label="用户名" :key="Math.random()"  show-overflow-tooltip>
				</el-table-column>
				<el-table-column label="金额" width="120px" :key="Math.random()" show-overflow-tooltip>
                    <template slot-scope="scope">
						{{scope.row.price}}元
					</template>
				</el-table-column>
				<el-table-column prop="creatime" label="提交时间" width="200px" :key="Math.random()" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="statusString" label="状态" width="120px" :key="Math.random()" show-overflow-tooltip>
					<template slot-scope="scope">
                        <el-tag type="danger" v-if="scope.row.status==10">{{scope.row.statusString}}</el-tag>
						<el-tag v-else>{{scope.row.statusString}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="200px">
					<template slot-scope="scope">
						<el-button type="primary" size="small" @click="openOrder(scope.row)">查看详情</el-button>
					</template>
				</el-table-column>
			</el-table>
			<br  v-if="total!=0"/>
			<el-pagination background layout="total,prev, pager, next" :current-page.sync="page" :page-size="size" :total="total" @current-change="pageFn" v-if="total!=0">
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
				that.get_json(that.$store.state.api + 'admin/Order/status/' + type + '/page/' + val, function(data) {
					that.list = data.data;
					that.page = data.page;
					that.size = data.size;
					that.total = data.total;
				})
			},
			pageFn(val) {
				this.getList(this.path, val);
				this.gotop();
			},
			handleClick(tab, event) {
				this.path = tab.name;
				this.getList(tab.name, 1)
            },
            openOrder(val){
                console.log(val)
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