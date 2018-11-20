<template>
	<div class="tabs">
		<el-card class="box-card" shadow="never">
			<div slot="header" class="clearfix">
				<span>模板类别</span>
				<el-button type="primary" style="margin-left: 30px;" @click="editDialog('')">新增案例</el-button>
			</div>
			<el-tabs v-model="path" @tab-click="handleClick">
				<el-tab-pane label="已通过" name="case/cases/page/"></el-tab-pane>
				<el-tab-pane label="待审核" name="case/admin/page/"></el-tab-pane>
			</el-tabs>
			<el-table :data="list" stripe style="width: 100%" v-show="path=='case/cases/page/'" v-loading="loading">
				<el-table-column prop="id" label="ID" width="80px" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="siteName" max-width="160px" label="网站名称" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="domain" label="域名" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="templateCode" width="120px" label="模板编号" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="remark" label="备注" max-width="300px" show-overflow-tooltip>
				</el-table-column>
				<el-table-column label="操作" width="200px">
					<template slot-scope="scope">
						<el-button type="primary" size="small" @click="editDialog(scope.row.id)">编辑</el-button>
						<el-button type="danger" size="small" @click="del(scope.row.id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-table :data="list" stripe style="width: 100%" v-show="path=='case/admin/page/'">
				<el-table-column prop="siteName" label="网站名称">
				</el-table-column>
				<el-table-column prop="domain" label="域名">
				</el-table-column>
				<el-table-column prop="creatime" label="申请时间">
				</el-table-column>
				<el-table-column prop="expires" label="域名到期时间">
				</el-table-column>
				<el-table-column prop="username" label="申请人">
				</el-table-column>
				<el-table-column label="操作" width="200px">
					<template slot-scope="scope">
						<el-button type="success" size="small" @click="auditFn(scope.row.siteId)">通过</el-button>
						<el-button type="danger" size="small" @click="refuse(scope.row.siteId)">拒绝</el-button>
					</template>
				</el-table-column>
			</el-table>
			<br />
			<el-pagination background layout="total,prev, pager, next" :current-page.sync="page" :page-size="size" :total="total" @current-change="pageFn" v-if="total!=0">
			</el-pagination>
		</el-card>
		<el-dialog title="编辑案例" :visible.sync="dialogFormVisible" :fullscreen="false" @closed="close">
			<el-form :model="form" :rules="rules" ref="form" v-loading="dialogloading">
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="缩略图" label-width="120px" prop="picture">
							<el-upload class="img-uploader" name="upload" :action="$store.state.api+'case/picture'" :headers="headers" :show-file-list="false" :on-success="picSuccess">
								<img v-if="form.picture" :src="form.fullpathPicture" class="img">
								<i v-else class="el-icon-plus img-uploader-icon"></i>
							</el-upload>
						</el-form-item>
					</el-col>
					<el-col :span="16">
						<el-form-item label="名称" label-width="120px" prop="siteName">
							<el-input v-model="form.siteName"></el-input>
						</el-form-item>
						<el-form-item label="域名" label-width="120px" prop="domain">
							<el-input v-model="form.domain"></el-input>
						</el-form-item>

						<el-form-item label="模板编号" label-width="120px" prop="templateCode">
							<el-input v-model="form.templateCode" @blur="validAjax(form.templateCode)" ref="templateCode"></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<el-form-item label="备注" label-width="120px">
					<el-input v-model="form.remark" type="textarea"></el-input>
				</el-form-item>
				<el-form-item label="排序" label-width="120px" prop="ordering">
					<el-input v-model="form.ordering"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="edit('form',form.id,form.templateCode)">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="通过审核" :visible.sync="auditDialog" :fullscreen="false" @closed="close">
			<el-upload class="img-uploader" name="upload" :action="$store.state.api+'case/picture'" :headers="headers" :show-file-list="false" :on-success="auditpic">
				<img v-if="audit.picture" :src="$store.state.pic+audit.picture" class="img">
				<i v-else class="el-icon-plus img-uploader-icon"></i>
			</el-upload>
			<el-input v-model="audit.id" type="hidden"></el-input>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="adopt()">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			list: [],
			path: "case/cases/page/",
			page: 0,
			size: 0,
			total: 0,
			form: {
				ordering: 99
			},
			dialogFormVisible: false,
			headers: {},
			rules: {
				siteName: [
					{
						required: true,
						message: "请填写名称",
						trigger: "blur"
					},
					{
						min: 2,
						max: 20,
						message: "长度在 2 到 20 个字符",
						trigger: "blur"
					}
				],
				domain: {
					required: true,
					message: "请填写域名",
					trigger: "blur"
				},
				picture: {
					required: true,
					message: "请上传缩略图",
					trigger: "blur"
				},
				templateCode: {
					required: true,
					message: "请填写模板编号",
					trigger: "blur"
				},
				ordering: {
					required: true,
					type: "number",
					trigger: "blur",
					message: "排序必须为数字值"
				}
			},
			auditDialog: false,
			audit: {
				id: "",
				picture: ""
			},
			loading: true,
			dialogloading: true,
			templateValid: false
		};
	},
	created() {
		this.getList("case/cases/page/", 1);
		this.headers.Authorization = "Bearer " + localStorage.getItem("token");
	},
	methods: {
		getList(type, val) {
			var that = this;
			that.get_json(that.$store.state.api + type + val, function (data) {
				that.list = data.data;
				that.page = data.page;
				that.size = data.size;
				that.total = data.total;
				that.loading = false;
			});
		},
		pageFn(val) {
			this.getList(this.path, val);
			this.gotop();
		},
		handleClick(tab, event) {
			this.path = tab.name;
			this.getList(tab.name, 1);
			this.loading = true;
		},
		editDialog(val) {
			var that = this;
			that.dialogFormVisible = true;
			that.templateValid = false;
			if (val.length != 0) {
				that.get_json(that.$store.state.api + "case/" + val, function (data) {
					that.form = data;
					that.dialogloading = false;
				});
			} else {
				that.dialogloading = false;
			}
		},
		edit(formName, val, id) {
			var that = this;
			that.$refs[formName].validate(valid => {
				if (valid) {
					if (val != undefined) {
						if (that.templateValid == false) {
							that.validAjax(id, function () {
								that.editAjax(val);
							});
						} else {
							that.editAjax(val);
						}
					} else {
						if (that.templateValid == false) {
							that.validAjax(id, function () {
								that.addAjax(val);
							});
						} else {
							that.addAjax(val);
						}
					}
				} else {
					that.$message({
						type: "error",
						message: "请填写完整内容！"
					});
					return false;
				}
			});
		},
		editAjax(val) {
			var that = this;
			that.put_json(
				that.$store.state.api + "case/" + val + "/edit/",
				that.form,
				function (data) {
					that.$message({
						type: "success",
						message: "提交成功！"
					});
					that.getList(that.path, that.page);
					that.dialogFormVisible = false;
				}
			);
		},
		addAjax(val) {
			var that = this;
			that.post_json(that.$store.state.api + "case/", that.form, function (
				data
			) {
				that.$message({
					type: "success",
					message: "提交成功！"
				});
				that.getList(that.path, that.page);
				that.dialogFormVisible = false;
			});
		},
		validAjax(id, fn) {
			var that = this;
			that.get_json(that.$store.state.api + "template/valid/" + id, function (
				data
			) {
				that.templateValid = true;
				if (fn != null) {
					fn();
				}
			});
		},
		picSuccess(res, file) {
			this.form.picture = res.fileName;
			this.$set(this.form, "fullpathPicture", URL.createObjectURL(file.raw));
		},
		del(val) {
			var that = this;
			that.del_json(that.$store.state.api + "case/" + val, function (data) {
				that.$message({
					type: "success",
					message: "删除成功！"
				});
				that.getList(that.path, that.page);
			});
		},
		auditFn(id) {
			var that = this;
			that.audit.id = id;
			that.auditDialog = true;
		},
		auditpic(res, file) {
			this.form.picture = res.fileName;
			this.$set(this.form, "fullpathPicture", URL.createObjectURL(file.raw));
		},
		adopt() {
			var that = this;
			that.put_json(
				that.$store.state.api +
				"case/" +
				that.audit.id +
				"/audit/picture/" +
				that.audit.picture,
				{},
				function (data) {
					that.$message({
						type: "success",
						message: "操作成功！"
					});
					that.auditDialog = false;
					that.getList(that.path, that.page);
				}
			);
		},
		refuse(val) {
			var that = this;
			that.put_json(
				that.$store.state.api + "case/" + val + "/refuse",
				{},
				function (data) {
					that.$message({
						type: "success",
						message: "操作成功！"
					});
					that.getList(that.path, that.page);
				}
			);
		},
		close() {
			this.form = {
				ordering: 99
			};
			this.dialogFormVisible = false;
			this.dialogloading = true;
		}
	}
};
</script>

