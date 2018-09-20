<template>
	<div id="site">
		<el-alert :closable="false" :title="'官方销售的西部数码主机系统会自动安装，无需手动一键安装；官方销售的阿里云主机购买请点击站点列表右侧的【网站安装】或【网站安装/迁移】进行自动安装。'" type="error">
		</el-alert>
		<br>

		<el-table :data="sitelist" stripe expand-change="asd()" style="width: 100%">
			<el-table-column prop="siteName" label="网站名称" width="180">
			</el-table-column>
			<el-table-column prop="expires" label="有效期">
			</el-table-column>
			<el-table-column label="FTP">
				<template slot-scope="scope">
					<el-button size="mini" type="primary" @click="ftpFn(scope.row.siteId)">FTP</el-button>
				</template>
			</el-table-column>

			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" icon="el-icon-search" type="success" @click="jump_href('/login')">访问网站</el-button>
					<el-button size="mini" icon="el-icon-search" type="warning" @click="bindDomainFn(scope.row.siteId)">绑定域名</el-button>
				</template>
			</el-table-column>

		</el-table>
		<br>
		<el-container>
			<el-button type="danger">一键安装（官方购买主机无需一键安装）</el-button>
			<el-button type="primary">去开通试用</el-button>
		</el-container>
		<el-dialog title="绑定域名" :visible.sync="dialogBindDomain">
			<el-form :model="bindDomainForm">
				<el-row :gutter="20">
					<el-col :span="21">
						<el-input placeholder="请输入域名" v-model="bindDomainForm.bindDomain">
							<template slot="prepend">Http://</template>
						</el-input>
					</el-col>
					<el-col :span="3">
						<el-button type="success" icon="el-icon-check" style="width: 100%;"></el-button>
					</el-col>
				</el-row>
			</el-form>
			<el-table :data="sitelist" stripe expand-change="asd()" style="width: 100%">
				<el-table-column prop="domain" label="网站域名">
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
				<el-form-item label="商品名称">
					<span>阿斯达四大</span>
				</el-form-item>
				<el-form-item label="所属店铺">
					<span>阿斯达四大</span>
				</el-form-item>
				<el-form-item label="商品 ID">
					<span>阿是大师大师的</span>
				</el-form-item>
				<el-form-item label="店铺 ID">
					<span>阿萨德撒的</span>
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
				sitelist: [],
				ftplist: {},
				dialogBindDomain: false,
				dialogFtp: false,
				bindDomainForm: {
					bindDomain: ''
				},
				bindDomainList: []
			}
		},
		methods: {
			asd() {
				var that = this;
				that.ajax_json(that.$store.state.site, {
					name: '123'
				}, function(data) {
					that.data = data.data;
				})
			},
			ftpFn(id) {
				var that = this;
				that.ajax_json(that.$store.state.site, {
					id: id
				}, function(data) {
					that.data = data.data;

					that.dialogFtp = true;
				})
			},
			bindDomainFn(id) {
				var that = this;
				that.ajax_json(that.$store.state.site, {
					id: id
				}, function(data) {
					that.data = data.data;
					that.dialogBindDomain = true;
				})
			}
		},
		created() {
			var that = this;
			that.ajax_json(that.$store.state.site, {
				name: '123'
			}, function(data) {
				console.log(data)
				that.sitelist = data.data;
			})

		}
	}
</script>
<style>
	.sitename {
		font-size: 24px;
	}
	
	.sitename small {
		font-size: 14px;
		color: #f00;
	}
	
	.sitename i {
		font-size: 14px;
	}
	
	.sitename i:hover {
		color: #f00;
		cursor: pointer;
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