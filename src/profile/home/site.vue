<template>
	<div id="site">
		<!--<el-alert :closable="false" :title="'官方销售的西部数码主机系统会自动安装，无需手动一键安装；官方销售的阿里云主机购买请点击站点列表右侧的【网站安装】或【网站安装/迁移】进行自动安装。'" type="error">
		</el-alert>-->
		<div class="site-list" v-for="(item,index) in list" :key="item.id">
			<div class="site-list-left">
				<div class="site-img" @mouseover="changeActive(index)" @mouseout="siteImgShowId=null" @click="setUploadId(index,item.siteId,item.siteName)">
					<el-upload :ref="index" class="site-img-uploads" name="upload" :action="$store.state.api+'UserSite/thumbnail'" :headers="headers" :show-file-list="false" :on-success="handleAvatarSuccess">
						<img :src="item.fullpathThumbnail||'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA+ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOC0xMS0wN1QwOTozOToyNyswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTgtMTEtMDdUMDk6Mzk6NTYrMDg6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTgtMTEtMDdUMDk6Mzk6NTYrMDg6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA4MTc0QkIxRTIyRTExRThCMzgwRDk5RDdEQjUzRENBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA4MTc0QkIyRTIyRTExRThCMzgwRDk5RDdEQjUzRENBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDgxNzRCQUZFMjJFMTFFOEIzODBEOTlEN0RCNTNEQ0EiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDgxNzRCQjBFMjJFMTFFOEIzODBEOTlEN0RCNTNEQ0EiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5uut5+AAAAEElEQVR42mL8//8/A0CAAQAJAQL/abyQ8AAAAABJRU5ErkJggg=='">
					</el-upload>
					<transition name="el-zoom-in-bottom">
						<div v-show="index==siteImgShowId" class="transition-box">上传图片</div>
					</transition>
				</div>
				<div class="site-info">
					<h3>{{item.siteName}}</h3>
					<p><a :href="'http://'+item.userSiteBindDomains[0].domain" target="_blank" v-if="item.userSiteBindDomains.length!=0">http://{{item.userSiteBindDomains[0].domain}}</a></p>
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
		<el-pagination background layout="total,prev, pager, next" :current-page.sync="page" :page-size="size" :total="total" @current-change="pageFn" v-if="total!=0">
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
			<div class="detail">
				<dl>
					<dt>空间大小</dt>
					<dd>{{ftplist.capacity}}</dd>
				</dl>
				<dl>
					<dt>FTP IP</dt>
					<dd>
						{{ftplist.ftpAddress}}
					</dd>
				</dl>
				<dl>
					<dt>FTP用户名</dt>
					<dd>{{ftplist.ftpAccount}}</dd>
				</dl>

				<dl>
					<dt>FTP密码</dt>
					<dd>{{ftplist.ftpPassword}}</dd>
				</dl>

				<dl>
					<dt>创建时间</dt>
					<dd>{{ftplist.creatime}}</dd>
				</dl>
			</div>
			<div slot="footer" class="dialog-footer">
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
			siteImgShowId: null,
			setUpload: {},
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
			headers: {},
		}
	},
	created() {
		this.getList(1)
		this.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
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
			if (that.bindDomainForm.domain.length == 0) {
				that.$message({
					type: 'error',
					message: '域名不能为空'
				});
			} else {
				that.post_json(that.$store.state.api + 'UserSite/bind/domain', that.bindDomainForm, function (data) {
					that.$message({
						type: 'success',
						message: '绑定成功！'
					});
					that.bindDomainFn(that.bindDomainForm.id)
				})
			}

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
		changeActive(index) {
			this.siteImgShowId = index;
		},
		handleAvatarSuccess(res, file) {
			var that = this;
			var file = file;
			that.put_json(that.$store.state.api + 'UserSite/' + that.setUpload.id, {
				thumbnail: res.fileName,
				name: that.setUpload.siteName
			}, function () {
				that.$set(that.list[that.setUpload.index], 'fullpathAvatar', URL.createObjectURL(file.raw))
			})

		},
		setUploadId(index, id, siteName) {
			this.setUpload.index = index;
			this.setUpload.id = id;
			this.setUpload.siteName = siteName;
		}
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
  border-radius: 5px;
  overflow: hidden;
}
.site-list-left .site-img img {
  width: 100px;
  height: 100px;
  border: 0;
}
.transition-box {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 20px;
  line-height: 20px;
  background: #ee3231;
  color: #fff;
  text-align: center;
}
.site-list-left .site-info h3 {
  display: inline;
  font-size: 20px;
  margin-right: 20px;
}
.site-list-left .site-info p {
  height: 28px;
  line-height: 28px;
}
.site-img-uploads input {
  width: 100%;
  height: 100%;
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

.detail {
  padding: 20px 0;
  display: flex;
  flex-wrap: wrap;
}

.detail dl {
  display: flex;
  width: 50%;
  padding: 10px 30px 10px 0;
  border-bottom: 1px solid #ccc;
  align-items: center;
}

.detail dt {
  color: #a6a6a6;
  width: 130px;
}
</style>