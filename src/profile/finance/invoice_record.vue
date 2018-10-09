<template>
	<div id="record">
		<el-alert title="购买或充值 60 天内的金额可以在此页面申请开票，如单次开票金额未满 800 元，需要支付 25 元的快递费。" type="warning">
		</el-alert>
		<el-table :data="doinvoicelist" stripe @selection-change="handleSelectionChange" style="width: 100%">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="typeString" label="类型" width="80">
			</el-table-column>
			<el-table-column prop="amount" label="金额">
				<template slot-scope="scope">
					<el-button type="success" round size="mini" v-if="scope.row.type==20">{{scope.row.amount}}</el-button>
					<el-button type="danger" round size="mini" v-else-if="scope.row.type==10">{{scope.row.amount}}</el-button>
				</template>
			</el-table-column>			
			<el-table-column prop="creatime" label="操作时间">
			</el-table-column>
			<el-table-column prop="creatime" label="操作"  width="200">
				<template slot-scope="scope">
						<el-button size="mini"  @click="applyFn(scope.row.id)" type="success">申请开票</el-button>
				</template>
			</el-table-column>
		</el-table>
		<br />
		<el-pagination background layout="prev, pager, next" :current-page.sync="page" :page-size="size" :total="total" @current-change="pageFn">
		</el-pagination>
		<br />
		<el-button type="primary" @click="submit">申请开票</el-button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				doinvoicelist: [],
				page: 0,
				size: 0,
				total: 0,
				applyId:[],
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
				this.applyId = [];
				for(var i=0;i<val.length;i++){
					this.applyId.push(val[i].id)
				}
				console.log(this.applyId)
			},
			applyFn(id){
				var that =this;
				that.put_json(that.$store.state.api + 'invoice/'+id+'/applying', function(data) {
					that.$message({
						type: 'success',
						message: '提交成功！'
					});
					that.getdoinvoiceList(0)
				})
			},
			submit() {
				var that =this;
				that.put_json(that.$store.state.api + 'invoice/'+that.applyId+'/applying', function(data) {
					that.$message({
						type: 'success',
						message: '提交成功！'
					});
					that.getdoinvoiceList(0)
				})
			}
		}
	}
</script>

<style scoped>

</style>