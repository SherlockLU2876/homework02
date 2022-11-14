<template>
  <div>
    <h4>文件上传</h4>
    <!-- <el-form
      action="http://localhost:8080/addFile2"
      method="post"
      enctype="multipart/form-data"
    >
      <el-form-item label="上传人姓名:">
        <el-input placeholder="姓名" v-model="cookiename" name="user_name" />
      </el-form-item>
      <el-form-item label=" 选择文件:">
        <input type="file" name="file" />
      </el-form-item>
      <br />
      <el-form-item label="文件描述:">
        <textarea rows="3" name="name"></textarea><br />
      </el-form-item> -->
    <!-- <el-upload
        class="upload-demo"
        ref="upload"
        multiple
        :limit="5"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false"
        name="file"
      >
        <el-button slot="trigger" size="small" type="primary"
          >选取文件</el-button
        > -->
    <!-- </el-upload> -->
    <br />
    <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" name="name">
      </el-input> -->
    <!-- <el-form-item>
        <el-button typr="primary" @click="submitUpload">确定</el-button>
      </el-form-item>
    </el-form> -->
    <form
      action="http://localhost:8080/addFile2"
      method="post"
      enctype="multipart/form-data"
      class="STYLE-NAME"
    >
      姓名：<input id="name" type="text" name="user_name" v-model="cookiename" />
      <br />
      <br />
      选择文件:<input type="file" name="file" /><br />
      <br />
      文件描述：<textarea id="message" rows="3" name="name"></textarea><br />
      <br />
      <input type="submit" value="提交" @click="upload" />
    </form>
  </div>
</template>
<script>
// import axios from "axios";
// import{nanoid} from 'nanoid'
// import Cookie from "js-cookie";
export default {
  data() {
    return {
      fileList: [],
      insert: {
        id: "",
        name: "",
        type: "",
      },
      cookiename: "",
    };
  },
  created() {
    this.cookiename1();
  },
  methods: {
    submitUpload() {
      this.$cookies.get("user_name");
      // this.$refs.upload.submit();
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
    upload() {},
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    cookiename1() {
      this.cookiename = this.$cookies.get("user_name");
    },

    computed: {
      showname() {
        return this.$cookies.get("user_name");
      },
    },
  },
};
</script>
