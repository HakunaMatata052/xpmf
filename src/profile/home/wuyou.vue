<template>
	<div id="template">
		<el-table :data="list" stripe style="width: 100%">
			<el-table-column prop="id" label="ID" width="80" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="name" label="名称" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="domain" label="绑定域名" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="creatime" label="开始时间" min-width="100" show-overflow-tooltip>
			</el-table-column>
			<el-table-column label="到期时间" min-width="160" show-overflow-tooltip>
				<template slot-scope="scope">
					<span class="capacity">{{scope.row.creatime}}</span>
					<span class="remainDays">剩余{{scope.row.remainDays}}天</span>
				</template>
			</el-table-column>

			<el-table-column label="操作" width="100"  v-if="bind">
				<template slot-scope="scope">
					<el-button size="mini" @click="bindFn(scope.row.id)" type="success">绑定</el-button>
				</template>
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
				bind: false,
				apiUrl: 'UserWarryFree/page/',
				list: [],
				page: 0,
				size: 0,
				total: 0
			};
		},
		created() {
			if(this.$route.params.id) {
				this.bind = true;
				this.apiUrl = 'UserWarryFree/unused/page/'
			}
			this.getList(1)
		},
		methods: {
			getList(val) {
				var that = this;
				that.get_json(that.$store.state.api + that.apiUrl + val, function(data) {
					that.list = data.data;
					that.page = data.page;
					that.size = data.size;
					that.total = data.total;
				})
			},
			pageFn(val) {
				this.getList(val)
			},
			bindFn(id) {
				var that = this;
				that.post_json(that.$store.state.api + 'UserSite/bind/warry', {
					UserSiteId: that.$route.params.id,
					userWarryFreeId: id
				}, function(data) {
					that.$message({
						type: 'success',
						message: '绑定成功！'
					});
				})
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