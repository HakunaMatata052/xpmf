<template>
	<div id="caseapply">
		<el-card class="box-card" shadow="never">
			<div slot="header" class="clearfix">
				<span>案例申请</span>
			</div>
			<div class="info">
				<h4>为什么要加入新派魔方官网案例？</h4>
				<p>1、更多人点击，更多的展示机会，有利于SEO；
					<br> 2、新派魔方的用户遍及全国各地（甚至全球），且以中小企业为主，这其中一定包含着您的潜在客户！
				</p>
			</div>
			<el-table :data="list" stripe style="width: 100%" >
				<el-table-column prop="siteName" label="网站名称" width="250"  show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="userSiteBindDomains[0].domain" label="网站域名" width="350"  show-overflow-tooltip>
				</el-table-column>
				<el-table-column label="是否加入案例展示" width="150" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.showcaseStatus!=100">否</span>
						<span v-else-if="scope.row.showcaseStatus==100">是</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center"  show-overflow-tooltip>
					<template slot-scope="scope">
						<el-button size="mini" @click="putCase(scope.row.siteId)" type="success" v-if="scope.row.showcaseStatus==0">申请展示案例</el-button>
						<el-button size="mini" @click="putCase(scope.row.siteId)" type="primary" v-else-if="scope.row.showcaseStatus==10" disabled>审核中</el-button>
						<el-button size="mini" @click="putCase(scope.row.siteId)" type="warning" v-else-if="scope.row.showcaseStatus==20">已驳回，再次申请展示案例</el-button>
						<el-button size="mini" @click="putCase(scope.row.siteId)" type="success" v-else-if="scope.row.showcaseStatus==30" disabled>已通过</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="remark" label="备注">
				</el-table-column>
			</el-table>
			<br />
			<el-pagination background layout="total,prev, pager, next" :current-page.sync="page" :page-size="size" :total="total" @current-change="pageFn" v-if="total!=0">
			</el-pagination>
		</el-card>

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
		this.getList(1);
	},
	methods: {
		getList(val) {
			var that = this;
			that.get_json(that.$store.state.api + 'case/page/' + val, function (data) {
				that.list = data.data;
				that.page = data.page;
				that.size = data.size;
				that.total = data.total;
			})
		},
		putCase(val) {
			var that = this;
			that.put_json(that.$store.state.api + 'case/' + val + '/showcase', {}, function (data) {
				that.$message({
					type: 'success',
					message: '提交成功！'
				});
				that.getList(that.page);
			})
		},
		pageFn(val) {
			this.getList(val);
			this.gotop();
		}
	}
}
</script>

<style scoped>
.info h4 {
  font-size: 20px;
  color: #ee3231;
  margin-bottom: 10px;
}

.info p {
  line-height: 25px;
}
</style>