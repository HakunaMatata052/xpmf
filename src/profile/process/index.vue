<template>
  <div
    class="tabs"
    id="workorder"
  >
    <el-tabs
      v-model="path"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="全部"
        name="100"
      ></el-tab-pane>
      <el-tab-pane
        label="待我处理"
        name="10"
      >
        <span slot="label">待我处理</span>
      </el-tab-pane>
      <el-tab-pane
        label="未受理"
        name="20"
      ></el-tab-pane>
      <el-tab-pane
        label="处理中"
        name="30"
      ></el-tab-pane>
      <el-tab-pane
        label="已完成"
        name="50"
      ></el-tab-pane>
    </el-tabs>
    <div class="tab-content">
      <el-alert
        title="现在是上班时间，增值技术支持服务工单响应时间为30分钟，执行人为开发、前端部门以及分类为售后投诉的工单处理时间一般为2-3个工作日，谢谢理解！"
        type="warning"
      ></el-alert>
      <el-table
        :data="list"
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="title"
          label="工单标题"
        ></el-table-column>
        <el-table-column
          prop="typeString"
          label="类型"
          width="200px"
        >
          <template slot-scope="scope">
            <el-tag type="success">{{scope.row.typeString}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="updatime"
          label="更新时间"
          width="200px"
        ></el-table-column>
        <el-table-column
          prop="statusString"
          label="状态"
          width="200px"
        >
          <template slot-scope="scope">
            <el-tag
              type="success"
              v-if="scope.row.status==50"
            >{{scope.row.statusString}}</el-tag>
            <el-tag
              type="primary"
              v-else-if="scope.row.status==30"
            >{{scope.row.statusString}}</el-tag>
            <el-tag v-else>{{scope.row.statusString}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200px"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="primary"
              @click="openWorkorder(scope.row.id)"
            >查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
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
      <el-button
        type="primary"
        @click="newWorkorderDialog=true"
      >提交新工单</el-button>
    </div>
    <el-dialog
      title="工单详情"
      :visible.sync="dialogTableVisible"
      :close-on-click-modal="false"
      :center="true"
      @closed="closeDialog"
      width="700px"
      top="10vh"
    >
      <h2>{{workorder.title}}</h2>
      <div class="detail">
        <dl>
          <dt>编号</dt>
          <dd>{{workorder.id}}</dd>
        </dl>
        <dl>
          <dt>用户名</dt>
          <dd>{{workorder.consumerUsername}}</dd>
        </dl>
        <dl>
          <dt>问题类型</dt>
          <dd>
            <el-tag>{{workorder.typeString}}</el-tag>
          </dd>
        </dl>
        <dl>
          <dt>当前状态</dt>
          <dd>{{workorder.statusString}}</dd>
        </dl>

        <dl>
          <dt>提交时间</dt>
          <dd>{{workorder.updatime}}</dd>
        </dl>

        <dl>
          <dt>最后一次更新时间</dt>
          <dd>{{workorder.updatime}}</dd>
        </dl>
      </div>
      <div
        class="content"
        v-html="workorder.description"
      ></div>
      <div
        class="reply"
        v-loading="replyLoad"
        v-if="replyList.length!=0"
      >
        <h2>回复交流区</h2>
        <div class="reply-list">
          <dl
            v-for="x in replyList"
            :key="x.id"
          >
            <dt>
              <img :src="x.fullReplyerAvatar">
            </dt>
            <dd>
              <span>{{x.replyer}}</span>
              <span>{{x.creatime}}</span>
              <div
                class="reply-con"
                v-html="x.body"
              ></div>
            </dd>
          </dl>
          <br v-if="replytotal!=0">
          <el-pagination
            background
            layout="total,prev, pager, next"
            :current-page.sync="replypage"
            :page-size="replysize"
            :total="replytotal"
            @current-change="replyPageFn"
            v-if="replytotal!=0"
          ></el-pagination>
        </div>
      </div>
      <div
        class="reply"
        v-else
      >
        <h2>回复交流区</h2>
        <p class="tip">暂无内容</p>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <vue-ckeditor
          v-model="content"
          :config="config"
        />
        <div class="btn-grounp">
          <el-button
            type="danger"
            size="medium"
            @click="closeWorkorder(workorder.id)"
            v-if="workorder.status!=50"
          >关闭工单</el-button>
          <el-button
            type="info"
            class="submit"
            plain
            v-if="workorder.status==50"
          >本工单已关闭</el-button>
          <el-button
            type="primary"
            class="submit"
            @click="submitReply(workorder.id)"
            v-else
          >提交</el-button>
        </div>
      </span>
    </el-dialog>
    <el-dialog
      title="工单详情"
      :visible.sync="newWorkorderDialog"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item
          label="工单标题"
          prop="title"
        >
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="问题描述">
          <vue-ckeditor
            v-model="form.Description"
            :config="config"
          />
        </el-form-item>
        <el-form-item
          label="问题分类"
          prop="Type"
        >
          <el-select
            v-model="form.Type"
            placeholder="请选择活动区域"
            style="width: 100%;"
          >
            <el-option
              label="安装服务"
              value="10"
            ></el-option>
            <el-option
              label="空间域名"
              value="20"
            ></el-option>
            <el-option
              label="售后投诉"
              value="30"
            ></el-option>
            <el-option
              label="技术支持"
              value="40"
            ></el-option>
            <el-option
              label="试用咨询"
              value="50"
            ></el-option>
            <el-option
              label="其他问题"
              value="100"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitWorkorder('form')"
          >立即提交</el-button>
          <el-button @click="newWorkorderDialog=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import VueCkeditor from 'vue-ckeditor2';
export default {
  components: {
    VueCkeditor
  },
  data() {
    return {
      list: [],
      path: '100',
      page: 0,
      size: 0,
      total: 0,
      applyId: [],
      active: '100',
      dialogTableVisible: false,
      replyLoad: true,
      replyList: [],
      replypage: 0,
      replysize: 0,
      replytotal: 0,
      workorder: {},
      content: '',
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike', 'image', 'blockquote', 'code-block']
          ]
        }
      },
      newWorkorderDialog: false,
      form: {
        title: '',
        Description: '',
        Type: ''
      },
      rules: {
        title: [{
          required: true,
          message: '请输入活动名称',
          trigger: 'blur'
        },
        {
          min: 5,
          max: 20,
          message: '长度在 5 到 20 个字符',
          trigger: 'blur'
        }
        ],
        Type: [{
          required: true,
          message: '请选择问题类型',
          trigger: 'change'
        }]
      },
      config: {
        toolbar: [
          ['Bold', 'Italic', 'Underline', 'Link', 'Unlink', 'Image']
        ],
        height: 150,
        filebrowserImageUploadUrl: '',
        fileTools_requestHeaders: {
          Authorization: ''
        },
        fileTools_defaultFileName: 'file',
        language: 'zh-cn',
      }
    };
  },
  created() {
    this.getList(100, 1);
    this.config.fileTools_requestHeaders.Authorization = 'Bearer ' + localStorage.getItem('token');
    this.config.filebrowserImageUploadUrl = this.$store.state.pic + 'api/workorder/picture';
  },
  methods: {
    getList(type, val) {
      var that = this;
      var url = 'workorder/status/' + type + '/page/' + val
      if (type == 10) {
        url = 'workorder/mine/page/' + val
      }
      that.get_json(that.$store.state.api + url, function (data) {
        that.list = data.data;
        that.page = data.page;
        that.size = data.size;
        that.total = data.total;
      })
    },
    pageFn(val) {
      this.getList(this.active, val);
      this.gotop();
    },
    handleClick(tab, event) {
      this.active = tab.name;
      this.getList(tab.name, 1)
    },
    openWorkorder(id) {
      var that = this;
      that.get_json(that.$store.state.api + 'workorder/' + id, function (data) {
        that.workorder = data;
        console.log(that.workorder)
      });
      that.getReplyList(id, 1);
      that.dialogTableVisible = true;
    },
    getReplyList(id, page) {
      var that = this;
      that.get_json(that.$store.state.api + 'workorder/' + id + '/comments/page/' + page, function (data) {
        that.replyLoad = false;
        that.replyList = data.data;
        that.replypage = data.page;
        that.replysize = data.size;
        that.replytotal = data.total;
      });
    },
    submitReply(id) {
      var that = this;
      if (that.content.length == 0) {
        that.$message.error('请填写回复内容')
      } else {
        that.post_json(that.$store.state.api + 'workorder/' + id + '/reply', {
          workeruserid: id,
          body: that.content
        }, function (data) {
          that.content = '';
          that.$message({
            type: 'success',
            message: '提交成功！'
          });
          that.getReplyList(id, that.replypage)
        });
      }
    },

    replyPageFn(val) {
      this.getReplyList(this.workorder.id, val)
    },
    submitWorkorder(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var that = this;
          that.post_json(that.$store.state.api + 'workorder/', that.form, function (data) {
            that.newWorkorderDialog = false;
            that.$message({
              type: 'success',
              message: '提交成功！'
            });
            that.getList(that.path, that.page)
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    closeDialog() {
      this.workorder = {};
      this.getList(this.path, this.page);
    },
    closeWorkorder(id) {
      var that = this;
      that.$confirm('此操作将关闭工单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.put_json(that.$store.state.api + 'WorkOrder/' + id + '/close', {}, function (data) {
          that.dialogTableVisible = false;
          that.$message({
            type: 'success',
            message: '关闭成功!'
          });
          that.getList(that.path, that.page)
        });
      }).catch(() => {
        that.$message({
          type: 'info',
          message: '已取消关闭'
        });
      });
    },
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
#workorder .content img,
#workorder .reply-list img {
  max-width: 100%;
  height: auto !important;
}

