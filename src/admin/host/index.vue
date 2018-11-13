<template>
	<div id="host">

		<el-card class="box-card" shadow="never">
			<div slot="header" class="clearfix">
				<span>空间管理</span>

			</div>
			<el-table :data="list" stripe style="width: 100%" v-loading="loading">
				<el-table-column prop="id" label="ID" width="80" show-overflow-tooltip>
				</el-table-column>

				<el-table-column prop="ftpName" label="FTP用户名" min-width="100" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="owner" label="所属会员" min-width="100" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="capacity" label="空间大小" min-width="100" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="creatime" label="开始时间" min-width="100" show-overflow-tooltip>
				</el-table-column>
				<el-table-column label="到期时间" min-width="160" show-overflow-tooltip>
					<template slot-scope="scope">
						<span class="capacity">{{scope.row.expiresDate}}</span>
						<span class="remainDays">剩余{{scope.row.remainDays}}天</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button size="mini" @click="editDialog(scope.row.id)" type="success">修改FTP信息</el-button>
					</template>
				</el-table-column>
			</el-table>
			<br>
			<el-pagination background layout="prev, pager, next" :current-page.sync="page" :page-size="size" :total="total" @current-change="pageFn">
			</el-pagination>
		</el-card>
		<el-dialog title="修改FTP信息" :visible.sync="dialogFormVisible" :fullscreen="false" @closed="close">
			<el-form :model="form" :rules="rules" ref="form" v-loading="dialogloading">
				<el-form-item label="FTP IP" label-width="120px" prop="ftpAddress">
					<el-input v-model="form.ftpAddress" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="FTP用户名" label-width="120px" prop="ftpAccount">
					<el-input v-model="form.ftpAccount" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="FTP密码" label-width="120px" prop="ftpPassword">
					<el-input v-model="form.ftpPassword" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="edit('form',form.id)">确 定</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				page: 0,
				size: 0,
				total: 0,
				dialogFormVisible: false,
				form: {},
				rules: {
					ftpAddress: [{
						required: true,
						message: '请输入FTP IP',
						trigger: 'blur'
					}],
					ftpAccount: [{
						required: true,
						message: '请输入FTP用户名',
						trigger: 'blur'
					}],
					ftpPassword: [{
						required: true,
						message: '请输入FTP密码',
						trigger: 'blur'
					}],
				},
				loading: true,
				dialogloading: true
			};
		},
		created() {
			this.getList(1)
		},
		methods: {
			getList(val) {
				var that = this;
				that.get_json(that.$store.state.api + 'admin/UserSpace/page/' + val, function(data) {
					that.list = data.data;
					that.page = data.page;
					that.size = data.size;
					that.total = data.total;
					that.loading = false;
				})
			},
			pageFn(val) {
				this.getList(val)
			},
			editDialog(id) {
				var that = this;
				that.dialogFormVisible = true;
				that.get_json(that.$store.state.api + 'admin/UserSpace/' + id + '/ftp', function(data) {
						that.form = data;
						that.dialogloading = false;
				})
			},
			edit(formName, val) {
				var that = this;				
				that.form.id=val;
				that.$refs[formName].validate((valid) => {
					if(valid) {
						that.post_json(that.$store.state.api + 'admin/UserSpace/editftp', that.form, function(data) {
							that.$message({
								type: 'success',
								message: '提交成功！'
							});
							that.dialogFormVisible = false;
						})
					} else {
						that.$message({
							type: 'error',
							message: '请填写完整内容！'
						});
						return false;
					}
				});

			},
			close() {
				this.form = {};
				this.dialogFormVisible = false;
			}
		}
	}
</script>

<style scoped>
	.remainDays {
		background: #ee3231;
		color: #fff;
		padding: 2px 15px;
		border-radius: 30px;
		display: inline-block;
	}
</style>