<style>
.tabs {
  background-color: #fff;
  border-radius: 3px;
  -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.tabs .el-tabs__item {
  height: 61px;
  line-height: 61px;
  width: 120px;
  text-align: center;
  font-size: 16px;
}

.tabs .el-tabs__nav-next,
.tabs .el-tabs__nav-prev {
  line-height: 70px;
  padding: 0 10px;
}

.tabs .el-tabs__nav-wrap::after {
  height: 1px;
  background: #eee;
}

.tabs .el-tabs__header {
  margin-bottom: 0;
}

.tabs .tab-content {
  padding: 20px;
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

.el-dialog {
  max-height: 80%;
  overflow: auto;
}

.el-dialog__body {
  padding: 20px;
}

.el-dialog__footer {
  text-align: left;
}

.el-dialog__footer .submit {
  width: 100%;
  margin-top: 10px;
}

.quill-editor {
  height: 135px;
}

.quill-editor .ql-container {
  height: 90px;
}

.content {
  padding: 10px;
  border: 1px dashed #ccc;
}

.reply {
  background: #eee;
  margin: 10px 0;
  padding: 10px;
}

.reply h2 {
  text-align: center;
}

.reply .tip {
  text-align: center;
  padding: 10px 0;
  color: #ccc;
}

.reply-list dl {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px 0;
}

.reply-list dt {
  width: 50px;
  margin-right: 20px;
}

.reply-list dt img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}

.reply-list dd {
  display: flex;
  justify-content: space-between;
  flex-flow: wrap;
  flex-grow: 1;
}

.reply-list dd span {
  font-size: 14px;
  color: #999;
}

.reply-list .reply-con {
  width: 100%;
  margin-top: 10px;
}

.reply-list .reply-con img {
  max-width: 80%;
}

.reply-con strong {
  font-weight: bold !important;
}

.reply-con em {
  font-style: italic !important;
}

.avatar-uploader .el-upload {
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
</style>