#workorder .detail {
  padding: 20px 0;
  display: flex;
  flex-wrap: wrap;
}

#workorder .detail dl {
  display: flex;
  width: 50%;
  padding: 10px 30px 10px 0;
  border-bottom: 1px solid #ccc;
  align-items: center;
}

#workorder .detail dt {
  color: #a6a6a6;
  width: 130px;
}
#workorder .el-dialog {
  margin: 0 auto;
}

#workorder .el-dialog__body {
  height: 50vh;
  overflow: auto;
}

#workorder .el-dialog__footer {
  text-align: left;
}

#workorder .el-dialog__footer .submit {
  width: 100%;
}

#workorder .btn-grounp {
  display: flex;
  margin-top: 10px;
}

#workorder .content {
  padding: 10px;
  border: 1px dashed #ccc;
}
.reply {
  background: #eee;
  margin: 10px 0;
  padding: 10px;
}

.reply h2 {
  text-align: center;
}

.reply .tip {
  text-align: center;
  padding: 10px 0;
  color: #ccc;
}

.reply-list dl {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px 0;
}

.reply-list dt {
  width: 50px;
  margin-right: 20px;
}

.reply-list dt img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}

.reply-list dd {
  display: flex;
  justify-content: space-between;
  flex-flow: wrap;
  flex-grow: 1;
}

.reply-list dd span {
  font-size: 14px;
  color: #999;
}

.reply-list .reply-con {
  width: 100%;
  margin-top: 10px;
}

.reply-list .reply-con img {
  max-width: 80%;
}

.reply-con strong {
  font-weight: bold !important;
}

.reply-con em {
  font-style: italic !important;
}
</style>
<style scoped>
</style>
