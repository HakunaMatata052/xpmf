<template>
	<div id="template">
		<el-table :data="list" stripe style="width: 100%">
			<el-table-column prop="id" label="ID" width="80" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="ftpName" label="FTP名称" max-width="200" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="domain" label="绑定域名" max-width="300" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="capacity" label="容量" max-width="150" show-overflow-tooltip>
			</el-table-column>
			<el-table-column label="到期时间" min-width="160" show-overflow-tooltip>
				<template slot-scope="scope">
					<span class="capacity">{{scope.row.creatime}}</span>
					<span class="remainDays">剩余{{scope.row.remainDays}}天</span>
				</template>
			</el-table-column>

			<el-table-column label="操作" width="100">
				<template slot-scope="scope">
					<el-button size="small" @click="bindFn(scope.row.id)" type="success" v-if="bind">绑定</el-button>
					<el-button size="small" @click="ftpFn(scope.row.id)" type="primary" v-else>查看FTP</el-button>
				</template>
			</el-table-column>
		</el-table>
		<br />
		<el-pagination background layout="prev, pager, next" :current-page.sync="page" :page-size="size" :total="total" @current-change="pageFn" v-if="total!=0">
		</el-pagination>
		<br />
		<el-button type="primary">去购买</el-button>
		<el-dialog title="FTP信息" :visible.sync="dialogFtp">
			<el-form label-position="left" inline class="table-expand">
				<el-form-item label="网站名称">
					<span>{{ftplist.spaceName}}</span>
				</el-form-item>
				<el-form-item label="空间大小">
					<span>{{ftplist.capacity}}</span>
				</el-form-item>
				<el-form-item label="绑定域名">
					<span>{{ftplist.ftpAddress}}</span>
				</el-form-item>
				<el-form-item label="FTPIP">
					<span>{{ftplist.id}}</span>
				</el-form-item>
				<el-form-item label="FTP用户名">
					<span>{{ftplist.ftpAddress}}</span>
				</el-form-item>
				<el-form-item label="FTP密码">
					<span>{{ftplist.ftpAccount}}</span>
				</el-form-item>
				<el-form-item label="创建时间">
					<span>{{ftplist.creatime}}</span>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFtp = false">取 消</el-button>
				<el-button type="primary" @click="dialogFtp = false">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				bind: false,
				apiUrl: 'userspace/page/',
				list: [],
				page: 0,
				size: 0,
				total: 0,
				ftplist: {},
				dialogFtp: false
			};
		},
		created() {
			if(this.$route.params.id) {
				this.bind = true;
				this.apiUrl = 'UserSpace/unused/page/'
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
			ftpFn(id) {
				var that = this;
				that.get_json(that.$store.state.api + 'usersite/' + id + '/ftp', function(data) {
					that.ftplist = data;
					that.dialogFtp = true;
				})
			},
			bindFn(id) {
				var that = this;
				that.post_json(that.$store.state.api + 'UserSite/bind/space', {
					UserSiteId: that.$route.params.id,
					userSpaceId: id
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
		margin-left: 10px;
	}
	.table-expand {
		font-size: 0;
	}
	
	.table-expand label {
		width: 90px;
		color: #99a9bf;
	}
	
	.table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 50%;
	}
</style>