<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="Name">
      <template slot-scope="scope">
        <span>{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Birthday"
      width="180">
      <template slot-scope="scope">
        <span>{{ scope.row.birthday }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Age"
      width="180">
      <template slot-scope="scope">
        <span>{{ scope.row.age }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Email"
      width="180">
      <template slot-scope="scope">
        <span>{{ scope.row.email }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Phone"
      width="180">
      <template slot-scope="scope">
        <span>{{ scope.row.phone }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Operations">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="handleEdit(scope.$index, scope.row)" icon="el-icon-view"></el-button>
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit"></el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete"></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          name: 'Tom',
          birthday: '1996-02-10',
          age: '22',
          email: 'admin@mail.com',
          phone: '0823456789'
        }]
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  }
</script>