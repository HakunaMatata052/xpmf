<template>
	<div id="site">
		<!--<el-alert :closable="false" :title="'官方销售的西部数码主机系统会自动安装，无需手动一键安装；官方销售的阿里云主机购买请点击站点列表右侧的【网站安装】或【网站安装/迁移】进行自动安装。'" type="error">
		</el-alert>-->
		<div class="site-list" v-for="item in list" :key="item.id">
			<div class="site-list-left">
				<div class="site-name">
					<h3>{{item.siteName}}</h3>
				</div>
				<div class="btn-group">
					<el-button size="small" type="primary" @click="jump_href('http://'+item.domain,'_blank')">访问网站</el-button>
					<el-button size="small" type="success" @click="bindDomainFn(item.siteId)">绑定域名</el-button>
					<el-button size="small" type="success" @click="bindFn('template',item.siteId)">选择模板</el-button>
					<el-button size="small" type="success" @click="bindFn('business',item.siteId)">授权</el-button>
					<el-button size="small" type="success" @click="bindFn('host',item.siteId)">空间</el-button>
					<el-button size="small" type="success" @click="bindFn('wuyou',item.siteId)">无忧</el-button>
					<el-button size="small" type="success" @click="bindFn('service',item.siteId)">服务</el-button>
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
		<el-pagination background layout="prev, pager, next" :current-page.sync="page" :page-size="size" :total="total" @current-change="pageFn">
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
		
		
		<el-dialog title="新建站点" :visible.sync="dialogbind" @closed="closeddialogbind">
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
						<el-button type="danger" icon="el-icon-delete" circle></el-button>
					</template>
				</el-table-column>

			</el-table>
		</el-dialog>

		<el-dialog title="FTP信息" :visible.sync="dialogFtp">
			<el-form label-position="left" inline class="table-expand">
				<el-form-item :label="key" v-for="(value, key)  in ftplist" :key="key">
					<span>{{value}}</span>
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
				dialogbind:false,
			}
		},
		methods: {
			getList(val) {
				var that = this;
				that.get_json(that.$store.state.api + 'usersite/page/' + val, function(data) {
					that.list = data.data;
					that.page = data.page;
					that.size = data.size;
					that.total = data.total;
				})
			},
			ftpFn(id) {
				var that = this;
				that.get_json(that.$store.state.api + 'usersite/' + id + '/ftp', function(data) {
					that.ftplist = data;
					that.dialogFtp = true;
				})
			},
			bindDomainFn(id) {
				var that = this;
				that.get_json(that.$store.state.api + 'usersite/' + id + '/domains', function(data) {
					that.domainlist = data;
					that.bindDomainForm.id = id;
					that.dialogBindDomain = true;
				})
			},
			bind() {
				var that = this;
				that.post_json(that.$store.state.api + 'UserSite/bind/domain', that.bindDomainForm, function(data) {
					that.$message({
						type: 'success',
						message: '绑定成功！'
					});
					that.bindDomainFn(that.bindDomainForm.id)

				})
			},
			delSiteFn(id) {
				var that = this;
				that.del_json(that.$store.state.api + 'usersite/' + id, function(data) {
					that.$message({
						type: 'success',
						message: '删除成功！'
					});
					that.getList(that.page)
				})
			},
			pageFn(val) {
				this.getList(val)
			},
			createSiteFn() {
				var that = this;
				that.dialogcreatesite = true;
			},
			submitCreateSite(formName) {
				var that = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						that.post_json(that.$store.state.api + 'UserSite', that.createSiteForm, function(res) {
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
			bindFn(type,id){
				this.dialogbind=true;
				this.$router.push({
		          path: `/bind/${type}/${id}`,
		       })
			},
			closeddialogbind(){
				this.$router.push({
		          path: '/home/site',
		       })
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
		padding: 30px 0;
		border-bottom: 1px solid #eee;
	}
	
	.site-list-left {}
	
	.site-list-left .site-name {}
	
	.site-list-left .site-name h3 {
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