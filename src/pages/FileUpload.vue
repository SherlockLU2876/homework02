<template>
  <div>
    <h4>文件上传</h4>
    <el-form
      :inline="true"
      class="demo-form-inline"
      :model="insert"
      content="multipart/form-data" 
      method="post"
    >
      <el-form-item label="上传人id:" v-if="false">
        <el-input placeholder="id" v-model="insert.id"></el-input>
      </el-form-item>
      <el-form-item label="上传人姓名:">
        <el-input placeholder="姓名" v-model="insert.name"></el-input>
      </el-form-item>
      <br />
      <el-form-item label="文件类型">
        <el-radio label="txt" v-model="insert.type">文本(.txt)</el-radio>
        <el-radio label="excel" v-model="insert.type">表格(.excel)</el-radio>
        <el-radio label="mp4" v-model="insert.type">视频(.mp4)</el-radio>
        <el-radio label="doc" v-model="insert.type">word文档(.doc)</el-radio>
      </el-form-item>
      <br />
      <el-upload
        class="upload-demo"
        ref="upload"
        action="http://localhost:8080/upload"
        multiple
        :limit="5"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false"
      >
        <el-button slot="trigger" size="small" type="primary"
          >选取文件</el-button
        >
      </el-upload>
      <br />
      <el-form-item>
        <el-button type="success" @click="submitUpload">确定</el-button>
      </el-form-item>
    </el-form>
    <form action="http://localhost:8080/addFile2" method="post" enctype="multipart/form-data">
      姓名：<input type="text" name="user_name">
    选择文件:<input type="file" name="file"><br>
    文件描述：<textarea rows="3" name="name"></textarea><br>
    <input type="submit" value="提交" @click="upload">
    </form>
  </div>
</template>
<script>
// import axios from "axios";
// import{nanoid} from 'nanoid'
export default {
  data() {
    return {
      fileList: [],
      insert: {
        id: "",
        name: "",
        type: "",
      },
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
      // this.$cookieStore.getCookie( 'name')
      // this.insert.id=nanoid();

      // console.log(this.$refs.upload);
      // axios
      //   .post("#", {
      //   id:this.insert.id,
      //   name:this.insert.name,
      //   type:this.insert.type
      //   })
      //   .then((res) => {

      //     console.log(res);
      //   });
    },
    upload(){
      this.$cookies.get('user_name')
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
};
</script>
