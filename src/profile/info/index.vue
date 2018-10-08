<template>
	<div id="info">
		<el-card class="box-card" shadow="never">
			<div slot="header" class="clearfix">
				<span>个人设置</span>
			</div>
			<div class="item">
				<div class="item-left">
					<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess">
						<img v-if="imageUrl" :src="imageUrl" class="avatar">
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
					<h4>修改密码</h4>
				</div>
				<div class="item-right">
					<el-input v-model="userinfo.oldpassword"></el-input>
				</div>
			</div>
			
			<div class="item">
				<div class="item-left">
					<h4>修改密码</h4>
				</div>
				<div class="item-right">
					<el-input v-model="userinfo.password"></el-input>
				</div>
			</div>

			<div class="item">
				<div class="item-left">
					<h4>确认密码</h4>
				</div>
				<div class="item-right">
					<el-input v-model="userinfo.password"></el-input>
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
					<el-cascader placeholder="试试搜索：西安" size="large" :options="options" v-model="selectedOptions" filterable change-on-select @change='cityFn'  style="width: 100%;"></el-cascader>
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

	</div>
</template>

<script>
	import { regionData, CodeToText, TextToCode } from 'element-china-area-data'
	export default {
		data() {
			return {
				imageUrl: '',
				userinfo: {},
				company:{},
				options: regionData,
				selectedOptions: []
			};
		},
		created() {
			this.getinfo();
		},
		methods: {
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			getinfo() {
				var that = this;
				that.get_json(that.$store.state.api + 'user/mine', function(data) {
					that.userinfo = data;
					that.company = data.company;
				})
			},
			cityFn(val){
				var that =this;
				var province = CodeToText[val[0]];
				var city = CodeToText[val[1]];
				that.company.province = province;
				that.company.city = city;
			},
			submit(){
				var that = this;
				console.log(that.userinfo)
				that.post_json(that.$store.state.api + 'user/mine',that.userinfo, function(data) {
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