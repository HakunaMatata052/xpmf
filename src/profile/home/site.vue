<template>
	<div id="site">
		<!--<el-alert :closable="false" :title="'官方销售的西部数码主机系统会自动安装，无需手动一键安装；官方销售的阿里云主机购买请点击站点列表右侧的【网站安装】或【网站安装/迁移】进行自动安装。'" type="error">
		</el-alert>-->
		<div class="site-list" v-for="(item,index) in list" :key="item.id">
			<div class="site-list-left">
				<div class="site-img" @mouseover="changeActive(index)" @mouseout="siteImgShowId=null">
					<img src="" alt="">
					<transition name="el-zoom-in-bottom">
						<div v-show="index==siteImgShowId" class="transition-box">上传图片</div>
					</transition>
				</div>
				<div class="site-info">
					<h3>{{item.siteName}}</h3>
					<p><a :href="'http://'+item.domain" target="_blank">http://{{item.domain}}</a></p>
					<div class="btn-group">
						<el-button size="small" type="success" @click="bindDomainFn(item.siteId)">绑定域名</el-button>
						<el-button size="small" type="primary" @click="bindFn('template',item.siteId)">选择模板</el-button>
						<el-button size="small" @click="bindFn('business',item.siteId)">绑定授权</el-button>
						<el-button size="small" @click="bindFn('host',item.siteId)">绑定空间</el-button>
						<el-button size="small" @click="bindFn('wuyou',item.siteId)">绑定无忧</el-button>
						<el-button size="small" @click="bindFn('service',item.siteId)">绑定服务</el-button>
					</div>
				</div>
			</div>
			<div class="site-list-right">
				<div class="btn-group">
					<el-button size="small" @click="jump_router('/process')">工单</el-button>
					<el-button size="small" @click="ftpFn(item.siteId)">FTP</el-button>
					<el-button size="small" type="danger" @click="delSiteFn(item.siteId)">删除</el-button>
				</div>
			</div>
		</div>
		<br />
		<el-pagination background layout="prev, pager, next" :current-page.sync="page" :page-size="size" :total="total" @current-change="pageFn" v-if="total!=0">
		</el-pagination>
		<br>
		<el-container>
			<el-button type="danger" @click="createSiteFn">新建站点</el-button>
		</el-container>

		<el-dialog title="新建站点" :visible.sync="dialogcreatesite">
			<el-form :model="createSiteForm" :rules="createSiteRules" ref="createSiteForm" label-width="100px">
				<el-form-item label="站点名称" prop="siteName">
					<el-input v-model="createSiteForm.siteName"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitCreateSite('createSiteForm')">立即创建</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

		<el-dialog title="绑定" :visible.sync="$store.state.dialogbind" @closed="closeddialogbind">
			<router-view></router-view>
		</el-dialog>

		<el-dialog title="绑定域名" :visible.sync="dialogBindDomain">
			<el-form :model="bindDomainForm">
				<el-row :gutter="20">
					<el-col :span="21">
						<el-input placeholder="请输入域名" v-model="bindDomainForm.domain">
							<template slot="prepend">Http://</template>
						</el-input>
					</el-col>
					<el-col :span="3">
						<el-button type="success" icon="el-icon-check" style="width: 100%;" @click="bind"></el-button>
					</el-col>
				</el-row>
			</el-form>
			<el-table :data="domainlist" stripe style="width: 100%">
				<el-table-column prop="id" label="ID" width="50">
				</el-table-column>

				<el-table-column prop="domain" label="域名">
				</el-table-column>

				<el-table-column prop="creatime" label="绑定时间">
				</el-table-column>

				<el-table-column label="操作" width="50">
					<template slot-scope="scope">
						<el-button type="danger" icon="el-icon-delete" @click="delBindDomain(scope.row.id)" circle></el-button>
					</template>
				</el-table-column>

			</el-table>
		</el-dialog>

		<el-dialog title="FTP信息" :visible.sync="dialogFtp">
			<el-form label-position="left" inline class="table-expand">
				<el-form-item label="网站名称">
					<span>{{ftplist.spaceName}}</span>
				</el-form-item>
				<el-form-item label="空间大小">
					<span>{{ftplist.capacity}}</span>
				</el-form-item>
				<el-form-item label="绑定域名">
					<span>{{ftplist.ftpAddress}}</span>
				</el-form-item>
				<el-form-item label="FTPIP">
					<span>{{ftplist.id}}</span>
				</el-form-item>
				<el-form-item label="FTP用户名">
					<span>{{ftplist.ftpAddress}}</span>
				</el-form-item>
				<el-form-item label="FTP密码">
					<span>{{ftplist.ftpAccount}}</span>
				</el-form-item>
				<el-form-item label="创建时间">
					<span>{{ftplist.creatime}}</span>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFtp = false">取 消</el-button>
				<el-button type="primary" @click="dialogFtp = false">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
