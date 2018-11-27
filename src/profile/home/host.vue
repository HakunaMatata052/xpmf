<template>
	<div id="host">
		<el-table :data="list" stripe style="width: 100%">
			<el-table-column prop="ftpName" label="FTP名称" width="260" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="capacity" label="容量" width="150" show-overflow-tooltip>
			</el-table-column>
			<el-table-column label="到期时间" width="280" show-overflow-tooltip>
				<template slot-scope="scope">
					<span class="capacity">{{scope.row.creatime}}</span>
					<span class="remainDays">剩余{{scope.row.remainDays}}天</span>
				</template>
			</el-table-column>

			<el-table-column label="操作" min-width="100">
				<template slot-scope="scope">
					<el-button size="small" @click="bindFn(scope.row.id)" type="success" v-if="bind&&!scope.row.currentUsed">绑定</el-button>
					<el-tag type="success" v-else-if="scope.row.currentUsed">已绑定</el-tag>
					<el-button size="small" @click="ftpFn(scope.row.id)" type="primary" v-else>查看FTP</el-button>
				</template>
			</el-table-column>
		</el-table>
		<br />
		<el-pagination background layout="total,prev, pager, next" :current-page.sync="page" :page-size="size" :total="total" @current-change="pageFn" v-if="total!=0">
		</el-pagination>
		<br />
		<el-button type="primary" @click="jump_href('/server')">去购买</el-button>
		<el-dialog title="FTP信息" :visible.sync="dialogFtp">			
			<div class="detail">
				<dl>
					<dt>空间大小</dt>
					<dd>{{ftplist.capacity}}</dd>
				</dl>
				<dl>
					<dt>FTP IP</dt>
					<dd>
						{{ftplist.ftpAddress}}
					</dd>
				</dl>
				<dl>
					<dt>FTP用户名</dt>
					<dd>{{ftplist.ftpAccount}}</dd>
				</dl>

				<dl>
					<dt>FTP密码</dt>
					<dd>{{ftplist.ftpPassword}}</dd>
				</dl>

				<dl>
					<dt>创建时间</dt>
					<dd>{{ftplist.creatime}}</dd>
				</dl>
			</div>
			<div slot="footer" class="dialog-footer">
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
				this.apiUrl = 'UserSpace/unused/site/'+this.$route.params.id+'/page/'
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
				this.getList(val);
				this.gotop();
			},
			ftpFn(id) {
				var that = this;
				that.get_json(that.$store.state.api + 'usersite/' + id + '/spaceftp', function(data) {
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
					that.$store.state.dialogbind = false;
				})
			}
		}
	}
</script>

<style scoped>
	
	#host .remainDays {
		background: #ee3231;
		color: #fff;
		padding: 2px 15px;
		border-radius: 30px;
		display: inline-block;
		margin-left: 10px;
	}

.detail {
  padding: 20px 0;
  display: flex;
  flex-wrap: wrap;
}

.detail dl {
  display: flex;
  width: 50%;
  padding: 10px 30px 10px 0;
  border-bottom: 1px solid #ccc;
  align-items: center;
}

.detail dt {
  color: #a6a6a6;
  width: 130px;
}
</style>