<template>
	<div id="content">
		<el-card class="box-card" shadow="never">
			<div slot="header" class="clearfix">
				<span>访问统计</span>
				<el-input placeholder="请输入搜索的域名" v-model="search" style="float:right;max-width:500px;margin-left: 30px;"  @keyup.enter.native="searchFn">
					<el-button slot="append" icon="el-icon-search" @click="searchFn"></el-button>
				</el-input>
			</div>
			<el-table :data="list" stripe style="width: 100%" v-loading="loading">
				<el-table-column prop="domain" label="域名" max-width="150">
				</el-table-column>
				<el-table-column prop="count" label="访问次数" v-if="!searchtrue" width="80">
				</el-table-column>
                
				<el-table-column prop="agent" label="浏览器" v-if="searchtrue">
				</el-table-column>
                
				<el-table-column prop="creatime" label="访问时间" v-if="searchtrue" width="180">
				</el-table-column>
                
				<el-table-column prop="ip" label="IP" v-if="searchtrue" width="150">
				</el-table-column>

			</el-table>
			<br>
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
			total: 0,
			search: '',
            loading: true,
            searchtrue:false
		};
	},
	created() {
		this.getList(this.role, 1);
	},
	methods: {
		getList(role, val) {
			var that = this;
			that.get_json(that.$store.state.api + 'admin/other/clientlog/page/' + val, function (data) {
				that.list = data.data;
				that.page = data.page;
				that.size = data.size;
				that.total = data.total;
				that.loading = false;
			})
		},
		pageFn(val) {
			this.getList(this.role, val);
			this.gotop();
		},
		searchFn() {
			var that = this;
			that.loading = true;
			that.get_json(that.$store.state.api + 'admin/other/clientlog/search/domain/'+that.search+'/page/1', function (data) {
                that.searchtrue = true;
				that.list = data.data;
				that.page = data.page;
				that.size = data.size;
				that.total = data.total;
				that.loading = false;
			})
		}
	}
}
</script>

<style scoped>
</style>