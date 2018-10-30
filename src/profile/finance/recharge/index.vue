<template>
	<div id="recharge">
		<el-form :model="form" ref="form" label-width="100px">
			<el-form-item label="金额" prop="amount" :rules="[
      { required: true, message: '年龄不能为空'},
      { type: 'number', message: '年龄必须为数字值'}
    ]">
				<el-input type="amount" v-model.number="form.amount" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('form',form.amount)">提交</el-button>
				<el-button @click="resetForm('form')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					amount: ''
				}
			};
		},
		methods: {
			submitForm(formName,amount) {
				var that = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.$router.push({
							path: `/pay/${amount}`,
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>

<style scoped>

</style>