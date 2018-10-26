<template>
	<div id="category">
		<el-card class="box-card" shadow="never">
			<div slot="header" class="clearfix">
				<span>栏目管理</span>
				<el-button type="primary" style="margin-left: 30px;" @click="editDialog('')">新建栏目</el-button>
			</div>
			<el-table :data="list" stripe style="width: 100%" v-loading="loading">
				<el-table-column prop="id" label="ID" width="180">
				</el-table-column>
				<el-table-column prop="name" label="栏目名称">
				</el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button size="mini" @click="editDialog(scope.row.id)">编辑</el-button>
						<el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<el-dialog title="栏目编辑" :visible.sync="dialogFormVisible" :fullscreen="false" @closed="close">
			<el-form :model="form" :rules="rules" ref="form" v-loading="dialogloading">
				<el-form-item label="栏目名称" label-width="120px" prop="name">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<hr />
				<el-form-item label="SEO标题" label-width="120px">
					<el-input v-model="form.seoTitle"></el-input>
				</el-form-item>
				<el-form-item label="SEO关键词" label-width="120px">
					<el-input v-model="form.seoKeywords"></el-input>
				</el-form-item>
				<el-form-item label="SEO描述" label-width="120px">
					<el-input v-model="form.seoDescription" type="textarea"></el-input>
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
				list:[],
				dialogFormVisible:false,
				form:{},				
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
				loading:true,
				dialogloading:true
			};
		},
		created() {
			this.getList();
		},
		methods: {
			getList(val) {
				var that = this;
				that.get_json(that.$store.state.api + 'NewsCategory/', function(data) {
					that.list = data;
					that.loading = false;
				})
			},
			editDialog(id){
				var that = this;
				that.dialogFormVisible = true;
				if(id.length != 0) {
					that.get_json(that.$store.state.api + 'newscategory/' + id, function(data) {
						that.form = data;
						that.dialogloading = false;
					})
				}else{
					that.dialogloading = false;
				}
			},
			edit(formName,val){				
				var that = this;
				that.$refs[formName].validate((valid) => {
					if(valid) {
						if(val != undefined) {
							that.put_json(that.$store.state.api + 'newscategory/' + val, that.form, function(data) {
								that.$message({
									type: 'success',
									message: '提交成功！'
								});
								that.getList();
								that.dialogFormVisible = false;
							})
						} else {
							that.post_json(that.$store.state.api + 'newscategory/', that.form, function(data) {
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
				that.del_json(that.$store.state.api + 'newscategory/' + val, function(data) {
					that.$message({
						type: 'success',
						message: '删除成功!!'
					});
					that.getList();
				})
			},
			close(){
				this.form = {};
				this.dialogFormVisible = false;
				this.dialogloading = true;
			},
		}
	}
</script>

<style scoped>

</style>