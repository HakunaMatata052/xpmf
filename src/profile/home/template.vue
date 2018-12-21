<template>
  <div id="template">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" v-for="item in list" :key="item.id">
        <div class="template-list">
          <div class="img">
            <img :src="item.template.fullpathThumbnail" alt>
          </div>
          <div class="info">
            <h3>{{item.template.name}}</h3>
            <p>
              <span>编号 : {{item.template.code}}</span>
            </p>
            <p>所属网站：
              <el-tag v-if="item.userSite!=null" class="tag">{{item.userSite.siteName}}</el-tag>
            </p>
            <div class="btn-group" v-if="bind">
              <el-tag type="success" v-if="item.currentUsed">已绑定</el-tag>
            </div>

            <div class="btn-group" v-else>
              <el-button
                size="mini"
                type="primary"
                @click="jump_href(item.case.domain,'_blank')"
              >网站演示</el-button>
              <el-button
                size="mini"
                type="success"
                @click="jump_href('/case/template/'+item.template.id,'_blank')"
              >查看案例</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <br>
    <el-pagination
      background
      layout="total,prev, pager, next"
      :current-page.sync="page"
      :page-size="size"
      :total="total"
      @current-change="pageFn"
      v-if="total!=0"
    ></el-pagination>
    <br>
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
      this.apiUrl = 'usertemplate/' + this.$route.params.id
    }
    this.getList(1);
  },
  methods: {
    getList(val) {
      var that = this;
      if (that.$route.params.id) {
        val = ''
      }
      that.get_json(that.$store.state.api + that.apiUrl + val, function (res) {
        if (that.$route.params.id) {
          var list = [];
          var data = {};
          data.template = res;
          list.push(data)
          that.list = list;
          console.log(that.list)
        } else {
          that.list = res.data;
          that.page = res.page;
          that.size = res.size;
          that.total = res.total;
        }

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
  height: 25px;
  color: #999;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.template-list .info .tag {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 220px;
}
.template-list .info h3 {
  margin: 0;
  font-size: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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