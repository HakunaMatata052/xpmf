<template>
	<div id="template">
		<el-row :gutter="20">
			<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" v-for="item in list" :key="item.id">
				<div class="template-list">
					<div class="img">
						<img :src="item.template.fullpathThumbnail" alt="" />
					</div>
					<div class="info">

						<div class="del">
							<el-button icon="el-icon-delete" circle></el-button>
						</div>
						<h3>{{item.template.name}}</h3>
						<p>编号 : {{item.template.code}}</p>
						<div class="btn-group" v-if="bind">
							<el-button size="small" type="success" @click="bindFn(item.id)" v-if="!item.currentUsed">绑定</el-button>
							<el-tag type="success" v-else>已绑定</el-tag>
						</div>
					</div>
					<div class="btn-group"></div>
				</div>
			</el-col>
		</el-row>
		<br>
		<el-pagination background layout="total,prev, pager, next" :current-page.sync="page" :page-size="size" :total="total" @current-change="pageFn" v-if="total!=0">
		</el-pagination>
		<br />
		<el-button type="primary" @click="jump_href('/template','_blank')">去购买</el-button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			bind: false,
			apiUrl: 'usertemplate/page/',
			list: [],
			page: 0,
			size: 0,
			total: 0
		};
	},
	created() {
		if (this.$route.params.id) {
			this.bind = true;
			this.apiUrl = 'UserTemplate/unused/site/'+this.$route.params.id+'/page/'
		}
		this.getList(1);
	},
	methods: {
		getList(val) {
			var that = this;
			that.get_json(that.$store.state.api + that.apiUrl + val, function (data) {
				that.list = data.data;
				that.page = data.page;
				that.size = data.size;
				that.total = data.total;
			});

		},
		pageFn(val) {
			this.getList(val);
			this.gotop();
		},
		bindFn(id) {
			var that = this;
			that.post_json(that.$store.state.api + 'UserSite/bind/template', {
				UserSiteId: that.$route.params.id,
				UserTemplateId: id
			}, function (data) {
				that.$message({
					type: 'success',
					message: '绑定成功！'
				});
				that.$store.state.dialogbind = false;
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