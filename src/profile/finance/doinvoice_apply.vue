<template>
	<div id="record">
		<el-alert title="购买或充值 60 天内的金额可以在此页面申请开票，如单次开票金额未满 800 元，需要支付 25 元的快递费。" type="warning">
		</el-alert>
		<el-table :data="doinvoicelist" stripe @selection-change="handleSelectionChange" style="width: 100%">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="typeString" label="类型" width="80">
			</el-table-column>
			<el-table-column prop="amount" label="金额" width="200">
				<template slot-scope="scope">
					<el-button type="success" round size="mini" v-if="scope.row.type==20">{{scope.row.amount}}</el-button>
					<el-button type="danger" round size="mini" v-else-if="scope.row.type==10">{{scope.row.amount}}</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="creatime" label="操作时间">
			</el-table-column>
		</el-table>
		<br />
		<el-pagination background layout="prev, pager, next" :current-page.sync="page" :page-size="size" :total="total" @current-change="pageFn">
		</el-pagination>
		<br />
		<el-button type="primary" @click="submit">提交</el-button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				doinvoicelist: [],
				page: 0,
				size: 0,
				total: 0
			};
		},
		created() {
			this.getdoinvoiceList(1);
		},
		methods: {
			getdoinvoiceList(val) {
				var that = this;
				that.get_json(that.$store.state.api + '/receipt/page/' + val, function(data) {
					that.doinvoicelist = data.data;
					that.page = data.page;
					that.size = data.size;
					that.total = data.total;
				})
			},
			pageFn(val) {
				this.getdoinvoiceList(val)
			},
			handleSelectionChange(val) {
				console.log(val)
			},
			submit() {

			}
		}
	}
</script>

<style scoped>

</style>