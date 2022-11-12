<template>
  <div>
    <h4>添加商品</h4>
    <el-form :inline="true" class="demo-form-inline" :model="addtabledata">
      <el-form-item label="商品ID   ">
        <el-input
          placeholder="商品_ID"
          v-model="addtabledata.goodsid"
        ></el-input>
      </el-form-item>
      <br>
      <el-form-item label="商品名称">
        <el-input
          placeholder="商品名称"
          v-model="addtabledata.goodsname"
        ></el-input>
      </el-form-item>
      <br />
      <el-form-item label="商品规格">
        <el-input
          placeholder="商品规格"
          v-model="addtabledata.goodsspecs"
        ></el-input>
      </el-form-item>
      <br />
      <el-form-item label="商品单价">
        <el-input
          placeholder="商品单价"
          v-model="addtabledata.goodsprice"
        ></el-input>
      </el-form-item>
      <br />
      <el-form-item label="商品分类">
      <el-select v-model="addtabledata.goodstype" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        >
        </el-option>
      </el-select>
    </el-form-item>
      <br />
      <el-form-item>
        <el-button type="primary" @click="add">新增</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      addtabledata: {
        goodsname: "",
        goodsspecs: "",
        goodsprice: "",
        goodstype: ""
      },
      options: [{
          value: '1',
          label: '水果'
        }, {
          value: '2',
          label: '数码'
        }, {
          value: '3',
          label: '食品'
        }, {
          value: '4',
          label: '衣服'
        }],
    };
  },
  methods: {
    add() {
      console.log(this.addtabledata.goodsname);
      axios
        .post("http://localhost:8080/good/insert", {
          name: this.addtabledata.goodsname,
          specifications: this.addtabledata.goodsspecs,
          price: this.addtabledata.goodsprice,
          categoryId: this.addtabledata.goodstype,
          id: this.addtabledata.goodsid
        })
        .then((response) => {
          console.log("cccccc", response),
            this.$message({
              type: "success",
              message: "成功!",
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>