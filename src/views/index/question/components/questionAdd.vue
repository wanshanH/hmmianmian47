<template>
  <el-dialog
    destroy-on-close
    class="my_dialog"
    fullscreen
    title="新增题库"
    :visible.sync="dialogFormVisible"
  >
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item prop="subject" label="学科" :label-width="formLabelWidth">
        <subjectSelect v-model="form.subject"></subjectSelect>
      </el-form-item>
      <el-form-item prop="step" label="阶段" :label-width="formLabelWidth">
        <el-select v-model="form.step" placeholder="请选择阶段">
          <el-option label="初级" value="1"></el-option>
          <el-option label="中级" value="2"></el-option>
          <el-option label="高级" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="enterprise" label="企业" :label-width="formLabelWidth">
        <businessSelect v-model="form.enterprise"></businessSelect>
      </el-form-item>
      <el-form-item prop="city" label="城市" :label-width="formLabelWidth">
        <chinaArea v-model="form.city"></chinaArea>
      </el-form-item>
      <el-form-item prop="type" label="题型" :label-width="formLabelWidth">
        <el-radio-group v-model="form.type">
          <el-radio label="1">单选</el-radio>
          <el-radio label="2">多选</el-radio>
          <el-radio label="3">简答</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="difficulty" label="难度" :label-width="formLabelWidth">
        <el-radio-group v-model="form.difficulty">
          <el-radio label="1">简单</el-radio>
          <el-radio label="2">一般</el-radio>
          <el-radio label="3">困难</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-divider></el-divider>
      </el-form-item>
      <el-form-item prop="title" class="my_title" label="试题标题" :label-width="formLabelWidth">
        <myEditor v-model="form.title"></myEditor>
      </el-form-item>
      <!-- 单选框组 -->
      <el-form-item
        prop="single_select_answer"
        v-if="form.type==1"
        label="单选"
        :label-width="formLabelWidth"
      >
        <el-radio-group v-model="form.single_select_answer">
          <optionItem
            v-for="(item, index) in form.select_options"
            :key="index"
            :label="item.label"
            :text.sync="item.text"
            :image.sync="item.image"
          ></optionItem>
        </el-radio-group>
      </el-form-item>
      <!-- 多选框组 -->
      <el-form-item
        prop="multiple_select_answer"
        v-else-if="form.type==2"
        label="多选"
        :label-width="formLabelWidth"
      >
        <el-checkbox-group v-model="form.multiple_select_answer">
          <optionItem
            :isRadio="false"
            v-for="(item, index) in form.select_options"
            :key="index"
            :label="item.label"
            :text.sync="item.text"
            :image.sync="item.image"
          ></optionItem>
        </el-checkbox-group>
      </el-form-item>
      <!-- 文本域 -->
      <el-form-item prop="short_answer" v-else label="简答" :label-width="formLabelWidth">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.short_answer"></el-input>
      </el-form-item>
      <el-form-item>
        <el-divider></el-divider>
      </el-form-item>
      <!-- 视频 -->
      <el-form-item prop="video" class="video_title" label="解析视频" :label-width="formLabelWidth">
        <videoUpload :video.sync="form.video"></videoUpload>
      </el-form-item>
      <el-form-item>
        <el-divider></el-divider>
      </el-form-item>
      <el-form-item
        prop="answer_analyze"
        class="my_title"
        label="答案解析"
        :label-width="formLabelWidth"
      >
        <myEditor v-model="form.answer_analyze"></myEditor>
      </el-form-item>
      <el-form-item>
        <el-divider></el-divider>
      </el-form-item>
      <el-form-item prop="remark" class="remark" label="试题备注" :label-width="formLabelWidth">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import chinaArea from "./chinaArea";
import myEditor from "./myEditor";
import optionItem from "./optionItem";
import videoUpload from "./videoUpload";
import { questionAdd } from "@/api/question.js";
export default {
  name: "questionAdd",
  components: {
    chinaArea,
    myEditor,
    optionItem,
    videoUpload
  },
  data() {
    return {
      formLabelWidth: "500px",
      dialogFormVisible: false,
      form: {
        video: "",
        title: "",
        type: "1",
        subject: "",
        city: "",
        enterprise: "",
        step: "",
        difficulty: "1",
        multiple_select_answer: [],
        single_select_answer: "",
        short_answer: "",
        //   答案
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: "upload/20191129/fd5f03a07d95e3948860240564b180e4.jpeg"
          },
          {
            label: "B",
            text: "猫不理",
            image: "upload/20191129/e93e7bb72accda7f3159cdabc4203991.jpeg"
          },
          {
            label: "C",
            text: "麻花",
            image: "upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg"
          },
          {
            label: "D",
            text: "炸酱面",
            image: "upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg"
          }
        ]
      },
      rules: {
        title: { required: true, message: "标题不能为空", trigger: "blur" },
        subject: {
          required: true,
          message: "学科不能为空",
          trigger: "change"
        },
        step: { required: true, message: "阶段不能为空", trigger: "change" },
        enterprise: {
          required: true,
          message: "企业不能为空",
          trigger: "change"
        },
        city: { required: true, message: "城市不能为空", trigger: "change" },
        type: { required: true, message: "题型不能为空", trigger: "change" },
        difficulty: {
          required: true,
          message: "难度不能为空",
          trigger: "change"
        },
        single_select_answer: {
          required: true,
          message: "单选答案不能为空",
          trigger: "change"
        },
        multiple_select_answer: {
          required: true,
          message: "多选答案不能为空",
          trigger: "change"
        },
        short_answer: {
          required: true,
          message: "简答题的答案不能为空",
          trigger: "blur"
        },
        answer_analyze: {
          required: true,
          message: "答案解析不能为空",
          trigger: "blur"
        },
        remark: {
          required: true,
          message: "试题备注不能为空",
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    save() {
      this.$refs.form.validate(v => {
        if (v) {
          questionAdd(this.form).then(res => {
            // console.log(res);
            if (res.data.code == 200) {
              this.$message.success("新增成功");
              // 成功后重置表单
              this.$refs.form.resetFields();

              this.dialogFormVisible = false;

              this.$parent.getList();
            } else {
              this.$message.error("编辑题库失败");
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="less">
.my_dialog {
  .el-dialog__close {
    color: #fff;
  }
  .el-select,
  .el-cascader {
    width: 400px;
  }
  .el-form-item__label {
    padding-right: 50px;
  }
  .el-form-item__content {
    .el-divider {
      margin-left: 420px;
      width: 921px;
    }
  }

  .my_title {
    .el-form-item__label {
      margin-left: 28px;
    }
    .el-form-item__content {
      margin-top: 60px;
    }
  }

  .big_box {
    margin-left: -77px;

    .toolbar {
      border: 1px solid #ccc;
      width: 921px;
    }

    .content {
      border: 1px solid #ccc;
      width: 921px;
      height: 50px;
    }
  }

  .el-textarea {
    margin-top: 60px;
    width: 800px;
  }

  .video_title {
    margin-left: 28px;
  }

  .remark {
    .el-form-item__label {
      margin-left: 28px;
    }
  }

  .dialog-footer {
    text-align: center;
    .el-button {
      width: 100px;
      margin-right: 410px;
      margin-left: 300px;
    }
  }
}
</style>