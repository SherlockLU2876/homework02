<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="searchselect">
      <el-form-item label="上传人姓名">
        <el-select v-model="searchselect.name" placeholder="请选择" clearable>
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文件类别">
        <el-select v-model="searchselect.type" placeholder="请选择" clearable>
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchinfo">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <!-- <el-table
      :data="
        tableData.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    > -->
      <el-table-column label="id" prop="file_id" v-if="false">
      </el-table-column>
      <el-table-column label="上传人姓名" prop="file_uploader">
      </el-table-column>
      <el-table-column label="文件名" prop="file_name" v-model="file_name">
      </el-table-column>
      <el-table-column label="文件类型" prop="file_type"> </el-table-column>
      <el-table-column label="文件下载次数" prop="count"> </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">下载</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
// import { arrayBuffer } from "stream/consumers";
// import { arrayBuffer } from "stream/consumers";
// axios.defaults.withCredentials = true
export default {
  data() {
    return {
      tableData: [],
      searchselect: {
        name: "",
        type: "",
      },
      options1: [
        {
          value: "xiaowang",
          label: "水果",
        },
        {
          value: "2",
          label: "数码",
        },
        {
          value: "3",
          label: "食品",
        },
        {
          value: "4",
          label: "衣服",
        },
      ],
      options2: [],

      search: "",
      file_name: "",
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
          // filetype:"",
          // fileName:""
        })
        .then((res) => {
          this.tableData = res.data;
          console.log(res.data + "请求到了数据aaaaa");
        })
        .catch((err) => {
          console.log(err + "请求失败aaaaa");
        });
    },
    getselectname() {
      
      axios
        .post("http://localhost:8080/getFileType", {})
        .then((res) => {
          this.options1 = res.data;
          // this.options1.label = res.data;
          console.log(res.data + "请求到了数据bbbbbb");
          // this.tableData = res.data;
        })
        .catch((err) => {
          console.log(err + "请求失败bbbbb");
        });
    },
    handleEdit(row) {
      // axios.defaults.withCredentials = true;
      console.log(this.$cookies.get("user_name"));
      console.log(row.file_id);
      console.log(row.file_name);
      this.filename = row.file_name;
      axios({
        headers: {
          // 'Access-Control-Allow-Credentials':true,
          // withCredentials: true,
          // 'Cookie': this.$cookies.get("user_name")
        },
        method: "post",
        url: "http://localhost:8080/download2",
        data: {
          user_name: this.$cookies.get("user_name"),
          fileName: this.filename,
        },
        header: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=utf-8",
          withCredentials: true,
        },
        responseType: "blob",
      })
        // axios
        //   .post(
        //     "http://localhost:8080/download2",
        //     {
        //       // 'Access-Control-Allow-Credentials':true,
        //       user_name: this.$cookies.get("user_name"),
        //       fileName: this.filename,
        //       // responseType: "blob", //首先设置responseType字段格式为 blob
        //     },
        //     {
        //      responseType:"arrayBuffer"
        //     }
        //   )
        .then((res) => {
          // this.download(res)
          // let blob = res.data;
          // let reader = new FileReader();
          // reader.readAsDataURL(blob);
          // reader.onload = (e) => {
          //   let a = document.createElement("a");
          //   a.download = this.fileName;
          //   a.href = e.target.result;
          //   document.body.appendChild(a);
          //   a.click();
          //   document.body.removeChild(a);
          // };\
          const filename = res.headers["content-disposition"];
          const blob = new Blob([res.data]);
          var downloadElement = document.createElement("a");
          var href = window.URL.createObjectURL(blob);
          downloadElement.href = href;
          downloadElement.download = decodeURIComponent(
            filename.split("filename=")[1]
          );
          document.body.appendChild(downloadElement);
          downloadElement.click();
          document.body.removeChild(downloadElement);
          window.URL.revokeObjectURL(href);
        });
    },
    handleDelete(row) {
      console.log(this.$cookies.get("user_name"));
      console.log(row.id);
      axios
        .post("#", {
          id: row.id,
        })
        .then((res) => {
          console.log(res.data + "删除成功");
        })
        .catch((err) => {
          console.log(err + "删除失败");
        });
    },
    searchinfo() {
      console.log(this.searchselect.name);
      console.log(this.searchselect.type);
      axios
        .post("http://localhost:8080/getFileList", {
          filetype: this.searchselect.type,
          fileName: this.searchselect.name,
        })
        .then((res) => {
          this.tableData = res.data;
          console.log(res.data + "请求到了数据cccccc");
        })
        .catch((err) => {
          console.log(err + "请求失败cccccc");
        });
    },
    // download(data){
    //   if (!data) {
    //         return
    //     }
    //     let url = window.URL.createObjectURL(new Blob([data]))
    //     let link = document.createElement('a')
    //     link.style.display = 'none'
    //     link.href = url
    //     link.setAttribute('download', 'excel.xlsx')
    //     document.body.appendChild(link)
    //     link.click()
    // }
  },
};
</script>

<style>
</style>