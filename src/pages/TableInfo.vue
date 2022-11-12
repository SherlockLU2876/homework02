<template>
  <div>
    <h4>查询</h4>
    <el-form :inline="true" class="demo-form-inline" :model="search">
      <el-form-item label="商品名称">
        <el-input placeholder="商品名称" v-model="search.goodsname"></el-input>
      </el-form-item>
      <el-form-item label="商品规格">
        <el-input placeholder="商品规格" v-model="search.goodsspecs"></el-input>
      </el-form-item>
      <el-form-item label="商品单价">
        <el-input placeholder="商品单价" v-model="search.goodsprice"></el-input>
      </el-form-item>
      <el-form-item label="商品分类" >
        <el-radio v-model="search.goodstype" label="水果">水果</el-radio>
        <el-radio v-model="search.goodstype" label="数码">数码</el-radio>
        <el-radio v-model="search.goodstype" label="食品">食品</el-radio>
        <el-radio v-model="search.goodstype" label="衣服">衣服</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchinfo">查询</el-button>
      </el-form-item>
    </el-form>
    <Table
      :columns="columns12"
      :data="
        tabledata.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
    >
      <!-- <Table  :columns="columns12" :data="tabledata"> -->
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="index" slot="action">
        <Button
          type="primary"
          size="small"
          style="margin-right: 5px"
          @click="edit(index.row)"
          >编辑</Button
        >
        <Button type="error" size="small" @click="remove(index.row.goodsid)"
          >删除</Button
        >
      </template>
    </Table>
    <el-dialog title="商品信息" :visible.sync="dialogFormVisible" width="33%">
      <el-form
        ref="form"
        label-width="120px"
        label-position="left"
        :model="formdata"
      >
        <el-form-item label="商品id">
          <el-input prop="id" v-model="formdata.goodsid" disabled></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="formdata.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="商品规格">
          <el-input v-model="formdata.goodsspecs"></el-input>
        </el-form-item>
        <el-form-item label="商品单价">
          <el-input v-model="formdata.goodsprice"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-radio v-model="search.goodstype" label="水果">水果</el-radio>
          <el-radio v-model="search.goodstype" label="数码">数码</el-radio>
          <el-radio v-model="search.goodstype" label="食品">食品</el-radio>
          <el-radio v-model="search.goodstype" label="衣服">衣服</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 5, 10, 20]"
        :page-size="pageSize"
        layout="total,  sizes,prev, pager, next, jumper"
        :total="tabledata.length"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  inject: ["reload"],

  data() {
    return {
      columns12: [
        {
          title: "ID",
          key: "id",
        },
        {
          title: "商品名称",
          slot: "name",
        },
        {
          title: "商品规格",
          key: "specifications",
        },
        {
          title: "商品单价￥",
          key: "price",
        },
        {
          title: "商品分类",
          key: "good",
        },
        {
          title: "Action",
          slot: "action",
          width: 150,
          align: "center",
        },
      ],

      tabledata: [],
      search: {
        goodsname: "",
        goodsspecs: "",
        goodsprice: "",
        goodstype: "",
      },
      formdata: {
        goodsid: "",
        goodsname: "",
        goodsspecs: "",
        goodsprice: "",
        goodstype: "",
      },
      currentPage: 1,
      pageSize: 5,
      deleteid: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
    };
  },
  watch: {
    $route() {
      this.getData();
    },
  },
  created() {
    this.getinfo();
  },
  methods: {
    getinfo() {
      axios({
        method: "post",
        url: "http://localhost:8080/good/selectAll",
      })
        .then((res) => {
          console.log("bbbbbb", res.data);

          this.tabledata = res.data;
          console.log("xxx", this.tabledata);
          for (let i = 0; i < this.tabledata.length; i++) {
            this.tabledata[i].good= this.tabledata[i].good.name;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchinfo() {
      console.log(this.search.goodstype);
      axios({
        method: "get",
        url:
          "http://localhost:8080/good/selectByCategory?category=" +
          this.search.goodstype,
      })
        .then((res) => {
          console.log("cccc", res.data);
          this.tabledata = res.data;
          for(let i=0;i<this.tabledata.length;i++){
            if(this.tabledata[i].categoryId==1){
              this.tabledata[i].good="水果";
            }
            if(this.tabledata[i].categoryId==2){
              this.tabledata[i].good="数码";
            }
            if(this.tabledata[i].categoryId==3){
              this.tabledata[i].good="食品";
            }
            if(this.tabledata[i].categoryId==4){
              this.tabledata[i].good="衣服";
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    edit(row) {
      this.dialogFormVisible = true;
      this.formdata.goodsid = row.goodsid;
      this.formdata.goodsname = row.goodsname;
      this.formdata.goodsspecs = row.goodsspecs;
      this.formdata.goodsprice = row.goodsprice;
      this.formdata.goodstype = row.goodstype;
      console.log("dddd", row);
    },
    save() {
      axios
        .post("http://localhost:8080/student/updatestudent", {
          updateid: this.formdata.goodsid,
          goodsname: this.formdata.goodsname,
          goodsspecs: this.formdata.goodsspecs,
          goodsprice: this.formdata.goodsprice,
          goodstype: this.formdata.goodstype,
        })
        .then((response) => {
          console.log("cccccc", response),
            this.$message({
              type: "success",
              message: "成功!",
            });
          this.getinfo();
        })
        .catch((error) => {
          console.log(error);
        });
      this.$router.go(0);
      this.dialogFormVisible = false;
    },
    remove(goodsid) {
      console.log(goodsid, "1");
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
          this.deleteid = goodsid;
          console.log(goodsid);
          axios
            .post("http://localhost:8080/student/deletestudent", {
              deleteid: this.deleteid,
            })
            .then((response) => {
              console.log(response);
              this.getinfo();
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