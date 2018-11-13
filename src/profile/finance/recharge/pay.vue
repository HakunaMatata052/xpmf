<template>
	<div id="pay" v-loading="loading">
		<p class="amount">您的充值金额是：<span>{{$store.state.pay.amount}}元</span></p>
		<hr />
		<p class="mode">请选择以下支付方式:</p>
		<el-row :gutter="20">
			<el-col :xs="24" :md="6">
				<div class="pay" @click="pay(10)"><img src="../../../assets/images/alipay.png" /></div>
			</el-col>
			<el-col :xs="24" :md="6">
				<div class="pay" @click="pay(20)"><img src="../../../assets/images/weixinpay.png" /></div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loading: false
			};
		},
		created() {
			if(this.$store.state.pay.amount.length == 0) {
				this.$router.push({
					path: '/finance/recharge'
				})
			}
		},
		mounted() {

		},
		methods: {
			pay(type) {
				var that = this;
				that.loading = true;
				that.post_json(that.$store.state.api + 'recharge/', {
					rechargeWay: type,
					amount: that.$store.state.pay.amount,
					attach:'recharge'
				}, function(data) {
					if(type == 20) {
						that.$alert('<iframe style="width:100%;height:200px;margin:auto" scrolling="no" src="'+that.$store.state.wxpay+'/example/NativePayPage.aspx?no=' + data.no + '&price=' + data.price + '&description=' + data.description + '&attach=recharge" frameborder="0"></iframe>', '扫码支付', {
							dangerouslyUseHTMLString: true,
							callback: function() {
								that.$router.push({
									path: '/finance/record'
								})
								that.loading = false;
							}
						});
					}
				})
			}
		}
	}
</script>

<style scoped>
	.amount {
		font-size: 20px;
		margin-bottom: 20px;
	}
	
	.amount span {
		font-weight: bold;
		color: #f00;
	}
	
	.mode {
		font-size: 16px;
		padding: 10px 0;
		margin-bottom: 20px;
	}
	
	.pay {
		width: 190px;
		height: 62px;
		border: 1px solid #eee;
		cursor: pointer;
		margin-bottom: 10px;
	}
	
	hr {
		border-top: 1px solid #eee;
	}
</style>