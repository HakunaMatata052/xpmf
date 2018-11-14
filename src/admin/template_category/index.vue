<template>
	<div id="template">

		<el-card class="box-card" shadow="never">
			<div slot="header" class="clearfix">
				<span>模板类别</span>
				<el-button type="primary" style="margin-left: 30px;" @click="editDialog('')">创建类别</el-button>
			</div>
			<el-table :data="list" stripe style="width: 100%" v-loading="loading">
				<el-table-column prop="name" label="类别名称">
				</el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button size="mini" @click="editDialog(scope.row.id)" type="primary">修改</el-button>
						<el-button size="mini" @click="del(scope.row.id)" type="danger">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<el-dialog title="模板内容" :visible.sync="dialogFormVisible" :fullscreen="false" @closed="close">
			<el-form :model="form" :rules="rules" ref="form" v-loading="dialogloading">
				<el-form-item label="模板名称" label-width="120px" prop="name">
					<el-input v-model="form.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="排序" label-width="120px">
					<el-input v-model="form.ordering" autocomplete="off"></el-input>
				</el-form-item>
				<hr />
				<el-form-item label="SEO标题" label-width="120px">
					<el-input v-model="form.seoTitle" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="SEO关键词" label-width="120px">
					<el-input v-model="form.seoKeywords" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="SEO描述" label-width="120px">
					<el-input v-model="form.seoDescription" type="textarea" autocomplete="off"></el-input>
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
					name: [{
							required: true,
							message: '请输入名称',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 20,
							message: '长度在 2 到 20 个字符',
							trigger: 'blur'
						}
					]
				},
				loading: true,
				dialogloading: true
			};
		},
		created() {
			this.getList()
		},
		methods: {
			getList() {
				var that = this;
				that.get_json(that.$store.state.api + 'template/categories/', function(data) {
					that.list = data;
					that.loading = false;
				})
			},
			editDialog(id) {
				var that = this;
				that.dialogFormVisible = true;
				if(id.length != 0) {
					that.get_json(that.$store.state.api + 'templatecategory/' + id, function(data) {
						that.form = data;
						that.dialogloading = false;
					})
				}else{
					that.dialogloading = false;
				}
			},
			edit(formName, val) {
				var that = this;
				that.$refs[formName].validate((valid) => {
					if(valid) {
						if(val != undefined) {
							that.put_json(that.$store.state.api + 'templatecategory/' + val, that.form, function(data) {
								that.$message({
									type: 'success',
									message: '提交成功！'
								});
								that.getList();
								that.dialogFormVisible = false;
							})
						} else {
							that.post_json(that.$store.state.api + 'templatecategory/', that.form, function(data) {
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
				that.del_json(that.$store.state.api + 'templatecategory/' + val, function(data) {
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
	.template-list {
		background: #fff;
		border-radius: 5px;
		-webkit-transition: all .3s ease-out;
		transition: all .3s ease-out;
		overflow: hidden;
		position: relative;
	}
	
	.template-list:hover {
		box-shadow: 0 0 15px rgba(0, 0, 0, .3);
		-webkit-transform: translate(-5px, -5px);
		transform: translate(-5px, -5px);
	}
	
	.template-list .img {
		width: 100%;
		height: 0;
		padding-top: 60%;
		overflow: hidden;
		position: relative;
	}
	
	.template-list .img img {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: auto;
	}
	
	.template-list .info {
		padding: 20px;
		background: #fbfbfb;
	}
	
	.template-list .info p {
		margin: 10px 0;
		line-height: 25px;
		color: #999;
	}
	
	.template-list .info h3 {
		margin: 0;
		font-size: 20px;
	}
	
	.template-list .btn-group {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	
	.template-list .btn-group button {
		flex-grow: 1;
		margin: 0 5px 5px;
	}
	
	.template-list .del {
		float: right;
		display: none;
	}
	
	.template-list:hover .del {
		display: block;
	}
</style>