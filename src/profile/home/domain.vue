<template>
  <div id="template">
    <el-table
      :data="list"
      stripe
      style="width: 100%"
    >
      <el-table-column
        prop="domain"
        label="域名"
        width="260"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="creatime"
        label="开始时间"
        width="200"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="到期时间"
        min-width="160"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span class="capacity">{{scope.row.expires}}</span>
          <span class="remainDays">剩余{{scope.row.remainDays}}天</span>
        </template>
      </el-table-column>
    </el-table>
    <br />
    <el-pagination
      background
      layout="total,prev, pager, next"
      :current-page.sync="page"
      :page-size="size"
      :total="total"
      @current-change="pageFn"
      v-if="total!=0"
    >
    </el-pagination>
    <br />
    <el-button
      type="primary"
      @click="jump_href('/permission','_blank')"
    >去购买</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bind: false,
      apiUrl: 'userdomain/page/',
      list: [],
      page: 0,
      size: 0,
      total: 0
    };
  },
  created() {
    if (this.$route.params.id) {
      this.bind = true;
      this.apiUrl = 'userdomain/unused/page/'
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
}
</style>