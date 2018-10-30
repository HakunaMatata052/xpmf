<template>
	<div id="template">
		<el-row :gutter="20">
					<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" v-for="item in list" :key="item.id">
						<div class="template-list">
							<div class="img">
								<img src="../../assets/images/hamburger.png" alt="" />
							</div>
							<div class="info">

								<div class="del">
									<el-button icon="el-icon-delete" circle></el-button>
								</div>
								<h3>{{item.templateName}}</h3>
								<p>编号 : {{item.templateId}}</p>
								<div class="btn-group">
									<el-button size="mini"  type="danger">立即购买</el-button>
									<el-button size="mini"  type="primary" @click="jump_href('http://'+item.showcase,'_blank')">网站演示</el-button>
									<el-button size="mini"  type="success">查看案例</el-button>
								</div>
							</div>
							<div class="btn-group"></div>
						</div>
					</el-col>
				</el-row>
				<br>
				<el-pagination background layout="prev, pager, next" :current-page.sync="page" :page-size="size" :total="total" @current-change="pageFn">
				</el-pagination>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				page: 0,
				size: 0,
				total: 0
			};
		},
		created() {
			this.getList(1)
		},
		methods: {
			getList(val) {
				var that = this;
				that.get_json(that.$store.state.api + 'usertemplate/page/' + val, function(data) {
					that.list = data.data;
					that.page = data.page;
					that.size = data.size;
					that.total = data.total;
				})
			},
			pageFn(val) {
				this.getList(val)
			}
		}
	}
</script>

<style scoped>
	.template-list {
		background: #fff;
		border-radius: 5px;
		-webkit-transition: all .3s ease-out;
		transition: all .3s ease-out;
		overflow: hidden;
		position: relative;
	}
	
	.template-list:hover {
		box-shadow: 0 0 15px rgba(0, 0, 0, .3);
		-webkit-transform: translate(-5px, -5px);
		transform: translate(-5px, -5px);
	}
	
	.template-list .img {
		width: 100%;
		height: 0;
		padding-top: 60%;
		overflow: hidden;
		position: relative;
	}
	
	.template-list .img img {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: auto;
	}
	
	.template-list .info {
		padding: 20px;
		background: #fbfbfb;
	}
	
	.template-list .info p {
		margin: 10px 0;
		line-height: 25px;
		color: #999;
	}
	
	.template-list .info h3 {
		margin: 0;
		font-size: 20px;
	}
	
	.template-list .btn-group {
		display: flex;
		justify-content: space-between;
		flex-wrap:wrap;
	}
	.template-list .btn-group button {

		flex-grow:1;
		margin: 0 5px 5px;
	}
	.template-list .del {
		float: right;
		display: none;
	}
	
	.template-list:hover .del {
		display: block;
	}
</style>