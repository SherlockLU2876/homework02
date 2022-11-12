<template>
  <div>
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :router="true"
        >
          <el-menu-item index="/TableAdd">
            <i class="el-icon-menu"></i>
            <router-link to="/TableAdd" active-class="active">
              <span>添加商品信息</span></router-link
            >
          </el-menu-item>
          <el-menu-item index="/TableInfo">
            <i class="el-icon-setting"></i>
            <router-link to="/TableInfo" active-class="active"
              ><span>商品列表</span></router-link
            >
          </el-menu-item>
          <el-menu-item index="/FileUpload">
            <i class="el-icon-setting"></i>
            <router-link to="/FileUpload" active-class="active"
              ><span>文件上传</span></router-link
            >
          </el-menu-item>
          <el-menu-item index="/FileList">
            <i class="el-icon-setting"></i>
            <router-link to="/FileList" active-class="active"
              ><span>文件列表</span></router-link
            >
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
  
  <script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>