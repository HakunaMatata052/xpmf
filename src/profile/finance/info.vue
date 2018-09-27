<template>
	<div id="info">
		<el-row :gutter="20" type="flex" justify="center">
			<el-col :span="3">
				<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess">
					<img v-if="imageUrl" :src="imageUrl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-col>
			<el-col :span="8">
				<h4><i class="el-icon-upload2"></i>上传头像 </h4> 支持上传 jpg、png、gif 格式图片，大小不超过「2Mb」。
			</el-col>
		</el-row>
		
		<el-row :gutter="20" type="flex" justify="center">
			<el-col :span="3">
				用户名
			</el-col>
			<el-col :span="8">
				wei888feng
			</el-col>
		</el-row>		
		<el-row :gutter="20" type="flex" justify="center">
			<el-col :span="3">
				邮箱
			</el-col>
			<el-col :span="8">
				350096958@qq.com
			</el-col>
		</el-row>
				<el-row :gutter="20" type="flex" justify="center">
			<el-col :span="3">
				手机
			</el-col>
			<el-col :span="8">
				13152016986
			</el-col>
		</el-row>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				imageUrl: ''
			};
		},
		created() {},
		methods: {
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
		}
	}
</script>

<style scoped>
	#info {
		width: 60%;
	}
	
	#info h4 {
		font-size: 18px;
		color: #ee3231;
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
	}
</style>