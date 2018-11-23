<template>
	<div class="tabs">
		<el-tabs v-model="path" @tab-click="handleClick">
			<el-tab-pane label="全部" name="100"></el-tab-pane>
			<el-tab-pane label="未完成" name="10"></el-tab-pane>
			<el-tab-pane label="已完成" name="80"></el-tab-pane>
		</el-tabs>
		<div class="tab-content">
			<el-table :data="list" stripe style="width: 100%">
				<el-table-column prop="orderNo" label="订单编号" width="190px" :key="Math.random()" show-overflow-tooltip>
				</el-table-column>
				<el-table-column label="订单明细" :key="Math.random()" show-overflow-tooltip>
					<template slot-scope="scope">
						<p v-for="item in scope.row.orderDetails" :key="item.id">
							{{item.targetTypeString}}：{{item.goodsName}}
						</p>
					</template>
				</el-table-column>
				<el-table-column prop="user.username" width="150px" label="用户名" :key="Math.random()" show-overflow-tooltip>
				</el-table-column>
				<el-table-column label="金额" width="120px" :key="Math.random()" show-overflow-tooltip>
					<template slot-scope="scope">
						{{scope.row.price}}元
					</template>
				</el-table-column>
				<el-table-column prop="creatime" label="提交时间" width="200px" :key="Math.random()" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="statusString" label="状态" width="120px" :key="Math.random()" show-overflow-tooltip>
					<template slot-scope="scope">
						<el-tag type="danger" v-if="scope.row.status==10">{{scope.row.statusString}}</el-tag>
						<el-tag v-else>{{scope.row.statusString}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="180px">
					<template slot-scope="scope">
						<el-button type="primary" size="small" @click="openOrder(scope.row)">查看详情</el-button>
					</template>
				</el-table-column>
			</el-table>
			<br v-if="total!=0" />
			<el-pagination background layout="total,prev, pager, next" :current-page.sync="page" :page-size="size" :total="total" @current-change="pageFn" v-if="total!=0">
			</el-pagination>
		</div>
		<el-dialog title="订单详情" :visible.sync="dialogOrder">

			<h3><strong>订单信息</strong></h3>
			<div class="detail">
				<dl>
					<dt>订单编号</dt>
					<dd>
						{{orderInfo.orderNo}}
					</dd>
				</dl>
				<dl>
					<dt>创建日期</dt>
					<dd>
						{{orderInfo.creatime}}
					</dd>
				</dl>
				<dl>
					<dt>订单状态</dt>
					<dd>
						<el-tag type="danger" v-if="orderInfo.status==10">{{orderInfo.statusString}}</el-tag>
						<el-tag v-else>{{orderInfo.statusString}}</el-tag>
					</dd>
				</dl>
				<dl>
					<dt>订单金额</dt>
					<dd>
						{{orderInfo.price}}元
					</dd>
				</dl>
			</div>
			
			<h3><strong>会员信息</strong></h3>
						<div class="detail">
				<dl>
					<dt>用户名</dt>
					<dd>{{orderInfo.user.username}}</dd>
				</dl>
				<dl>
					<dt>联系人</dt>
					<dd>{{orderInfo.user.name}}</dd>
				</dl>

				<dl>
					<dt>角色</dt>
					<dd>{{orderInfo.user.role}}</dd>
				</dl>
				<dl>
					<dt>手机号码</dt>
					<dd>{{orderInfo.user.cellphone}}</dd>
				</dl>
			</div>
			<h3><strong>商品信息</strong></h3>
			<el-table :data="orderInfo.orderDetails" stripe style="width: 100%">
				<el-table-column prop="targetTypeString" label="商品类型" width="180">
				</el-table-column>
				<el-table-column prop="goodsName" label="商品名称">
				</el-table-column>
				<el-table-column prop="year" label="年限" width="100" show-overflow-tooltip>
					<template slot-scope="scope">
						<el-tag v-if="orderInfo.statusString==0">永久</el-tag>
						<el-tag v-else>{{orderInfo.statusString}}</el-tag>
					</template> 
				</el-table-column>
			</el-table>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogOrder = false">确 定</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
export default {
	data() {
		return {
			list: [],
			path: '100',
			page: 0,
			size: 0,
			total: 0,
			orderInfo: {
				user:{},
				orderDetails: [],
			},
			dialogOrder: false
		};
	},
	created() {
		this.getList(100, 1);
	},
	methods: {
		getList(type, val) {
			var that = this;
			that.get_json(that.$store.state.api + 'admin/Order/status/' + type + '/page/' + val, function (data) {
				that.list = data.data;
				that.page = data.page;
				that.size = data.size;
				that.total = data.total;
			})
		},
		pageFn(val) {
			this.getList(this.path, val);
			this.gotop();
		},
		handleClick(tab, event) {
			this.path = tab.name;
			this.getList(tab.name, 1)
		},
		openOrder(val) {
			this.dialogOrder = true;
			this.orderInfo = val;
			console.log(val)
		}
	}
}
</script>

<style>
.tabs {
  background-color: #fff;
  border-radius: 3px;
  -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.tabs .el-tabs__item {
  height: 61px;
  line-height: 61px;
  width: 120px;
  text-align: center;
  font-size: 16px;
}

.tabs .el-tabs__nav-next,
.tabs .el-tabs__nav-prev {
  line-height: 70px;
  padding: 0 10px;
}

.tabs .el-tabs__nav-wrap::after {
  height: 1px;
  background: #eee;
}

.tabs .el-tabs__header {
  margin-bottom: 0;
}

.tabs .tab-content {
  padding: 20px;
}

.detail {
  padding:0 0 20px;
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