export default {
	data() {
		return {
			list: [],
			siteImgShowId:null,
			domainlist: [],
			ftplist: {},
			dialogBindDomain: false,
			dialogFtp: false,
			bindDomainForm: {
				id: '',
				domain: ''
			},
			bindDomainList: [],
			page: 0,
			size: 0,
			total: 0,
			dialogcreatesite: false,
			createSiteForm: {},
			createSiteRules: {
				siteName: [{
					required: true,
					message: '请输入站点名称',
					trigger: 'blur'
				},
				{
					min: 3,
					max: 5,
					message: '长度在 3 到 5 个字符',
					trigger: 'blur'
				}
				]
			},
		}
	},
	methods: {
		getList(val) {
			var that = this;
			that.get_json(that.$store.state.api + 'usersite/page/' + val, function (data) {
				that.list = data.data;
				that.page = data.page;
				that.size = data.size;
				that.total = data.total;
			})
		},
		ftpFn(id) {
			var that = this;
			that.get_json(that.$store.state.api + 'usersite/' + id + '/ftp', function (data) {
				that.ftplist = data;
				that.dialogFtp = true;
			})
		},
		bindDomainFn(id) {
			var that = this;
			that.get_json(that.$store.state.api + 'usersite/' + id + '/domains', function (data) {
				that.domainlist = data;
				that.bindDomainForm.id = id;
				that.dialogBindDomain = true;
			})
		},
		bind() {
			var that = this;
			that.post_json(that.$store.state.api + 'UserSite/bind/domain', that.bindDomainForm, function (data) {
				that.$message({
					type: 'success',
					message: '绑定成功！'
				});
				that.bindDomainFn(that.bindDomainForm.id)

			})
		},
		delBindDomain(id) {
			var that = this;
			that.del_json(that.$store.state.api + 'UserSite/domain/' + id, function (data) {
				that.$message({
					type: 'success',
					message: '删除成功！'
				});
				that.bindDomainFn(that.bindDomainForm.id)

			})
		},
		delSiteFn(id) {
			var that = this;
			that.del_json(that.$store.state.api + 'usersite/' + id, function (data) {
				that.$message({
					type: 'success',
					message: '删除成功！'
				});
				that.getList(that.page)
			})
		},
		pageFn(val) {
			this.getList(val);
			this.gotop();
		},
		createSiteFn() {
			var that = this;
			that.dialogcreatesite = true;
		},
		submitCreateSite(formName) {
			var that = this;
			this.$refs[formName].validate((valid) => {
				if (valid) {
					that.post_json(that.$store.state.api + 'UserSite', that.createSiteForm, function (res) {
						that.$message({
							type: 'success',
							message: '创建成功！'
						});
						that.getList(that.page);
						that.dialogcreatesite = false;
					})
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		bindFn(type, id) {
			this.$store.state.dialogbind = true;
			this.$router.push({
				path: `/bind/${type}/${id}`,
			})
		},
		closeddialogbind() {
			this.$router.push({
				path: '/home/site',
			})
		},
		changeActive(index){
    		this.siteImgShowId = index;
			
			console.log(index)
			console.log(this.siteImgShowId)
		}
	},
	created() {
		this.getList(1)
	}
}
</script>
<style scoped>
.site-list {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}
.site-list-left {
  display: flex;
}
.site-list-left .site-img {
  width: 100px;
  height: 100px;
  background: url(../../assets/images/defaultHeader.png) no-repeat center center;
  margin-right: 20px;
  position: relative;
}
.transition-box {
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 20px;
	line-height: 20px;
	background: #000;
	color: #fff;
	text-align: center;
}
.site-list-left .site-info h3 {
  display: inline;
  font-size: 20px;
  margin-right: 20px;
}

.site-list-left .site-name small {
  color: #f00;
}

.site-list-left .btn-group {
  margin-top: 10px;
}

.site-list-right .btn-group {
  margin-top: 36px;
}
.toggle {
	display: block;
}
.table-expand {
  font-size: 0;
}

.table-expand label {
  width: 90px;
  color: #99a9bf;
}

.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>