<template>
	<div id="template">

		<el-card class="box-card" shadow="never">
			<div slot="header" class="clearfix">
				<span>模板收藏夹</span>
			</div>
			<el-row :gutter="20">
				<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" v-for="item in TemplateList" :key="item.id">
					<div class="template-list">
						<div class="img">
							<img :src="item.template.fullpathThumbnail" alt="" />
						</div>
						<div class="info">
							<div class="del">
								<el-button icon="el-icon-delete" circle @click="del(item.id)"></el-button>
							</div>
							<h3>{{item.templateName}}</h3>
							<p>编号 : {{item.template.code}}</p>
							<div class="btn-group">
								<el-button size="mini" type="danger" @click="jump_href('/order/preview/'+item.template.id,'_blank')">立即购买</el-button>
								<el-button size="mini" type="primary" @click="jump_href(item.template.showcase,'_blank')">网站演示</el-button>
								<el-button size="mini" type="success" @click="jump_href('/case/template/'+item.template.id,'_blank')">查看案例</el-button>
							</div>
						</div>
					</div>
				</el-col>
			</el-row>
			<br v-if="total!=0">
			<el-pagination background layout="total,prev, pager, next" :current-page.sync="page" :page-size="size" :total="total" @current-change="pageFn" v-if="total!=0">
			</el-pagination>
			<br />
			<el-button type="primary" @click="jump_href('/template','_blank')">去看看</el-button>
		</el-card>

	</div>
</template>

<script>
export default {
	data() {
		return {
			TemplateList: [],
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
			that.get_json(that.$store.state.api + 'templatecollection/page/' + val, function (data) {
				that.TemplateList = data.data;
				that.page = data.page;
				that.size = data.size;
				that.total = data.total;
			})
		},
		pageFn(val) {
			this.getList(val);
			this.gotop();
		},
		del(id) {
			var that = this;
			that.del_json(that.$store.state.api + 'templatecollection/' + id, function (data) {
				that.getList(that.page)
			})
		}
	}
}
</script>

<style scoped>
.template-list {
  background: #fff;
  border-radius: 5px;
  -webkit-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;
}

.template-list:hover {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
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
  flex-wrap: wrap;
}

.template-list .btn-group button {
  flex-grow: 1;
}

.template-list .del {
  float: right;
  display: none;
}

.template-list:hover .del {
  display: block;
}
</style>