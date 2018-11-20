<template>
	<div id="template" v-loading="loading">
		<el-card class="box-card" shadow="never">
			<div slot="header" class="clearfix">
				<span>模板列表</span>
				<el-button type="primary" style="margin-left: 30px;" @click="editDialog('')">新建模板</el-button>
			</div>
			<el-row :gutter="20">
				<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" v-for="item in list" :key="item.id">
					<div class="template-list">
						<div class="img">
							<img :src="item.fullpathThumbnail" alt="" />
						</div>
						<div class="info">
							<h3>{{item.name}}</h3>
							<p>编号 : {{item.code}}</p>
							<div class="btn-group">
								<el-button size="mini" type="primary" @click="editDialog(item.id)">编辑模板</el-button>
								<el-button size="mini" type="danger" @click="del(item.id)">删除模板</el-button>
							</div>
						</div>
						<div class="btn-group"></div>
					</div>
				</el-col>
			</el-row>
			<br>
			<el-pagination background layout="total,prev, pager, next" :current-page.sync="page" :page-size="size" :total="total" @current-change="pageFn" v-if="total!=0">
			</el-pagination>
		</el-card>
		<el-dialog title="模板内容" :visible.sync="dialogFormVisible" :fullscreen="false" @closed="close">
			<el-form :model="form" :rules="rules" ref="form" v-loading="dialogloading">
				<el-form-item label="模板名称" label-width="120px" prop="name">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="案例地址" label-width="120px" prop="showcase">
					<el-input v-model="form.showcase"></el-input>
				</el-form-item>
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="缩略图" label-width="120px">
							<el-upload class="img-uploader" name="upload" :action="$store.state.api+'template/picture'" :headers="headers" :show-file-list="false" :on-success="picSuccess">
								<img v-if="form.fullpathPicture" :src="form.fullpathPicture" class="img">
								<i v-else class="el-icon-plus img-uploader-icon"></i>
							</el-upload>
						</el-form-item>
					</el-col>
					<el-col :span="16">
						<el-form-item label="模板分类" label-width="120px" prop="categoryId">
							<el-select v-model="form.categoryId" placeholder="请选择模板类别">
								<el-option :label="x.name" :value="x.id" v-for="x in categories" :key="x.id" v-loading="cateloading"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="模板编号" label-width="120px">
							<el-input v-model="form.code"></el-input>
						</el-form-item>
						<el-form-item label="模板价格" label-width="120px">
							<el-input v-model="form.price"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="模板压缩包" label-width="120px" prop="source">
					<el-input v-model="form.source" class="uploadInput"></el-input>
					<el-upload class="upload" name="upload" :action="$store.state.api+'template/source/'" :headers="headers" :on-success="sourceSuccess" :show-file-list="false">
						<el-button size="small" type="primary">点击上传</el-button>
					</el-upload>
					<i class="el-icon-success" v-if="sourceState"></i>
				</el-form-item>
				<el-form-item label="排序" label-width="120px">
					<el-input v-model="form.ordering"></el-input>
				</el-form-item>
				<el-form-item label="摘要" label-width="120px">
					<el-input v-model="form.description" type="textarea"></el-input>
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
			list: [],
			page: 0,
			size: 0,
			total: 0,
			dialogFormVisible: false,
			headers: {},
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
				}],
				showcase: {
					required: true,
					message: '请输入案例地址（以http://开头）',
					trigger: 'blur'
				},
				source: {
					required: true,
					message: '请上传模板',
					trigger: 'blur'
				},

				categoryId: [{
					required: true,
					message: '请选择类别',
					trigger: 'change'
				}]
			},
			categories: [],
			sourceState: false,
			loading: true,
			cateloading: true,
			dialogloading: true
		};
	},
	created() {
		this.getList(1);
		this.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
	},
	methods: {
		getList(val) {
			var that = this;
			that.get_json(that.$store.state.api + 'template/page/' + val, function (data) {
				that.list = data.data;
				that.page = data.page;
				that.size = data.size;
				that.total = data.total;
				that.loading = false;
			})
		},
		pageFn(val) {
			this.getList(val);
			this.gotop();
		},
		editDialog(id) {
			var that = this;
			that.dialogFormVisible = true;
			if (id.length != 0) {
				that.get_json(that.$store.state.api + 'template/' + id, function (data) {
					that.form = data;
					that.dialogloading = false;
				});
			} else {
				that.dialogloading = false;
			}
			that.get_json(that.$store.state.api + 'template/categories/', function (data) {
				that.categories = data;
				that.cateloading = false;

			});
		},
		edit(formName, val) {
			var that = this;
			that.$refs[formName].validate((valid) => {
				if (valid) {
					if (val != undefined) {
						that.put_json(that.$store.state.api + 'template/' + val, that.form, function (data) {
							that.$message({
								type: 'success',
								message: '提交成功！'
							});
							that.getList(that.page);
							that.dialogFormVisible = false;
						})
					} else {
						that.post_json(that.$store.state.api + 'template/', that.form, function (data) {
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
			that.del_json(that.$store.state.api + 'template/' + val, function (data) {
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
		sourceSuccess(res) {
			this.$set(this.form, 'source', res.fileName);
			this.sourceState = true;
			//this.form.source = res;
		},
		picSuccess(res, file) {
			this.form.picture = res.fileName;
			this.$set(this.form, 'fullpathPicture', URL.createObjectURL(file.raw));
		}
	}
}
</script>

<style scoped>
.template-list {
  background: #fff;
  border-radius: 5px;
  -webkit-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;
}

.template-list:hover {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
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

.img-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.img-uploader .el-upload:hover {
  border-color: #409eff;
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

.el-icon-success {
  color: #67c23a;
  margin-left: 10px;
}
</style>