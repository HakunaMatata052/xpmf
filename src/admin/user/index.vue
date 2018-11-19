<template>
	<div id="content">
		<el-card class="box-card" shadow="never">
			<div slot="header" class="clearfix">
				<el-row>
					<el-col :xs="24" :md="16" style="margin-bottom:10px">
						<span>文章管理</span>
						<el-select v-model="role" placeholder="请选择" @change='roleFn' style="margin-left: 30px;">
							<el-option v-for="item in roleList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-col>
					<el-col :xs="24" :md="8">
						<el-input placeholder="请输入搜索关键词，如用户名，电话" v-model="search" style="float:right;margin-left: 30px;">
							<el-button slot="append" icon="el-icon-search" @click="searchFn"></el-button>
						</el-input>
					</el-col>
				</el-row>

			</div>
			<el-table :data="list" stripe style="width: 100%" v-loading="loading">
				<el-table-column prop="id" label="ID" width="180">
				</el-table-column>
				<el-table-column prop="username" label="用户名">
				</el-table-column>
				<el-table-column prop="cellphone" label="手机号">
				</el-table-column>
				<el-table-column prop="using" label="是否可用" width="100">
					<template slot-scope="scope">
						<el-tag v-if="scope.row.using==true">是</el-tag>
						<el-tag type="danger" v-else-if="scope.row.using==false">否</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="300">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" @click="editDialog(scope.row.username)">编辑</el-button>
						<el-button size="mini" type="warning" @click="editPassword(scope.row.username)">更改密码</el-button>
						<el-button size="mini" type="danger" @click="del(scope.row.username)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<br>
			<el-pagination background layout="prev, pager, next" :current-page.sync="page" :page-size="size" :total="total" @current-change="pageFn" v-if="total!=0">
			</el-pagination>
		</el-card>
		<el-dialog title="文章编辑" :visible.sync="dialogFormVisible" :fullscreen="false" @closed="close">
			<el-form :model="form" :rules="rules" ref="form" label-width="120px" v-loading="dialogloading">
				<el-form-item label="头像" label-width="120px">
					<el-upload class="avatar-uploader" name="upload" :action="$store.state.api+'user/avatar/'" :headers="headers" :show-file-list="false" :on-success="handleAvatarSuccess">
						<img v-if="form.fullpathAvatar" :src="form.fullpathAvatar" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="用户名">
					{{form.username}}
				</el-form-item>
				<el-form-item label="邮箱">
					<el-input v-model="form.email"></el-input>
				</el-form-item>
				<el-form-item label="手机">
					<el-input v-model="form.cellphone"></el-input>
				</el-form-item>
				<br />
				<hr />
				<el-form-item label="公司名称">
					<el-input v-model="form.userCompany.companyName"></el-input>
				</el-form-item>
				<el-form-item label="联系人">
					<el-input v-model="form.userCompany.contactUserName"></el-input>
				</el-form-item>
				<el-form-item label="固定电话">
					<el-input v-model="form.userCompany.contactPhone"></el-input>
				</el-form-item>
				<el-form-item label="城市">
					<el-cascader placeholder="试试搜索：西安" size="large" :options="options" v-model="selectedOptions" filterable change-on-select @change='cityFn' style="width: 100%;"></el-cascader>
				</el-form-item>
				<el-form-item label="详细地址">
					<el-input v-model="form.userCompany.address" type="textarea" :autosize="{ minRows: 5, maxRows: 10}"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="edit('form',form.username)">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { provinceAndCityData, CodeToText, TextToCode } from 'element-china-area-data'
export default {
	data() {
		return {
			list: [],
			page: 0,
			size: 0,
			total: 0,
			dialogFormVisible: false,
			form: {
				userCompany: {
					companyName: '',
					contactUserName: '',
					contactPhone: '',
					address: ''
				}
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
			role: 'consumer',
			roleList: [{
				value: 'consumer',
				label: '客户'
			}, {
				value: 'agent',
				label: '代理商'
			}],
			userCompany: {},
			options: provinceAndCityData,
			selectedOptions: [],
			headers: {},
			search: '',
			loading: true,
			dialogloading: true
		};
	},
	created() {
		this.getList(this.role, 1);
		this.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
	},
	methods: {
		getList(role, val) {
			var that = this;
			that.get_json(that.$store.state.api + 'admin/User/role/' + role + '/page/' + val, function (data) {
				that.list = data.data;
				that.page = data.page;
				that.size = data.size;
				that.total = data.total;
				that.loading = false;
			})
		},
		pageFn(val) {
			this.getList(this.role, val);
			this.gotop();
		},
		roleFn(val) {
			this.loading = true;
			this.getList(this.role, 1)
		},
		editDialog(id) {
			var that = this;
			that.dialogFormVisible = true;
			if (id.length != 0) {
				that.get_json(that.$store.state.api + 'admin/User/' + id, function (data) {
					that.form = data;
					that.userCompany = data.userCompany;
					var city = [];
					if (data.userCompany.province != null && data.userCompany.province.length != 0) {
						city[0] = TextToCode[data.userCompany.province].code;
					}
					if (data.userCompany.province != null && data.userCompany.province.length != 0) {
						city[1] = TextToCode[data.userCompany.province][data.userCompany.city].code;
					}
					that.selectedOptions = city;
					that.dialogloading = false;
				})
			}
		},
		edit(formName, val) {
			var that = this;
			that.$refs[formName].validate((valid) => {
				if (valid) {
					that.put_json(that.$store.state.api + 'admin/User/' + val, that.form, function (data) {
						that.$message({
							type: 'success',
							message: '提交成功！'
						});
						that.getList(that.role, that.page);
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
		del(val) {
			var that = this;
			that.del_json(that.$store.state.api + 'admin/User/' + val, function (data) {
				that.$message({
					type: 'success',
					message: '删除成功!!'
				});
				that.getList(that.role, that.page);
			})
		},
		close() {
			this.form = {
				userCompany: {}
			};
			this.dialogFormVisible = false;
			this.dialogloading = true;
		},
		handleAvatarSuccess(res, file) {
			this.form.avatar = res.fileName;
			this.form.fullpathAvatar = URL.createObjectURL(file.raw);
		},
		cityFn(val) {
			var that = this;
			var province = CodeToText[val[0]];
			var city = CodeToText[val[1]];
			that.userCompany.province = province;
			that.userCompany.city = city;
		},
		editPassword(val) {
			var that = this;
			this.$prompt('请输入密码', '提示', {
				inputType: 'password',
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				inputPattern: /(^(?=.*[a-zA-Z])|(?=.*\d)|(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/])).{4,16}$/,
				inputErrorMessage: '密码必须在4-16位！'
			}).then(({
				value
			}) => {
				that.put_json(that.$store.state.api + 'admin/User/changeuserpassword/' + val, {
					password: value
				}, function (data) {
					that.$message({
						type: 'success',
						message: '密码修改成功！'
					});
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '取消输入'
				});
			});
		},
		searchFn() {
			var that = this;
			that.loading = true;
			that.post_json(that.$store.state.api + 'admin/User/search/page/1', {
				keyword: that.search
			}, function (data) {
				that.list = data.data;
				that.page = data.page;
				that.size = data.size;
				that.total = data.total;
				that.loading = false;
			})
		}
	}
}
</script>

<style scoped>
.avatar-uploader img {
  border-radius: 50%;
  overflow: hidden;
  width: 68px;
  height: 68px;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 68px;
  height: 68px;
  line-height: 68px;
  text-align: center;
  border: 1px dashed #eee;
  border-radius: 50%;
  overflow: hidden;
}
</style>