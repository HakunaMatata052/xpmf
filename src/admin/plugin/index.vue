<template>
  <div id="template" v-loading="loading">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>插件列表</span>
        <el-button type="primary" style="margin-left: 30px;" @click="editDialog('')">新建模板</el-button>
      </div>
      <el-row :gutter="20" class="applist">
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" v-for="item in list" :key="item.id">
          <div class="item">
            <img :src="item.fullpathThumbnail" alt>
            <div class="info">
              <div class="title">{{item.name}}</div>
              <p>{{item.description}}</p>
              <div class="btn-group">
                <el-button size="mini" type="primary" @click="editDialog(item.id)">编辑模板</el-button>
                <el-button size="mini" type="danger" @click="del(item.id)">删除模板</el-button>
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
    </el-card>
    <el-dialog title="插件详情" :visible.sync="dialogFormVisible" :fullscreen="false" @closed="close">
      <el-form :model="form" :rules="rules" ref="form" v-loading="dialogloading">
        <el-form-item label="插件名称" label-width="120px" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="缩略图" label-width="120px" prop="fullpathThumbnail">
              <el-upload
                class="img-uploader"
                name="upload"
                :action="$store.state.api+'admin/Plugin/thumbnail'"
                :headers="headers"
                :show-file-list="false"
                :on-success="picSuccess"
                :before-upload="beforeThumbnailUpload"
              >
                <img v-if="form.fullpathThumbnail" :src="form.fullpathThumbnail" class="img">
                <i v-else class="el-icon-plus img-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="模板压缩包" label-width="120px" prop="source">
              <el-input v-model="form.source" class="uploadInput"></el-input>
              <el-upload
                class="upload"
                name="upload"
                :action="$store.state.api+'admin/Plugin/source'"
                :headers="headers"
                :on-success="sourceSuccess"
                :show-file-list="false"
                :before-upload="beforeSourceUpload"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
              <i class="el-icon-success" v-if="sourceState"></i>
            </el-form-item>
            <el-form-item
              label="插件价格"
              label-width="120px"
              prop="price"
              :rules=" [
          { required: true, message: '价格不能为空',required: true },
          { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入正确的金额' }
        ]"
            >
              <el-input v-model="form.price"></el-input>
            </el-form-item>
            <el-form-item label="排序" label-width="120px">
              <el-input v-model="form.sorting"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="摘要" label-width="120px" prop="description">
          <el-input v-model="form.description" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="内容" label-width="120px" prop="content">
          <vue-ckeditor v-model="form.content" :config="config" types="Basic"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit('form',form.id)">确 定</el-button>
      </div>
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
      page: 0,
      size: 0,
      total: 0,
      dialogFormVisible: false,
      headers: {},
      form: {},
      rules: {
        name: [{
          required: true,
          message: '请输入名称',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 20,
          message: '长度在 2 到 20 个字符',
          trigger: 'blur'
        }],
        source: {
          required: true,
          message: '请上传模板',
          trigger: 'blur'
        },
        fullpathThumbnail: {
          required: true,
          message: '请上传缩略图',
          trigger: 'blur'
        },
        description: {
          required: true,
          message: '请输入摘要',
          trigger: 'blur'
        },
        content: {
          required: true,
          message: '请输入内容',
          trigger: 'blur'
        },
      },
      categories: [],
      sourceState: false,
      loading: true,
      cateloading: true,
      dialogloading: true,
      config: {
        toolbar: 'full',
        height: 300,
        filebrowserImageUploadUrl: '',
        fileTools_requestHeaders: {
          Authorization: ''
        },
        language: 'zh-cn',
      },
    };
  },
  created() {
    this.getList(1);
    this.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    this.config.fileTools_requestHeaders.Authorization = 'Bearer ' + localStorage.getItem('token');
    this.config.filebrowserImageUploadUrl = this.$store.state.pic + 'api/admin/plugin/picture';
  },
  methods: {
    getList(val) {
      var that = this;
      that.get_json(that.$store.state.api + 'Plugin/page/' + val, function (data) {
        that.list = data.data;
        that.page = data.page;
        that.size = data.size;
        that.total = data.total;
        that.loading = false;
      })
    },
    pageFn(val) {
      this.getList(val);
      this.gotop();
    },
    editDialog(id) {
      var that = this;
      that.dialogFormVisible = true;
      if (id.length != 0) {
        that.get_json(that.$store.state.api + 'Plugin/' + id, function (data) {
          that.form = data;
          that.dialogloading = false;
        });
      } else {
        that.dialogloading = false;
      }
    },
    edit(formName, val) {
      var that = this;
      that.$refs[formName].validate((valid) => {
        if (valid) {
          if (val != undefined) {
            that.put_json(that.$store.state.api + 'admin/Plugin/' + val, that.form, function (data) {
              that.$message({
                type: 'success',
                message: '提交成功！'
              });
              that.getList(that.page);
              that.dialogFormVisible = false;
            })
          } else {
            that.post_json(that.$store.state.api + 'admin/Plugin/', that.form, function (data) {
              that.$message({
                type: 'success',
                message: '提交成功！'
              });
              that.getList(that.page);
              that.dialogFormVisible = false;
            })
          }
        } else {
          that.$message({
            type: 'error',
            message: '请填写完整内容！'
          });
          return false;
        }
      });
    },
    del(val) {
      var that = this;
      that.del_json(that.$store.state.api + 'admin/Plugin/' + val, function (data) {
        that.$message({
          type: 'success',
          message: '删除成功!!'
        });
        that.getList(that.page);
      })
    },
    close() {
      this.form = {};
      this.dialogFormVisible = false;
    },
    sourceSuccess(res) {
      this.$set(this.form, 'source', res.fileName);
      this.sourceState = true;
      //this.form.source = res;
    },
    picSuccess(res, file) {
      this.form.Thumbnail = res.fileName;
      this.$set(this.form, 'fullpathThumbnail', URL.createObjectURL(file.raw));
    },
    beforeThumbnailUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    beforeSourceUpload(file) {
      const isJPG = file.type === 'application/x-zip-compressed';
      const isLt2M = file.size / 1024 / 1024 < 100;

      if (!isJPG) {
        this.$message.error('上传文件只能是 ZIP 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 100MB!');
      }
      return isJPG && isLt2M;

    },
  }
}
</script>

<style scoped>
.applist .item {
  background: #fff;
  border-radius: 3px;
  padding: 10px;
  margin: 10px;
}
.applist .item:hover {
  background: #f3f3f3;
}
.applist .item img {
  float: left;
  width: 80px;
  height: 80px;
}
.applist .item .info {
  padding-left: 100px;
}
.applist .item .info .title {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  color: #333;
}
.applist .item .info p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 10px 0;
  color: #333;
  overflow: hidden;
  color: #666;
}

.img-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.img-uploader .el-upload:hover {
  border-color: #409eff;
}

.img-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #ccc;
}

.img {
  width: 178px;
  height: 178px;
  display: block;
}

.upload {
  display: inline-block;
}

.uploadInput {
  width: 300px;
  margin-right: 20px;
}

.el-icon-success {
  color: #67c23a;
  margin-left: 10px;
}
</style>