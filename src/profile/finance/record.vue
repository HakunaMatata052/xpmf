<template>
	<div id="record">

			<el-table :data="list" stripe style="width: 100%">
				<el-table-column prop="typeString" label="类型" width="80">
				</el-table-column>
				<el-table-column prop="amount" label="金额" width="200">
					<template slot-scope="scope">
						<el-button type="success" round size="mini" v-if="scope.row.type==20">{{scope.row.amount}}</el-button>
						<el-button type="danger" round size="mini" v-else-if="scope.row.type==10">{{scope.row.amount}}</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="balance" label="账户余额" width="150">
					<template slot-scope="scope">
					¥{{scope.row.balance}}
					</template>
				</el-table-column>
				<el-table-column prop="creatime" label="操作时间">
				</el-table-column>
			</el-table>
			<br />
			<el-pagination background layout="prev, pager, next" :current-page.sync="page" :page-size="size" :total="total" @current-change="pageFn" v-if="total!=0">
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
				total: 0
			};
		},
		created() {
			this.getList(1);
		},
		methods: {
			getList(val) {
				var that = this;
				that.get_json(that.$store.state.api + '/userconsumption/page/' + val, function(data) {
					that.list = data.data;
					that.page = data.page;
					that.size = data.size;
					that.total = data.total;
				})
			},
			pageFn(val) {
				this.getList(val)
			}
		}
	}
</script>

<style scoped>
</style>