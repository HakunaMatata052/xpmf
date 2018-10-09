<template>
	<div id="template">
		<el-table :data="domainList" stripe style="width: 100%">
			<el-table-column prop="ftpName" label="FTP名称" width="200">
			</el-table-column>
			<el-table-column prop="domain" label="绑定域名" width="300">
			</el-table-column>
			<el-table-column prop="capacity" label="容量" width="150">
			</el-table-column>
			<el-table-column label="到期时间">
				<template slot-scope="scope">
					<p class="capacity">{{scope.row.creatime}}</p>
					<span class="remainDays">剩余{{scope.row.remainDays}}天</span>
				</template>
			</el-table-column>

			<el-table-column label="操作" width="200">
				<template slot-scope="scope">
						<el-button size="mini"  @click="ftpFn(scope.row.siteId)" type="success">查看FTP</el-button>
				</template>
			</el-table-column>
		</el-table>
		<br />
		<el-pagination background layout="prev, pager, next" :current-page.sync="page" :page-size="size" :total="total" @current-change="pageFn">
		</el-pagination>
		<br />
		<el-button type="primary">去购买</el-button>
				<el-dialog title="FTP信息" :visible.sync="dialogFtp">
			<el-form label-position="left" inline class="table-expand">
				<el-form-item :label="key" v-for="(value, key)  in ftplist">
					<span>{{value}}</span>
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
				domainList: [],
				page: 0,
				size: 0,
				total: 0,
				ftplist:{},
				dialogFtp: false
			};
		},
		created() {
			this.getList(1)
		},
		methods: {
			getList(val) {
				var that = this;
				that.get_json(that.$store.state.api + 'userspace/page/' + val, function(data) {
					that.domainList = data.data;
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