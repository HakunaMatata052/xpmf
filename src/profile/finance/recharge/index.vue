<template>
	<div id="recharge">
		<el-form :model="form" ref="form" label-width="100px">
			<el-form-item label="金额(元)" prop="amount" :rules="[
      { required: true, message: '金额不能为空'},	  
      { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入正确的金额' },
      { max:6, message: '金额过大'},
    ]">
				<el-input type="amount" v-model="form.amount" autocomplete="off" style="max-width: 300px;"></el-input>
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
				amount: null
			}
		};
	},
	methods: {
		submitForm(formName, amount) {
			var that = this;
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (that.form.amount != 0) {

						that.$store.state.pay.amount = amount;
						that.$router.push({
							path: 'pay'
						})
					} else {
						that.$message({
							type: 'error',
							message: '金额不能为0！'
						});
					}
				} else {
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