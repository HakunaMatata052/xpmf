<template>
	<div id="record">
		<el-tabs v-model="active" @tab-click="handleClick">
			<el-tab-pane label="全部" name="100"></el-tab-pane>
			<el-tab-pane label="处理中" name="30"></el-tab-pane>
			<el-tab-pane label="已拒绝" name="40"></el-tab-pane>
			<el-tab-pane label="已完成" name="60"></el-tab-pane>
		</el-tabs>
		<el-table :data="list" stripe  style="width: 100%">
			<el-table-column prop="amount" label="开票金额" width="200">
				<template slot-scope="scope">
					<el-button type="success" round size="mini">{{scope.row.amount}}</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="creatime" label="操作时间" width="260">
			</el-table-column>
			<el-table-column prop="statusString" label="状态">
				<template slot-scope="scope">
					<el-tag v-if="scope.row.status==30">{{scope.row.statusString}}</el-tag>
					<el-tag type="danger" v-else-if="scope.row.status==40">{{scope.row.statusString}}</el-tag>
					<el-tag type="success" v-else-if="scope.row.status==60">{{scope.row.statusString}}</el-tag>
				</template>
			</el-table-column>
		</el-table>
		<br />
		<el-pagination background layout="total,prev, pager, next" :current-page.sync="page" :page-size="size" :total="total" @current-change="pageFn" v-if="total!=0">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				page: 0,
				size: 0,
				total: 0,
				applyId: [],
				active:'100'
			};
		},
		created() {
			this.getList(100,1);
		},
		methods: {
			getList(type,val) {
				var that = this;
				that.get_json(that.$store.state.api + 'invoice/status/'+type+'/page/' + val, function(data) {
					that.list = data.data;
					that.page = data.page;
					that.size = data.size;
					that.total = data.total;
				})
			},
			pageFn(val) {
				this.getList(this.active,val);
				this.gotop();
			},
			handleClick(tab, event) {
				this.active = tab.name;
				this.getList(tab.name,1)
			}
		}
	}
</script>

<style scoped>

</style>