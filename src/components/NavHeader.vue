<template>
  <el-row>
    <el-col :span="24">
      <div>信息
        <span id="login" @click="logout()">登出</span>
        <span id="login" @click="login()" >登录</span>
        
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "NavHeader",
  methods: {
    login() {
      this.$router.push("/LoginScreen")
    },
    logout() {
     console.log("logout")
    }
  },
};


</script>



<style scoped>
#login {
  background-color: #409eff;
  color: #fff;
  line-height: 60px;
  float: right;
  margin-right: 20px;

}
</style>