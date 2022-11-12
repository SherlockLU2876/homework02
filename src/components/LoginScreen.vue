<template>
  <div class="loginbody">
    <div class="logindata">
      <div class="logintext">
        <h2>Welcome</h2>
      </div>
      <div class="formdata">
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item prop="username">
            <el-input
              v-model="form.username"
              clearable
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              clearable
              placeholder="请输入密码"
              show-password
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="tool">
        <div>
          <el-checkbox v-model="checked" @change="remenber"
            >记住密码</el-checkbox
          >
        </div>
        <div>
          <span class="shou" @click="forgetpas">忘记密码？</span>
        </div>
      </div>
      <div class="butt">
        <el-button type="primary" @click="login">登录</el-button>
        <el-button class="shou" @click="register">注册</el-button>
      </div>
    </div>
    <!-- <form
      action="http://localhost:8080/addFile"
      method="post"
      enctype="multipart/form-data"
    >
      选择文件:<input type="file" name="file" /><br />
      文件描述：<textarea rows="3" name="name"></textarea><br />
      <input type="submit" value="提交" />
    </form> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginScreen",
  data() {
    return {
      form: {
        password: "",
        username: "",
      },
      checked: false,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { max: 10, message: "不能大于10个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { max: 10, message: "不能大于10个字符", trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    login() {
      axios
        .post("http://localhost:8080/login", {
          name: this.form.username,
          pwd: this.form.password,
        })
        .then((res) => {
          alert("登录成功");
          sessionStorage.username = this.form.username;
          sessionStorage.password = this.form.password;
          this.$cookies.set("user_name", this.form.username);
          this.$router.push("/FileUpload");
          console.log(res)
        })
        .catch((err) => {
          alert(err + "登录失败");
        });
    },
    remenber() {
      if (this.checked) {
        localStorage.setItem("username", this.form.username);
        localStorage.setItem("password", this.form.password);
      } else {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
      }
    },
    forgetpas() {
      this.$router.push("/forget");
    },
    register() {
      this.$router.push("/register");
    },
  },
  mounted() {
    if (localStorage.getItem("username")) {
      this.form.username = localStorage.getItem("username");
      this.form.password = localStorage.getItem("password");
      this.checked = true;
    }
  },
};
</script>

<style>
.loginbody {
  width: 100%;
  height: 100%;
  min-width: 1000px;

  background-size: 100% 100%;
  background-position: center center;
  overflow: auto;
  background-repeat: no-repeat;
  position: fixed;
  line-height: 100%;
  padding-top: 150px;
}

.logintext {
  margin-bottom: 20px;
  line-height: 50px;
  text-align: center;
  font-size: 30px;
  font-weight: bolder;
  color: white;
  text-shadow: 2px 2px 4px #000000;
}

.logindata {
  width: 400px;
  height: 300px;
  transform: translate(-50%);
  margin-left: 50%;
}

.tool {
  display: flex;
  justify-content: space-between;
  color: #606266;
}

.butt {
  margin-top: 10px;
  text-align: center;
}

.shou {
  cursor: pointer;
  color: #606266;
}

/*ui*/
/* /deep/ .el-form-item__label {
  font-weight: bolder;
  font-size: 15px;
  text-align: left;
}

/deep/ .el-button {
  width: 100%;
  margin-bottom: 10px;

} */
</style>