<template>
	<div id="info">
		<el-card class="box-card" shadow="never">
			<div slot="header" class="clearfix">
				<span>个人设置</span>
			</div>
			<div class="item">
				<div class="item-left">
					<el-upload class="avatar-uploader" :action="$store.state.api+'user/avatar/'" :headers="headers" :show-file-list="false" :on-success="handleAvatarSuccess">
						<img v-if="avatar" :src="avatar" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</div>
				<div class="item-right">
					<h4><i class="el-icon-upload2"></i>上传头像 </h4>
					<p>支持上传 jpg、png、gif 格式图片，大小不超过「2Mb」。</p>
				</div>
			</div>

			<div class="item">
				<div class="item-left">
					<h4>用户名</h4>
				</div>
				<div class="item-right">
					{{userinfo.username}}
				</div>
			</div>
			<div class="item">
				<div class="item-left">
					<h4>邮箱</h4>
				</div>
				<div class="item-right">
					<el-input v-model="userinfo.email"></el-input>
				</div>
			</div>
			<div class="item">
				<div class="item-left">
					<h4>手机</h4>
				</div>
				<div class="item-right">
					<el-input v-model="userinfo.cellphone"></el-input>
				</div>
			</div>

			<div class="item">
				<div class="item-left">
					<h4>密码</h4>
				</div>
				<div class="item-right">
					<el-button type="primary" @click="dialogFormVisible = true">修改密码</el-button>
				</div>
			</div>
			<hr />

			<div class="item">
				<div class="item-left">
					<h4>公司名称</h4>
				</div>
				<div class="item-right">
					<el-input v-model="company.companyName"></el-input>
				</div>
			</div>
			<div class="item">
				<div class="item-left">
					<h4>联系人</h4>
				</div>
				<div class="item-right">
					<el-input v-model="company.contactUserName"></el-input>
				</div>
			</div>
			<div class="item">
				<div class="item-left">
					<h4>固定电话</h4>
				</div>
				<div class="item-right">
					<el-input v-model="company.contactPhone"></el-input>
				</div>
			</div>
			<div class="item">
				<div class="item-left">
					<h4>选择城市</h4>
				</div>
				<div class="item-right" style="width: 40%;">
					<el-cascader placeholder="试试搜索：西安" size="large" :options="options" v-model="selectedOptions" filterable change-on-select @change='cityFn' style="width: 100%;"></el-cascader>
				</div>
			</div>
			<div class="item">
				<div class="item-left">
					<h4>详细地址</h4>
				</div>
				<div class="item-right" style="width: 40%;">
					<el-input type="textarea" :autosize="{ minRows: 5, maxRows: 10}" placeholder="请输入内容" v-model="company.address">
					</el-input>
				</div>
			</div>
			<div class="item">
				<div class="item-left">
					<el-button type="primary" @click="submit">提交</el-button>
				</div>
			</div>

		</el-card>
		<el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="500px">
			<el-form :model="form" :rules="rules" ref="form" status-icon>
				<el-form-item label="旧密码" label-width="80px" prop="Old">
					<el-input v-model="form.Old" type="password" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="新密码" label-width="80px" prop="New">
					<el-input v-model="form.New" type="password" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" label-width="80px" prop="Confirm">
					<el-input v-model="form.Confirm" type="password" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="changePassword('form')">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { provinceAndCityData,CodeToText,TextToCode   } from 'element-china-area-data'
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if(value !== this.form.New) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				avatar: '',
				userinfo: {},
				company: {},
				options: provinceAndCityData,
				selectedOptions: [],
				headers: {},
				dialogFormVisible: false,
				form: {
					Old: '',
					New: '',
					Confirm: ''
				},
				rules: {
					Old: [{
							required: true,
							message: '请输入旧密码',
							trigger: 'blur'
						},
						{
							min: 4,
							max: 16,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
					New: [{
							required: true,
							message: '请输入新密码',
							trigger: 'blur'
						},
						{
							min: 4,
							max: 16,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
					Confirm: [{
						required: true,
						message: '请输入新密码',
						trigger: 'blur'
					}, {
						validator: validatePass,
						trigger: 'blur'
					}]
				}
			};
		},
		created() {
			this.getinfo();
			this.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
		},
		methods: {
			handleAvatarSuccess(res, file) {
				this.avatar = URL.createObjectURL(file.raw);
			},
			getinfo() {
				var that = this;
				that.get_json(that.$store.state.api + 'user/mine', function(data) {
					that.userinfo = data;
					that.company = data.company;
					var city = [];
					city[0] = TextToCode[data.company.province].code;
					city[1] = TextToCode[data.company.province][data.company.city].code;
					that.selectedOptions = city;
					console.log(that.selectedOptions)
				})
			},
			cityFn(val) {
				var that = this;
				var province = CodeToText[val[0]];
				var city = CodeToText[val[1]];
				that.company.province = province;
				that.company.city = city;
			},
			changePassword(formName) {
				var that = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						that.dialogFormVisible = false;
						that.post_json(that.$store.state.api + 'user/changepassword', that.form, function(data) {
							that.$message({
								type: 'success',
								message: '密码修改成功！'
							});
							//console.log(that.userinfo)
						})
					} else {
						that.$message({
							type: 'error',
							message: '密码输入有误！'
						});
						return false;
					}
				});

			},
			submit() {
				var that = this;
				that.put_json(that.$store.state.api + 'user', that.userinfo, function(data) {
					that.$message({
						type: 'success',
						message: '资料修改成功！'
					});
					//console.log(that.userinfo)
				})
			}
		}
	}
</script>

<style scoped>
	.item {
		display: flex;
		padding-left: 80px;
		margin-bottom: 20px;
	}
	
	.item .item-left {
		width: 80px;
		min-height: 35px;
		line-height: 35px;
		margin-right: 30px;
		text-align: right;
	}
	
	.item .item-right {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		min-height: 35px;
		line-height: 35px;
	}
	
	.item .item-right h4 {
		font-size: 18px;
		color: #ee3231;
		width: 100%;
	}
	
	.item .item-right p {
		width: 100%;
	}
	
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