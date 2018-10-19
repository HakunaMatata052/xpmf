<template>
	<div id="content">
		<el-card class="box-card" shadow="never">
			<div slot="header" class="clearfix">
				<span>文章管理</span>
				<el-button type="primary" style="margin-left: 30px;" @click="editDialog('')">新建文章</el-button>
			</div>
			<el-table :data="list" stripe style="width: 100%">
				<el-table-column prop="id" label="ID" width="180">
				</el-table-column>
				<el-table-column prop="title" label="标题">
				</el-table-column>
				<el-table-column prop="newsCategory.name" label="所属栏目">
				</el-table-column>
				<el-table-column prop="ordering" label="排序" width="180">
				</el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" @click="editDialog(scope.row.id)">编辑</el-button>
						<el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<br>
			<el-pagination background layout="prev, pager, next" :current-page.sync="page" :page-size="size" :total="total" @current-change="pageFn">
			</el-pagination>
		</el-card>
		<el-dialog title="文章编辑" :visible.sync="dialogFormVisible" :fullscreen="false" @closed="close">
			<el-form :model="form" :rules="rules" ref="form" label-width="120px">
				<el-form-item label="标题" prop="title">
					<el-input v-model="form.title"></el-input>
				</el-form-item>
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="缩略图">
							<el-upload class="img-uploader" :action="$store.state.api+'News/thumbnail'" :headers="headers" :show-file-list="false" :on-success="picSuccess">
								<img v-if="form.fullpathThumbnail" :src="form.fullpathThumbnail" class="img">
								<i v-else class="el-icon-plus img-uploader-icon"></i>
							</el-upload>
						</el-form-item>
					</el-col>
					<el-col :span="16">
						<el-form-item label="栏目" prop="newsCategoryId">
							<el-select v-model="form.newsCategoryId" placeholder="请选择活动区域">
								<el-option :label="x.name" :value="x.id" v-for="x in categories"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="排序">
							<el-input v-model="form.ordering"></el-input>
						</el-form-item>
						<el-form-item label="作者" prop="author">
							<el-input v-model="form.author"></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<el-form-item label="描述" prop="description">
					<el-input v-model="form.description" type="textarea"></el-input>
				</el-form-item>
				<el-form-item label="内容" prop="context">
					<quill-editor v-model="form.context" ref="QuillEditor" :options="editorOption"></quill-editor>
				</el-form-item>
				<br />
				<hr />
				<el-form-item label="SEO标题">
					<el-input v-model="form.seoTitle"></el-input>
				</el-form-item>
				<el-form-item label="SEO关键词">
					<el-input v-model="form.seoKeywords"></el-input>
				</el-form-item>
				<el-form-item label="SEO描述">
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
				list: [],
				page: 0,
				size: 0,
				total: 0,
				dialogFormVisible: false,
				headers: {},
				form: {
					author: '新派魔方'
				},
				rules: {
					title: [{
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
					],
					newsCategoryId: [{
						required: true,
						message: '请选择栏目',
						trigger: 'change'
					}],
					author: [{
						required: true,
						message: '请输入名称',
						trigger: 'blur'
					}],
					description: [{
						required: true,
						message: '请输入名称',
						trigger: 'blur'
					}],
					context: [{
						required: true,
						message: '请输入内容',
						trigger: 'blur'
					}]
				},
				categories: [],
				editorOption: {
					modules: {
						//						toolbar: [
						//							['bold', 'italic', 'underline', 'strike', 'image', 'blockquote', 'code-block']
						//						]
					}
				},
			};
		},
		created() {
			this.getList(1);
			this.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
		},
		methods: {
			getList(val) {
				var that = this;
				that.get_json(that.$store.state.api + 'news/page/' + val, function(data) {
					that.list = data.data;
					that.page = data.page;
					that.size = data.size;
					that.total = data.total;
				})
			},
			pageFn(val) {
				this.getList(val)
			},
			editDialog(id) {
				var that = this;
				that.dialogFormVisible = true;
				if(id.length != 0) {
					that.get_json(that.$store.state.api + 'news/' + id, function(data) {
						data.fullpathThumbnail = that.$store.state.pic + data.fullpathThumbnail;
						that.form = data;
					})
				};

				that.get_json(that.$store.state.api + 'NewsCategory/', function(data) {
					that.categories = data;
				});
			},
			edit(formName, val) {
				var that = this;
				that.$refs[formName].validate((valid) => {
					if(valid) {
						if(val != undefined) {
							that.put_json(that.$store.state.api + 'news/' + val, that.form, function(data) {
								that.$message({
									type: 'success',
									message: '提交成功！'
								});
								that.getList(that.page);
								that.dialogFormVisible = false;
							})
						} else {
							that.post_json(that.$store.state.api + 'news/', that.form, function(data) {
								that.$message({
									type: 'success',
									message: '提交成功！'
								});
								that.getList(that.page);
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
					that.getList(that.page);
				})
			},
			close() {
				this.form = {};
				this.dialogFormVisible = false;
			},
			picSuccess(res, file) {
				this.form.thumbnail = res;
				this.$set(this.form, 'fullpathThumbnail', URL.createObjectURL(file.raw));
			}
		}
	}
</script>

<style scoped>
	.img-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.img-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	
	.img-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
		border: 1px dashed #ccc;
	}
	
	.img {
		width: 178px;
		height: 178px;
		display: block;
	}
	
	.upload {
		display: inline-block;
	}
	
	.uploadInput {
		width: 300px;
		margin-right: 20px;
	}
	
	.quill-editor {
		height: 135px;
		margin-bottom: 30px;
	}
	
	.quill-editor .ql-container {
		height: 90px;
	}
	
</style>