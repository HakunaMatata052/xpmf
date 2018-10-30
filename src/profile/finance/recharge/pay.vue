<template>
	<div id="pay">
		<p class="amount">您的充值金额是：<span>{{amount}}元</span></p>
		<hr /> 
		<p class="mode">请选择以下支付方式:</p>
		<el-row :gutter="20">
			<el-col :span="12">
				<a href="" target="_blank"><img src="../../../assets/images/alipay.png"/></a>
			</el-col>
			<el-col :span="12">				
				<a href="" target="_blank"><img src="../../../assets/images/weixinpay.png"/></a>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				amount: ''
			};
		},
		created() {
			this.amount = this.$route.params.id;
		},
		mounted() {

		},
		methods: {

		}
	}
</script>

<style scoped>
	.amount {
		font-size: 20px;
		margin-bottom: 20px;
	}
	.amount span{
		font-weight: bold;
		color: #f00;
	}
	.mode {
		font-size: 16px;
		padding: 10px 0;
		margin-bottom: 20px;
	}
	img {
		border: 1px solid #eee;
	}
	hr{
		border-top:1px solid #eee;
	}
</style>