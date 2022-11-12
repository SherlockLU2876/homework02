<template>
  <el-row>
    <el-col :span="24">
      <div>
        信息
        <span id="login" @click="logout()">登出</span>
        <!-- <span id="login" @click="login()" v-if="islogin">登录</span> -->
        <span id="login" @mousemove="show1" @mouseout="show = false">
          {{ user_name }}</span
        >
        <div class="hover_container" v-if="show">
          <h8>用户名：{{ user_name }}<br>剩余空间：{{ space }}/总共：{{ space_all }}M</h8>
          
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import axios from "axios";
export default {
  name: "NavHeader",
  data() {
    return {
      islogin: true,
      islogin1: 1,
      show: false,
      user_name: "",
      space: "",
      space_all: 5,
    };
  },
  created() {
    this.user_name = this.$cookies.get("user_name");
  },
  methods: {
    show1() {
      axios
        .post("http://localhost:8080/getUserByName", {
          user_name: this.$cookies.get("user_name"),
        })
        .then((res) => {
          this.space = res.data.space;
         
        });
         this.show = true;
    },
    login() {
      this.$router.push("/LoginScreen");
    },
    logout() {
      axios
        .post("#")
        .then((res) => {
          console.log(res + "登出成功");
        })
        .catch((err) => {
          console.log(err + "登出失败");
        });
      console.log("logout");
    },
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
.hover_container {
  position: relative;
  /* display: flex; */
  float: right;
  width:200px;
  height: 40px;
  border: 1px solid rgb(207, 206, 206);
  border-radius: 8px;
  text-align: center;
  line-height:20px;
  position: absolute;
  /* left: 50px; */
  right: 50px;
  top: 100%;
  z-index: 99;
  transform: translateY(-50%);
  background-color: rgb(255, 255, 255);
  color: #000;
  font-size:2px
}
</style>