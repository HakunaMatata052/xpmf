<template>
	<div id="record">

		<el-table :data="dounorderlist" stripe style="width: 100%">
			<el-table-column prop="goodsName" label="商品明细" width="80">
			</el-table-column>
			<el-table-column prop="price" label="价格" width="200">
			</el-table-column>
			<el-table-column prop="creatime" label="时间" width="150">
			</el-table-column>
			<el-table-column prop="id" label="订单号">
			</el-table-column>
			<el-table-column prop="id" label="订单号">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="100">
				<template slot-scope="scope">
					<el-button @click="handleClick(scope.row)" type="text" size="small">立即支付</el-button>
					<el-button type="text" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<br />
		<el-pagination background layout="prev, pager, next" :current-page.sync="page" :page-size="size" :total="total" @current-change="pageFn">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dounorderlist: [],
				page: 0,
				size: 0,
				total: 0
			};
		},
		created() {
			this.getdounorderList(1);
		},
		methods: {
			getdounorderList(val) {
				var that = this;
				that.get_json(that.$store.state.api + '/order/uncomplated/page/' + val, function(data) {
					that.dounorderlist = data.data;
					that.page = data.page;
					that.size = data.size;
					that.total = data.total;
				})
			},
			pageFn(val) {
				this.getdounorderList(val)
			}
		}
	}
</script>

<style scoped>

</style>