<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <el-row :gutter="20">
            <el-col :span="20" style="text-align: left;">
              <h3>List Fellow</h3>
            </el-col>
            <el-col :span="4" style="text-align: right;">
              <router-link  to="fellow-create"><el-button type="primary" icon="el-icon-plus" style="width: 100%">Create</el-button></router-link>
            </el-col>
          </el-row>
        </div>
        <div class="card-body">
          <el-table
            :data="fellows"
            v-loading.body="loading"
            element-loading-text="Loading"
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
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        fellows: [],
        loading: false
      }
    },
    created() {
      this.loadData()
    },
    computed: mapGetters({
      getFellows: 'getFellows'
    }),
    watch: {
      getFellows: function(val) {
        this.fellows = val
        this.loading = false
      }
    },
    methods: {
      loadData() {
        this.loading = true
        this.$store.dispatch('loadFellows')
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  }
</script>