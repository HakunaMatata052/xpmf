<template>
	<div id="content">
		<el-card class="box-card" shadow="never">
			<div slot="header" class="clearfix">
				<span>链接管理</span>
				<el-button type="primary" style="margin-left: 30px;" @click="editDialog('')">新建友情链接</el-button>
			</div>
			<el-table :data="list" stripe style="width: 100%">
				<el-table-column prop="id" label="ID" width="180">
				</el-table-column>
				<el-table-column prop="title" label="标题">
				</el-table-column>
				<el-table-column prop="url" label="URL">
				</el-table-column>
				<el-table-column prop="ordering" label="排序">
				</el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" @click="editDialog(scope.row.id)">编辑</el-button>
						<el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<el-dialog title="链接编辑" :visible.sync="dialogFormVisible" :fullscreen="false" @closed="close">
			<el-form :model="form" :rules="rules" ref="form" label-width="120px">
				<el-form-item label="名称" prop="title">
					<el-input v-model="form.title"></el-input>
				</el-form-item>
				<el-form-item label="链接" prop="url">
					<el-input v-model="form.url"></el-input>
				</el-form-item>
				<el-form-item label="排序" prop="ordering">
					<el-input v-model="form.ordering"></el-input>
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
				dialogFormVisible: false,
				form: {},
				rules: {
					title: [{
						required: true,
						message: '请输入名称',
						trigger: 'blur'
					}],
					url: [{
						required: true,
						message: '请输入链接',
						trigger: 'blur'
					}]
				}
			};
		},
		created() {
			this.getList();
		},
		methods: {
			getList() {
				var that = this;
				that.get_json(that.$store.state.api + 'FriendUrl/', function(data) {
					that.list = data;
				})
			},
			editDialog(id) {
				var that = this;
				that.dialogFormVisible = true;
				if(id.length != 0) {
					that.get_json(that.$store.state.api + 'FriendUrl/' + id, function(data) {
						that.form = data;
					})
				}
			},
			edit(formName, val) {
				var that = this;
				that.$refs[formName].validate((valid) => {
					if(valid) {
						if(val != undefined) {
							that.put_json(that.$store.state.api + 'FriendUrl/' + val, that.form, function(data) {
								that.$message({
									type: 'success',
									message: '提交成功！'
								});
								that.getList();
								that.dialogFormVisible = false;
							})
						} else {
							that.post_json(that.$store.state.api + 'FriendUrl/', that.form, function(data) {
								that.$message({
									type: 'success',
									message: '提交成功！'
								});
								that.getList();
								that.dialogFormVisible = false;
							})
						}
					} else {
						that.$message({
							type: 'error',
							message: '请填写完整内容！'
						});
						return false;
					}
				});
			},
			del(val) {
				var that = this;
				that.del_json(that.$store.state.api + 'news/' + val, function(data) {
					that.$message({
						type: 'success',
						message: '删除成功!!'
					});
					that.getList();
				})
			},
			close() {
				this.form = {};
				this.dialogFormVisible = false;
			}
		}
	}
</script>

<style scoped>

</style>