<template>
	<div id="record">
		<el-table :data="list" stripe style="width: 100%">
			<el-table-column label="商品明细" min-width="200">
				<template slot-scope="scope">
					<p v-for="item in scope.row.orderDetails">
						{{targetTypeString}}:{{item.goodsName}}
					</p>
				</template>
			</el-table-column>
			<el-table-column prop="price" label="价格" width="100">
			</el-table-column>
			<el-table-column prop="creatime" label="时间" width="200">
			</el-table-column>
			<el-table-column prop="orderNo" label="订单号">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="200">
				<template slot-scope="scope">
					<el-button @click="jump_href('/order/index/'+scope.row.id,'_blank')" type="text" size="small">立即支付</el-button>
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
				that.get_json(that.$store.state.api + '/order/uncomplated/page/' + val, function(data) {
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