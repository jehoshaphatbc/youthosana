<template>
  <div>
    <el-row :gutter="20">
      <el-col :offset="20" :span="4" style="text-align: right;">
        <router-link  :to="{ path:'/fellow-create'}"><el-button type="primary" icon="el-icon-plus" style="width: 100%">Create</el-button></router-link>
      </el-col>
    </el-row>
    <el-table
      :data="fellows"
      style="width: 100%; margin-top: 10px;">
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
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
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
    computed: mapGetters({
      fellows: 'getFellows'
    }),
    created() {
      this.$store.dispatch('loadFellows')
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