<template>
	<div id="template">
		<el-table :data="list" stripe style="width: 100%">
			<el-table-column prop="domain" label="绑定域名" width="260" show-overflow-tooltip>
				<template slot-scope="scope">
					<span v-if="scope.row.domain.length==0">暂未授权</span>
					{{scope.row.domain}}
				</template>
			</el-table-column>
			<el-table-column prop="authorizeDate" label="购买时间" width="200" show-overflow-tooltip>
			</el-table-column>
			<el-table-column label="操作" min-width="100">
				<template slot-scope="scope">
					<el-button size="small" @click="dialogBind(scope.row.id)" type="success" v-if="!scope.row.currentUsed">绑定</el-button>
					<el-tag type="success" v-else>已绑定</el-tag>
				</template>
			</el-table-column>
		</el-table>
		<br  v-if="total!=0"/>
		<el-pagination background layout="total,prev, pager, next" :current-page.sync="page" :page-size="size" :total="total" @current-change="pageFn" v-if="total!=0">
		</el-pagination>
		<br />
		<el-button type="primary" @click="jump_href('/permission','_blank')">去购买</el-button>
		<el-dialog title="绑定域名" :visible.sync="dialogBindDomain">
			<el-alert title="授权只能绑定一次，请谨慎使用！" type="warning" show-icon>
			</el-alert>
			<br />
			<el-row :gutter="20">
				<el-col :span="21">
					<el-input placeholder="请输入域名" v-model="domainForm.domain">
						<template slot="prepend">Http://</template>
					</el-input>
				</el-col>
				<el-col :span="3">
					<el-button type="success" icon="el-icon-check" style="width: 100%;" @click="bindDomainFn"></el-button>
				</el-col>
			</el-row>
		</el-dialog>

	</div>
</template>

<script>
export default {
	data() {
		return {
			bind: false,
			apiUrl: 'UserPermission/page/',
			list: [],
			page: 0,
			size: 0,
			total: 0,
			dialogBindDomain: false,
			domainForm: {
				domain: '',
				id: {}
			}
		};
	},
	created() {
		if (this.$route.params.id) {
			this.bind = true;
			this.apiUrl = 'UserPermission/unused/site/'+this.$route.params.id+'/page/'
		}
		this.getList(1)
	},
	methods: {
		getList(val) {
			var that = this;
			that.get_json(that.$store.state.api + that.apiUrl + val, function (data) {
				that.list = data.data;
				that.page = data.page;
				that.size = data.size;
				that.total = data.total;
			})
		},
		pageFn(val) {
			this.getList(val);
			this.gotop();
		},
		dialogBind(id) {
			this.dialogBindDomain = true;
			this.domainForm.id = id;
		},
		bindDomainFn() {
			var that = this;
			that.put_json(that.$store.state.api + 'UserPermission/' + that.domainForm.id + '/bind/' + that.domainForm.domain, {}, function (data) {
				that.$message({
					type: 'success',
					message: '绑定成功！'
				});
				that.getList(that.page);
				that.dialogBindDomain = false;
			})
		}
	}
}
</script>

<style scoped>
#template .remainDays {
  background: #ee3231;
  color: #fff;
  padding: 2px 15px;
  border-radius: 30px;
  display: inline-block;
  margin-left: 10px;
}
</style>