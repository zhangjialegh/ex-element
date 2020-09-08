<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column
      prop="date"
      label="日期"
      width="180"
      formatType="date"
      dateFormat="YYYY:MM:DD HH:mm:ss"
    ></el-table-column>
    <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
    <el-table-column prop="address" label="地址"> </el-table-column>
    <el-table-column prop="card" label="证件" formatType="desensitization">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="电话"
      formatType="desensitization"
    ></el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          card: "130637199103030313",
          phone: "14788888888"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  }
};
</script>
