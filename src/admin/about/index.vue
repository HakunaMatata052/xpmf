<template>
    <div id="content">
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <span>文章管理</span>
                <el-button type="primary" style="margin-left: 30px;" @click="editDialog('')">新建文章</el-button>
            </div>
            <el-table :data="list" stripe style="width: 100%" v-loading="loading">
                <el-table-column prop="id" label="ID" width="80" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="title" label="标题" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="ordering" label="排序" max-width="80">
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="editDialog(scope.row.id)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog title="文章编辑" :visible.sync="dialogFormVisible" :fullscreen="true" @closed="close">
            <el-form :model="form" :rules="rules" ref="form" label-width="120px">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <vue-ckeditor v-model="form.content" :config="config" types="Basic" />
                </el-form-item>
                <el-form-item label="排序" prop="sorting">
                    <el-input type="number" v-model="form.sorting"></el-input>
                </el-form-item>
                <br />
                <hr />
                <el-form-item label="SEO标题">
                    <el-input v-model="form.seoTitle"></el-input>
                </el-form-item>
                <el-form-item label="SEO关键词">
                    <el-input v-model="form.seoKeywords"></el-input>
                </el-form-item>
                <el-form-item label="SEO描述">
                    <el-input v-model="form.seoDescription" type="textarea"></el-input>
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
            dialogFormVisible: false,
            headers: {},
            form: {
                author: '新派魔方'
            },
            rules: {
                title: [{
                    required: true,
                    message: '请输入名称',
                    trigger: 'blur'
                },
                {
                    min: 2,
                    max: 20,
                    message: '长度在 2 到 20 个字符',
                    trigger: 'blur'
                }
                ],
                sorting: [{ required: true, message: '排序不能为空' }
                ],
                content: [{
                    required: true,
                    message: '请输入内容',
                    trigger: 'blur'
                }]
            },
            categories: [],
            config: {
                toolbar: 'full',
                height: 300,
                filebrowserImageUploadUrl: '',
                fileTools_requestHeaders: {
                    Authorization: ''
                },
                language: 'zh-cn',
            },
            loading: true,
            dialogloading: true
        };
    },
    created() {
        this.getList(1);
        this.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
        this.config.fileTools_requestHeaders.Authorization = 'Bearer ' + localStorage.getItem('token');
        this.config.filebrowserImageUploadUrl = this.$store.state.pic + 'api/News/picture';
    },
    methods: {
        getList() {
            var that = this;
            that.get_json(that.$store.state.api + 'admin/About', function (data) {
                that.list = data;
                that.loading = false;
            })
        },
        editDialog(id) {
            var that = this;
            that.dialogFormVisible = true;
            if (id.length != 0) {
                that.get_json(that.$store.state.api + 'admin/About/' + id, function (data) {
                    that.form = data;
                    that.dialogloading = false;
                })
            } else {
                that.dialogloading = false;
            }
        },
        edit(formName, val) {
            var that = this;
            that.$refs[formName].validate((valid) => {
                if (valid) {
                    if (val != undefined) {
                        that.put_json(that.$store.state.api + 'admin/About/' + val, that.form, function (data) {
                            that.$message({
                                type: 'success',
                                message: '提交成功！'
                            });
                            that.getList();
                            that.dialogFormVisible = false;
                        })
                    } else {
                        that.post_json(that.$store.state.api + 'admin/About/', that.form, function (data) {
                            that.$message({
                                type: 'success',
                                message: '提交成功！'
                            });
                            that.getList();
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
            that.del_json(that.$store.state.api + 'admin/About/' + val, function (data) {
                that.$message({
                    type: 'success',
                    message: '删除成功!!'
                });
                that.getList();
            })
        },
        close() {
            this.form = {};
            this.dialogFormVisible = false;
            this.dialogloading = true;
        }
    }
}
</script>

<style scoped>
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
</style>