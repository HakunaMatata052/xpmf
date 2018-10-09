<template>
	<div id="template">
		<el-table :data="list" stripe style="width: 100%">
			<el-table-column prop="domain" label="域名" width="300">
			</el-table-column>
			<el-table-column label="到期时间">
				<template slot-scope="scope">
					<p class="capacity">{{scope.row.creatime}}</p>
					<span class="remainDays">剩余{{scope.row.remainDays}}天</span>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="200">

			</el-table-column>
		</el-table>
		<br />
		<el-pagination background layout="prev, pager, next" :current-page.sync="page" :page-size="size" :total="total" @current-change="pageFn">
		</el-pagination>
		<br />
		<el-button type="primary">去购买</el-button>

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
			this.getList(1)
		},
		methods: {
			getList(val) {
				var that = this;
				that.get_json(that.$store.state.api + 'userservice/page/' + val, function(data) {
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
	#template .capacity {}
	
	#template .remainDays {
		background: #ee3231;
		color: #fff;
		padding: 2px 15px;
		border-radius: 30px;
		display: inline-block;
	}
</style>