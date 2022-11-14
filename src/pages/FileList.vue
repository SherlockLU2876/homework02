<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="searchselect">
      <el-form-item label="文件类别">
        <el-select v-model="searchselect.type" placeholder="请选择" clearable>
          <el-option
            v-for="item in options"
            :key="item.value"
            :value="item"
            :disabled="item.disabled"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchinfo">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      style="width: 100%"
    >
      <el-table-column label="id" prop="file_id" width="45px" ></el-table-column>
      <el-table-column label="上传人姓名" prop="file_uploader"  width="100px" ></el-table-column>
      <el-table-column label="文件名" prop="file_name" v-model="file_name"  width="350px" ></el-table-column>
      <el-table-column label="uuid" prop="file_uuid" width="350px" v-model="file_uuid" ></el-table-column>
      <el-table-column label="文件类型" prop="file_type" width="85px"> </el-table-column>
      <el-table-column label="文件上传时间" prop="file_upload_time" :formatter="formatTime" width="150px"> </el-table-column>
      <el-table-column label="文件大小" prop="file_size" width="85px"> </el-table-column>
      <el-table-column label="下载次数" prop="download_count" width="85px"> </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">下载</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 5, 10, 20]"
        :page-size="pageSize"
        layout="total,  sizes,prev, pager, next, jumper"
        :total="tableData.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      tableData: [],
      searchselect: {
        type: "",
      },
      select: {},

      options: [],

      search: "",
      file_name: "",
      file_uuid:''

    };
  },

  created() {
    this.getlist();
    this.getselectname();
  },

  methods: {
    getlist() {
      axios
        .post("http://localhost:8080/getFileList", {
          // file_type:"图片",
          // file_name:"微信图片_202210091123372.png"
        })
        .then((res) => {
          this.tableData = res.data;
          console.log(res.data + "请求到了数据aaaaa");
        })
        .catch((err) => {
          console.log(err + "请求失败aaaaa");
        });
    },
    formatTime(row,column){
    let data = row[column.property]
    let dtime = new Date(data)
    const year = dtime.getFullYear()
    let month = dtime.getMonth() + 1
    if (month < 10) {
        month = '0' + month
    }
    let day = dtime.getDate()
    if (day < 10) {
        day = '0' + day
    }
    let hour = dtime.getHours()
    if (hour < 10) {
        hour = '0' + hour
    }
    let minute = dtime.getMinutes()
    if (minute < 10) {
        minute = '0' + minute
    }
    let second = dtime.getSeconds()
    if (second < 10) {
        second = '0' + second
    }
    return year+ '-' + month+ '-' + day + ' ' + hour + ':' + minute + ':' + second

},
    getselectname() {
      console.log(this.searchselect.type);
      axios
        .post("http://localhost:8080/getFileType", {})
        .then((resquest) => {
          this.options = resquest.data;
          console.log(resquest.data + "请求到了数据bbbbbb");
        })
        .catch((err) => {
          console.log(err + "请求失败bbbbb");
        });
    },
    handleEdit(row) {
      console.log(this.$cookies.get("user_name"));
      console.log(row.file_name);

      window.open(
        `http://localhost:8080/download2?user_name=${this.$cookies.get(
          "user_name"
        )}&file_uuid=${row.file_uuid}&file_id=${row.file_id}`
      );
      this.created();
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该条记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });

          console.log(row.file_id);
          console.log(this.$cookies.get("user_name"));
          axios
            .post("http://localhost:8080/deleteFile", {
              file_id: row.file_id,
              // user_name: this.$cookies.get("user_name"),
            })
            .then((response) => {
              console.log(response);
              this.getlist();
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    searchinfo() {
      console.log(this.searchselect.type);
      axios
        .post("http://localhost:8080/selectByType", {
          type: this.searchselect.type,
          // fileName: this.searchselect.name,
        })
        .then((res) => {
          this.tableData = res.data;
          console.log(res.data + "请求到了数据cccccc");
        })
        .catch((err) => {
          console.log(err + "请求失败cccccc");
        });
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style>
</style>