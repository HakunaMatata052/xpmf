<template>
	<div id="config" v-loading="loading">
		<el-card class="box-card" shadow="never">
			<div slot="header" class="clearfix">
				<span>网站设置</span>
			</div>
			<el-form :model="form" ref="form" label-width="100px" style="max-width: 600px;">
				<el-form-item label="网站名称">
					<el-input v-model="form.seoTitle"></el-input>
				</el-form-item>
				<el-form-item label="网站关键词">
					<el-input v-model="form.seoKeywords"></el-input>
				</el-form-item>
				<el-form-item label="网站描述">
					<el-input type="textarea" v-model="form.seoDescription"></el-input>
				</el-form-item>
				<el-form-item label="联系电话" prop="phone" :rules="[{ min: 0, max: 12, message: '长度在 0 到 12 个字符', trigger: 'blur' }]">
					<el-input v-model="form.phone"></el-input>
				</el-form-item>
				<el-form-item label="传真">
					<el-input v-model="form.fax"></el-input>
				</el-form-item>
				<el-form-item label="QQ">
					<el-input v-model="form.qq"></el-input>
				</el-form-item>
				<el-form-item label="ICP备案号">
					<el-input v-model="form.provider"></el-input>
				</el-form-item>
				<el-form-item label="版权信息">
					<el-input v-model="form.copyRight"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submit('form')">提交</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {},
				loading:true
			};
		},
		created() {
			var that = this;
			that.get_json(that.$store.state.api + 'SiteSetting/', function(data) {
				that.loading = false;
				that.form = data;
			})
		},
		methods: {
			submit(formName) {
				var that = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						that.put_json(that.$store.state.api + 'SiteSetting/', that.form, function(data) {
							that.$message({
								type: 'success',
								message: '提交成功！'
							});
						})
					} else {
						that.$message({
							type: 'error',
							message: '请填正确格式！'
						});
						return false;
					}
				});

			},
		}
	}
</script>

<style scoped>

</style>